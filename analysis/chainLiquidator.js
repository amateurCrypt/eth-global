import { BigNumber, ethers } from 'ethers'
import { CurrentConfig } from './config.js'
import { computePoolAddress } from '@uniswap/v3-sdk'
import { computePriceImpact } from '@uniswap/sdk-core'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
} from '../libs/constants'
import { getProvider } from '../libs/providers'
import { graphql, buildSchema } from 'graphql'
import { address as stETHAddress, abi as stETHAbi } from  '../artifacts/stETH.json'
import { address as wethAddress, abi as wethAbi } from '../artifacts/WETH9.json'

const substreamEndpoint = "mainnet.eth.streamingfast.io:443";
const aaveSubgraph = `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/84CvqQHYhydZzr2KSth8s1AFYpBRzUbVJXq6PWuZm9U9`;
const compoundSubgraph = `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/6tGbL7WBx287EZwGUvvcQdL6m67JGMJrma3JSTtt5SV7`;

const aavePositionSchema = {
  {
    position(id: "") {
      balance
      isCollateral
      deposits {
        amount
      }
      side
      repays {
        amount
      }
    }
  }
}

const compoundPositionSchema = {
  {
    position(id: "") {
      balance
      isCollateral
      deposits {
        amount
      }
      side
      repays {
        amount
      }
    }
  }
}

const tokenDistributionSchema = {

}

async function quote(amountIn) {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  )
  const poolConstants = await getPoolConstants()

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    BigNumber(ethers.utils.parseUnits(amountIn.toString(), 18)).toString(),
    0
  )

  return ethers.utils.formatUnits(quotedAmountOut, 18).slice(0, 4)

}

async function getPoolConstants() {
  token0
  token1
  fee
} {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  })

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
  )
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ])

  return {
    token0,
    token1,
    fee,
    poolContract
  }
}


//Query subgraph for position data for each lending protocol and sort by health factor

async function queryPositionData() {

    return {aavePositions, compoundPositions, leastHealthyPosition}
}

//Compute ratio of collateral types 


//Calculate price drop to liquidate first position 
//asset % of user's total collateral * % drop in asset price == the % drop in health factor 

async function priceShock(healthFactor) {
    const poolConstants = getPoolConstants()
    const stETHContract = new ethers.Contract(
       stETHAddress, stETHAbi, getProvider()
    );
    const wethContract = new ethers.Contract(
        wethAddress, wethAbi, getProvider()
    );

    //Disregarding accumulated LP fees real quick for rough TVL
    const wethBalance = wethContract.balanceOf(poolConstants.poolContract.address);
    const stETHBalance = stETHContract.balanceOf(poolConstants.poolContract.address);
    const tvl = stETHBalance + wethBalance;

    if (healthFactor > 1) {
        const priceDrop = (1 / healthFactor) * stETHBalance
        return {priceDrop, tvl}
    } else return 0;
}

/** Loop through all positions, in order of health factor
Liquidate all unhealthy positions at initial price shock level
Add new liquidated amounts to cumulative price shock
If new positions are unhealthy, repeat loop **/

async function chainLiquidation() {
    positionData = queryPositionData();
    shockData = priceShock(positionData.leastHealthyPosition);
    for (const i in positionData.aavePositions + positionData.compoundPositions) {
        if (positionData.aavePositions[i].healthFactor > (shockData.priceDrop / shockData.tvl) && positionData.aavePositions[i].healthFactor < 1.1) {
            
        }
    }
}