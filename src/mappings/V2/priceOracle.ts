import { Pair } from '../../types/schema'
import { BigDecimal, BigInt, Address } from '@graphprotocol/graph-ts/index'

// const stableBundle = ['0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735']

export function getEthPriceInUSD(blockNum: BigInt): BigDecimal {
  const DAI_WETH_EXCHANGE = '0xa9dCEFFf40dA7329562E7FA4CE7bD52bf4beA453'
  const DAI_ADDRESS = '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735'
  const DAI_BLOCK_CONTRACT_CREATION = 5729921
  const blockNumInt = blockNum.toI32()

  if (blockNumInt >= DAI_BLOCK_CONTRACT_CREATION) {
    const daiWethPair = Pair.load(Address.fromString(DAI_WETH_EXCHANGE).toHexString())
    if (daiWethPair != null) {
      if (daiWethPair.token0 == DAI_ADDRESS) {
        return daiWethPair.token0Price // dai per weth
      } else {
        return daiWethPair.token1Price // dai per weth
      }
    }
  }
  return BigDecimal.fromString('0') // only for some blocks before DAI creation
}

/**
 *  @todo
 *
 * create more sophisticated weighting for other 'valid' stablecoins
 *
 * tusd, usdc
 *
 * weighted average or even more robust weighting
 *
 * potentially handle events in this mapping an update price in a store
 *
 */
