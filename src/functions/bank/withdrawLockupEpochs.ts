import { BigNumber } from "@ethersproject/bignumber";
import type { Bank } from "../../generated-algo/Bank";

type Params = {
  bank: Bank;
};

const raw = async (_: any, { bank }: Params) => {
  return {
    to: bank.address,
    data: bank.interface.encodeFunctionData("withdrawLockupEpochs"),
  };
};

const decode = async (_: any, data: string, { bank }: Params) => {
  if (data === null) return;
  try {
    const result = bank.interface.decodeFunctionResult(
      "withdrawLockupEpochs",
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
