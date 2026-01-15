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
    { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", decimals: 8, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfedF7C193bc2C599/logo.png" },
    { symbol: "USDC", name: "USD Coin", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", decimals: 6, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" },
    { symbol: "USDT", name: "Tether USD", address: "0xdac17f958d2ee523a2206206994597c13d831ec7", decimals: 6, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png" },
    { symbol: "DAI", name: "Dai Stablecoin", address: "0x6b175474e89094c44da98b954eedeac495271d0f", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png" },
    { symbol: "LINK", name: "Chainlink", address: "0x514910771af9ca656af840dff83e8264ecf986ca", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png" },
    { symbol: "AAVE", name: "Aave", address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9C93437bFc5Ac33E2DDaE9/logo.png" },
    { symbol: "UNI", name: "Uniswap", address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/logo.png" },
    { symbol: "CRV", name: "Curve DAO Token", address: "0xd533a949740bb3306d119cc777fa900ba034cd52", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png" },
    { symbol: "MKR", name: "Maker", address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2/logo.png" },
    { symbol: "SNX", name: "Synthetix Network Token", address: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2A6f/logo.png" },
    { symbol: "COMP", name: "Compound", address: "0xc00e94cb662c3520282e6f5469ff1033e0717944", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94cb662c3520282e6f5469ff1033e0717944/logo.png" },
    { symbol: "GRT", name: "The Graph", address: "0xc5b575766e474542289c09051412071f66d488e0", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc5b575766e474542289c09051412071f66d488e0/logo.png" },
    { symbol: "LDO", name: "Lido DAO Token", address: "0x5a98fcbea516cf06857215779fd812ca3bef1b32", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32/logo.png" },
    { symbol: "ARB", name: "Arbitrum", address: "0xb50721bc2f1190eb9d1f49d6ad90aa73bb3a0031", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xb50721bc2f1190eb9d1f49d6ad90aa73bb3a0031/logo.png" },
  ],
  polygon: [
    { symbol: "WMATIC", name: "Wrapped Matic", address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png" },
    { symbol: "USDC", name: "USD Coin", address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", decimals: 6, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x2791Bca1f2de4661ed88A30C99A7a9449Aa84174/logo.png" },
    { symbol: "USDT", name: "Tether USD", address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", decimals: 6, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0xc2132D05D31c914a87C6611C10748AEb04B58e8F/logo.png" },
    { symbol: "WETH", name: "Wrapped Ether", address: "0x7ceb23fd6bc0ad59e62c253991a60552684b29c6", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x7ceB23fD6bC0ad59E62c253991a60552684B29C6/logo.png" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x1bfd67037b42cf73acf2047da6b312584a08c721", decimals: 8, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x1BFD67037B42Cf73acF2047DA6b312584a08C721/logo.png" },
    { symbol: "DAI", name: "Dai Stablecoin", address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x8f3Cf7ad23CD3CaDbd9735AFf958023239c6A063/logo.png" },
    { symbol: "LINK", name: "Chainlink", address: "0xb0897686c545045afc77cf20ec7a532e3120e0f1", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0xb0897686c545045afc77cf20ec7a532e3120e0f1/logo.png" },
    { symbol: "AAVE", name: "Aave", address: "0xd6df932a45c0f255f85145f286ea0b292b21c90b", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0xd6df932a45c0f255f85145f286ea0b292b21c90b/logo.png" },
    { symbol: "GRT", name: "The Graph", address: "0x5fe2a8171b457515f40197449856a1a8932b6bc0", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x5fe2a8171b457515f40197449856a1a8932b6bc0/logo.png" },
    { symbol: "SUSHI", name: "SushiSwap", address: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a/logo.png" },
    { symbol: "QUICK", name: "Quickswap", address: "0x831753dd7087bb61e8424b01e21d43a2371b28b5", decimals: 18, logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x831753dd7087bb61e8424b01e21d43a2371b28b5/logo.png" },
  ]
};
