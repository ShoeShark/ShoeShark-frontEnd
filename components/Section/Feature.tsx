"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Feature.scss";

export default function Feature() {
    useGSAP(() => {

        gsap.set(".panel", { zIndex: (i, _, targets) => targets.length - i });

        const images = gsap.utils.toArray<Element>('.panel:not(.purple)');

        images.forEach((image, i) => {

            gsap.timeline({

                scrollTrigger: {
                    trigger: ".section-feature",
                    start: () => "top -" + (window.innerHeight * (i + 0.5)),
                    end: () => "+=" + window.innerHeight,
                    scrub: true,
                    toggleActions: "play none reverse none",
                    invalidateOnRefresh: true,
                }

            })
                .to(image, { height: 0 })

        });

        gsap.set(".panel-text", { zIndex: (i, _, targets) => targets.length - i });

        gsap.utils.toArray<Element>('.panel-text')
            .forEach((text, i) => {

                gsap.timeline({

                    scrollTrigger: {
                        trigger: ".section-feature",
                        start: () => "top -" + (window.innerHeight * i),
                        end: () => "+=" + window.innerHeight,
                        scrub: true,
                        toggleActions: "play none reverse none",
                        invalidateOnRefresh: true,
                    }

                })
                    .to(text, { duration: 0.33, opacity: 1, y: "25%" })
                    .to(text, { duration: 0.33, opacity: 0, y: "0%" }, 0.66)
                    ;

            });

        ScrollTrigger.create({
            trigger: ".section-feature",
            scrub: true,
            pin: true,
            start: () => "top top",
            end: () => "+=" + ((images.length - 1) * window.innerHeight + window.innerHeight / 2),
            invalidateOnRefresh: true,

        });
    })

    return <section className="section-feature bg-gradient-to-b from-[#fdcbf1] to-[#ace0f9]">

        <div className="text-wrap">
            <div className="panel-text">
                <h3 className="panel-text-title">Inspiration Feeds</h3>
                <div className="panel-text-desc">Dive into a sea of travel stories, photos, and videos. Share your own and become a source of inspiration.</div>

            </div>
            <div className="panel-text">
                <h3 className="panel-text-title">Interactive Community</h3>
                <div className="panel-text-desc">Engage with fellow travelers through comments, likes, and shares. Find your next travel buddy among a community that values discovery and exploration as much as you do.</div>
            </div>
            <div className="panel-text">
                <h3 className="panel-text-title">Personalized AI-Powered Itineraries</h3>
                <div className="panel-text-desc">Your Exploration, Enhanced
                    Unlock the potential of your travels with our AI assistant. Tailored to your preferences, budget, and schedule, our technology crafts personalized travel itineraries that guide you to experiences waiting to be discovered.</div>
            </div>
            <div className="panel-text">
                <h3 className="panel-text-title">Rewarding Your Adventures</h3>
                <div className="panel-text-desc">Token and NFT System
                    Earn as You Explore: Gain tokens for sharing quality travel content, engaging with the community, and contributing to the Shoe Sharke ecosystem</div>
            </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden h-[75vh] w-[35rem] mt-5">
            <div className="panel bg-blue-500"></div>
            <div className="panel bg-red-500"></div>
            <div className="panel bg-orange-500"></div>
            <div className="panel bg-purple-500"></div>
        </div>

    </section>

}
