import { ethers } from "ethers";
import { ENS } from "..";
import setup from "../tests/setup";
import { namehash } from "../utils/normalise";
import { tldName } from "../constants";

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

beforeEach(async () => {
  await revert();
});

describe("transferSubname", () => {
  it("should allow transferring a subname on the registry", async () => {
    const tx = await ensInstance.transferSubname(
      `test.withsubnames.${tldName}`,
      {
        contract: "registry",
        owner: accounts[1],
        addressOrIndex: 1,
      }
    );
    expect(tx).toBeTruthy();
    await tx.wait();

    const registry = await ensInstance.contracts!.getRegistry()!;
    const result = await registry.owner(
      namehash(`test.withsubnames.${tldName}`)
    );
    expect(result).toBe(accounts[1]);
  });

  describe("wrapped name with PCC NOT burned", () => {
    it("should NOT allow transferring a subname by name owner", async () => {
      const nameWrapper = await ensInstance.contracts!.getNameWrapper()!;
      await expect(
        ensInstance.transferSubname(`test.wrappedwithsubnames.${tldName}`, {
          contract: "nameWrapper",
          owner: accounts[1],
          addressOrIndex: 2,
        })
      ).rejects.toThrow();

      const result = await nameWrapper.ownerOf(
        namehash(`test.wrappedwithsubnames.${tldName}`)
      );
      expect(result).toBe(accounts[2]);
    });

    it("should allow transferring a subname by parent owner", async () => {
      const tx = await ensInstance.transferSubname(
        `test.wrappedwithsubnames.${tldName}`,
        {
          contract: "nameWrapper",
          owner: accounts[1],
          addressOrIndex: 1,
        }
      );
      expect(tx).toBeTruthy();
      await tx.wait();

      const nameWrapper = await ensInstance.contracts!.getNameWrapper()!;
      const result = await nameWrapper.ownerOf(
        namehash(`test.wrappedwithsubnames.${tldName}`)
      );
      expect(result).toBe(accounts[1]);
    });
  });

  describe("wrapped name with PCC burned", () => {
    beforeEach(async () => {
      const tx0 = await ensInstance.setFuses(`wrappedwithsubnames.${tldName}`, {
        named: ["CANNOT_UNWRAP"],
        addressOrIndex: 1,
      });
      expect(tx0).toBeTruthy();
      await tx0.wait();
    });

    it("should NOT allow transferring a subname by name owner", async () => {
      const nameWrapper = await ensInstance.contracts!.getNameWrapper()!;

      const tx1 = await ensInstance.setChildFuses(
        `test.wrappedwithsubnames.${tldName}`,
        {
          fuses: {
            parent: {
              named: ["PARENT_CANNOT_CONTROL"],
            },
          },
          addressOrIndex: 1,
        }
      );
      expect(tx1).toBeTruthy();
      await tx1.wait();

      const checkOwner = await nameWrapper.ownerOf(
        namehash(`test.wrappedwithsubnames.${tldName}`)
      );
      expect(checkOwner).toBe(accounts[2]);

      await expect(
        ensInstance.transferSubname(`test.wrappedwithsubnames.${tldName}`, {
          contract: "nameWrapper",
          owner: accounts[1],
          addressOrIndex: 2,
        })
      ).rejects.toThrow();
      const result = await nameWrapper.ownerOf(
        namehash(`test.wrappedwithsubnames.${tldName}`)
      );
      expect(result).toBe(accounts[2]);
    });

    it("should NOT allow transferring a subname by parent owner", async () => {
      const nameWrapper = await ensInstance.contracts!.getNameWrapper()!;

      const tx1 = await ensInstance.setChildFuses(
        `test.wrappedwithsubnames.${tldName}`,
        {
          fuses: {
            parent: {
              named: ["PARENT_CANNOT_CONTROL"],
            },
          },
          addressOrIndex: 1,
        }
      );
      expect(tx1).toBeTruthy();
      await tx1.wait();

      const checkOwner = await nameWrapper.ownerOf(
        namehash(`test.wrappedwithsubnames.${tldName}`)
      );
      expect(checkOwner).toBe(accounts[2]);

      await expect(
        ensInstance.transferSubname(`test.wrappedwithsubnames.${tldName}`, {
          contract: "nameWrapper",
          owner: accounts[1],
          addressOrIndex: 1,
        })
      ).rejects.toThrow();

      const result = await nameWrapper.ownerOf(
        namehash(`test.wrappedwithsubnames.${tldName}`)
      );
      expect(result).toBe(accounts[2]);
    });
  });
});
