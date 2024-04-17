import { ContractName, SupportedNetworkId } from "./types";

const addresses: Record<
  ContractName,
  Partial<Record<SupportedNetworkId, string>> | string
> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  BaseRegistrarImplementation: {
    "1": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    "5": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    "11155111": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    "168587773": "0xcedaEA708Aa3A3D49FE6b70De4772ee53644923b",
    "81457": "0x33e42C11ac7CffA57d907B1152b66375B4053080",
  },
  DNSRegistrar: {
    "1": "0x58774Bb8acD458A640aF0B88238369A167546ef2",
    "5": "0x8edc487D26F6c8Fa76e032066A3D4F87E273515d",
  },
  ETHRegistrarController: {
    "1": "0x253553366Da8546fC250F225fe3d25d0C782303b",
    "5": "0xCc5e7dB10E65EED1BBD105359e7268aa660f6734",
    "11155111": "0xFED6a969AaA60E4961FCD3EBF1A2e8913ac65B72",
    "168587773": "0x675e732a359E193d7a529De862D62859a91E456E",
    "81457": "0x6B25A01A9ab495c89049ecABeacfaD22eBD81cD6",
  },
  Multicall: {
    "1": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "5": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "11155111": "0xcA11bde05977b3631167028862bE2a173976CA11",
    "168587773": "0x086942465a6606b06474B82fF485D1cEb8c2daCB",
    "81457": "0x4c91c170464d79Dac6e8eE96453a32FFb06Bb30c",
  },
  NameWrapper: {
    "1": "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
    "5": "0x114D4603199df73e7D157787f8778E21fCd13066",
    "11155111": "0x0635513f179D50A207757E05759CbD106d7dFcE8",
    "168587773": "0xD95B18d4A49fb2d9Bd5096A24fc9F500B9CA6E66",
    "81457": "0xfa35FE39f8FcABB8cb6cB45D707f05Ce2C10125C",
  },
  PublicResolver: {
    "1": "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
    "5": "0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750",
    "11155111": "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD",
    "168587773": "0x9Da675dd95471134B2236f7773C357f2Fa5876fd",
    "81457": "0x7fbe82dCF488f59822277F218662d5F7abB2D353",
  },
  ENSRegistry: {
    "1": "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e",
    "5": "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e",
    "11155111": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    "168587773": "0x9Ea6B48293928B198e8533dC79FA6e78daf6C66B",
    "81457": "0x3F96402C5E7D85D2d6293B5c757088F1126c6b0e",
  },
  ReverseRegistrar: {
    "1": "0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb",
    "5": "0x4f7A657451358a22dc397d5eE7981FfC526cd856",
    "11155111": "0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6",
    "168587773": "0x23Fa0f90cB2d777c1A33889a07A29CdEb8343E39",
    "81457": "0x48B77e588f6a19267EBb1f44a2D35ea80F88A53E",
  },
  UniversalResolver: {
    "1": "0xc0497e381f536be9ce14b0dd3817cbcae57d2f62",
    "5": "0x56522d00c410a43bffdf00a9a569489297385790",
    "11155111": "0x21B000Fd62a880b2125A61e36a284BB757b76025",
    "168587773": "0x43dA34525b3D8efceA5876a1D7A075be00edcbcb",
    "81457": "0xBA64Ce22fd6F036CB59d25C756f34742457C7d81",
  },
  BulkRenewal: {
    "1": "0xa12159e5131b1eEf6B4857EEE3e1954744b5033A",
    "5": "0xeA64C81d0d718620daBC02D61f3B255C641f475F",
    "11155111": "0x4EF77b90762Eddb33C8Eba5B5a19558DaE53D7a1",
    "168587773": "0x17470763a558FdEcBD801FF2CE92a2b29c68D256",
    "81457": "0x82E2398C6fbE753CD7e8A08b85Aa777e95E2c74B",
  },
  Voucher: {
    "168587773": "0x6E653988eaD2FE56F76AE47E10CF7f6E9AfE3191",
    "81457": "0x84BA4E809F5e3E549d7E86fb9A57650CA0427dca",
  },
  Referral: {
    "168587773": "0xA3410c5007c6148e8954e30d6ADa212354b9048E",
    "81457": "0x86CB1a6F17EcC8A6D27BedE6F9DE5081fF9A99e8",
  },
  /* eslint-enable @typescript-eslint/naming-convention */
};

export type ContractAddressFetch = (contractName: ContractName) => string;

export const getContractAddress = (networkId: SupportedNetworkId) =>
  ((contractName: ContractName) => {
    try {
      return typeof addresses[contractName] === "string"
        ? addresses[contractName]
        : addresses[contractName][networkId];
    } catch {
      throw new Error(
        `No address for contract ${contractName} on network ${networkId}`
      );
    }
  }) as ContractAddressFetch;
