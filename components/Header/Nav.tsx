import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {

    const path = usePathname()

    const links = [
        {
            href: "/inspiration/list",
            type: "/inspiration",
            text: "Travel Inspiration Plaza"
        },
        {
            href: "/journeytailor",
            type: "/journeytailor",
            text: "Journey Tailor"
        },
        {
            href: "/tokenZone/tokenSwap",
            type: "/tokenZone/tokenSwap",
            text: "Token Swap"
        },
        {
            href: "/tokenZone/nftMarket",
            type: "/tokenZone/nftMarket",
            text: "NFT Market"
        }
    ]

    return <>
        {
            links.map(link =>
                <li className="marker:display-none" key={link.href}>
                    <Link className={clsx([
                        "tab cursor-pointer text-md",
                        path.startsWith(link.type) ? "underline" : ""
                    ])} href={link.href}>
                        {link.text}
                    </Link>
                </li>
            )
        }
    </>
}
