/* eslint-disable no-await-in-loop */
import { ethers } from "ethers";
import { ENS } from "..";
import setup from "../tests/setup";

let ensInstance: ENS;
let provider: ethers.providers.JsonRpcProvider;
let accounts: string[];

const testProperties = (obj: object, ...properties: string[]) =>
  properties.map((property) => expect(obj).toHaveProperty(property));

beforeAll(async () => {
  ({ ensInstance, provider } = await setup());
  accounts = await provider.listAccounts();
});

describe("getVouchers", () => {
  it("should get the vouchers for an address", async () => {
    const resultOwner = await ensInstance.getVouchers({
      address: accounts[1],
    });
    const resultOwner2 = await ensInstance.getVouchers({
      address: accounts[2],
    });
    expect(resultOwner).toBeTruthy();
    testProperties(
      resultOwner[0],
      "id",
      "discountPercentage",
      "maxDiscountAmount",
      "expiredAt"
    );
    expect(resultOwner.length).toEqual(3);
    expect(resultOwner2.length).toEqual(1);
  });
});
