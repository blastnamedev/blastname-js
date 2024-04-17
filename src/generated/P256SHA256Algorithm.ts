/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Interface } from "@ethersproject/abi";
import { Signer } from "@ethersproject/abstract-signer";
import { BytesLike } from "@ethersproject/bytes";
import { BigNumber } from "@ethersproject/bignumber";
import { BaseContract, CallOverrides, PopulatedTransaction } from "@ethersproject/contracts";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface P256SHA256AlgorithmInterface extends Interface {
  functions: {
    "verify(bytes,bytes,bytes)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "verify"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "verify",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;

  events: {};
}

export interface P256SHA256Algorithm extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: P256SHA256AlgorithmInterface;

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
    /**
     * Verifies a signature.
     * @param data The signed data to verify.
     * @param key The public key to verify with.
     * @param signature The signature to verify.
     */
    verify(
      key: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  /**
   * Verifies a signature.
   * @param data The signed data to verify.
   * @param key The public key to verify with.
   * @param signature The signature to verify.
   */
  verify(
    key: PromiseOrValue<BytesLike>,
    data: PromiseOrValue<BytesLike>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    /**
     * Verifies a signature.
     * @param data The signed data to verify.
     * @param key The public key to verify with.
     * @param signature The signature to verify.
     */
    verify(
      key: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    /**
     * Verifies a signature.
     * @param data The signed data to verify.
     * @param key The public key to verify with.
     * @param signature The signature to verify.
     */
    verify(
      key: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * Verifies a signature.
     * @param data The signed data to verify.
     * @param key The public key to verify with.
     * @param signature The signature to verify.
     */
    verify(
      key: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}