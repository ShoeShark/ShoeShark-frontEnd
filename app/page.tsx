"use client";

import SectionIntro from "components/Section/Intro";
import SectionFeature from "components/Section/Feature";
import SectionNftIntro from "components/Section/NftIntro";
import SectionEnd from "components/Section/End";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Scrollbar from "smooth-scrollbar"

export default function Home() {
    useGSAP(() => {
        const scrollBox = Scrollbar.init(document.querySelector(".section-mainview")!, {
            damping: 0.1,
            delegateTo: document,
        });
        ScrollTrigger.scrollerProxy(".section-scroller", {
            scrollTop(value) {
                if (arguments.length) {
                    scrollBox.scrollTop = value!;
                }
                return scrollBox.scrollTop;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
        });

        const navTl = gsap.timeline({ paused: true })
            .from('.moveable-navbar', { height: '3rem', duration: 0.2 })
            .progress(1);

        scrollBox.addListener(e => {
            ScrollTrigger.update();
            e.offset.y > 80 ? navTl.reverse() : navTl.play();
        })
    })

    return (
        <div className="section-mainview ">
            <div className="section-scroller h-[100vh] relative top--20">
                <SectionIntro />
                <SectionFeature />
                <SectionNftIntro />
                <SectionEnd />
            </div>
        </div>
    );
};


