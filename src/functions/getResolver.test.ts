import { ENS } from "..";
import setup, { deploymentAddresses } from "../tests/setup";
import { tldName } from "../constants";

let ensInstance: ENS;

beforeAll(async () => {
  ({ ensInstance } = await setup());
});

describe("getResolver", () => {
  it("should find the resolver for a name with a resolver", async () => {
    const result = await ensInstance.getResolver(`withprofile.${tldName}`);
    expect(result).toBe(deploymentAddresses.PublicResolver);
  });
});
