/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Interface } from "@ethersproject/abi";
import { Signer } from "@ethersproject/abstract-signer";
import { BytesLike } from "@ethersproject/bytes";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { BaseContract, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction } from "@ethersproject/contracts";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace DNSSEC {
  export type RRSetWithSignatureStruct = {
    rrset: PromiseOrValue<BytesLike>;
    sig: PromiseOrValue<BytesLike>;
  };

  export type RRSetWithSignatureStructOutput = [string, string] & {
    rrset: string;
    sig: string;
  };
}

export interface DNSSECImplInterface extends Interface {
  functions: {
    "algorithms(uint8)": FunctionFragment;
    "anchors()": FunctionFragment;
    "digests(uint8)": FunctionFragment;
    "owner()": FunctionFragment;
    "setAlgorithm(uint8,address)": FunctionFragment;
    "setDigest(uint8,address)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "verifyRRSet((bytes,bytes)[],uint256)": FunctionFragment;
    "verifyRRSet((bytes,bytes)[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "algorithms"
      | "anchors"
      | "digests"
      | "owner"
      | "setAlgorithm"
      | "setDigest"
      | "setOwner"
      | "verifyRRSet((bytes,bytes)[],uint256)"
      | "verifyRRSet((bytes,bytes)[])"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "algorithms",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "anchors", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "digests",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setAlgorithm",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setDigest",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyRRSet((bytes,bytes)[],uint256)",
    values: [DNSSEC.RRSetWithSignatureStruct[], PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyRRSet((bytes,bytes)[])",
    values: [DNSSEC.RRSetWithSignatureStruct[]]
  ): string;

  decodeFunctionResult(functionFragment: "algorithms", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "anchors", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "digests", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAlgorithm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setDigest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyRRSet((bytes,bytes)[],uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyRRSet((bytes,bytes)[])",
    data: BytesLike
  ): Result;

  events: {
    "AlgorithmUpdated(uint8,address)": EventFragment;
    "DigestUpdated(uint8,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AlgorithmUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DigestUpdated"): EventFragment;
}

export interface AlgorithmUpdatedEventObject {
  id: number;
  addr: string;
}
export type AlgorithmUpdatedEvent = TypedEvent<
  [number, string],
  AlgorithmUpdatedEventObject
>;

export type AlgorithmUpdatedEventFilter =
  TypedEventFilter<AlgorithmUpdatedEvent>;

export interface DigestUpdatedEventObject {
  id: number;
  addr: string;
}
export type DigestUpdatedEvent = TypedEvent<
  [number, string],
  DigestUpdatedEventObject
>;

export type DigestUpdatedEventFilter = TypedEventFilter<DigestUpdatedEvent>;

export interface DNSSECImpl extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DNSSECImplInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    algorithms(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    anchors(overrides?: CallOverrides): Promise<[string]>;

    digests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Sets the contract address for a signature verification algorithm.      Callable only by the owner.
     * @param algo The address of the algorithm contract.
     * @param id The algorithm ID
     */
    setAlgorithm(
      id: PromiseOrValue<BigNumberish>,
      algo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Sets the contract address for a digest verification algorithm.      Callable only by the owner.
     * @param digest The address of the digest contract.
     * @param id The digest ID
     */
    setDigest(
      id: PromiseOrValue<BigNumberish>,
      digest: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "verifyRRSet((bytes,bytes)[],uint256)"(
      input: DNSSEC.RRSetWithSignatureStruct[],
      now: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, number] & { rrs: string; inception: number }>;

    "verifyRRSet((bytes,bytes)[])"(
      input: DNSSEC.RRSetWithSignatureStruct[],
      overrides?: CallOverrides
    ): Promise<[string, number] & { rrs: string; inception: number }>;
  };

  algorithms(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  anchors(overrides?: CallOverrides): Promise<string>;

  digests(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  /**
   * Sets the contract address for a signature verification algorithm.      Callable only by the owner.
   * @param algo The address of the algorithm contract.
   * @param id The algorithm ID
   */
  setAlgorithm(
    id: PromiseOrValue<BigNumberish>,
    algo: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Sets the contract address for a digest verification algorithm.      Callable only by the owner.
   * @param digest The address of the digest contract.
   * @param id The digest ID
   */
  setDigest(
    id: PromiseOrValue<BigNumberish>,
    digest: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setOwner(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "verifyRRSet((bytes,bytes)[],uint256)"(
    input: DNSSEC.RRSetWithSignatureStruct[],
    now: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[string, number] & { rrs: string; inception: number }>;

  "verifyRRSet((bytes,bytes)[])"(
    input: DNSSEC.RRSetWithSignatureStruct[],
    overrides?: CallOverrides
  ): Promise<[string, number] & { rrs: string; inception: number }>;

  callStatic: {
    algorithms(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    anchors(overrides?: CallOverrides): Promise<string>;

    digests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    /**
     * Sets the contract address for a signature verification algorithm.      Callable only by the owner.
     * @param algo The address of the algorithm contract.
     * @param id The algorithm ID
     */
    setAlgorithm(
      id: PromiseOrValue<BigNumberish>,
      algo: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Sets the contract address for a digest verification algorithm.      Callable only by the owner.
     * @param digest The address of the digest contract.
     * @param id The digest ID
     */
    setDigest(
      id: PromiseOrValue<BigNumberish>,
      digest: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "verifyRRSet((bytes,bytes)[],uint256)"(
      input: DNSSEC.RRSetWithSignatureStruct[],
      now: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, number] & { rrs: string; inception: number }>;

    "verifyRRSet((bytes,bytes)[])"(
      input: DNSSEC.RRSetWithSignatureStruct[],
      overrides?: CallOverrides
    ): Promise<[string, number] & { rrs: string; inception: number }>;
  };

  filters: {
    "AlgorithmUpdated(uint8,address)"(
      id?: null,
      addr?: null
    ): AlgorithmUpdatedEventFilter;
    AlgorithmUpdated(id?: null, addr?: null): AlgorithmUpdatedEventFilter;

    "DigestUpdated(uint8,address)"(
      id?: null,
      addr?: null
    ): DigestUpdatedEventFilter;
    DigestUpdated(id?: null, addr?: null): DigestUpdatedEventFilter;
  };

  estimateGas: {
    algorithms(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    anchors(overrides?: CallOverrides): Promise<BigNumber>;

    digests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Sets the contract address for a signature verification algorithm.      Callable only by the owner.
     * @param algo The address of the algorithm contract.
     * @param id The algorithm ID
     */
    setAlgorithm(
      id: PromiseOrValue<BigNumberish>,
      algo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Sets the contract address for a digest verification algorithm.      Callable only by the owner.
     * @param digest The address of the digest contract.
     * @param id The digest ID
     */
    setDigest(
      id: PromiseOrValue<BigNumberish>,
      digest: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "verifyRRSet((bytes,bytes)[],uint256)"(
      input: DNSSEC.RRSetWithSignatureStruct[],
      now: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "verifyRRSet((bytes,bytes)[])"(
      input: DNSSEC.RRSetWithSignatureStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    algorithms(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    anchors(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    digests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Sets the contract address for a signature verification algorithm.      Callable only by the owner.
     * @param algo The address of the algorithm contract.
     * @param id The algorithm ID
     */
    setAlgorithm(
      id: PromiseOrValue<BigNumberish>,
      algo: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Sets the contract address for a digest verification algorithm.      Callable only by the owner.
     * @param digest The address of the digest contract.
     * @param id The digest ID
     */
    setDigest(
      id: PromiseOrValue<BigNumberish>,
      digest: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "verifyRRSet((bytes,bytes)[],uint256)"(
      input: DNSSEC.RRSetWithSignatureStruct[],
      now: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "verifyRRSet((bytes,bytes)[])"(
      input: DNSSEC.RRSetWithSignatureStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
