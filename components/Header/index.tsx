import React from "react";
import { CustomConnect as WalletConnect } from "components/ConnectWallet";
import Link from "next/link";
import LogoSVG from "components/Icons/Logo";
import Nav from "./Nav";

const Header = () => {
    return (
        <div className="navbar moveable-navbar transition-all drop-shadow fixed w-full z-50 top-0 shadow-md backdrop-blur px-4 py-0 h-20 min-h-10">
            <div className="navbar-start">
                {/* <div className="dropdown"> */}
                {/*     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden"> */}
                {/*         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> */}
                {/*     </div> */}
                {/*     <ul tabIndex={0} className="menu menu-sm bg-neutral-100 dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"> */}
                {/*         <Nav /> */}
                {/*     </ul> */}
                {/* </div> */}
                <Link href="/" className="font-bold text-xl">
                    <div className="flex justify-center items-center">
                        <LogoSVG width={40} height={40} />
                        <span className="text-2xl ml-2 mt-1">Shoe Shark</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <div role="tablist" className="tabs flex list-none">
                    <Nav />
                </div>
            </div>
            <div className="navbar-end">
                <WalletConnect></WalletConnect>
            </div>
        </div>

    )
}

export default Header;
