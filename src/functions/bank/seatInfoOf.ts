import type { Bank } from "../../generated-algo/Bank";

type Params = {
  bank: Bank;
  userAddress: string;
};

const raw = async (_: any, { bank, userAddress }: Params) => {
  return {
    to: bank.address,
    data: bank.interface.encodeFunctionData("members", [userAddress]),
  };
};

const decode = async (_: any, data: string, { bank }: Params) => {
  if (data === null) return;
  try {
    const result = bank.interface.decodeFunctionResult(
      "members",
      data
    ) as Awaited<ReturnType<Bank["members"]>>;

    return {
      lastSnapshotIndex: result.lastSnapshotIndex,
      rewardEarned: result.rewardEarned,
      epochTimerStart: result.epochTimerStart,
    };
  } catch {
    return;
  }
};

export default {
  raw,
  decode,
};
