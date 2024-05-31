"use client"

import { NFT_MARKET } from 'contracts/NFTMarket';
import { formatUnits } from 'viem';
import { publicClient } from 'config';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const WithLoadingList = dynamic(
    () => import('./list'),
    {
        loading: () => <div className="w-full mx-20 mt-14 max-h-full min-h-[34rem] bg-[#fff] rounded-lg shadow-md grid grid-cols-5 gap-5 p-5">
            {
                Array(10).fill("").map(() =>
                    <div className="skeleton h-64"></div>
                )
            }
        </div>
    }
)

export default function NFTMarket() {
    const variants = {
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
    }

    async function getData() {
        const nftsData = await publicClient.readContract({
            abi: NFT_MARKET.abi,
            address: NFT_MARKET.address,
            functionName: "getAllNFTs"
        })

        if (!nftsData) {
            setMetadataArr([])
            return
        }
        const reqs = nftsData?.map(async item => {
            const res = await fetch(item.tokenUri)
            const metadata = await res.json()

            const src = metadata.image.replace("ipfs://", "https://white-left-chameleon-515.mypinata.cloud/ipfs/")
            return {
                name: metadata.name,
                image: src + '.png',
                price: formatUnits(item.price, 18),
                id: item.tokenId.toString(),
                seller: item.seller
            }
        })
        const data = await Promise.all(
            reqs || []
        )
        setMetadataArr(data)

    }

    const [metadataArr, setMetadataArr] = useState<Array<Record<string, any>>>([])

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="flex w-screen justify-center mt-10">
            <WithLoadingList listData={metadataArr} refetchList={getData} />
        </div>
    );
}
