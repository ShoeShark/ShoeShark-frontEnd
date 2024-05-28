import React from "react";
import UserCard from "./UserPopCard";
import { Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react";
import { generateColorFromAddress } from "utils/util";

type Props = {
    account: {
        address?: string
        displayName?: string
        displayBalance?: string
        [x: string]: any
    }
}

export default function UserButton({
    account
}: Props) {
    const [isOpen, setIsopen] = useState(false)

    function closePop() {
        setIsopen(false)
    }

    const bgColor = generateColorFromAddress(account.address!)

    return <Popover
        showArrow
        placement="bottom"
        className="bg-white"
        shouldCloseOnBlur={true}
        classNames={{
            base: "rounded-xl"
        }}
        isOpen={isOpen}
        onOpenChange={(open) => setIsopen(open)}
    >
        <PopoverTrigger
            onClick={() => setIsopen(true)}
        >
            {/* <User */}
            {/* className="shadow-[0_0_12px_2px_#00000020] py-1 px-3 rounded-full"> */}
            {/*     as="button" */}
            {/*     name={account.displayName} */}
            {/*     description={account.displayBalance} */}
            {/*     className="transition-transform" */}
            {/*     avatarProps={{ */}
            {/*         classNames: { */}
            {/*             base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]", */}
            {/*         }, */}
            {/*         icon: null, */}
            {/*     }} */}
            {/* /> */}
            <div className="w-10 h-10 flex relative">
                <span
                    className="animate-ping absolute t-0 h-full w-full rounded-full opacity-75"
                    style={{
                        backgroundImage: bgColor
                    }}
                ></span>
                <button
                    className="rounded-full w-10 h-10 z-10"
                    style={{
                        backgroundImage: bgColor
                    }}
                />
            </div>
        </PopoverTrigger>
        <PopoverContent className="p-1">
            <UserCard account={account} closePop={closePop} />
        </PopoverContent>
    </Popover>
};
