import { ENSArgs } from "..";

type Params = {
  address: string;
};

const raw = async (
  { contracts }: ENSArgs<"contracts">,
  { address }: Params
) => {
  const referral = await contracts?.getReferral()!;
  return {
    to: referral.address,
    data: referral.interface.encodeFunctionData("accounts", [address]),
  };
};

const decode = async (
  { contracts }: ENSArgs<"contracts">,
  data: string
): Promise<boolean> => {
  if (data === null) return false;
  const referral = await contracts?.getReferral()!;
  try {
    const result = referral.interface.decodeFunctionResult("accounts", data);

    // const mapped = {
    //   referrer: result.referrer,
    //   reward: BigInt(result.reward),
    //   referredCount: BigInt(result.referredCount),
    //   lastActiveTimestamp: BigInt(result.lastActiveTimestamp),
    //   noReferrer: result.noReferrer,
    //   referrerEnable: result.referrerEnable,
    // }

    return result.referrerEnable;
  } catch (e) {
    return false;
  }
};

export default {
  raw,
  decode,
};
