import { ethers } from "ethers";
import { ENS } from "../index";
import setup from "../tests/setup";
import { tldName } from "../constants";

let ensInstance: ENS;

beforeAll(async () => {
  ({ ensInstance } = await setup());
});

describe("getDecryptedName", () => {
  it("should decrypt a wrapped name with on-chain data", async () => {
    const result = await ensInstance.getDecryptedName(
      `[9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658].wrappedwithsubnames.${tldName}`
    );
    expect(result).toBeDefined();
    expect(result).toBe(`test.wrappedwithsubnames.${tldName}`);
  });
  it("should decrypt a name via namehash lookup", async () => {
    const result = await ensInstance.getDecryptedName(
      `[f81b517a242b218999ec8eec0ea6e2ddbef2a367a14e93f4a32a39e260f686ad].${tldName}`
    );
    expect(result).toBeDefined();
    expect(result).toBe(`test123.${tldName}`);
  });
  it("should decrypt a name via labelhash lookup", async () => {
    const labelHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("abc123")
    );
    const result = await ensInstance.getDecryptedName(
      `[${labelHash.slice(2)}].withunknownsubnames.${tldName}`
    );
    expect(result).toBeDefined();
    expect(result).toBe(`abc123.withunknownsubnames.${tldName}`);
  });
  it("should partially decrypt a name when allowIncomplete is true", async () => {
    const labelHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("withunknownsubnames")
    );
    const labelHashHex = labelHash.slice(2);
    const result = await ensInstance.getDecryptedName(
      `[7bffb6e3ebf801bbc438fea5c11d957ba49978bdc8d52b71cba974139d22edea].[${labelHashHex}].${tldName}`,
      true
    );
    expect(result).toBeDefined();
    expect(result).toBe(
      `[7bffb6e3ebf801bbc438fea5c11d957ba49978bdc8d52b71cba974139d22edea].withunknownsubnames.${tldName}`
    );
  });
  it("should not partially decrypt a name when allowIncomplete is false", async () => {
    const result = await ensInstance.getDecryptedName(
      `[7bffb6e3ebf801bbc438fea5c11d957ba49978bdc8d52b71cba974139d22edea].[6c14e1739568670447af1d5af8a571008f7a582068af18bcd7ac2dbc13bb37c1].${tldName}`,
      false
    );
    expect(result).toBeUndefined();
  });
});
