"use client"
import { Tabs, Tab } from "@nextui-org/react";
import Assets from "./myAssets/assets"
import History from "./myAssets/history"
import { ScrollShadow } from "@nextui-org/react";

export default function PersonalCenter() {

    return <div className="p-8">
        <Tabs variant="light" color="danger" aria-label="Tabs variants">
            <Tab key="Assets" title="Assets">
                <div className="divider mt-0 h-px"></div>
                <ScrollShadow className="px-2 pt-3 pb-8 h-[calc(100vh-15rem)]">
                    <Assets />
                </ScrollShadow>
            </Tab>
            <Tab key="History" title="History">
                <div className="divider mt-0 h-px"></div>
                <ScrollShadow className="px-2 pt-3 pb-8 h-[calc(100vh-15rem)]">
                    <History />
                </ScrollShadow>
            </Tab>
        </Tabs>

    </div>

}
