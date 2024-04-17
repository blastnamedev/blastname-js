import { defaultAbiCoder } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { ENSArgs } from "..";

const SUPPORT_TYPE_ID = ["register", "renewal"] as const;

type SupportedTypeId = (typeof SUPPORT_TYPE_ID)[number];

const RENT_PRICE_TYPE: { [key in SupportedTypeId]: number } = {
  register: 0,
  renewal: 1,
};

const raw = async (
  { contracts, multicallWrapper }: ENSArgs<"contracts" | "multicallWrapper">,
  nameOrNames: string | string[],
  duration: number,
  type: SupportedTypeId,
  legacy?: boolean
) => {
  const names = Array.isArray(nameOrNames) ? nameOrNames : [nameOrNames];
  const rentPriceType = RENT_PRICE_TYPE[type];

  if (names.length > 1) {
    const bulkRenewal = await contracts?.getBulkRenewal()!;
    const baseCall = {
      to: bulkRenewal.address,
      data: bulkRenewal.interface.encodeFunctionData("rentPrice", [
        names,
        duration,
        rentPriceType,
      ]),
    };
    if (legacy) {
      return multicallWrapper.raw([
        baseCall,
        {
          to: bulkRenewal.address,
          data: bulkRenewal.interface.encodeFunctionData("rentPrice", [
            names,
            0,
            rentPriceType,
          ]),
        },
      ]);
    }

    return baseCall;
  }

  const controller = await contracts?.getEthRegistrarController()!;

  const baseCall = {
    to: controller.address,
    data: controller.interface.encodeFunctionData("rentPrice", [
      names[0],
      duration,
      rentPriceType,
    ]),
  };

  if (legacy) {
    return multicallWrapper.raw([
      baseCall,
      {
        to: controller.address,
        data: controller.interface.encodeFunctionData("rentPrice", [
          names[0],
          0,
          rentPriceType,
        ]),
      },
    ]);
  }
  return baseCall;
};

const decode = async (
  { contracts, multicallWrapper }: ENSArgs<"contracts" | "multicallWrapper">,
  data: string,
  _nameOrNames: string | string[],
  _duration: number,
  type: SupportedTypeId,
  legacy?: boolean
) => {
  if (data === null) return;
  try {
    let base: BigNumber;
    let premium: BigNumber;

    const isBulkRenewal =
      Array.isArray(_nameOrNames) && _nameOrNames.length > 1;
    if (isBulkRenewal && legacy) {
      const result = await multicallWrapper.decode(data);
      const [price] = defaultAbiCoder.decode(
        ["uint256"],
        result[0].returnData
      ) as [BigNumber];
      [premium] = defaultAbiCoder.decode(["uint256"], result[1].returnData) as [
        BigNumber
      ];
      base = price.sub(premium);
    } else if (isBulkRenewal) {
      const bulkRenewal = await contracts?.getBulkRenewal()!;
      const result = bulkRenewal.interface.decodeFunctionResult(
        "rentPrice",
        data
      );
      [base] = result;
      premium = BigNumber.from(0);
    } else if (!isBulkRenewal && legacy) {
      const result = await multicallWrapper.decode(data);
      const [price] = defaultAbiCoder.decode(
        ["uint256"],
        result[0].returnData
      ) as [BigNumber];
      [premium] = defaultAbiCoder.decode(["uint256"], result[1].returnData) as [
        BigNumber
      ];
      base = price.sub(premium);
    } else {
      const controller = await contracts?.getEthRegistrarController()!;
      const result = controller.interface.decodeFunctionResult(
        "rentPrice",
        data
      );
      [base, premium] = result[0] as [BigNumber, BigNumber];
    }
    return {
      base,
      premium,
    };
  } catch {
    return;
  }
};

export default { raw, decode };
