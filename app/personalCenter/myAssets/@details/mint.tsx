"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { getMintRaw } from "actions/nft";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { SHOESHARK_NFT } from "contracts/NFT";
import { publicClient } from "config";
import toast from "react-hot-toast";
import { bytesToHex, fromBytes, stringToBytes, stringToHex, toBytes, toHex } from "viem";


export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { writeContractAsync } = useWriteContract()
    const { address } = useAccount()
    const [proof, setProof] = useState<`0x${string}`[]>([])
    async function getProof() {
        const { data } = await getMintRaw()

        if (data.proof) {
            setProof(data.proof.map((str: string) => `0x${str}`))
        }
    }
    const { data: isMinted } = useReadContract({
        ...SHOESHARK_NFT,
        functionName: "s_HasMinted",
        args: [address!]
    })

    async function mint() {
        const tx = await writeContractAsync({
            ...SHOESHARK_NFT,
            functionName: "mintWhiteList",
            args: [address!, proof]
        })

        if (tx) {
            const { status } = await publicClient.waitForTransactionReceipt({ hash: tx })
            if (status == "success") {
                toast.success("mint success");
                return
            }
        }
        toast.error("mint failed");
    }
    useEffect(() => {
        getProof()
    }, [])

    return (
        <>
            {
                !isMinted && proof.length ?
                    <button onClick={onOpen} className="btn btn-xs btn-outline">mint</button>
                    : null
            }
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">NFT Mint</ModalHeader>
                            <ModalBody>
                                <p>
                                    You are egiable.
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={mint}>
                                    Mint
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
