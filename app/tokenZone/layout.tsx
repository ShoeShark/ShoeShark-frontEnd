"use client"
import { Tabs, Tab } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function TokenZoneLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const handleTabChange = (path: string) => {
        router.push(path)
    };
    return <div className="relative">
        <Tabs
            aria-label="Options"
            className="flex py-6"
            classNames={{
                base: 'justify-center',
                tabList: 'bg-white text-bold p-3',
                cursor: 'bg-[#F2F2F2]',
                tabContent: 'font-bold'
            }}
            onSelectionChange={handleTabChange}
        >
            <Tab key="/tokenZone" title="Token Swap" />
            <Tab key="/tokenZone/nftMarket" title="NFT Market" />
        </Tabs>
        {children}
    </div>

}
