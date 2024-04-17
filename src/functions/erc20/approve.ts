import { BigNumberish } from "@ethersproject/bignumber";
import type { ERC20 } from "../../generated-algo/ERC20";
import { ENSArgs } from "../..";

interface Params {
  erc20: ERC20;
  spender: string;
  value: BigNumberish;
}

export default async function (
  { signer }: ENSArgs<"signer">,
  { erc20, spender, value }: Params
) {
  const _erc20 = erc20.connect(signer);

  return _erc20.populateTransaction.approve(spender, value);
}
