import clsx from "clsx"
import SwapBox from "./swapBox"

export default function TokenSwap() {
    return <div className="flex w-full justify-center mt-16">
        <div className={clsx([
            "card min-w-80 w-[30rem] gradient-animated shadow-xl",
            "bg-gradient-to-r from-[#e9defa] via-[#e3eeff] to-[#fed6e3]"
        ])}>
            <SwapBox />
        </div>
    </div>

}
