/* eslint-disable @typescript-eslint/naming-convention */
import { parseInput, validateName } from "./validation";
import { tldName } from "../constants";

declare namespace localStorage {
  const getItem: jest.MockedFn<Storage["getItem"]>;
  const setItem: jest.MockedFn<Storage["setItem"]>;
  const removeItem: jest.MockedFn<Storage["removeItem"]>;
}

const labelsMock = {
  "0x68371d7e884c168ae2022c82bd837d51837718a7f7dfb7aa3f753074a35e1d87":
    "something",
  "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0": tldName,
};

const labelsMockJSON = JSON.stringify(labelsMock);

describe("validateName()", () => {
  beforeEach(() => {
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.getItem.mockImplementation(() => labelsMockJSON);
  });
  it("should throw if the name has an empty label", () => {
    expect(() => validateName("foo..bar")).toThrow(
      "Name cannot have empty labels"
    );
    expect(() => validateName(".foo.bar")).toThrow(
      "Name cannot have empty labels"
    );
    expect(() => validateName("foo.bar.")).toThrow(
      "Name cannot have empty labels"
    );
  });
  it("should allow names with [root] as a label", () => {
    expect(validateName("[root]")).toEqual("[root]");
  });
  it("should throw if the name has [root] as a label and is not the only label", () => {
    expect(() => validateName("foo.[root].bar")).toThrow(
      "Root label must be the only label"
    );
  });

  it("should get the decoded label hash from local storage", () => {
    expect(
      validateName(
        `thing.[68371d7e884c168ae2022c82bd837d51837718a7f7dfb7aa3f753074a35e1d87].${tldName}`
      )
    ).toEqual(`thing.something.${tldName}`);
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it("should fallback to encoded label hash if the decoded label hash is not in local storage", () => {
    expect(
      validateName(
        `something.[8c6c947d200f53fa1127b152f95b118f9e1d0eeb06fc678b6fc8a6d5c6fc5e17].${tldName}`
      )
    ).toEqual(
      `something.[8c6c947d200f53fa1127b152f95b118f9e1d0eeb06fc678b6fc8a6d5c6fc5e17].${tldName}`
    );
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(
      validateName(
        "[8c6c947d200f53fa1127b152f95b118f9e1d0eeb06fc678b6fc8a6d5c6fc5e17]"
      )
    ).toEqual(
      "[8c6c947d200f53fa1127b152f95b118f9e1d0eeb06fc678b6fc8a6d5c6fc5e17]"
    );
  });
  it("should normalise the name", () => {
    expect(validateName(`aAaaA.${tldName}`)).toEqual(`aaaaa.${tldName}`);
  });
  it("should save the normalised name to local storage", () => {
    validateName(`swAgCity.${tldName}`);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "ensjs:labels",
      JSON.stringify({
        ...labelsMock,
        "0xee3bbc5c1db3f1dbd5ec4cdfd627fb76aba6215d814354b6c0f8d74253adf1a8":
          "swagcity",
      })
    );
  });
  it("should return the normalised name", () => {
    expect(validateName(`swAgCity.${tldName}`)).toEqual(`swagcity.${tldName}`);
  });
});

describe("parseInput()", () => {
  it("should parse the input", () => {
    expect(parseInput(`bar.${tldName}`)).toEqual({
      type: "name",
      normalised: `bar.${tldName}`,
      isShort: false,
      isValid: true,
      is2LD: true,
      isETH: true,
      labelDataArray: expect.any(Array),
    });
  });
  it("should return a normalised name", () => {
    expect(parseInput(`bAr.${tldName}`).normalised).toEqual(`bar.${tldName}`);
  });
  it("should parse the input if it is invalid", () => {
    expect(parseInput(`bar..${tldName}`)).toEqual({
      type: "name",
      normalised: undefined,
      isShort: false,
      isValid: false,
      is2LD: false,
      isETH: true,
      labelDataArray: expect.any(Array),
    });
  });
  it("should return type as label if input is a label", () => {
    expect(parseInput("bar").type).toEqual("label");
  });
  describe("should return correct value", () => {
    describe("isShort", () => {
      it("should return true if input is label and less than 3 characters", () => {
        expect(parseInput("ba").isShort).toEqual(false);
      });
      it("should return true if input is less than 3 char emoji", () => {
        expect(parseInput("🇺🇸").isShort).toEqual(false);
      });
      it("should return false if input is 3 char emoji", () => {
        expect(parseInput("🏳️‍🌈").isShort).toEqual(false);
      });
      it("should return false if input is label and 3 characters", () => {
        expect(parseInput("bar").isShort).toEqual(false);
      });
      it("should return true if input is 2LD .eth name and label is less than 3 characters", () => {
        expect(parseInput(`ba.${tldName}`).isShort).toEqual(false);
      });
      it("should return false if input is 2LD .eth name and label is 3 characters", () => {
        expect(parseInput(`bar.${tldName}`).isShort).toEqual(false);
      });
      it("should return false if input is 2LD other name and label is less than 3 characters", () => {
        expect(parseInput("ba.com").isShort).toEqual(false);
      });
      it("should return false if input is 3LD .eth name and label is less than 3 characters", () => {
        expect(parseInput(`ba.bar.${tldName}`).isShort).toEqual(false);
      });
    });
    describe("is2LD", () => {
      it("should return true if input is 2LD name", () => {
        expect(parseInput(`bar.${tldName}`).is2LD).toEqual(true);
      });
      it("should return false if input is 3LD name", () => {
        expect(parseInput(`bar.foo.${tldName}`).is2LD).toEqual(false);
      });
      it("should return false if input is label", () => {
        expect(parseInput("bar").is2LD).toEqual(false);
      });
    });
    describe("isETH", () => {
      it("should return true if input is .eth name", () => {
        expect(parseInput(`bar.${tldName}`).isETH).toEqual(true);
      });
      it("should return false if input is other name", () => {
        expect(parseInput("bar.com").isETH).toEqual(false);
      });
    });
  });
});
