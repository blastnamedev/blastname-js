import { BigNumber } from "@ethersproject/bignumber";
import type { ERC20 } from "../../generated-algo/ERC20";

type Params = {
  erc20: ERC20;
};

const raw = async (_: any, { erc20 }: Params) => {
  return {
    to: erc20.address,
    data: erc20.interface.encodeFunctionData("totalSupply"),
  };
};

const decode = async (_: any, data: string, { erc20 }: Params) => {
  if (data === null) return;
  try {
    const result = erc20.interface.decodeFunctionResult("totalSupply", data);

    return result[0] as BigNumber;
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
