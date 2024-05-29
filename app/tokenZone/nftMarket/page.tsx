'use client'
import { useState, useEffect } from 'react';
import { Image, Pagination, Button } from "@nextui-org/react";
import { BarsArrowUpIcon, BarsArrowDownIcon } from '@heroicons/react/20/solid';
import { useWriteContract, useSimulateContract, useReadContract, useChainId } from 'wagmi';
import { parseUnits } from 'viem';
import contractABI from "./DeployShoeSharkNftMarket.json"
import { ethers } from "ethers";


export default function NFTMarket() {

    const contractAddress = '0x09cE8D7E2eC68C4445c8a7D1B922ebc0EFCe2366';
    const provider = new ethers.JsonRpcProvider(`https://avalanche-fuji.infura.io/v3/599c8e1c92a54659b339ecbaad80c39c`)
    const nftContract = new ethers.Contract(contractAddress, contractABI, provider)


    const initialData = [
        { id: 1, name: "Shark001", price: 1200, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 2, name: "Shark002", price: 800, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 3, name: "Shark003", price: 1500, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 4, name: "Shark004", price: 900, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 5, name: "Shark005", price: 700, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 6, name: "Shark006", price: 1100, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 7, name: "Shark007", price: 1300, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 8, name: "Shark008", price: 600, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 9, name: "Shark009", price: 1400, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
        { id: 10, name: "Shark010", price: 950, imgSrc: "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png" },
    ];

    const itemsPerPage = 8;
    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('none'); // none, ascending, descending

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const useBuyNFT = (nftId, price) => {
        // const { data } = useSimulateContract({
        //     address: contractAddress,
        //     abi: contractABI,
        //     functionName: 'buy',
        //     args: [nftId],
        //     overrides: {
        //         value: parseUnits(price.toString(), 18), // Assuming `price` is in Ether, converting to Wei
        //     },
        // });

        // const { write } = useWriteContract(config);

        // write()
    };
    //获取nft list
    const getData = async () => {
        try {
            const nfts = await nftContract.getAllNFTs();
            console.log("NFT数据：", nfts);
        } catch (error) {
            console.error("获取NFT详情时出错:", error);
        }
    }
    useEffect(() => {
        getData();
    })
    const handleSortChange = () => {
        let newSortOrder;
        let sortedData = [...data];
        if (sortOrder === 'none' || sortOrder === 'descending') {
            newSortOrder = 'ascending';
            sortedData.sort((a, b) => a.price - b.price);
        } else {
            newSortOrder = 'descending';
            sortedData.sort((a, b) => b.price - a.price);
        }
        setSortOrder(newSortOrder);
        setData(sortedData);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex w-screen justify-center">
            <div className="w-4/5 max-h-svh min-h-96">
                <div className="flex mb-3.5 justify-between">
                    <div className="flex justify-end w-full">
                        <Button
                            auto
                            light
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

                <div className="w-full h-min max-h-full bg-[#fff] rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pb-5">
                    {
                        currentData.map((item) => (
                            <div key={item.id} className="mt-5 mx-10 relative">
                                <Image
                                    isZoomed
                                    width={210}
                                    src={item.imgSrc}
                                />
                                <div className="absolute bg-opacity-60 bottom-0 left-0 w-full h-12 bg-[#fff] z-10 flex justify-between p-2 items-center">
                                    <div>
                                        <div className="text-xs">{item.name}</div>
                                        <div className="text-xs">price: {item.price}SST</div>
                                    </div>
                                    <Button color="danger" size="sm" variant="ghost" onClick={useBuyNFT(item.id, item.price)}>
                                        buy
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-start mt-3 w-full">
                    <Pagination
                        isCompact
                        showControls
                        color="default"
                        classNames={{
                            active: "bg-gray-700 text-white", // 修改当前页的背景色和文字颜色
                            item: "text-gray-700", // 修改分页项的文字颜色
                            prev: "text-gray-700", // 修改上一页按钮的文字颜色
                            next: "text-gray-700", // 修改下一页按钮的文字颜色
                        }}
                        showShadow
                        page={currentPage}
                        total={totalPages}
                        variant="light"
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}
