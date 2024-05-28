"use client"
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TokenZoneLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname();

    const defaultVal = path == "/tokenZone" || path == "/tokenZone/tokenSwap" ? "/tokenZone" : "/tokenZone/nftMarket";
    const [value, setValue] = useState(defaultVal);

    const handleTabChange = (path: string) => {
        if (path !== value) {
            setValue(path)
        }
    };

    return <div className="relative">
        <Tabs
            aria-label="Options"
            className="flex py-6"
            classNames={{
                base: 'justify-center',
                tabList: 'bg-white text-bold p-3',
                cursor: 'shadow-[0_0_4px_#F31260]',
                tabContent: 'font-bold'
            }}
            selectedKey={value}
            onSelectionChange={handleTabChange}
            color="danger"
        >
            <Tab
                key="/tokenZone/tokenSwap"
                title={
                    <Link
                        href="/tokenZone/tokenSwap"
                    >
                        Token Swap
                    </Link>
                } />
            <Tab
                key="/tokenZone/nftMarket"
                title={
                    <Link
                        href="/tokenZone/nftMarket"
                    >
                        NFT Market
                    </Link>
                } />
        </Tabs>
        {children}
    </div>

}
