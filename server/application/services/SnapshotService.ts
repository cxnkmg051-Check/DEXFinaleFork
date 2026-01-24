import { Token, Pool } from "../../domain/entities";
import { EthersAdapter } from "../../infrastructure/adapters/EthersAdapter";

export class SnapshotService {
  private adapters: EthersAdapter[];

  constructor(adapters: EthersAdapter[]) {
    this.adapters = adapters;
  }

  async bootstrapPools(tokens: Token[]): Promise<Record<string, Pool>> {
    const pools: Record<string, Pool> = {};

    for (const adapter of this.adapters) {
      const chainId = await adapter.getChainId();
      const chainTokens = tokens.filter(t => t.chainId === chainId);

      // Create all possible pairs of tokens for the current chain
      for (let i = 0; i < chainTokens.length; i++) {
        for (let j = i + 1; j < chainTokens.length; j++) {
          const tokenA = chainTokens[i];
          const tokenB = chainTokens[j];

          // Check for existing pool
          const poolAddress = await adapter.getPoolAddress(tokenA, tokenB);
          
          if (poolAddress && poolAddress !== "0x0000000000000000000000000000000000000000") {
            const poolData = await adapter.getBatchPoolData([poolAddress]);
            if (poolData && poolData.length > 0) {
              const p = poolData[0];
              pools[poolAddress.toLowerCase()] = {
                address: p.address,
                token0: tokenA,
                token1: tokenB,
                reserve0: p.reserve0,
                reserve1: p.reserve1,
                feeTier: p.feeTier,
              };
            }
          }
        }
      }
    }
    return pools;
  }
}
