import { BigNumber } from "@ethersproject/bignumber";
import type { Vesting } from "../../generated-algo/Vesting";

type Params = {
  vesting: Vesting;
  userAddress: string;
};

const raw = async (_: any, { vesting, userAddress }: Params) => {
  return {
    to: vesting.address,
    data: vesting.interface.encodeFunctionData("canUnlockAmount", [
      userAddress,
    ]),
  };
};

const decode = async (_: any, data: string, { vesting }: Params) => {
  if (data === null) return;
  try {
    const result = vesting.interface.decodeFunctionResult(
      "canUnlockAmount",
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
