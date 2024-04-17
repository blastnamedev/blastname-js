import { BigNumber } from "@ethersproject/bignumber";
import type { Treasury } from "../../generated-algo/Treasury";

type Params = {
  treasury: Treasury;
};

const raw = async (_: any, { treasury }: Params) => {
  return {
    to: treasury.address,
    data: treasury.interface.encodeFunctionData("epoch"),
  };
};

const decode = async (_: any, data: string, { treasury }: Params) => {
  if (data === null) return;
  try {
    const result = treasury.interface.decodeFunctionResult("epoch", data);

    return result[0] as BigNumber;
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
