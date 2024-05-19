// import { Abi } from "abitype";
// import { Address } from "viem";
// import contractsData from "@/contracts/deployedContracts";
// import { chainConfig } from "@/utils/config";
//
// export type InheritedFunctions = { readonly [key: string]: string };
//
// export type GenericContract = {
//   address: Address;
//   abi: Abi;
//   inheritedFunctions?: InheritedFunctions;
//   external?: true;
// };
//
// export type GenericContractsDeclaration = {
//   [chainId: number]: {
//     [contractName: string]: GenericContract;
//   };
// };
//
// export const contracts = contractsData as GenericContractsDeclaration | null;
//
// type ConfiguredChainId = (typeof chainConfig)["targetNetworks"][0]["id"];
//
// type IsContractDeclarationMissing<TYes, TNo> = typeof contractsData extends { [key in ConfiguredChainId]: any }
//   ? TNo
//   : TYes;
//
// type ContractsDeclaration = IsContractDeclarationMissing<GenericContractsDeclaration, typeof contractsData>;
//
// type Contracts = ContractsDeclaration[ConfiguredChainId];
//
// export type ContractName = keyof Contracts;
//
// export type Contract<TContractName extends ContractName> = Contracts[TContractName];
//
// type InferContractAbi<TContract> = TContract extends { abi: infer TAbi } ? TAbi : never;
//
// export type ContractAbi<TContractName extends ContractName = ContractName> = InferContractAbi<Contract<TContractName>>;
//
// export enum ContractCodeStatus {
//   "LOADING",
//   "DEPLOYED",
//   "NOT_FOUND",
// }
