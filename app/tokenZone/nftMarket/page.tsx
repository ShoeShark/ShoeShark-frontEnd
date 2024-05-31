"use client"

import { NFT_MARKET } from 'contracts/NFTMarket';
import List from "./list";
import { useWatchContractEvent } from 'wagmi';
import { formatUnits } from 'viem';
import { publicClient } from 'config';

export default function NFTMarket() {

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
            <List listData={metadataArr} refetchList={getData} />
        </div>
    );
}
