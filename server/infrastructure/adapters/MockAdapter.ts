import { Token, Pool } from "../../domain/entities";
import { SUPPORTED_TOKENS } from "../../../shared/tokens";

export interface IChainAdapter {
  getChainName(): string;
  getTopPools(limit: number): Promise<Pool[]>;
  getStableTokenAddress(): string;
}

export class MockAdapter implements IChainAdapter {
  private chainName: string;
  private stableToken: Token;
  private tokens: Token[];

  constructor(chainName: string) {
    this.chainName = chainName.toLowerCase();
    
    const metadata = SUPPORTED_TOKENS[this.chainName] || [];
    
    // Find USDC or first token as stable for mock purposes
    const stableMeta = metadata.find(t => t.symbol === "USDC") || metadata[0];
    
    this.stableToken = {
      symbol: stableMeta.symbol,
      name: stableMeta.name,
      address: stableMeta.address,
      decimals: stableMeta.decimals
    };

    this.tokens = metadata.filter(t => t.address !== this.stableToken.address).map(t => ({
      symbol: t.symbol,
      name: t.name,
      address: t.address,
      decimals: t.decimals
    }));
  }

  getChainName(): string {
    return this.chainName;
  }

  getStableTokenAddress(): string {
    return this.stableToken.address;
  }

  async getTopPools(limit: number): Promise<Pool[]> {
    // Return mock pools with random variations to simulate live data
    const poolCount = Math.min(this.tokens.length, limit);
    const pools: Pool[] = [];
    
    for (let i = 0; i < poolCount; i++) {
      const token = this.tokens[i];
      const basePrice = this.getBasePrice(token.symbol);
      const variation = 1 + (Math.random() * 0.02 - 0.01); // +/- 1%
      const price = basePrice * variation;

      const stableReserveVal = 1_000_000 * price; // $1M liquidity
      const tokenReserveVal = 1_000_000;

      pools.push({
        address: `0xPool_${token.symbol}_${this.chainName}`,
        token0: token,
        token1: this.stableToken,
        reserve0: BigInt(Math.floor(tokenReserveVal * Math.pow(10, token.decimals))),
        reserve1: BigInt(Math.floor(stableReserveVal * Math.pow(10, this.stableToken.decimals))),
        feeTier: 3000 // 0.3%
      });
    }
    return pools;
  }

  private getBasePrice(symbol: string): number {
    switch (symbol) {
      case "WETH": return 3500;
      case "WBTC": return 65000;
      case "UNI": return 10;
      case "AAVE": return 120;
      case "LINK": return 18;
      case "LDO": return 2.5;
      case "ARB": return 1.2;
      case "WMATIC": return 0.8;
      case "USDT": return 1;
      case "DAI": return 1;
      case "MKR": return 2800;
      case "SNX": return 3.5;
      case "COMP": return 60;
      case "GRT": return 0.25;
      case "SUSHI": return 1.1;
      case "QUICK": return 0.05;
      default: return 1;
    }
  }
}
