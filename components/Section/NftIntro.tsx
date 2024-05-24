"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./NftIntro.scss";

export default function NftIntro() {

    useGSAP(() => {
        const gallery: HTMLDivElement = document.querySelector('.gallery')
        gsap.timeline({
            scrollTrigger: {
                trigger: ".section-nftIntro",
                scroller: ".section-scroller",
                start: 'top top',
                end: `+=${gallery.offsetWidth / 2}`,
                pin: true,
                scrub: 0.5,
            }
        })
            .from(".section-nftIntro-text", {
                duration: 0.6,
                yPercent: -50,
                autoAlpha: .6
            })

            .to(".gallery", {
                x: `-${gallery.offsetWidth}`,
                duration: 3
            })
    })

    return <section className="section-nftIntro bg-gradient-to-b from-[#ace0f9] to-[#fbfcdb] pt-28">
        <div className="section-nftIntro-text mb-10 text-center drop-shadow">
            <h2 className="text-[38px] font-bold">Discover the Exclusive Shoe Sharke NFT Collection</h2>
            <p className="text-lg w-[80%]">
                Dive into the immersive world of Shoe Sharke, where engaging with our platform turns your active explorations into mintable NFTs.
            </p>

        </div>
        <div className="gallery-container">
            <div className="gallery" >
                <div className="gallery-box">
                    <img src={"https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/17.png"} alt="tucan" />
                </div>
                <div className="gallery-box">
                    <img src={"https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/23.png"} alt="tucan" />
                </div>
                <div className="gallery-box">
                    <img src={"https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/88.png"} alt="tucan" />
                </div>
                <div className="gallery-box">
                    <img src={"https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/52.png"} alt="tucan" />
                </div>
                <div className="gallery-box">
                    <img src={"https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/56.png"} alt="tucan" />
                </div>
            </div>
        </div>

    </section>

}
