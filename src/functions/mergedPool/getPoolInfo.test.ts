import { ENS } from "../..";
import setup from "../../tests/setup";
import type { MergedPool } from "../../generated-algo/MergedPool";

let ensInstance: ENS;
let revert: Awaited<ReturnType<typeof setup>>["revert"];
let mergedPool: MergedPool;

beforeAll(async () => {
  ({ ensInstance, revert } = await setup());
  // @ts-ignore
  const addr = await ensInstance.getContractAddress()("MergedPool");
  mergedPool = (await ensInstance.contracts?.getMergedPool(addr))!;
});

afterAll(async () => {
  await revert();
});

describe("getUserPoolNfts", () => {
  it("test", async () => {
    const result = await ensInstance.mergedPool.getPoolInfo({
      mergedPool,
      poolId: 0,
    });
    expect(result).toBeTruthy();
  });
});
