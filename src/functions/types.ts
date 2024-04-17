import type batch from "./batch";
import type {
  multicallWrapper,
  resolverMulticallWrapper,
  universalWrapper,
} from "./batchWrappers";
import type commitName from "./commitName";
import type createSubname from "./createSubname";
import type deleteSubname from "./deleteSubname";
import type getAvailable from "./getAvailable";
import type getDecryptedName from "./getDecryptedName";
import type getDNSOwner from "./getDNSOwner";
import type getExpiry from "./getExpiry";
import type { getHistory } from "./getHistory";
import type getName from "./getName";
import type getNames from "./getNames";
import type getOwner from "./getOwner";
import type getPrice from "./getPrice";
import type getProfile from "./getProfile";
import type getResolver from "./getResolver";
import type {
  getABI,
  getAddr,
  getContentHash,
  getText,
  _getABI,
  _getAddr,
  _getContentHash,
  _getText,
} from "./getSpecificRecord";
import type getSubnames from "./getSubnames";
import type getWrapperData from "./getWrapperData";
import type importDNSSECName from "./importDNSSECName";
import type registerName from "./registerName";
import type {
  // eslint-disable-next-line import/no-named-default
  default as renewNames,
  extendWrappedName,
} from "./renewNames";
import type setFuses from "./setFuses";
import type { setChildFuses } from "./setFuses";
import type setName from "./setName";
import type setRecord from "./setRecord";
import type setRecords from "./setRecords";
import type setResolver from "./setResolver";
import type supportsTLD from "./supportsTLD";
import type transferController from "./transferController";
import type transferName from "./transferName";
import type transferSubname from "./transferSubname";
import type unwrapName from "./unwrapName";
import type wrapName from "./wrapName";
import type getVouchers from "./getVouchers";
import type validateVoucher from "./validateVoucher";
import type validateReferrer from "./validateReferrer";

// algo
import type mergedPool_getPoolInfo from "./mergedPool/getPoolInfo";
import type mergedPool_getUserPoolAmount from "./mergedPool/getUserPoolAmount";
import type mergedPool_getUserPoolNfts from "./mergedPool/getUserPoolNfts";
import type mergedPool_getPendingToken from "./mergedPool/getPendingToken";

import type vesting_remainingLockedOf from "./vesting/remainingLockedOf";
import type vesting_canUnlockAmount from "./vesting/canUnlockAmount";

import type erc20_balanceOf from "./erc20/balanceOf";
import type erc20_allowance from "./erc20/allowance";
import type erc20_approve from "./erc20/approve";
import type erc20_totalSupply from "./erc20/totalSupply";

import type nameWrapper_isApprovedForAll from "./nameWrapper/isApprovedForAll";

import type uniswapV2Pair_getReserves from "./uniswapV2Pair/getReserves";

import type bank_balanceOf from "./bank/balanceOf";
import type bank_canClaimReward from "./bank/canClaimReward";
import type bank_canWithdraw from "./bank/canWithdraw";
import type bank_earned from "./bank/earned";
import type bank_epoch from "./bank/epoch";
import type bank_nextEpochPoint from "./bank/nextEpochPoint";
import type bank_seatInfoOf from "./bank/seatInfoOf";
import type bank_rewardLockupEpochs from "./bank/rewardLockupEpochs";
import type bank_withdrawLockupEpochs from "./bank/withdrawLockupEpochs";

import type treasury_epoch from "./treasury/epoch";
import type treasury_maxSupplyExpansionPercent from "./treasury/maxSupplyExpansionPercent";
import type treasury_seigniorageBankPercent from "./treasury/seigniorageBankPercent";

type Function = {
  batch: typeof batch;
  multicallWrapper: typeof multicallWrapper;
  resolverMulticallWrapper: typeof resolverMulticallWrapper;
  universalWrapper: typeof universalWrapper;
  setFuses: typeof setFuses;
  setChildFuses: typeof setChildFuses;
  commitName: typeof commitName;
  createSubname: typeof createSubname;
  deleteSubname: typeof deleteSubname;
  getAvailable: typeof getAvailable;
  getDecryptedName: typeof getDecryptedName;
  getDNSOwner: typeof getDNSOwner;
  getExpiry: typeof getExpiry;
  getHistory: typeof getHistory;
  getName: typeof getName;
  getNames: typeof getNames;
  getOwner: typeof getOwner;
  getPrice: typeof getPrice;
  getProfile: typeof getProfile;
  getResolver: typeof getResolver;
  getAddr: typeof getAddr;
  getContentHash: typeof getContentHash;
  getText: typeof getText;
  getABI: typeof getABI;
  _getAddr: typeof _getAddr;
  _getContentHash: typeof _getContentHash;
  _getText: typeof _getText;
  _getABI: typeof _getABI;
  getSubnames: typeof getSubnames;
  getWrapperData: typeof getWrapperData;
  importDNSSECName: typeof importDNSSECName;
  registerName: typeof registerName;
  renewNames: typeof renewNames;
  extendWrappedName: typeof extendWrappedName;
  setName: typeof setName;
  setRecord: typeof setRecord;
  setRecords: typeof setRecords;
  setResolver: typeof setResolver;
  supportsTLD: typeof supportsTLD;
  transferController: typeof transferController;
  transferName: typeof transferName;
  transferSubname: typeof transferSubname;
  unwrapName: typeof unwrapName;
  wrapName: typeof wrapName;
  getVouchers: typeof getVouchers;
  validateVoucher: typeof validateVoucher;
  validateReferrer: typeof validateReferrer;
  mergedPool: {
    getPoolInfo: typeof mergedPool_getPoolInfo;
    getUserPoolAmount: typeof mergedPool_getUserPoolAmount;
    getUserPoolNfts: typeof mergedPool_getUserPoolNfts;
    getPendingToken: typeof mergedPool_getPendingToken;
  };
  vesting: {
    remainingLockedOf: typeof vesting_remainingLockedOf;
    canUnlockAmount: typeof vesting_canUnlockAmount;
  };
  erc20: {
    balanceOf: typeof erc20_balanceOf;
    allowance: typeof erc20_allowance;
    approve: typeof erc20_approve;
    totalSupply: typeof erc20_totalSupply;
  };
  nameWrapper: {
    isApprovedForAll: typeof nameWrapper_isApprovedForAll;
  };
  uniswapV2Pair: {
    getReserves: typeof uniswapV2Pair_getReserves;
  };
  bank: {
    balanceOf: typeof bank_balanceOf;
    canClaimReward: typeof bank_canClaimReward;
    canWithdraw: typeof bank_canWithdraw;
    earned: typeof bank_earned;
    epoch: typeof bank_epoch;
    nextEpochPoint: typeof bank_nextEpochPoint;
    seatInfoOf: typeof bank_seatInfoOf;
    rewardLockupEpochs: typeof bank_rewardLockupEpochs;
    withdrawLockupEpochs: typeof bank_withdrawLockupEpochs;
  };
  treasury: {
    epoch: typeof treasury_epoch;
    maxSupplyExpansionPercent: typeof treasury_maxSupplyExpansionPercent;
    seigniorageBankPercent: typeof treasury_seigniorageBankPercent;
  };
};

export default Function;
