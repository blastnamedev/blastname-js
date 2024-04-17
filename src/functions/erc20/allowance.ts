import { BigNumber } from "@ethersproject/bignumber";
import type { ERC20 } from "../../generated-algo/ERC20";

type Params = {
  erc20: ERC20;
  userAddress: string;
  spender: string;
};

const raw = async (_: any, { erc20, userAddress, spender }: Params) => {
  return {
    to: erc20.address,
    data: erc20.interface.encodeFunctionData("allowance", [
      userAddress,
      spender,
    ]),
  };
};

const decode = async (
  _: any,
  data: string,
  { erc20 }: Params
): Promise<BigNumber | undefined> => {
  if (data === null) return;
  try {
    const result = erc20.interface.decodeFunctionResult("allowance", data);

    return result[0];
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
