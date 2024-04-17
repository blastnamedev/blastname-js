import { ENS } from "..";
import setup from "../tests/setup";
import { ENSJSError } from "../utils/errors";
import { decodeFuses } from "../utils/fuses";
import { tldName } from "../constants";

type Result = Awaited<ReturnType<ENS["getSubnames"]>>;

let ensInstance: ENS;

beforeAll(async () => {
  ({ ensInstance } = await setup());
});

const testProperties = (obj: object, ...properties: string[]) =>
  properties.map((property) => expect(obj).toHaveProperty(property));

describe("getSubnames", () => {
  it("should get the subnames for a name ordered by createdAt in desc order", async () => {
    const result = await ensInstance.getSubnames({
      name: `withsubnames.${tldName}`,
      pageSize: 10,
      orderBy: "createdAt",
      orderDirection: "desc",
    });
    expect(result).toBeTruthy();
    expect(result.subnames.length).toBe(4);
    expect(result.subnameCount).toBe(4);
    expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
    expect(result.subnames[1].name).toEqual(`xyz.withsubnames.${tldName}`);
    expect(result.subnames[2].name).toEqual(`legacy.withsubnames.${tldName}`);
    expect(result.subnames[3].name).toEqual(`test.withsubnames.${tldName}`);
    expect(
      result.subnames.every((subname, i, arr) => {
        if (arr[i + 1]) {
          return (subname as any).createdAt >= (arr[i + 1] as any).createdAt;
        }
        return true;
      })
    ).toBe(true);
    testProperties(
      result.subnames[0],
      "id",
      "labelName",
      "labelhash",
      "name",
      "isMigrated",
      "owner",
      "truncatedName"
    );
  });

  it("should get the subnames for a name ordered by createdAt in asc order", async () => {
    const result = await ensInstance.getSubnames({
      name: `withsubnames.${tldName}`,
      pageSize: 10,
      orderBy: "createdAt",
      orderDirection: "asc",
    });
    expect(result).toBeTruthy();
    expect(result.subnames.length).toBe(4);
    expect(result.subnameCount).toBe(4);
    expect(result.subnames[0].name).toEqual(`test.withsubnames.${tldName}`);
    expect(result.subnames[1].name).toEqual(`legacy.withsubnames.${tldName}`);
    expect(result.subnames[2].name).toEqual(`xyz.withsubnames.${tldName}`);
    expect(result.subnames[3].name).toEqual(`addr.withsubnames.${tldName}`);
    expect(
      result.subnames.every((subname, i, arr) => {
        if (arr[i + 1]) {
          return (subname as any).createdAt <= (arr[i + 1] as any).createdAt;
        }
        return true;
      })
    ).toBe(true);
    testProperties(
      result.subnames[0],
      "id",
      "labelName",
      "labelhash",
      "name",
      "isMigrated",
      "owner",
      "truncatedName"
    );
  });

  it("should get the subnames for a name by labelName in desc order", async () => {
    const result = await ensInstance.getSubnames({
      name: `withsubnames.${tldName}`,
      pageSize: 10,
      orderBy: "labelName",
      orderDirection: "desc",
    });
    expect(result).toBeTruthy();
    expect(result.subnames.length).toBe(4);
    expect(result.subnameCount).toBe(4);
    expect(result.subnames[0].name).toEqual(`xyz.withsubnames.${tldName}`);
    expect(result.subnames[1].name).toEqual(`test.withsubnames.${tldName}`);
    expect(result.subnames[2].name).toEqual(`legacy.withsubnames.${tldName}`);
    expect(result.subnames[3].name).toEqual(`addr.withsubnames.${tldName}`);
    testProperties(
      result.subnames[0],
      "id",
      "labelName",
      "labelhash",
      "name",
      "isMigrated",
      "owner",
      "truncatedName"
    );
  });

  it("should get the subnames for a name by labelName in asc order", async () => {
    const result = await ensInstance.getSubnames({
      name: `withsubnames.${tldName}`,
      pageSize: 10,
      orderBy: "labelName",
      orderDirection: "asc",
    });
    expect(result).toBeTruthy();
    expect(result.subnames.length).toBe(4);
    expect(result.subnameCount).toBe(4);
    expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
    expect(result.subnames[1].name).toEqual(`legacy.withsubnames.${tldName}`);
    expect(result.subnames[2].name).toEqual(`test.withsubnames.${tldName}`);
    expect(result.subnames[3].name).toEqual(`xyz.withsubnames.${tldName}`);
    testProperties(
      result.subnames[0],
      "id",
      "labelName",
      "labelhash",
      "name",
      "isMigrated",
      "owner",
      "truncatedName"
    );
  });
  describe("wrapped subnames", () => {
    it("should return fuses", async () => {
      const result = await ensInstance.getSubnames({
        name: `wrappedwithsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "createdAt",
        orderDirection: "desc",
      });

      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].fuses).toBeDefined();
    });
    it("should return expiry as undefined if 0", async () => {
      const result = await ensInstance.getSubnames({
        name: `wrappedwithexpiringsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "createdAt",
        orderDirection: "desc",
      });

      expect(result).toBeTruthy();
      expect(result.subnames[1].expiryDate).toBeUndefined();
    });
    it("should return expiry", async () => {
      const result = await ensInstance.getSubnames({
        name: `wrappedwithexpiringsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "createdAt",
        orderDirection: "desc",
      });

      expect(result).toBeTruthy();
      expect(result.subnames[2].expiryDate).toBeInstanceOf(Date);
    });
    it("should return owner as undefined, fuses as 0, and pccExpired as true if pcc expired", async () => {
      const result = await ensInstance.getSubnames({
        name: `wrappedwithexpiringsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "createdAt",
        orderDirection: "desc",
      });

      expect(result).toBeTruthy();
      expect(result.subnames[0].owner).toBeUndefined();
      expect(result.subnames[0].fuses).toStrictEqual(decodeFuses(0));
      expect(result.subnames[0].pccExpired).toBe(true);
    });
  });

  describe("with pagination", () => {
    it("should get paginated subnames for a name ordered by createdAt in desc order", async () => {
      const result = await ensInstance.getSubnames({
        name: `withsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "createdAt",
        orderDirection: "desc",
      });
      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
      expect(result.subnames[1].name).toEqual(`xyz.withsubnames.${tldName}`);
      expect(result.subnames[2].name).toEqual(`legacy.withsubnames.${tldName}`);
      expect(result.subnames[3].name).toEqual(`test.withsubnames.${tldName}`);
      expect(
        result.subnames.every((subname, i, arr) => {
          if (arr[i + 1]) {
            return (subname as any).createdAt >= (arr[i + 1] as any).createdAt;
          }
          return true;
        })
      ).toBe(true);
      testProperties(
        result.subnames[0],
        "id",
        "labelName",
        "labelhash",
        "name",
        "isMigrated",
        "owner",
        "truncatedName"
      );
    });

    it("should get the subnames for a name ordered by createdAt in asc order", async () => {
      const result = await ensInstance.getSubnames({
        name: `withsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "createdAt",
        orderDirection: "asc",
      });
      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].name).toEqual(`test.withsubnames.${tldName}`);
      expect(result.subnames[1].name).toEqual(`legacy.withsubnames.${tldName}`);
      expect(result.subnames[2].name).toEqual(`xyz.withsubnames.${tldName}`);
      expect(result.subnames[3].name).toEqual(`addr.withsubnames.${tldName}`);
      expect(
        result.subnames.every((subname, i, arr) => {
          if (arr[i + 1]) {
            return (subname as any).createdAt <= (arr[i + 1] as any).createdAt;
          }
          return true;
        })
      ).toBe(true);
      testProperties(
        result.subnames[0],
        "id",
        "labelName",
        "labelhash",
        "name",
        "isMigrated",
        "owner",
        "truncatedName"
      );
    });

    it("should get the subnames for a name by labelName in desc order", async () => {
      const result = await ensInstance.getSubnames({
        name: `withsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "labelName",
        orderDirection: "desc",
      });
      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].name).toEqual(`xyz.withsubnames.${tldName}`);
      expect(result.subnames[1].name).toEqual(`test.withsubnames.${tldName}`);
      expect(result.subnames[2].name).toEqual(`legacy.withsubnames.${tldName}`);
      expect(result.subnames[3].name).toEqual(`addr.withsubnames.${tldName}`);
      testProperties(
        result.subnames[0],
        "id",
        "labelName",
        "labelhash",
        "name",
        "isMigrated",
        "owner",
        "truncatedName"
      );
    });

    it("should get the subnames for a name by labelName in asc order", async () => {
      const result = await ensInstance.getSubnames({
        name: `withsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "labelName",
        orderDirection: "asc",
      });
      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
      expect(result.subnames[1].name).toEqual(`legacy.withsubnames.${tldName}`);
      expect(result.subnames[2].name).toEqual(`test.withsubnames.${tldName}`);
      expect(result.subnames[3].name).toEqual(`xyz.withsubnames.${tldName}`);
      testProperties(
        result.subnames[0],
        "id",
        "labelName",
        "labelhash",
        "name",
        "isMigrated",
        "owner",
        "truncatedName"
      );
    });

    describe("with pagination", () => {
      it("should get paginated subnames for a name ordered by createdAt in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "desc",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
        expect(result.subnames[1].name).toEqual(`xyz.withsubnames.${tldName}`);
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt >= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "desc",
          lastSubnames: result.subnames,
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(2);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        expect(result2.subnames[1].name).toEqual(
          `test.withsubnames.${tldName}`
        );
        expect(
          result2.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt >= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name ordered by createdAt in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "asc",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(`test.withsubnames.${tldName}`);
        expect(result.subnames[1].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt <= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          page: 0,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "asc",
          lastSubnames: result.subnames,
        });

        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(2);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(`xyz.withsubnames.${tldName}`);
        expect(result2.subnames[1].name).toEqual(
          `addr.withsubnames.${tldName}`
        );
        expect(
          result2.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt <= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name by labelName in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "labelName",
          orderDirection: "desc",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(`xyz.withsubnames.${tldName}`);
        expect(result.subnames[1].name).toEqual(`test.withsubnames.${tldName}`);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "labelName",
          orderDirection: "desc",
          lastSubnames: result.subnames,
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(2);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        expect(result2.subnames[1].name).toEqual(
          `addr.withsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name by labelName in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "labelName",
          orderDirection: "asc",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
        expect(result.subnames[1].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );

        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );

        const result2 = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "labelName",
          orderDirection: "asc",
          lastSubnames: result.subnames,
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(2);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `test.withsubnames.${tldName}`
        );
        expect(result2.subnames[1].name).toEqual(`xyz.withsubnames.${tldName}`);

        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });
    });

    describe("With search query", () => {
      it("should get the searched subnames for a name ordered by createdAt in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 10,
          orderBy: "createdAt",
          orderDirection: "desc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
        expect(result.subnames[1].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt >= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get the searched subnames for a name ordered by createdAt in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          page: 0,
          pageSize: 10,
          orderBy: "createdAt",
          orderDirection: "asc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(`addr.withsubnames.${tldName}`);
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt <= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get the subnames for a name by labelName in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 10,
          orderBy: "labelName",
          orderDirection: "desc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(`addr.withsubnames.${tldName}`);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get the subnames for a name by labelName in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 10,
          orderBy: "labelName",
          orderDirection: "asc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
        expect(result.subnames[1].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });
    });

    describe("with search query and pagination", () => {
      it("should get paginated subnames for a name ordered by createdAt in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "createdAt",
          orderDirection: "desc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(1);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "createdAt",
          orderDirection: "desc",
          lastSubnames: result.subnames,
          search: "a",
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(1);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name ordered by createdAt in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "createdAt",
          orderDirection: "asc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(1);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt <= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          page: 0,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "asc",
          lastSubnames: result.subnames,
          search: "a",
        });

        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(1);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `addr.withsubnames.${tldName}`
        );

        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name by labelName in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "labelName",
          orderDirection: "desc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(1);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "labelName",
          orderDirection: "desc",
          lastSubnames: result.subnames,
          search: "a",
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(1);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `addr.withsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name by labelName in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "labelName",
          orderDirection: "asc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(1);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(`addr.withsubnames.${tldName}`);

        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );

        const result2 = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "labelName",
          orderDirection: "asc",
          lastSubnames: result.subnames,
          search: "a",
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(1);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `legacy.withsubnames.${tldName}`
        );

        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });
    });
  });

  describe("wrapped", () => {
    it("should get the subnames for a name ordered by createdAt in desc order", async () => {
      const result = await ensInstance.getSubnames({
        name: `wrappedwithsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "createdAt",
        orderDirection: "desc",
      });
      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].name).toEqual(
        `addr.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[1].name).toEqual(
        `xyz.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[2].name).toEqual(
        `legacy.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[3].name).toEqual(
        `test.wrappedwithsubnames.${tldName}`
      );
      expect(
        result.subnames.every((subname, i, arr) => {
          if (arr[i + 1]) {
            return (subname as any).createdAt >= (arr[i + 1] as any).createdAt;
          }
          return true;
        })
      ).toBe(true);
      testProperties(
        result.subnames[0],
        "id",
        "labelName",
        "labelhash",
        "name",
        "isMigrated",
        "owner",
        "truncatedName"
      );
    });

    it("should get the subnames for a name ordered by createdAt in asc order", async () => {
      const result = await ensInstance.getSubnames({
        name: `wrappedwithsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "createdAt",
        orderDirection: "asc",
      });
      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].name).toEqual(
        `test.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[1].name).toEqual(
        `legacy.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[2].name).toEqual(
        `xyz.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[3].name).toEqual(
        `addr.wrappedwithsubnames.${tldName}`
      );
      expect(
        result.subnames.every((subname, i, arr) => {
          if (arr[i + 1]) {
            return (subname as any).createdAt <= (arr[i + 1] as any).createdAt;
          }
          return true;
        })
      ).toBe(true);
      testProperties(
        result.subnames[0],
        "id",
        "labelName",
        "labelhash",
        "name",
        "isMigrated",
        "owner",
        "truncatedName"
      );
    });

    it("should get the subnames for a name by labelName in desc order", async () => {
      const result = await ensInstance.getSubnames({
        name: `wrappedwithsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "labelName",
        orderDirection: "desc",
      });
      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].name).toEqual(
        `xyz.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[1].name).toEqual(
        `test.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[2].name).toEqual(
        `legacy.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[3].name).toEqual(
        `addr.wrappedwithsubnames.${tldName}`
      );
      testProperties(
        result.subnames[0],
        "id",
        "labelName",
        "labelhash",
        "name",
        "isMigrated",
        "owner",
        "truncatedName"
      );
    });

    it("should get the subnames for a name by labelName in asc order", async () => {
      const result = await ensInstance.getSubnames({
        name: `wrappedwithsubnames.${tldName}`,
        pageSize: 10,
        orderBy: "labelName",
        orderDirection: "asc",
      });
      expect(result).toBeTruthy();
      expect(result.subnames.length).toBe(4);
      expect(result.subnameCount).toBe(4);
      expect(result.subnames[0].name).toEqual(
        `addr.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[1].name).toEqual(
        `legacy.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[2].name).toEqual(
        `test.wrappedwithsubnames.${tldName}`
      );
      expect(result.subnames[3].name).toEqual(
        `xyz.wrappedwithsubnames.${tldName}`
      );
      testProperties(
        result.subnames[0],
        "id",
        "labelName",
        "labelhash",
        "name",
        "isMigrated",
        "owner",
        "truncatedName"
      );
    });

    describe("with pagination", () => {
      it("should get paginated subnames for a name ordered by createdAt in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "desc",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(
          `xyz.wrappedwithsubnames.${tldName}`
        );
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt >= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "desc",
          lastSubnames: result.subnames,
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(2);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        expect(result2.subnames[1].name).toEqual(
          `test.wrappedwithsubnames.${tldName}`
        );
        expect(
          result2.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt >= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name ordered by createdAt in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "asc",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `test.wrappedwithsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt <= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          page: 0,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "asc",
          lastSubnames: result.subnames,
        });

        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(2);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `xyz.wrappedwithsubnames.${tldName}`
        );
        expect(result2.subnames[1].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        expect(
          result2.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt <= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name by labelName in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "labelName",
          orderDirection: "desc",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `xyz.wrappedwithsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(
          `test.wrappedwithsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "labelName",
          orderDirection: "desc",
          lastSubnames: result.subnames,
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(2);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        expect(result2.subnames[1].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name by labelName in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "labelName",
          orderDirection: "asc",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );

        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );

        const result2 = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 2,
          orderBy: "labelName",
          orderDirection: "asc",
          lastSubnames: result.subnames,
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(2);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `test.wrappedwithsubnames.${tldName}`
        );
        expect(result2.subnames[1].name).toEqual(
          `xyz.wrappedwithsubnames.${tldName}`
        );

        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });
    });

    describe("With search query", () => {
      it("should get the searched subnames for a name ordered by createdAt in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 10,
          orderBy: "createdAt",
          orderDirection: "desc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt >= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get the searched subnames for a name ordered by createdAt in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          page: 0,
          pageSize: 10,
          orderBy: "createdAt",
          orderDirection: "asc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt <= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get the subnames for a name by labelName in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 10,
          orderBy: "labelName",
          orderDirection: "desc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get the subnames for a name by labelName in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 10,
          orderBy: "labelName",
          orderDirection: "asc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(2);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        expect(result.subnames[1].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });
    });

    describe("with search query and pagination", () => {
      it("should get paginated subnames for a name ordered by createdAt in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "createdAt",
          orderDirection: "desc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(1);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "createdAt",
          orderDirection: "desc",
          lastSubnames: result.subnames,
          search: "a",
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(1);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name ordered by createdAt in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "createdAt",
          orderDirection: "asc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(1);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        expect(
          result.subnames.every((subname, i, arr) => {
            if (arr[i + 1]) {
              return (
                (subname as any).createdAt <= (arr[i + 1] as any).createdAt
              );
            }
            return true;
          })
        ).toBe(true);
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          page: 0,
          pageSize: 2,
          orderBy: "createdAt",
          orderDirection: "asc",
          lastSubnames: result.subnames,
          search: "a",
        });

        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(1);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );

        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name by labelName in desc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "labelName",
          orderDirection: "desc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(1);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
        const result2 = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "labelName",
          orderDirection: "desc",
          lastSubnames: result.subnames,
          search: "a",
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(1);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );
        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });

      it("should get paginated subnames for a name by labelName in asc order", async () => {
        const result = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "labelName",
          orderDirection: "asc",
          search: "a",
        });
        expect(result).toBeTruthy();
        expect(result.subnames.length).toBe(1);
        expect(result.subnameCount).toBe(4);
        expect(result.subnames[0].name).toEqual(
          `addr.wrappedwithsubnames.${tldName}`
        );

        testProperties(
          result.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );

        const result2 = await ensInstance.getSubnames({
          name: `wrappedwithsubnames.${tldName}`,
          pageSize: 1,
          orderBy: "labelName",
          orderDirection: "asc",
          lastSubnames: result.subnames,
          search: "a",
        });
        expect(result2).toBeTruthy();
        expect(result2.subnames.length).toBe(1);
        expect(result2.subnameCount).toBe(4);
        expect(result2.subnames[0].name).toEqual(
          `legacy.wrappedwithsubnames.${tldName}`
        );

        testProperties(
          result2.subnames[0],
          "id",
          "labelName",
          "labelhash",
          "name",
          "isMigrated",
          "owner",
          "truncatedName"
        );
      });
    });
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

    it("should throw an error with no data if ensjs-debug is set to ENSJSUknownError", async () => {
      try {
        const result = await ensInstance.getSubnames({
          name: `withsubnames.${tldName}`,
          pageSize: 10,
          orderBy: "createdAt",
          orderDirection: "desc",
        });
        expect(result).toBeFalsy();
      } catch (e) {
        expect(e).toBeInstanceOf(ENSJSError);
        const error = e as ENSJSError<Result>;
        expect(error.name).toBe("ENSJSSubgraphError");
        expect(error.data).toEqual({
          subnames: [],
          subnameCount: 0,
        });
      }
    });
  });
});
