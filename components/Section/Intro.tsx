"use client";
import "./Intro.scss"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";
import Atropos from "atropos/react";
import "atropos/atropos.css";

export default function Intro() {

    useGSAP(() => {
        gsap
            .timeline()
            .from(".section-intro-title", { duration: 0.33, autoAlpha: 0 })
            .from(".section-intro-img", { duration: 0.33, autoAlpha: 0 })
            .from(".section-intro-scroll", { duration: 0.33, autoAlpha: 0, xPercent: 50 });
    })

    return <section
        className={clsx([
            "section-intro bg-gradient-to-b from-[#fccb90] to-[#fdcbf1]",
            "flex items-center h-[100vh] overflow-hidden "
        ])}>
        <div className="container">
            <Atropos
                className="atropos-banner"
                highlight={false}
                onEnter={() => console.log("enter")}
            >
                <img
                    className="atropos-banner-spacer bg-gray-100 section-intro-img"
                    data-atropos-offset="-4.5"
                    src={"https://img2.imgtp.com/2024/05/29/4e5T46bE.png"}
                    alt=""
                />
                <img
                    data-atropos-offset="0"
                    src="https://img2.imgtp.com/2024/05/29/OpH7sAXj.png"
                    alt=""
                />
                <h1 data-atropos-offset="4" className="section-intro-title">Embark On Journeys Fueled by Inspiration.</h1>
            </Atropos>
        </div>
        <div className="section-intro-scroll flex items-center absolute bottom-20 right-20">
            <div className="text-md">SCROLL DOWN</div>
            <div className="animate-bounce flex flex-col ml-4">
                <span className="icon-[ic--round-keyboard-double-arrow-down] w-[35px] h-[35px] relative top-[16px]"></span>
                <span className="icon-[ic--round-keyboard-double-arrow-down] w-[35px] h-[35px]"></span>
            </div>
        </div>
    </section>
}
