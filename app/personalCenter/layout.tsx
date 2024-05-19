"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function TokenZoneLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const handleTabChange = (path: string) => {
        router.push(path);
    };
    return (
        <div className="relative flex h-[calc(100vh-80px)]">
            <div className="w-120 pt-8 bg-white">
                <Tabs
                    aria-label="Options"
                    className="flex"
                    classNames={{
                        base: "justify-center",
                        tabList: "bg-white text-bold p-3",
                        cursor: "bg-[#F31260]",
                        tabContent: "font-bold",
                    }}
                    onSelectionChange={handleTabChange}
                    isVertical={true}
                    variant="underlined"
                >
                    <Tab key="/personalCenter" title="My Assets" />
                    <Tab
                        key="/personalCenter/myInspiration"
                        title="My Inspiration"
                    />
                    <Tab key="/personalCenter/myPoints" title="My Points" />
                </Tabs>
            </div>
            <div className="md:px-12 md:py-8 w-full bg-[#F1F1F1]">
                <div className="bg-white rounded-lg h-full shadow-[0_0px_20px_#00000010]">
                    {children}
                </div>
            </div>
        </div>
    );
}

