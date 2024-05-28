"use client";

import SectionIntro from "components/Section/Intro";
import SectionFeature from "components/Section/Feature";
import SectionNftIntro from "components/Section/NftIntro";
import SectionEnd from "components/Section/End";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
    useGSAP(() => {

        ScrollTrigger.create({
            start: 'top -70',
            end: 99999,
            toggleClass: { className: 'h-[3rem]', targets: '.moveable-navbar' }
        });

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


