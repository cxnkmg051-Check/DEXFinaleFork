/**
 * Subgraph Configuration
 * 
 * Defines which subgraphs to query for pool topology discovery
 * Uses The Graph API endpoints
 */

export interface SubgraphConfig {
  name: string;
  endpoint: string;
  dexType: "v2" | "v3" | "custom";
  chainId: number;
}

// Export a function that returns the config, so it reads env vars at call time
export function getSubgraphConfig(): Record<number, SubgraphConfig[]> {
  const GRAPH_API_KEY = process.env.THE_GRAPH_API_KEY || "";

  if (!GRAPH_API_KEY) {
    console.warn("THE_GRAPH_API_KEY not set. Subgraph queries will be made without an API key.");
  }
  
  return {
    // Ethereum
    1: [
      {
        name: "Uniswap V4",
        endpoint: `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G`,
        dexType: "v3", // NOTE: Assuming v4 is v3-compatible for queries
        chainId: 1,
      },
      {
        name: "Uniswap V3",
        endpoint: `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`,
        dexType: "v3",
        chainId: 1,
      },
      {
        name: "Uniswap V2",
        endpoint: `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum`,
        dexType: "v2",
        chainId: 1,
      },
      {
        name: "SushiSwap",
        endpoint: `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/D7azkFFPFT5H8i32VCHGg64pRTg5g2Q3eeiURAe62c26`,
        dexType: "v2",
        chainId: 1,
      },
    ],
    // Polygon
    137: [
      {
        name: "Uniswap V3 (Polygon)",
        endpoint: `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm`,
        dexType: "v3",
        chainId: 137,
      },
      {
        name: "SushiSwap (Polygon)",
        endpoint: `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/C4jPXEA5i58jM5E16pT6aSA1Abh2Fk2BSo3h3JKmS3w2`,
        dexType: "v2",
        chainId: 137,
      },
      {
        name: "QuickSwap",
        endpoint: `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/GVQo5o5aE62iNucp2gDt2t4F8vowm2x3KqFBcKF8jK3R`,
        dexType: "v2",
        chainId: 137,
      },
    ],
  };
}


export const BASE_TOKENS: Record<number, string[]> = {
  1: [
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
    "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
  ],
  137: [
    "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", // USDC
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", // USDT
    "0x8f3cf7ad23cd3cadbd9735aff958023d60d76ee6", // DAI
    "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619", // WETH
    "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", // WMATIC
  ],
};
