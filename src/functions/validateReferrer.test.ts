import { ethers } from "ethers";
import { ENS } from "..";
import setup from "../tests/setup";
import { tldName } from "../constants";

let ensInstance: ENS;
let revert: Awaited<ReturnType<typeof setup>>["revert"];
let provider: ethers.providers.JsonRpcProvider;
let accounts: string[];
let registerName: (registrant: string) => Promise<void>;

beforeAll(async () => {
  ({ ensInstance, revert, provider } = await setup());
  accounts = await provider.listAccounts();

  registerName = async (registrant: string) => {
    const controller =
      await ensInstance.contracts!.getEthRegistrarController()!;

    const name = `somename.${tldName}`;
    const duration = 31536000;
    const { customData, ...commitPopTx } =
      await ensInstance.commitName.populateTransaction(name, {
        duration,
        owner: registrant,
        addressOrIndex: registrant,
      });
    const commitTx = await provider.getSigner().sendTransaction(commitPopTx);
    await commitTx.wait();

    await provider.send("evm_increaseTime", [60]);
    await provider.send("evm_mine", []);

    const { secret } = customData!;

    const [price] = await controller.rentPrice(name, duration, 0);

    const tx = await ensInstance.registerName(name, {
      secret,
      duration,
      owner: registrant,
      addressOrIndex: registrant,
      value: price,
    });
    await tx.wait();
  };
});

afterAll(async () => {
  await revert();
  await provider.send("anvil_removeBlockTimestampInterval", []);
});

describe("validateReferrer", () => {
  beforeEach(async () => {
    await revert();
  });

  it("should validate valid referrer address", async () => {
    await registerName(accounts[1]);

    const result = await ensInstance.validateReferrer({
      address: accounts[1],
    });

    expect(result).toBeTruthy();
  });

  it("should validate invalid referrer address", async () => {
    const result = await ensInstance.validateReferrer({
      address: accounts[1],
    });

    expect(result).toBeFalsy();
  });
});
