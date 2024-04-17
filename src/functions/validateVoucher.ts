import { ENSArgs } from "..";

type Params = {
  userAddress: string;
  voucherId: string;
};

const raw = async (
  { contracts }: ENSArgs<"contracts">,
  { userAddress, voucherId }: Params
) => {
  const voucher = await contracts?.getVoucher()!;
  return {
    to: voucher.address,
    data: voucher.interface.encodeFunctionData("validateVoucher", [
      userAddress,
      voucherId,
    ]),
  };
};

const decode = async ({ contracts }: ENSArgs<"contracts">, data: string) => {
  if (data === null) return;
  const voucher = await contracts?.getVoucher()!;
  try {
    const result = voucher.interface.decodeFunctionResult(
      "validateVoucher",
      data
    );
    return {
      success: result["0"],
      message: result["1"],
    };
  } catch (e) {
    return { success: false, message: e };
  }
};

export default {
  raw,
  decode,
};
