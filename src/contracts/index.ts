import type { Interface } from "@ethersproject/abi";
import type { Signer } from "@ethersproject/abstract-signer";
import type { BaseContract } from "@ethersproject/contracts";
import type { Provider } from "@ethersproject/providers";
import type { BaseRegistrarImplementation } from "../generated/BaseRegistrarImplementation";
import type { BulkRenewal } from "../generated/BulkRenewal";
import type { DNSRegistrar } from "../generated/DNSRegistrar";
import type { ENSRegistry } from "../generated/ENSRegistry";
import type { ETHRegistrarController } from "../generated/ETHRegistrarController";
import type { Multicall } from "../generated/Multicall";
import type { NameWrapper } from "../generated/NameWrapper";
import type { PublicResolver } from "../generated/PublicResolver";
import type { ReverseRegistrar } from "../generated/ReverseRegistrar";
import type { UniversalResolver } from "../generated/UniversalResolver";
import type { Voucher } from "../generated/Voucher";
import type { Referral } from "../generated/Referral";
import type { Treasury } from "../generated-algo/Treasury";
import type { MergedPool } from "../generated-algo/MergedPool";
import type { Vesting } from "../generated-algo/Vesting";
import type { ERC20 } from "../generated-algo/ERC20";
import type { Bank } from "../generated-algo/Bank";
import type { IUniswapV2Pair } from "../generated-algo/IUniswapV2Pair";
import { ContractAddressFetch } from "./getContractAddress";
import { ContractName, ContractNameAlgo } from "./types";

type BaseFactory = {
  readonly abi: object;
  createInterface(): Interface;
  connect(address: string, signerOrProvider: Signer | Provider): BaseContract;
};

export default class ContractManager {
  private provider: Provider;

  private fetchAddress: ContractAddressFetch;

  // eslint-disable-next-line class-methods-use-this
  protected getModule = async (name: string, suffix?: string) => {
    const mod = await import(
      /* webpackMode: "lazy", webpackChunkName: "[request]", webpackPreload: true, webpackExclude: /.*\.ts$/ */
      `../generated${suffix ? `-${suffix}` : ""}/factories/${name}__factory`
    );
    return mod[`${name}__factory`] as BaseFactory;
  };

  constructor(
    provider: Provider,
    fetchAddress: ContractAddressFetch,
    getModule?: (name: string) => Promise<BaseFactory>
  ) {
    this.provider = provider;
    this.fetchAddress = fetchAddress;
    if (getModule) {
      this.getModule = getModule;
    }
  }

  private generateContractGetter = <C extends BaseContract>(
    name: ContractName,
    suffix?: string
  ): ((passedProvider?: any, address?: string) => Promise<C>) => {
    return async (passedProvider, address) => {
      const mod = await this.getModule(name, suffix);
      const inputAddress = address || this.fetchAddress(name);
      const provider = passedProvider || this.provider;
      return mod.connect(inputAddress, provider) as C;
    };
  };

  private generateAlgoContractGetter = <C extends BaseContract>(
    name: ContractNameAlgo
  ): ((address: string, passedProvider?: any) => Promise<C>) => {
    return async (address, passedProvider) => {
      const mod = await this.getModule(name, "algo");
      const provider = passedProvider || this.provider;
      return mod.connect(address, provider) as C;
    };
  };

  public getPublicResolver =
    this.generateContractGetter<PublicResolver>("PublicResolver");

  public getUniversalResolver =
    this.generateContractGetter<UniversalResolver>("UniversalResolver");

  public getRegistry = this.generateContractGetter<ENSRegistry>("ENSRegistry");

  public getReverseRegistrar =
    this.generateContractGetter<ReverseRegistrar>("ReverseRegistrar");

  public getNameWrapper =
    this.generateContractGetter<NameWrapper>("NameWrapper");

  public getDNSRegistrar =
    this.generateContractGetter<DNSRegistrar>("DNSRegistrar");

  public getBaseRegistrar =
    this.generateContractGetter<BaseRegistrarImplementation>(
      "BaseRegistrarImplementation"
    );

  public getEthRegistrarController =
    this.generateContractGetter<ETHRegistrarController>(
      "ETHRegistrarController"
    );

  public getMulticall = this.generateContractGetter<Multicall>("Multicall");

  public getBulkRenewal =
    this.generateContractGetter<BulkRenewal>("BulkRenewal");

  public getVoucher = this.generateContractGetter<Voucher>("Voucher");

  public getReferral = this.generateContractGetter<Referral>("Referral");

  // algo
  public getBank = this.generateAlgoContractGetter<Bank>("Bank");

  public getTreasury = this.generateAlgoContractGetter<Treasury>("Treasury");

  public getVesting = this.generateAlgoContractGetter<Vesting>("Vesting");

  public getMergedPool =
    this.generateAlgoContractGetter<MergedPool>("MergedPool");

  public getERC20 = this.generateAlgoContractGetter<ERC20>("ERC20");

  public getUniswapV2Pair =
    this.generateAlgoContractGetter<IUniswapV2Pair>("IUniswapV2Pair");
}
