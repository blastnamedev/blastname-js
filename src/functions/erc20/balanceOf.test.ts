import { ethers } from "ethers";
import { ENS } from "../..";
import setup from "../../tests/setup";
import type { ERC20 } from "../../generated-algo/ERC20";

let ensInstance: ENS;
let revert: Awaited<ReturnType<typeof setup>>["revert"];
let provider: ethers.providers.JsonRpcProvider;
let accounts: string[];
let erc20: ERC20;

beforeAll(async () => {
  ({ ensInstance, provider, revert } = await setup());
  accounts = await provider.listAccounts();
  // @ts-ignore
  const addr = await ensInstance.getContractAddress()("BNS");
  erc20 = (await ensInstance.contracts?.getERC20(addr))!;
});

afterAll(async () => {
  await revert();
});

describe("getUserPoolNfts", () => {
  it("test", async () => {
    const result = await ensInstance.erc20.balanceOf({
      erc20,
      userAddress: accounts[0],
    });
    expect(result).toBeTruthy();
  });
});
