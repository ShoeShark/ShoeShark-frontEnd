"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { getMintRaw } from "actions/nft";

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    async function tst() {
        const res = await getMintRaw()

        console.log(res)
    }
    useEffect(() => {
        tst()
    }, [])

    return (
        <>
            <button onClick={onOpen} className="btn btn-xs btn-outline">mint</button>
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
                                <Button color="danger" onPress={onClose}>
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
