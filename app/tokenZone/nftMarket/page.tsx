
'use client'
import { Select, SelectItem, Input, Image, Pagination, Button } from "@nextui-org/react";
import { ListBulletIcon } from '@heroicons/react/20/solid';
export default function NFTMarket() {
    const timeOptions = [
        {
            label: "recent",
            value: "recent",
            id: 1
        },
        {
            label: "beforeToday",
            value: "beforeToday",
            id: 2
        },
    ]

    return <div className="flex w-screen justify-center">

        <div className="w-4/5 max-h-svh min-h-96">
            <div className="flex mb-3.5 justify-between">
                <div className="flex">
                    {/* color={"success"} */}
                    <Select
                        items={timeOptions}
                        labelPlacement="outside"
                        placeholder="Please select time period"
                        className="max-w-52 "
                    // defaultSelectedKeys={["recent"]}
                    >
                        {(opt) => (
                            <SelectItem
                                key={opt.id}
                                value={opt.value}
                            >
                                {opt.label}
                            </SelectItem>
                        )}
                    </Select>
                    <Select
                        placeholder="Please select sorting"
                        className="max-w-52 mx-7"
                    >
                        {timeOptions.map((opt) => (
                            <SelectItem
                                key={opt.id}
                                value={opt.value}
                            >
                                {opt.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input type="text" className="max-w-52"
                        placeholder="Search by name" />
                </div>
                {/* <div>
                    <ListBulletIcon className="h-auto w-5 " aria-hidden="true" />
                </div> */}
            </div>

            <div className="w-full h-min max-h-full bg-[#fff] rounded-lg shadow-md flex flex-wrap justify-around pb-5">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div className="mt-5 mx-10 relative">
                            <Image
                                isZoomed
                                width={200}
                                alt="NextUI Fruit Image with Zoom"
                                src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
                            />
                            <div className="absolute bg-opacity-60 bottom-0 left-0 w-full h-12 bg-[#fff] z-10 flex justify-between p-2 items-center">
                                <div>
                                    <div className="text-xs">Shark001</div>
                                    <div className="text-xs">price: 1200SST</div>
                                </div>
                                <Button color="danger" size="sm" variant="ghost">
                                    buy
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-items-start mt-3 w-full">
                <Pagination
                    isCompact
                    showControls
                    color="default"
                    showShadow
                    page={1}
                    total={2}
                    variant="light"
                    onChange={(page) => { }}
                />
            </div>

        </div>
    </div >

}
