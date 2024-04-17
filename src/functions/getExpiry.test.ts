import { ENS } from "..";
import setup from "../tests/setup";
import { tldName } from "../constants";

let ensInstance: ENS;
let revert: Awaited<ReturnType<typeof setup>>["revert"];

beforeAll(async () => {
  ({ ensInstance, revert } = await setup());
});

afterAll(async () => {
  await revert();
});

describe("getExpiry", () => {
  it("should get the expiry for a .eth name with no other args", async () => {
    const result = await ensInstance.getExpiry(`withprofile.${tldName}`);
    expect(result).toBeTruthy();
    if (result) {
      const { expiry, gracePeriod } = result;
      expect(expiry).toBeInstanceOf(Date);
      expect(gracePeriod).toBe(7776000000);
    }
  });
  it("should get the expiry for a wrapped name", async () => {
    const result = await ensInstance.getExpiry(`wrapped.${tldName}`, {
      contract: "nameWrapper",
    });

    expect(result).toBeTruthy();
    if (result) {
      const { expiry, gracePeriod } = result;
      expect(expiry).toBeInstanceOf(Date);
      expect(gracePeriod).toBe(null);
    }
  });
  it("should throw an error for a non .eth name if not wrapped", async () => {
    try {
      await ensInstance.getExpiry(`sub.withprofile.${tldName}`);
      expect(false).toBeTruthy();
    } catch {
      expect(true).toBeTruthy();
    }
  });
  it("should throw an error for a non .eth name if registrar is specified", async () => {
    try {
      await ensInstance.getExpiry(`sub.withprofile.${tldName}`, {
        contract: "registrar",
      });
      expect(false).toBeTruthy();
    } catch {
      expect(true).toBeTruthy();
    }
  });
});
