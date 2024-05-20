"use client"
import { Tabs, Tab } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";

export default function MyAssetsLayout({ history, details }: {
    history: React.ReactNode
    details: React.ReactNode
}) {

    return <div className="p-8 h-full">
        <Tabs variant="light" color="danger" aria-label="Tabs variants">
            <Tab key="Assets" title="Assets">
                <div className="divider mt-0 h-px">
                </div>

                <ScrollShadow className="px-2 pt-3 pb-8 h-[calc(100vh-15rem)]">
                    {details}
                </ScrollShadow>
            </Tab>
            <Tab key="History" title="History">
                <div className="divider mt-0 h-px"></div>
                <ScrollShadow className="px-2 pt-3 pb-8 h-[calc(100vh-15rem)]">
                    {history}
                </ScrollShadow>
            </Tab>
        </Tabs>

    </div>

}
