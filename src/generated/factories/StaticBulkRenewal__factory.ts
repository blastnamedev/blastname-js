/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Interface } from "@ethersproject/abi";
import { Signer } from "@ethersproject/abstract-signer";
import { Contract } from "@ethersproject/contracts";

import type { Provider } from "@ethersproject/providers";
import type {
  StaticBulkRenewal,
  StaticBulkRenewalInterface,
} from "../StaticBulkRenewal";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ETHRegistrarController",
        name: "_controller",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "renewAll",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "enum IETHRegistrarController.RentPriceType",
        name: "rentPriceType",
        type: "uint8",
      },
    ],
    name: "rentPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceID",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export class StaticBulkRenewal__factory {
  static readonly abi = _abi;
  static createInterface(): StaticBulkRenewalInterface {
    return new Interface(_abi) as StaticBulkRenewalInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StaticBulkRenewal {
    return new Contract(address, _abi, signerOrProvider) as StaticBulkRenewal;
  }
}
