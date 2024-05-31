"use client"

import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";
import { erc20Abi, formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { Address } from "abitype";
import { formatNumber } from "utils/format";
import { SST } from "config/constants/token";
import { SHOESHARK_NFT } from "contracts/NFT";
import { publicClient } from "config";
import { useDisclosure } from "@nextui-org/react";
import ListNFT from "./listNFT"
import { NFT_MARKET } from "contracts/NFTMarket";
import Mint from "./mint";

export default function Assets() {

    const { address } = useAccount()

    const { data: sstBalance } = useReadContract({
        abi: erc20Abi,
        address: SST,
        functionName: 'balanceOf',
        args: [address as Address]
    })

    const nftContract = {
        address: SHOESHARK_NFT.address,
        abi: SHOESHARK_NFT.abi,
    }
    const { data: metaUrl } = useReadContract({
        ...nftContract,
        functionName: "getMetadataUri"
    })

    const [nftList, setNftList] = useState<Array<Record<string, any>>>([])
    const [currentNFT, setCurrentNFT] = useState<Record<string, any>>({})

    async function getNFT() {
        async function generate(tokenId: bigint, tokenURI: string, isMarket: boolean) {
            const res = await fetch(tokenURI)
            const metadata = await res.json()
            const src = metadata.image.replace("ipfs://", "https://white-left-chameleon-515.mypinata.cloud/ipfs/")

            return {
                ...metadata,
                image: src + ".png",
                tokenId,
                tokenURI,
                listed: isMarket
            }
        }
        async function getMyNFT() {
            const amount = await publicClient.readContract({
                ...nftContract,
                functionName: "balanceOf",
                args: [address!]
            })

            let tokens: Record<string, string>[] = []
            for (let i = 1; i <= amount; i++) {
                const tokenId = await publicClient.readContract({
                    ...nftContract,
                    functionName: "tokenOfOwnerByIndex",
                    args: [address!, BigInt(i - 1)]
                })
                const tokenURI = metaUrl! + String(tokenId)

                tokens.push(await generate(tokenId, tokenURI, false))
            }
            return tokens
        }
        async function getFromMarket() {
            const nfts = await publicClient.readContract({
                ...NFT_MARKET,
                functionName: "getAllNFTs",
            })
            return await Promise.all(
                nfts
                    .filter(item => item.seller == address)
                    .map(item => generate(item.tokenId, item.tokenUri, true))
            )
        }
        const [...tokens] = await Promise.all([
            getMyNFT(),
            getFromMarket()
        ])
        console.log(tokens)

        setNftList(tokens.flat(1))
    }

    useEffect(() => {
        if (address && metaUrl)
            getNFT()
    }, [address, metaUrl])

    const [, copy] = useCopyToClipboard()

    const handleCopy = () => {
        copy(SST)
            .then(() => {
                toast.success("copy success")
            })
    }

    const formatVal = (num: bigint | undefined) => {
        if (!num) return ''
        return formatNumber(formatEther(num))
    }

    const { isOpen: isOpenList, onOpen: onOpenList, onOpenChange: onOpenListChange } = useDisclosure();

    function closeListModal() {

        getNFT()
        onOpenListChange()
    }

    function openListModal(item: Record<string, any>, isModify: boolean) {
        setCurrentNFT({
            ...item,
            isModify
        })
        onOpenList()
    }


    return <>
        <div className="card w-96 bg-base-100 shadow-[0_0_8px_rgba(0,0,0,.1)]">
            <div className="card-body py-6 gap-0">
                <h3 className="card-title">Shoe Shark Token
                    <button
                        className="icon-[ic--round-content-copy] w-4 h-4"
                        onClick={handleCopy}
                    />
                </h3>
                <div className="flex items-center">
                    Balance:
                    <span className="text-2xl ml-2 truncate">{formatVal(sstBalance)}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center mt-2 gap-3">
            <h2 className="my-4 font-bold">Nfts</h2>
            <Mint />
        </div>
        <div className="flex flex-wrap gap-8">
            {
                nftList.map(item =>
                    <div key={item.name} className="card card-compact w-[12rem] bg-base-100 shadow-xl">
                        <figure className="overflow-hidden">
                            <img className="hover:scale-105 transition" src={item.image} alt="Shoes" />
                        </figure>
                        <div className="card-body !py-2 !pb-1 gap-0">
                            <h2 className="card-title text-lg">{item.name}</h2>
                            <div className="card-actions justify-between">
                                <span className="text-[#A5A5A5]">{item.listed ? "listed" : "unlisted"}</span>
                                <div className="dropdown dropdown-top">
                                    <div tabIndex={0} role="button" className="icon-[ic--baseline-more-horiz] w-6 h-6 cursor-pointer"></div>
                                    <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32">
                                        {
                                            item.listed ? <li>
                                                <button onClick={() => openListModal(item, true)}>Modify Price</button>
                                            </li>
                                                : <li>
                                                    <button onClick={() => openListModal(item, false)}>List NFT</button>
                                                </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <ListNFT
                isOpen={isOpenList}
                onOpen={onOpenList}
                onOpenChange={closeListModal}
                tokenId={currentNFT.tokenId}
                tokenURI={currentNFT.tokenURI}
                isModify={currentNFT.isModify}
            />

        </div>
    </>

}


