import batch from "../functions/batch";
import {
  multicallWrapper,
  resolverMulticallWrapper,
  universalWrapper,
} from "../functions/batchWrappers";
import commitName from "../functions/commitName";
import createSubname from "../functions/createSubname";
import deleteSubname from "../functions/deleteSubname";
import getAvailable from "../functions/getAvailable";
import getDecryptedName from "../functions/getDecryptedName";
import getDNSOwner from "../functions/getDNSOwner";
import getExpiry from "../functions/getExpiry";
import { getHistory } from "../functions/getHistory";
import getName from "../functions/getName";
import getNames from "../functions/getNames";
import getOwner from "../functions/getOwner";
import getPrice from "../functions/getPrice";
import getProfile from "../functions/getProfile";
import getResolver from "../functions/getResolver";
import {
  getABI,
  getAddr,
  getContentHash,
  getText,
  _getABI,
  _getAddr,
  _getContentHash,
  _getText,
} from "../functions/getSpecificRecord";
import getSubnames from "../functions/getSubnames";
import getWrapperData from "../functions/getWrapperData";
import importDNSSECName from "../functions/importDNSSECName";
import registerName from "../functions/registerName";
import {
  // eslint-disable-next-line import/no-named-default
  default as renewNames,
  extendWrappedName,
} from "../functions/renewNames";
import setFuses, { setChildFuses } from "../functions/setFuses";
import setName from "../functions/setName";
import setRecord from "../functions/setRecord";
import setRecords from "../functions/setRecords";
import setResolver from "../functions/setResolver";
import supportsTLD from "../functions/supportsTLD";
import transferController from "../functions/transferController";
import transferName from "../functions/transferName";
import transferSubname from "../functions/transferSubname";
import unwrapName from "../functions/unwrapName";
import wrapName from "../functions/wrapName";
import getVouchers from "../functions/getVouchers";
import validateVoucher from "../functions/validateVoucher";

// algo
import mergedPool_getPoolInfo from "../functions/mergedPool/getPoolInfo";
import mergedPool_getUserPoolAmount from "../functions/mergedPool/getUserPoolAmount";
import mergedPool_getUserPoolNfts from "../functions/mergedPool/getUserPoolNfts";
import mergedPool_getPendingToken from "../functions/mergedPool/getPendingToken";

import vesting_remainingLockedOf from "../functions/vesting/remainingLockedOf";
import vesting_canUnlockAmount from "../functions/vesting/canUnlockAmount";

import erc20_balanceOf from "../functions/erc20/balanceOf";
import erc20_allowance from "../functions/erc20/allowance";
import erc20_approve from "../functions/erc20/approve";
import erc20_totalSupply from "../functions/erc20/totalSupply";

import nameWrapper_isApprovedForAll from "../functions/nameWrapper/isApprovedForAll";

import uniswapV2Pair_getReserves from "../functions/uniswapV2Pair/getReserves";

import bank_balanceOf from "../functions/bank/balanceOf";
import bank_canClaimReward from "../functions/bank/canClaimReward";
import bank_canWithdraw from "../functions/bank/canWithdraw";
import bank_earned from "../functions/bank/earned";
import bank_epoch from "../functions/bank/epoch";
import bank_nextEpochPoint from "../functions/bank/nextEpochPoint";
import bank_seatInfoOf from "../functions/bank/seatInfoOf";
import bank_rewardLockupEpochs from "../functions/bank/rewardLockupEpochs";
import bank_withdrawLockupEpochs from "../functions/bank/withdrawLockupEpochs";

import treasury_epoch from "../functions/treasury/epoch";
import treasury_maxSupplyExpansionPercent from "../functions/treasury/maxSupplyExpansionPercent";
import treasury_seigniorageBankPercent from "../functions/treasury/seigniorageBankPercent";

export default {
  batch,
  multicallWrapper,
  resolverMulticallWrapper,
  universalWrapper,
  setFuses,
  setChildFuses,
  commitName,
  createSubname,
  deleteSubname,
  getAvailable,
  getDecryptedName,
  getDNSOwner,
  getExpiry,
  getHistory,
  getName,
  getNames,
  getOwner,
  getPrice,
  getProfile,
  getResolver,
  getAddr,
  getContentHash,
  getText,
  getABI,
  _getAddr,
  _getContentHash,
  _getText,
  _getABI,
  getSubnames,
  getWrapperData,
  importDNSSECName,
  registerName,
  renewNames,
  extendWrappedName,
  setName,
  setRecord,
  setRecords,
  setResolver,
  supportsTLD,
  transferController,
  transferName,
  transferSubname,
  unwrapName,
  wrapName,
  getVouchers,
  validateVoucher,

  // algo
  mergedPool: {
    getPoolInfo: mergedPool_getPoolInfo,
    getUserPoolAmount: mergedPool_getUserPoolAmount,
    getUserPoolNfts: mergedPool_getUserPoolNfts,
    pendingToken: mergedPool_getPendingToken,
  },
  vesting: {
    remainingLockedOf: vesting_remainingLockedOf,
    canUnlockAmount: vesting_canUnlockAmount,
  },
  erc20: {
    balanceOf: erc20_balanceOf,
    allowance: erc20_allowance,
    approve: erc20_approve,
    totalSupply: erc20_totalSupply,
  },
  nameWrapper: {
    isApprovedForAll: nameWrapper_isApprovedForAll,
  },
  uniswapV2Pair: {
    getReserves: uniswapV2Pair_getReserves,
  },
  bank: {
    balanceOf: bank_balanceOf,
    canClaimReward: bank_canClaimReward,
    canWithdraw: bank_canWithdraw,
    earned: bank_earned,
    epoch: bank_epoch,
    nextEpochPoint: bank_nextEpochPoint,
    seatInfoOf: bank_seatInfoOf,
    rewardLockupEpochs: bank_rewardLockupEpochs,
    withdrawLockupEpochs: bank_withdrawLockupEpochs,
  },
  treasury: {
    epoch: treasury_epoch,
    maxSupplyExpansionPercent: treasury_maxSupplyExpansionPercent,
    seigniorageBankPercent: treasury_seigniorageBankPercent,
  },
};
