import React from "react";
import toast from "react-hot-toast";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useCopyToClipboard } from "usehooks-ts";
import Link from "next/link";
import clsx from "clsx";
import { useDisconnect } from "wagmi";

type Props = {
    account: {
        address?: string
        displayName?: string
        displayBalance?: string
        [x: string]: any
    }
    closePop: () => void
}

type MenuItemProps = {
    title: string
    href: string
    icon: string
}
const MenuItem = ({ title, href, icon }: MenuItemProps) => {
    return <Link
        href={href}
        className="flex items-center pl-2"
    >
        <span className={clsx([
            `mr-2 text-2xl text-black`,
            icon
        ])}></span>
        {title}
    </Link >

}

export default function UserCard({
    account,
    closePop
}: Props) {
    const [, copy] = useCopyToClipboard()
    const handleCopy = () => {
        copy(account.address || "")
            .then(() => {
                toast.success("copy success")
            })
    }

    const { disconnect } = useDisconnect()

    return (
        <Card shadow="none" className="max-w-[200px] border-none bg-transparent rounded-lg">
            <CardHeader className="justify-between">
                <div className="flex gap-3">

                    <div className="flex flex-col items-start justify-center">
                        <div className="flex">
                            <h4 className="text-md font-semibold leading-none text-default-600">{account.displayName}</h4>
                            <button
                                className="icon-[ic--round-content-copy] ml-4 w-4 h-4"
                                onClick={handleCopy}
                            />
                        </div>
                        <h5 className="text-small tracking-tight text-default-500">{account.displayBalance}</h5>
                    </div>
                </div>
            </CardHeader>
            <div className="divider my-0 mx-4 h-[1px]"></div>
            <CardBody className="px-3 pb-0 pt-2">
                <div className="text-small pl-px text-default-500" onClick={closePop}>
                    <MenuItem title="My Assets" href="/personalCenter/myAssets" icon="icon-[ic--baseline-wallet]" />
                    <MenuItem title="My Inspiration" href="/personalCenter/myInspiration" icon="icon-[ic--baseline-art-track]" />
                    <MenuItem title="My Points" href="/personalCenter/myPoints" icon="icon-[ic--outline-auto-awesome]" />
                </div>
            </CardBody>
            <CardFooter className="gap-3 mx-4 my-0 mb-2 p-1">
                <button className="flex items-center" onClick={() => disconnect()}>
                    <span className="icon-[ic--baseline-link-off] mr-2 text-2xl text-main"></span>
                    <div className=" text-main text-small">Disconnect</div>
                </button>
            </CardFooter>
        </Card>
    );
};
