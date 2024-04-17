import { BigNumber } from "@ethersproject/bignumber";
import type { IUniswapV2Pair } from "../../generated-algo/IUniswapV2Pair";

type Params = {
  uniswapV2Pair: IUniswapV2Pair;
};

const raw = async (_: any, { uniswapV2Pair }: Params) => {
  return {
    to: uniswapV2Pair.address,
    data: uniswapV2Pair.interface.encodeFunctionData("getReserves"),
  };
};

const decode = async (_: any, data: string, { uniswapV2Pair }: Params) => {
  if (data === null) return;
  try {
    const result = uniswapV2Pair.interface.decodeFunctionResult(
      "getReserves",
      data
    );

    return {
      reserve0: result.reserve0 as BigNumber,
      reserve1: result.reserve1 as BigNumber,
    };
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
