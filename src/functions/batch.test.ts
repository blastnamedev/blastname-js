import { ENS } from "..";
import setup from "../tests/setup";
import { ENSJSError } from "../utils/errors";
import { tldName, ignoreLegacyTest } from "../constants";

let ensInstance: ENS;

beforeAll(async () => {
  ({ ensInstance } = await setup());
});

describe("batch", () => {
  it("should batch calls together", async () => {
    const result = await ensInstance.batch(
      ensInstance.getText.batch(`withprofile.${tldName}`, "description"),
      ensInstance.getAddr.batch(`withprofile.${tldName}`),
      ensInstance.getName.batch("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")
    );
    expect(result).toBeTruthy();
    if (result) {
      expect(result[0]).toBe("Hello2");
      expect(result[1]).toBe("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
      expect(result[2]).toMatchObject({
        name: `withprofile.${tldName}`,
        match: true,
      });
    }
  });
  it("should batch a single call", async () => {
    const result = await ensInstance.batch(
      ensInstance.getText.batch(`withprofile.${tldName}`, "description")
    );
    expect(result).toBeTruthy();
    if (result) {
      expect(result[0]).toBe("Hello2");
    }
  });

  describe("errors", () => {
    beforeAll(() => {
      process.env.NEXT_PUBLIC_ENSJS_DEBUG = "on";
      localStorage.setItem("ensjs-debug", "ENSJSSubgraphError");
    });

    afterAll(() => {
      process.env.NEXT_PUBLIC_ENSJS_DEBUG = "";
      localStorage.removeItem("ensjs-debug");
    });

    it("should throw a single error if there is an indexing error", async () => {
      if (ignoreLegacyTest) return;
      try {
        await ensInstance.batch(
          ensInstance.getText.batch(`withprofile.${tldName}`, "description"),
          ensInstance.getOwner.batch(`expired.${tldName}`, {
            skipGraph: false,
          }),
          ensInstance.getName.batch(
            "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
          )
        );
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(ENSJSError);
        const error = e as ENSJSError<any[]>;
        expect(error.name).toBe("ENSJSSubgraphError");
        const result = error.data as any[];
        expect(result[0]).toBe("Hello2");
        expect(result[1]).toEqual({
          expired: true,
          owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          ownershipLevel: "registrar",
        });
        expect(result[2]).toMatchObject({
          name: `withprofile.${tldName}`,
          match: true,
        });
      }
    });
  });
});
