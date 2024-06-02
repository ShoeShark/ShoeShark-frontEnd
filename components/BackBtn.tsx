"use client"

import clsx from "clsx"
import { useRouter } from "next/navigation"

export default function BackBtn({
    className
}: {
    className: string
}) {
    const router = useRouter()
    return <button onClick={() => router.back()} className={clsx([
        "icon-[ic--round-arrow-back-ios-new] w-6 h-6",
        className
    ])}></button>
}
