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

export interface BankInterface extends Interface {
  functions: {
    "allocateSeigniorage(uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "bankHistory(uint256)": FunctionFragment;
    "bnd()": FunctionFragment;
    "bns()": FunctionFragment;
    "canClaimReward(address)": FunctionFragment;
    "canWithdraw(address)": FunctionFragment;
    "claimReward()": FunctionFragment;
    "earned(address)": FunctionFragment;
    "epoch()": FunctionFragment;
    "exit()": FunctionFragment;
    "getLastSnapshotIndexOf(address)": FunctionFragment;
    "getOperator()": FunctionFragment;
    "latestSnapshotIndex()": FunctionFragment;
    "members(address)": FunctionFragment;
    "nextEpochPoint()": FunctionFragment;
    "recoverUnsupported(address,uint256,address)": FunctionFragment;
    "rewardLockupEpochs()": FunctionFragment;
    "rewardPerShare()": FunctionFragment;
    "setLockUp(uint256,uint256)": FunctionFragment;
    "setOperator(address)": FunctionFragment;
    "stake(uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "treasury()": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdrawLockupEpochs()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "allocateSeigniorage"
      | "balanceOf"
      | "bankHistory"
      | "bnd"
      | "bns"
      | "canClaimReward"
      | "canWithdraw"
      | "claimReward"
      | "earned"
      | "epoch"
      | "exit"
      | "getLastSnapshotIndexOf"
      | "getOperator"
      | "latestSnapshotIndex"
      | "members"
      | "nextEpochPoint"
      | "recoverUnsupported"
      | "rewardLockupEpochs"
      | "rewardPerShare"
      | "setLockUp"
      | "setOperator"
      | "stake"
      | "totalSupply"
      | "treasury"
      | "withdraw"
      | "withdrawLockupEpochs"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "allocateSeigniorage",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "bankHistory",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "bnd", values?: undefined): string;
  encodeFunctionData(functionFragment: "bns", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "canClaimReward",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "canWithdraw",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "earned",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "epoch", values?: undefined): string;
  encodeFunctionData(functionFragment: "exit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getLastSnapshotIndexOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getOperator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "latestSnapshotIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "members",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "nextEpochPoint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "recoverUnsupported",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardLockupEpochs",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPerShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setLockUp",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setOperator",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLockupEpochs",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "allocateSeigniorage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bankHistory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bnd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bns", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "canClaimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "canWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "earned", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "epoch", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "exit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getLastSnapshotIndexOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestSnapshotIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "members", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextEpochPoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverUnsupported",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardLockupEpochs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPerShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setLockUp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLockupEpochs",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(address,uint256)": EventFragment;
    "RewardAdded(address,uint256)": EventFragment;
    "RewardPaid(address,uint256)": EventFragment;
    "SetLockUp(uint256,uint256,uint256,uint256)": EventFragment;
    "SetOperator(address,address)": EventFragment;
    "Staked(address,uint256)": EventFragment;
    "Withdrawn(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardPaid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetLockUp"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetOperator"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Staked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}

export interface InitializedEventObject {
  executor: string;
  at: BigNumber;
}
export type InitializedEvent = TypedEvent<
  [string, BigNumber],
  InitializedEventObject
>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RewardAddedEventObject {
  user: string;
  reward: BigNumber;
}
export type RewardAddedEvent = TypedEvent<
  [string, BigNumber],
  RewardAddedEventObject
>;

export type RewardAddedEventFilter = TypedEventFilter<RewardAddedEvent>;

export interface RewardPaidEventObject {
  user: string;
  reward: BigNumber;
}
export type RewardPaidEvent = TypedEvent<
  [string, BigNumber],
  RewardPaidEventObject
>;

export type RewardPaidEventFilter = TypedEventFilter<RewardPaidEvent>;

export interface SetLockUpEventObject {
  newWithdrawLockupEpochs: BigNumber;
  newRewardLockupEpochs: BigNumber;
  oldWithdrawLockupEpochs: BigNumber;
  oldRewardLockupEpochs: BigNumber;
}
export type SetLockUpEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  SetLockUpEventObject
>;

export type SetLockUpEventFilter = TypedEventFilter<SetLockUpEvent>;

export interface SetOperatorEventObject {
  newOperator: string;
  oldOperator: string;
}
export type SetOperatorEvent = TypedEvent<
  [string, string],
  SetOperatorEventObject
>;

export type SetOperatorEventFilter = TypedEventFilter<SetOperatorEvent>;

export interface StakedEventObject {
  user: string;
  amount: BigNumber;
}
export type StakedEvent = TypedEvent<[string, BigNumber], StakedEventObject>;

export type StakedEventFilter = TypedEventFilter<StakedEvent>;

export interface WithdrawnEventObject {
  user: string;
  amount: BigNumber;
}
export type WithdrawnEvent = TypedEvent<
  [string, BigNumber],
  WithdrawnEventObject
>;

export type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;

export interface Bank extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BankInterface;

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
    allocateSeigniorage(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    bankHistory(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        time: BigNumber;
        rewardReceived: BigNumber;
        rewardPerShare: BigNumber;
      }
    >;

    bnd(overrides?: CallOverrides): Promise<[string]>;

    bns(overrides?: CallOverrides): Promise<[string]>;

    canClaimReward(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    canWithdraw(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    claimReward(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    earned(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    epoch(overrides?: CallOverrides): Promise<[BigNumber]>;

    exit(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getLastSnapshotIndexOf(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOperator(overrides?: CallOverrides): Promise<[string]>;

    latestSnapshotIndex(overrides?: CallOverrides): Promise<[BigNumber]>;

    members(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        lastSnapshotIndex: BigNumber;
        rewardEarned: BigNumber;
        epochTimerStart: BigNumber;
      }
    >;

    nextEpochPoint(overrides?: CallOverrides): Promise<[BigNumber]>;

    recoverUnsupported(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rewardLockupEpochs(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewardPerShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    setLockUp(
      _withdrawLockupEpochs: PromiseOrValue<BigNumberish>,
      _rewardLockupEpochs: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setOperator(
      _operator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stake(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawLockupEpochs(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  allocateSeigniorage(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balanceOf(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  bankHistory(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      time: BigNumber;
      rewardReceived: BigNumber;
      rewardPerShare: BigNumber;
    }
  >;

  bnd(overrides?: CallOverrides): Promise<string>;

  bns(overrides?: CallOverrides): Promise<string>;

  canClaimReward(
    member: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  canWithdraw(
    member: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  claimReward(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  earned(
    member: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  epoch(overrides?: CallOverrides): Promise<BigNumber>;

  exit(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getLastSnapshotIndexOf(
    member: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOperator(overrides?: CallOverrides): Promise<string>;

  latestSnapshotIndex(overrides?: CallOverrides): Promise<BigNumber>;

  members(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      lastSnapshotIndex: BigNumber;
      rewardEarned: BigNumber;
      epochTimerStart: BigNumber;
    }
  >;

  nextEpochPoint(overrides?: CallOverrides): Promise<BigNumber>;

  recoverUnsupported(
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rewardLockupEpochs(overrides?: CallOverrides): Promise<BigNumber>;

  rewardPerShare(overrides?: CallOverrides): Promise<BigNumber>;

  setLockUp(
    _withdrawLockupEpochs: PromiseOrValue<BigNumberish>,
    _rewardLockupEpochs: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setOperator(
    _operator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stake(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  treasury(overrides?: CallOverrides): Promise<string>;

  withdraw(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawLockupEpochs(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    allocateSeigniorage(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bankHistory(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        time: BigNumber;
        rewardReceived: BigNumber;
        rewardPerShare: BigNumber;
      }
    >;

    bnd(overrides?: CallOverrides): Promise<string>;

    bns(overrides?: CallOverrides): Promise<string>;

    canClaimReward(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    canWithdraw(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    claimReward(overrides?: CallOverrides): Promise<void>;

    earned(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    epoch(overrides?: CallOverrides): Promise<BigNumber>;

    exit(overrides?: CallOverrides): Promise<void>;

    getLastSnapshotIndexOf(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOperator(overrides?: CallOverrides): Promise<string>;

    latestSnapshotIndex(overrides?: CallOverrides): Promise<BigNumber>;

    members(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        lastSnapshotIndex: BigNumber;
        rewardEarned: BigNumber;
        epochTimerStart: BigNumber;
      }
    >;

    nextEpochPoint(overrides?: CallOverrides): Promise<BigNumber>;

    recoverUnsupported(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    rewardLockupEpochs(overrides?: CallOverrides): Promise<BigNumber>;

    rewardPerShare(overrides?: CallOverrides): Promise<BigNumber>;

    setLockUp(
      _withdrawLockupEpochs: PromiseOrValue<BigNumberish>,
      _rewardLockupEpochs: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setOperator(
      _operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    stake(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<string>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawLockupEpochs(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Initialized(address,uint256)"(
      executor?: PromiseOrValue<string> | null,
      at?: null
    ): InitializedEventFilter;
    Initialized(
      executor?: PromiseOrValue<string> | null,
      at?: null
    ): InitializedEventFilter;

    "RewardAdded(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      reward?: null
    ): RewardAddedEventFilter;
    RewardAdded(
      user?: PromiseOrValue<string> | null,
      reward?: null
    ): RewardAddedEventFilter;

    "RewardPaid(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      reward?: null
    ): RewardPaidEventFilter;
    RewardPaid(
      user?: PromiseOrValue<string> | null,
      reward?: null
    ): RewardPaidEventFilter;

    "SetLockUp(uint256,uint256,uint256,uint256)"(
      newWithdrawLockupEpochs?: null,
      newRewardLockupEpochs?: null,
      oldWithdrawLockupEpochs?: null,
      oldRewardLockupEpochs?: null
    ): SetLockUpEventFilter;
    SetLockUp(
      newWithdrawLockupEpochs?: null,
      newRewardLockupEpochs?: null,
      oldWithdrawLockupEpochs?: null,
      oldRewardLockupEpochs?: null
    ): SetLockUpEventFilter;

    "SetOperator(address,address)"(
      newOperator?: PromiseOrValue<string> | null,
      oldOperator?: PromiseOrValue<string> | null
    ): SetOperatorEventFilter;
    SetOperator(
      newOperator?: PromiseOrValue<string> | null,
      oldOperator?: PromiseOrValue<string> | null
    ): SetOperatorEventFilter;

    "Staked(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): StakedEventFilter;
    Staked(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): StakedEventFilter;

    "Withdrawn(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawnEventFilter;
    Withdrawn(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawnEventFilter;
  };

  estimateGas: {
    allocateSeigniorage(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bankHistory(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bnd(overrides?: CallOverrides): Promise<BigNumber>;

    bns(overrides?: CallOverrides): Promise<BigNumber>;

    canClaimReward(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    canWithdraw(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimReward(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    earned(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    epoch(overrides?: CallOverrides): Promise<BigNumber>;

    exit(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getLastSnapshotIndexOf(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOperator(overrides?: CallOverrides): Promise<BigNumber>;

    latestSnapshotIndex(overrides?: CallOverrides): Promise<BigNumber>;

    members(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nextEpochPoint(overrides?: CallOverrides): Promise<BigNumber>;

    recoverUnsupported(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rewardLockupEpochs(overrides?: CallOverrides): Promise<BigNumber>;

    rewardPerShare(overrides?: CallOverrides): Promise<BigNumber>;

    setLockUp(
      _withdrawLockupEpochs: PromiseOrValue<BigNumberish>,
      _rewardLockupEpochs: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setOperator(
      _operator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stake(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawLockupEpochs(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    allocateSeigniorage(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bankHistory(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bnd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bns(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    canClaimReward(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    canWithdraw(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimReward(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    earned(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    epoch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    exit(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getLastSnapshotIndexOf(
      member: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOperator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    latestSnapshotIndex(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    members(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nextEpochPoint(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    recoverUnsupported(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rewardLockupEpochs(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rewardPerShare(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setLockUp(
      _withdrawLockupEpochs: PromiseOrValue<BigNumberish>,
      _rewardLockupEpochs: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setOperator(
      _operator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawLockupEpochs(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}