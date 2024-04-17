import { BigNumber } from "@ethersproject/bignumber";
import type { MergedPool } from "../../generated-algo/MergedPool";

type Params = {
  mergedPool: MergedPool;
  userAddress: string;
  poolId: number;
};

const raw = async (_: any, { mergedPool, userAddress, poolId }: Params) => {
  return {
    to: mergedPool.address,
    data: mergedPool.interface.encodeFunctionData("getUserPoolNfts", [
      userAddress,
      poolId,
    ]),
  };
};

const decode = async (_: any, data: string, { mergedPool }: Params) => {
  if (data === null) return;
  try {
    const result = mergedPool.interface.decodeFunctionResult(
      "getUserPoolNfts",
      data
    );

    return result[0] as BigNumber;
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
