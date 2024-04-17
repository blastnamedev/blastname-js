import { ENSArgs } from "../..";

type Params = {
  account: string;
  operator: string;
};

const raw = async (
  { contracts }: ENSArgs<"contracts">,
  { account, operator }: Params
) => {
  const nameWrapper = await contracts?.getNameWrapper()!;

  return {
    to: nameWrapper.address,
    data: nameWrapper.interface.encodeFunctionData("isApprovedForAll", [
      account,
      operator,
    ]),
  };
};

const decode = async ({ contracts }: ENSArgs<"contracts">, data: string) => {
  if (data === null) return;
  const nameWrapper = await contracts?.getNameWrapper()!;
  try {
    const result = nameWrapper.interface.decodeFunctionResult(
      "isApprovedForAll",
      data
    );
    return result["0"] as boolean;
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
