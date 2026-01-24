import { Pool, Token } from "../../domain/entities";
import { ethers } from "ethers";

const MULTICALL_ADDRESS = "0xca11bde05977b3631167028862be2a173976ca11";
const UNISWAP_V3_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

const MULTICALL_ABI = [
  "function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)"
];

const FACTORY_ABI = [
  "function getPool(address tokenA, address tokenB, uint24 feeTier) view returns (address pool)"
];

const POOL_ABI = [
  "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
  "function liquidity() view returns (uint128)",
  "function getReserves() view returns (uint128, uint128)"
];

export class EthersAdapter {
  private provider: ethers.JsonRpcProvider;
  private factory: ethers.Contract;

  constructor(rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.factory = new ethers.Contract(UNISWAP_V3_FACTORY, FACTORY_ABI, this.provider);
  }

  async getChainId(): Promise<number> {
    const network = await this.provider.getNetwork();
    return Number(network.chainId);
  }

  async getPoolAddress(tokenA: Token, tokenB: Token): Promise<string | null> {
    const feeTiers = [100, 500, 3000, 10000]; // Common Uniswap V3 fee tiers
    for (const fee of feeTiers) {
      const poolAddress = await this.factory.getPool(tokenA.address, tokenB.address, fee);
      if (poolAddress && poolAddress !== "0x0000000000000000000000000000000000000000") {
        return poolAddress;
      }
    }
    return null;
  }

  async getBatchPoolData(poolAddresses: string[]): Promise<any[]> {
    if (poolAddresses.length === 0) return [];

    const multicall = new ethers.Contract(MULTICALL_ADDRESS, MULTICALL_ABI, this.provider);
    const poolInterface = new ethers.Interface(POOL_ABI);

    const validAddresses = poolAddresses.filter(addr => addr && ethers.isAddress(addr));
    if (validAddresses.length === 0) return [];

    const calls = validAddresses.flatMap(address => [
      { target: address, callData: poolInterface.encodeFunctionData("slot0") },
      { target: address, callData: poolInterface.encodeFunctionData("liquidity") },
      { target: address, callData: poolInterface.encodeFunctionData("getReserves") }
    ]);

    try {
      const [, returnData] = await multicall.aggregate(calls);

      const results = [];
      for (let i = 0; i < validAddresses.length; i++) {
        try {
          const slot0Data = poolInterface.decodeFunctionResult("slot0", returnData[i * 3]);
          const liquidityData = poolInterface.decodeFunctionResult("liquidity", returnData[i * 3 + 1]);
          const reservesData = poolInterface.decodeFunctionResult("getReserves", returnData[i * 3 + 2]);

          results.push({
            address: validAddresses[i],
            sqrtPriceX96: BigInt(slot0Data.sqrtPriceX96.toString()),
            liquidity: BigInt(liquidityData[0].toString()),
            reserve0: BigInt(reservesData[0].toString()),
            reserve1: BigInt(reservesData[1].toString()),
          });
        } catch (e) {
          continue;
        }
      }
      return results;
    } catch (error) {
      console.error("Multicall aggregate failed:", error);
      return [];
    }
  }
}
