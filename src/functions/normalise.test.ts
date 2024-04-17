import { ethers } from "ethers";
import { namehash } from "../utils/normalise";
import { tldName } from "../constants";

describe("normalise", () => {
  it("should namehash an empty string", () => {
    const hash = namehash("");
    expect(hash).toEqual(ethers.utils.namehash(""));
  });
  it("should namehash a TLD", () => {
    const hash = namehash(tldName);
    expect(hash).toEqual(ethers.utils.namehash(tldName));
  });
  it("should namehash a 2LD", () => {
    const hash = namehash(`foo.${tldName}`);
    expect(hash).toEqual(ethers.utils.namehash(`foo.${tldName}`));
  });
});
