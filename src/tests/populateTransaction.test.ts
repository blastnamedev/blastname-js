import { ENS } from "..";
import setup from "./setup";
import { tldName } from "../constants";

let ensInstance: ENS;
let revert: Awaited<ReturnType<typeof setup>>["revert"];

beforeAll(async () => {
  ({ ensInstance, revert } = await setup());
});

afterAll(async () => {
  await revert();
});

jest.setTimeout(20000);

describe("populateTransaction", () => {
  beforeEach(async () => {
    await revert();
  });
  it("should return a transaction successfully", async () => {
    const tx = await ensInstance.setName(`fleek.${tldName}`);
    expect(tx).toBeTruthy();
    if (tx) {
      await tx.wait();
      expect(tx.hash).toBeTruthy();
    }
  });
  it("should return a populated transaction successfully", async () => {
    const tx = await ensInstance.setName.populateTransaction(
      `fleek.${tldName}`
    );
    expect(tx).toBeTruthy();
    if (tx) {
      expect(tx).not.toHaveProperty("hash");
    }
  });
});
