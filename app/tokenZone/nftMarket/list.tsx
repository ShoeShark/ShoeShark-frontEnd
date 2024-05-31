import { toast } from "react-hot-toast";
import { useState, } from 'react';
import { Image, Pagination, Button, Card, CardFooter } from "@nextui-org/react";
import { BarsArrowUpIcon, BarsArrowDownIcon } from '@heroicons/react/20/solid';
import { useAccount, useReadContracts, useWriteContract } from 'wagmi';
import { publicClient } from 'config';
import { NFT_MARKET } from 'contracts/NFTMarket';
import { Address, erc20Abi, parseUnits } from 'viem';
import { SST } from 'config/constants/token';
import { notification } from "antd";
import MotionLayout from "components/MotionLayout";

type Props = {
    listData?: Record<string, any>[]
    refetchList: () => void
}

export default function MarketList({ listData = [], refetchList }: Props) {
    const account = useAccount()
    const { writeContract } = useWriteContract()

    const itemsPerPage = 10;
    const [data, setData] = useState<typeof listData>([]);
    useEffect(() => {
        if (listData.length)
            setData([...listData])
    }, [listData])

    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('none'); // none, ascending, descending

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const sstContract = {
        abi: erc20Abi,
        address: SST as Address
    }
    const { data: sstData, refetch } = useReadContracts({
        contracts: [
            {
                ...sstContract,
                functionName: "allowance",
                args: [account.address!, NFT_MARKET.address]
            },
            {
                ...sstContract,
                functionName: "balanceOf",
                args: [account.address!]
            }
        ]

    })


    function checkBuy(price: bigint) {
        if (!sstData) return
        const { result: balance } = sstData[1]

        if (balance && balance >= price) {
            return true
        }
        toast.error("balance insufficient.")
        return false
    }

    function checkApprove(price: bigint) {
        if (!sstData) return
        const { result: allowance } = sstData[0]

        return allowance && allowance! > price
    }

    async function approve(price: bigint) {
        const { request } = await publicClient.simulateContract({
            ...sstContract,
            account: account.address,
            functionName: "approve",
            args: [NFT_MARKET.address, price],
        });

        return new Promise((resolve) => {
            writeContract(request, {
                async onSettled(tx) {
                    toast.loading("waiting for transaction")

                    resolve(tx!)
                },
            })
        }) as Promise<Address>

    }

    async function handleBuy(nftId: string, price: string) {
        const _price = parseUnits(price, 18)
        if (!checkBuy(_price)) return

        if (!checkApprove(_price)) {
            try {
                const tx = await approve(_price)
                await publicClient.waitForTransactionReceipt(
                    { hash: tx! }
                )
            } catch (err) {
                console.log(err)
                return

            }
        }

        const { request } = await publicClient.simulateContract({
            account: account.address,
            address: NFT_MARKET.address,
            abi: NFT_MARKET.abi,
            functionName: "buy",
            args: [BigInt(nftId)],
        });

        writeContract(request, {
            async onSettled(tx) {
                if (!tx) return
                notification.info({
                    key: "nft_tx",
                    message: "waiting for transaction"
                })
                const { status } = await publicClient.waitForTransactionReceipt(
                    { hash: tx! }
                )

                if (status == "success") {
                    notification.success({
                        key: "nft_tx",
                        message: "transaction completed!"
                    })
                } else {
                    notification.error({
                        key: "nft_tx",
                        message: "transaction failed!"
                    })
                }

                refetch()
                refetchList()
            }
        })
    }

    function unlist(nftId: string) {
        writeContract({
            ...NFT_MARKET,
            functionName: "cancelOrder",
            args: [BigInt(nftId)]
        }, {
            async onSettled(tx) {
                if (!tx) return
                notification.info({
                    key: "nft_tx",
                    message: "waiting for transaction"
                })
                const { status } = await publicClient.waitForTransactionReceipt(
                    { hash: tx }
                )

                if (status == "success") {
                    notification.success({
                        key: "nft_tx",
                        message: "transaction completed!"
                    })
                } else {
                    notification.error({
                        key: "nft_tx",
                        message: "transaction failed!"
                    })
                }

                refetch()
                refetchList()
            }
        })

    }

    const handleSortChange = () => {
        let newSortOrder: 'ascending' | 'descending';
        let sortedData = [...data];
        if (sortOrder === 'none' || sortOrder === 'descending') {
            newSortOrder = 'ascending';
            sortedData.sort((a, b) => Number(a.price) - Number(b.price));
        } else {
            newSortOrder = 'descending';
            sortedData.sort((a, b) => Number(b.price) - Number(a.price));
        }
        setSortOrder(newSortOrder);
        setData(sortedData);
    };

    return (
        <MotionLayout className="w-full px-20 max-h-svh min-h-96">
            <div className="flex mb-3.5 justify-between">

                <div className="flex justify-end w-full">
                    <Button
                        onClick={handleSortChange}
                        startContent={
                            sortOrder === 'ascending' ? (
                                <BarsArrowUpIcon className="w-5 h-5" />
                            ) : (
                                <BarsArrowDownIcon className="w-5 h-5" />
                            )
                        }
                    >
                        {sortOrder === 'ascending' ? 'Price Low to High' : 'Price High to Low'}
                    </Button>
                </div>
            </div>

            <div className="w-full max-h-full min-h-[34rem] bg-[#fff] rounded-lg shadow-md grid grid-cols-5 gap-5 p-5">
                {
                    currentData.map((item) => (
                        <Card isFooterBlurred key={item.id} className="h-64">
                            <Image
                                removeWrapper
                                alt="Card example background"
                                className="z-0 w-full h-full object-cover hover:scale-115"
                                src={item.image}
                            />
                            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                <div>
                                    <div className="font-bold text-md">{item.name}</div>
                                    <div className="text-black text-sm">{item.price}</div>
                                </div>
                                {
                                    account.address == item.seller ?
                                        <Button
                                            onClick={() => unlist(item.id)}
                                            className="text-tiny"
                                            color="warning"
                                            radius="full"
                                            size="sm"
                                        >
                                            Unlist
                                        </Button>
                                        :
                                        <Button
                                            onClick={() => handleBuy(item.id, item.price)}
                                            className="text-tiny"
                                            color="danger"
                                            radius="full"
                                            size="sm"
                                        >
                                            Buy
                                        </Button>
                                }

                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
            <Pagination
                isCompact
                showControls
                classNames={{
                    base: "absolute bottom-[-4rem]"
                }}
                showShadow
                color="danger"
                page={currentPage}
                total={totalPages}
                variant="light"
                onChange={setCurrentPage}
            />
        </MotionLayout>
    );
}

