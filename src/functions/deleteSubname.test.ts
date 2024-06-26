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

beforeEach(async () => {
  await revert();
});

afterAll(async () => {
  await revert();
});

describe("deleteSubname", () => {
  beforeEach(async () => {
    await revert();
  });
  it("should allow deleting a subname on the registry by parent owner", async () => {
    const registry = await ensInstance.contracts!.getRegistry()!;
    const parentOwner = await registry.owner(
      namehash(`withsubnames.${tldName}`)
    );

    const tx = await ensInstance.deleteSubname(`test.withsubnames.${tldName}`, {
      contract: "registry",
      addressOrIndex: parentOwner,
    });
    expect(tx).toBeTruthy();
    await tx.wait();

    const result = await registry.owner(
      namehash(`test.withsubnames.${tldName}`)
    );
    expect(result).toBe("0x0000000000000000000000000000000000000000");
  });

  it("should allow deleting a subname on the nameWrapper by parent owner", async () => {
    const nameWrapper = await ensInstance.contracts!.getNameWrapper()!;

    const parentOwner = await nameWrapper.ownerOf(
      namehash(`wrappedwithsubnames.${tldName}`)
    );

    const tx = await ensInstance.deleteSubname(
      `test.wrappedwithsubnames.${tldName}`,
      {
        contract: "nameWrapper",
        method: "setSubnodeOwner",
        addressOrIndex: parentOwner,
      }
    );
    expect(tx).toBeTruthy();
    await tx.wait();

    const result = await nameWrapper.ownerOf(
      namehash(`test.wrappedwithsubnames.${tldName}`)
    );
    expect(result).toBe("0x0000000000000000000000000000000000000000");
  });

  it("should allow deleting a subname on the nameWrapper by name owner", async () => {
    const nameWrapper = await ensInstance.contracts!.getNameWrapper()!;

    const nameOwner = await nameWrapper.ownerOf(
      namehash(`addr.wrappedwithsubnames.${tldName}`)
    );

    await ensInstance.deleteSubname(`addr.wrappedwithsubnames.${tldName}`, {
      contract: "nameWrapper",
      method: "setRecord",
      addressOrIndex: nameOwner,
    });

    const result = await nameWrapper.ownerOf(
      namehash(`addr.wrappedwithsubnames.${tldName}`)
    );
    expect(result).toBe("0x0000000000000000000000000000000000000000");
  });

  it("should allow deleting a subname on the nameWrapper with PCC burned by name owner", async () => {
    const nameWrapper = await ensInstance.contracts!.getNameWrapper()!;

    const parentOwner = await nameWrapper.ownerOf(
      namehash(`wrappedwithsubnames.${tldName}`)
    );

    const tx0 = await ensInstance.setFuses(`wrappedwithsubnames.${tldName}`, {
      named: ["CANNOT_UNWRAP"],
      addressOrIndex: parentOwner,
    });
    expect(tx0).toBeTruthy();
    await tx0.wait();

    const tx1 = await ensInstance.setChildFuses(
      `xyz.wrappedwithsubnames.${tldName}`,
      {
        fuses: {
          parent: {
            named: ["PARENT_CANNOT_CONTROL"],
          },
        },
        addressOrIndex: parentOwner,
      }
    );
    expect(tx1).toBeTruthy();
    await tx1.wait();

    const nameOwner = await nameWrapper.ownerOf(
      namehash(`xyz.wrappedwithsubnames.${tldName}`)
    );

    expect(parentOwner === nameOwner).toBe(false);

    const tx = await ensInstance.deleteSubname(
      `xyz.wrappedwithsubnames.${tldName}`,
      {
        contract: "nameWrapper",
        method: "setRecord",
        addressOrIndex: nameOwner,
      }
    );
    expect(tx).toBeTruthy();
    await tx.wait();

    const result = await nameWrapper.ownerOf(
      namehash(`xyz.wrappedwithsubnames.${tldName}`)
    );
    expect(result).toBe("0x0000000000000000000000000000000000000000");
  });

  it("should NOT allow deleting a subname on the nameWrapper with PCC burned by parent owner", async () => {
    const nameWrapper = await ensInstance.contracts!.getNameWrapper()!;

    const parentOwner = await nameWrapper.ownerOf(
      namehash(`wrappedwithsubnames.${tldName}`)
    );

    const tx0 = await ensInstance.setFuses(`wrappedwithsubnames.${tldName}`, {
      named: ["CANNOT_UNWRAP"],
      addressOrIndex: parentOwner,
    });
    expect(tx0).toBeTruthy();
    await tx0.wait();

    const tx1 = await ensInstance.setChildFuses(
      `legacy.wrappedwithsubnames.${tldName}`,
      {
        fuses: {
          parent: {
            named: ["PARENT_CANNOT_CONTROL"],
          },
        },
        addressOrIndex: parentOwner,
      }
    );
    expect(tx1).toBeTruthy();
    await tx1.wait();

    const checkOwner = await nameWrapper.ownerOf(
      namehash(`legacy.wrappedwithsubnames.${tldName}`)
    );
    expect(checkOwner).toBe(accounts[2]);

    await expect(
      ensInstance.deleteSubname(`legacy.wrappedwithsubnames.${tldName}`, {
        contract: "nameWrapper",
        method: "setSubnodeOwner",
        addressOrIndex: parentOwner,
      })
    ).rejects.toThrow();

    const result = await nameWrapper.ownerOf(
      namehash(`legacy.wrappedwithsubnames.${tldName}`)
    );
    expect(result).toBe(accounts[2]);
  });

  it("should not allow deleting 1LD", async () => {
    await expect(
      ensInstance.deleteSubname(tldName, {
        contract: "nameWrapper",
        method: "setRecord",
        addressOrIndex: 1,
      })
    ).rejects.toThrow();
  });

  it("should not allow deleting 2LD", async () => {
    await expect(
      ensInstance.deleteSubname(`test123.${tldName}`, {
        contract: "registry",
        addressOrIndex: 1,
      })
    ).rejects.toThrow();
  });
});
