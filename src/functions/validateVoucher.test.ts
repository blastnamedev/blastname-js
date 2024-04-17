import { ethers } from "ethers";
import { ENS } from "..";
import setup from "../tests/setup";

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

describe("validateVoucher", () => {
  it("should validate valid voucher", async () => {
    const vouchers = await ensInstance.getVouchers({ address: accounts[1] });

    const result = await ensInstance.validateVoucher({
      userAddress: accounts[1],
      voucherId: vouchers[0].id,
    });

    expect(result).toBeTruthy();
    if (result) {
      expect(result.success).toBeTruthy();
      expect(result.message).toBe("");
    }
  });

  it("should validate invalid voucher", async () => {
    const voucher = await ensInstance.contracts?.getVoucher();
    const vouchers = await ensInstance.getVouchers({ address: accounts[1] });

    await voucher
      ?.connect(provider.getSigner(0))
      .revokeVoucher(accounts[1], vouchers[0].id);

    const result = await ensInstance.validateVoucher({
      userAddress: accounts[1],
      voucherId: vouchers[0].id,
    });

    expect(result).toBeTruthy();
    if (result) {
      expect(result.success).toBeFalsy();
      expect(result.message).toBe("Voucher revoked");
    }
  });
});
