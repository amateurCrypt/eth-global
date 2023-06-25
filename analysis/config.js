import { FeeAmount } from '@uniswap/v3-sdk'

export const CurrentConfig = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://eth-mainnet.g.alchemy.com/v2/pVDnCgnFeZnsfuGFfqjDSxRe6W03FDsM',
  },
  tokens: {
    in: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
    amountIn: 1000,
    out: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    poolFee: FeeAmount.MEDIUM,
  },
}