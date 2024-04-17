import { ethers } from "ethers";
import { ENS } from "../..";
import setup from "../../tests/setup";
import type { MergedPool } from "../../generated-algo/MergedPool";

let ensInstance: ENS;
let revert: Awaited<ReturnType<typeof setup>>["revert"];
let provider: ethers.providers.JsonRpcProvider;
let accounts: string[];
let mergedPool: MergedPool;

beforeAll(async () => {
  ({ ensInstance, revert, provider } = await setup());
  accounts = await provider.listAccounts();
  // @ts-ignore
  const addr = await ensInstance.getContractAddress()("MergedPool");
  mergedPool = (await ensInstance.contracts?.getMergedPool(addr))!;
});

afterAll(async () => {
  await revert();
});

describe("mergedPoolGetUserPoolAmount", () => {
  it("test", async () => {
    const result = await ensInstance.mergedPool.getUserPoolAmount({
      mergedPool,
      userAddress: accounts[0],
      poolId: 0,
    });
    expect(result).toBeTruthy();
  });
});
