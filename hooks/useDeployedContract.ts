// import { useIsMounted } from "usehooks-ts";
// import { Contract, ContractCodeStatus, ContractName, contracts } from "@/utils/contract";
// import { usePublicClient } from "wagmi";
// import { useTargetNetwork } from "./useTargetNetwork";
//
// export const useDeployedContractInfo = <TContractName extends ContractName>(contractName: TContractName) => {
//   const isMounted = useIsMounted();
//   const { targetNetwork } = useTargetNetwork();
//   const deployedContract = contracts?.[targetNetwork.id]?.[contractName as ContractName] as Contract<TContractName>;
//   const [status, setStatus] = useState<ContractCodeStatus>(ContractCodeStatus.LOADING);
//   const publicClient = usePublicClient({ chainId: targetNetwork.id });
//   //
//   useEffect(() => {
//     const checkContractDeployment = async () => {
//       if (!deployedContract) {
//         setStatus(ContractCodeStatus.NOT_FOUND);
//         return;
//       }
//       try {
//         const code = await publicClient?.getBytecode({
//           address: deployedContract.address,
//         });
//         if (!isMounted()) {
//           return;
//         }
//
//         if (code === "0x") {
//           setStatus(ContractCodeStatus.NOT_FOUND);
//           return;
//         }
//         setStatus(ContractCodeStatus.DEPLOYED);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//
//     checkContractDeployment();
//   }, [isMounted, contractName, deployedContract, publicClient]);
//
//   return {
//     data: status === ContractCodeStatus.DEPLOYED ? deployedContract : undefined,
//     isLoading: status === ContractCodeStatus.LOADING,
//   };
// };
