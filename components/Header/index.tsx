import React from "react";
import { BasciConnect } from "components/ConnectWallet";
import Link from "next/link";
import LogoSVG from "components/Icons/Logo";

const Header = () => {
    return (
        <div className="navbar shadow-md bg-white px-4 h-20">
            <div className="navbar-start">
                {/* <div className="dropdown"> */}
                {/*     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden"> */}
                {/*         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> */}
                {/*     </div> */}
                {/*     <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"> */}
                {/*         <li><a>Item 1</a></li> */}
                {/*         <li> */}
                {/*             <a>Parent</a> */}
                {/*             <ul className="p-2"> */}
                {/*                 <li><a>Submenu 1</a></li> */}
                {/*                 <li><a>Submenu 2</a></li> */}
                {/*             </ul> */}
                {/*         </li> */}
                {/*         <li><a>Item 3</a></li> */}
                {/*     </ul> */}
                {/* </div> */}
                <Link href="/" className="font-bold text-xl">
                    <div className="flex justify-center items-center">
                        <LogoSVG />
                        <span className="text-2xl ml-2 mt-1">Shoe Shark</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <div role="tablist" className="tabs">
                    <Link className="tab tab-active cursor-pointer" href="/inspiration/list">Travel Inspiration Plaza</Link>
                    <Link className="tab cursor-pointer" href="/journeytailor">Journey Tailor</Link>
                    <Link className="tab cursor-pointer" href="/tokenZone">Token Zone</Link>
                </div>
            </div>
            <div className="navbar-end">
                <BasciConnect></BasciConnect>
            </div>
        </div>

    )
}

export default Header;
