import { ENSArgs } from "..";
import {
  getClientErrors,
  ENSJSError,
  debugSubgraphLatency,
} from "../utils/errors";
import { MAX_DATE_INT } from "../utils/consts";

type Params = {
  address: string;
  page?: number;
  pageSize?: number;
  orderDirection?: "asc" | "desc";
  orderBy?: string;
};

export type Voucher = {
  id: string;
  discountPercentage: BigInt;
  maxDiscountAmount: BigInt;
  expiredAt: Date;
};

const mapVoucher = (v?: any): Voucher => {
  let unix = parseInt(v.expiredAt) * 1000;
  unix = unix <= MAX_DATE_INT ? unix : MAX_DATE_INT;

  return {
    id: v.id,
    discountPercentage: BigInt(v.discountPercentage),
    maxDiscountAmount: BigInt(v.maxDiscountAmount),
    expiredAt: new Date(unix),
  };
};

const getVouchers = async (
  { gqlInstance }: ENSArgs<"gqlInstance">,
  {
    address: _address,
    page,
    pageSize = 10,
    orderDirection = "desc",
    orderBy = "discountPercentage",
  }: Params
) => {
  const address = _address.toLowerCase();
  const client = gqlInstance.client!;
  const domainQueryData = `
    id
    discountPercentage
    maxDiscountAmount
    expiredAt
  `;

  let queryVars: object = {};
  let finalQuery: string = "";

  finalQuery = gqlInstance.gql`
    query getValidVouchers(
      $userAddress: Bytes
      $first: Int
      $skip: Int
      $orderBy: Voucher_orderBy
      $orderDirection: OrderDirection
      $expiryDate: Int
    ) {
      vouchers(
        first: $first
        skip: $skip
        orderBy: $orderBy 
        orderDirection: $orderDirection
        where: {
          user: $userAddress
          expiredAt_gte: $expiryDate
          redeemedBlockNumber: null
          revokedBlockNumber: null
        }
      ) {
        ${domainQueryData}
      }
    }
  `;

  queryVars = {
    userAddress: address,
    first: pageSize,
    skip: (page || 0) * pageSize,
    orderBy,
    orderDirection,
    expiryDate: Math.floor(Date.now() / 1000),
  };

  const response = await client
    .request(finalQuery, queryVars)
    .catch((e: unknown) => {
      console.error(e);
      throw new ENSJSError({
        errors: getClientErrors(e),
        data: [],
      });
    })
    .finally(debugSubgraphLatency);

  const vouchers = response?.vouchers;

  return (vouchers?.map(mapVoucher) || []) as Voucher[];
};

export default getVouchers;
