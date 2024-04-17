import { ethers } from "ethers";
import { ENS } from "../..";
import setup from "../../tests/setup";

let ensInstance: ENS;
let revert: Awaited<ReturnType<typeof setup>>["revert"];
let provider: ethers.providers.JsonRpcProvider;
let accounts: string[];

beforeAll(async () => {
  ({ ensInstance, revert, provider } = await setup());
  accounts = await provider.listAccounts();
});

afterAll(async () => {
  await revert();
});

describe("getUserPoolNfts", () => {
  it("test", async () => {
    const result = await ensInstance.nameWrapper.isApprovedForAll({
      account: accounts[0],
      operator: accounts[1],
    });
    expect(result).toBeFalsy();
  });
});
