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
            href: "/tokenZone",
            type: "/tokenZone",
            text: "Token Zone"
        }
    ]

    return <div role="tablist" className="tabs">
        {
            links.map(link =>
                <Link key={link.href} className={clsx([
                    "tab cursor-pointer",
                    path.startsWith(link.type) ? "underline" : ""
                ])} href={link.href}>
                    {link.text}
                </Link>
            )
        }
    </div>
}
