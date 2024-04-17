import { BigNumber } from "@ethersproject/bignumber";
import type { MergedPool } from "../../generated-algo/MergedPool";

type Params = {
  mergedPool: MergedPool;
  poolId: number;
};

const raw = async (_: any, { mergedPool, poolId }: Params) => {
  return {
    to: mergedPool.address,
    data: mergedPool.interface.encodeFunctionData("poolInfo", [poolId]),
  };
};

const decode = async (_: any, data: string, { mergedPool }: Params) => {
  if (data === null) return;
  try {
    const result = mergedPool.interface.decodeFunctionResult("poolInfo", data);

    return {
      isNftPool: result.isNftPool as boolean,
      poolToken: result.poolToken as string,
      nftTier: result.nftTier as number,
      nftAmount: result.nftAmount as BigNumber,
      allocPoint: result.allocPoint as BigNumber,
      lastRewardBlock: result.lastRewardBlock as BigNumber,
      accTokenPerShare: result.accTokenPerShare as BigNumber,
      isStarted: result.isStarted as boolean,
    };
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
