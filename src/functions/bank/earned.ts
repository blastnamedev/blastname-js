import { BigNumber } from "@ethersproject/bignumber";
import type { Bank } from "../../generated-algo/Bank";

type Params = {
  bank: Bank;
  userAddress: string;
};

const raw = async (_: any, { bank, userAddress }: Params) => {
  return {
    to: bank.address,
    data: bank.interface.encodeFunctionData("earned", [userAddress]),
  };
};

const decode = async (_: any, data: string, { bank }: Params) => {
  if (data === null) return;
  try {
    const result = bank.interface.decodeFunctionResult("earned", data);

    return result[0] as BigNumber;
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
