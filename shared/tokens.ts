export interface TokenMetadata {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

export const SUPPORTED_TOKENS: Record<string, TokenMetadata[]> = {
  ethereum: [
    { symbol: "WETH", name: "Wrapped Ether", address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png" },
    { symbol: "USDC", name: "USD Coin", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", decimals: 6, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" },
    { symbol: "USDT", name: "Tether USD", address: "0xdac17f958d2ee523a2206206994597c13d831ec7", decimals: 6, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png" },
  ],
  polygon: [
    { symbol: "WMATIC", name: "Wrapped Matic", address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png" },
    { symbol: "USDC", name: "USD Coin", address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", decimals: 6, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x2791Bca1f2de4661ed88A30C99A7a9449Aa84174/logo.png" },
    { symbol: "USDT", name: "Tether USD", address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", decimals: 6, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0xc2132D05D31c914a87C6611C10748AEb04B58e8F/logo.png" },
  ]
};
