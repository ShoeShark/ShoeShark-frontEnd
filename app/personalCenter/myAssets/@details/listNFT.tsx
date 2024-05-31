import {
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { publicClient } from "config";
import { SHOESHARK_NFT } from "contracts/NFT";
import { NFT_MARKET } from "contracts/NFTMarket";
import toast from "react-hot-toast";
import { encodeAbiParameters, parseAbiParameters, parseUnits } from "viem";
import { useAccount, useWriteContract } from "wagmi";

type Props = {
    isOpen: boolean
    onOpen: () => void
    onOpenChange: () => void
    tokenId: bigint
    tokenURI: string
    isModify: boolean
}
export default function ListNFT({
    isOpen,
    onOpenChange,
    onOpen,
    tokenId,
    tokenURI,
    isModify = false
}: Props) {
    const { address } = useAccount()

    const [value, setValue] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    const { writeContract } = useWriteContract()

    useEffect(() => {
        setValue("")
    }, [isOpen])

    async function listItem() {
        const params = encodeAbiParameters(
            parseAbiParameters('uint, string'),
            [parseUnits(value, 18), tokenURI]
        )
        const { request } = await publicClient.simulateContract({
            ...SHOESHARK_NFT,
            functionName: 'safeTransferFrom',
            args: [
                address!,
                NFT_MARKET.address,
                tokenId,
                params
            ],
        })

        writeContract(request, {
            async onSettled(tx) {
                if (!tx) return
                setBtnLoading(true)
                await publicClient.waitForTransactionReceipt({ hash: tx! })
                toast.success("list success!")
                setBtnLoading(false)
                onOpenChange()
            }

        })
    }

    async function changePrice() {
        console.log(tokenId)
        // const { request } = await publicClient.simulateContract({
        //     ...NFT_MARKET,
        //     functionName: 'changePrice',
        //     args: [tokenId, parseUnits(value, 18)]
        // })

        writeContract({
            ...NFT_MARKET,
            functionName: 'changePrice',
            args: [tokenId, parseUnits(value, 18)]
        }, {
            async onSettled(tx) {
                if (!tx) return
                setBtnLoading(true)
                await publicClient.waitForTransactionReceipt({ hash: tx! })
                toast.success("list success!")
                setBtnLoading(false)
                onOpenChange()
            }

        })

    }

    async function confirm() {
        if (isModify) {
            changePrice()

        } else {
            listItem()
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{isModify ? "Change Price" : "List your NFT"}</ModalHeader>
                            <ModalBody>
                                <div className="flex justify-center">
                                    <Input
                                        type="number"
                                        className="w-auto"
                                        label="Set Price"
                                        labelPlacement="outside-left"
                                        value={value}
                                        onValueChange={setValue}
                                    />

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button isLoading={btnLoading} color="danger" onPress={confirm}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
