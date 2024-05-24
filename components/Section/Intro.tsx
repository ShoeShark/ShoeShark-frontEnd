"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";

export default function Intro() {

    useGSAP(() => {
        gsap
            .timeline()
            .from(".section-intro-title", { duration: 0.33, autoAlpha: 0 })
            .from(".section-intro-desc", { duration: 0.33, autoAlpha: 0 })
            .from(".section-intro-img", { duration: 0.33, opacity: 0, xPercent: 100 })
            .from(".section-intro-scroll", { duration: 0.33, autoAlpha: 0 });
    })

    return <section className={clsx([
        "section-intro bg-gradient-to-b from-[#fccb90] to-[#fdcbf1] px-28",
        "flex justify-center items-center h-[100vh] overflow-hidden "
    ])}>
        <div className="w-1/2 drop-shadow">
            <h1 className="text-[50px] font-bold section-intro-title">Embark On Journeys Fueled by Inspiration.</h1>
            <p className="text-lg section-intro-desc top-10">Shoe Sharke is not just a platform, it's a decentralized community born out of a passion for exploration, named in honor of the renowned Chinese explorer Xu Xiake. By integrating state-of-the-art Web3 technologies, we've created a space where travelers can ignite their wanderlust, share their voyages, and inspire the routes less traveled. Every story, every photo, every recommendation becomes a beacon for fellow adventurers.</p>
            <div className="section-intro-scroll flex items-center relative top-20">
                <div className="text-md">SCROLL DOWN</div>
                <div className="animate-bounce flex flex-col ml-4">
                    <span className="icon-[ic--round-keyboard-double-arrow-down] w-[35px] h-[35px] relative top-[16px]"></span>
                    <span className="icon-[ic--round-keyboard-double-arrow-down] w-[35px] h-[35px]"></span>
                </div>
            </div>
        </div>
        <div className="w-1/2 pl-20">
            <img className="section-intro-img h-[70vh] rounded-xl" src="https://i.pinimg.com/originals/94/63/63/946363257125d6a9764f1174fa58c651.jpg" />
        </div>

    </section>
}
