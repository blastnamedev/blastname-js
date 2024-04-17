/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Interface } from "@ethersproject/abi";
import { Signer } from "@ethersproject/abstract-signer";
import { Contract } from "@ethersproject/contracts";

import type { Provider } from "@ethersproject/providers";
import type {
  ExtendedDNSResolver,
  ExtendedDNSResolverInterface,
} from "../ExtendedDNSResolver";

const _abi = [
  {
    inputs: [],
    name: "InvalidAddressFormat",
    type: "error",
  },
  {
    inputs: [],
    name: "NotImplemented",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
    ],
    name: "resolve",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
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
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ExtendedDNSResolver__factory {
  static readonly abi = _abi;
  static createInterface(): ExtendedDNSResolverInterface {
    return new Interface(_abi) as ExtendedDNSResolverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExtendedDNSResolver {
    return new Contract(address, _abi, signerOrProvider) as ExtendedDNSResolver;
  }
}
