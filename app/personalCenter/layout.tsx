"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TokenZoneLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();

    return (
        <div className="relative flex h-[calc(100vh-5rem)] z-9">
            <div className="w-120 pt-8 bg-white">
                <Tabs
                    aria-label="Options"
                    className="flex"
                    classNames={{
                        base: "justify-center",
                        tabList: "bg-white text-bold p-3",
                        cursor: "bg-[#F31260]",
                        tabContent: "font-bold w-full",
                    }}
                    selectedKey={path}
                    isVertical={true}
                    variant="underlined"
                >
                    <Tab
                        key="/personalCenter/myAssets"
                        title={
                            <Link
                                href="/personalCenter/myAssets"
                                className="flex items-center justify-center py-1 px-3"
                            >
                                <span className="icon-[ic--baseline-art-track] mr-1 text-2xl"></span>
                                My Assets
                            </Link>
                        }
                    />
                    <Tab
                        key="/personalCenter/myInspiration"
                        title={
                            <Link
                                href="/personalCenter/myInspiration"
                                className="flex items-center justify-center"
                            >
                                <span className="icon-[ic--baseline-wallet] mr-1 text-2xl text-black"></span>
                                My Inspiration
                            </Link>
                        }
                    />
                    <Tab
                        key="/personalCenter/myPoints"
                        title={
                            <Link
                                href="/personalCenter/myPoints"
                                className="flex items-center justify-center"
                            >
                                <span className="icon-[ic--outline-auto-awesome] mr-1 text-2xl text-black"></span>
                                My Points
                            </Link>
                        }
                    />
                </Tabs>
            </div>
            <div className="md:px-12 md:py-8 w-full bg-[#F1F1F1]">
                <div className="bg-white rounded-lg h-full overflow-hidden shadow-[0_0px_20px_#00000010]">
                    {children}
                </div>
            </div>
        </div>
    );
}

