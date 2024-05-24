"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function End() {

    useGSAP(() => {

        gsap
            .timeline(
                {
                    scrollTrigger: {
                        trigger: ".section-end",
                        scroller: ".section-scroller",
                        toggleActions: "play none reverse none",
                        pin: true,
                        scrub: .5
                    }
                }
            )
            .from(".section-end-text", {
                duration: .33,
                y: -50
            })
            .to(".section-end-text", {
                duration: .33,
                y: 20,
            })
            .from(".section-end-arrow", {
                autoAlpha: 0,
                xPercent: 20,
                yPercent: -20,
                duration: .33
            })
            .from(".footer", {
                yPercent: 20,
                autoAlpha: 0,
                duration: .33
            })

    })

    return <section className="section-end overflow-hidden flex flex-col justify-between h-[100vh] bg-gradient-to-b from-[#fbfcdb] to-[#d4fc79] pt-28">
        <div className="flex gap-4 px-20 drop-shadow">
            <div className="section-end-text w-1/2">
                <h2 className=" text-[40px] font-bold">Embark On Journeys Fueled by Inspiration.</h2>
                <p className="section-end-desc ">Join us in redefining the way we explore the world. On Shoe Sharke, every traveler is both a guide and an explorer, a teacher and a student, bound by the shared joy of discovery.</p>
            </div>
            <div className="section-end-arrow flex w-1/2 justify-end items-end gap-5">
                <div className="text-xl font-bold">CONNECT TO JOIN</div>
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="25rem" height="25rem" viewBox="0 0 367.339 367.34" xmlSpace="preserve">
                    <g>
                        <path id="arrowPath" d="M337.591,0.932c-13.464,6.12-26.315,12.852-39.168,20.196c-11.628,6.12-25.704,12.24-35.496,21.42 c-5.508,4.896,0,15.3,7.344,12.852c0,0,0.612,0,0.612-0.612c1.836,1.224,3.061,2.448,4.896,4.284c0,0.612,0.611,1.836,0.611,2.448 c0.612,1.224,1.836,2.448,3.061,3.672c-17.748,33.048-34.272,66.096-55.08,96.696c-6.12,9.18-12.853,17.748-20.808,25.704 c-19.584-31.212-51.409-67.32-89.965-60.588c-50.796,9.18-23.256,63.647,3.06,82.008c31.212,22.644,58.14,21.42,85.068,0 c12.24,20.808,20.809,44.063,19.584,66.708c-1.836,54.468-50.796,63.647-91.8,49.571c6.12-15.912,7.956-34.271,4.284-50.184 c-6.12-28.764-50.184-54.468-75.888-34.272c-25.092,20.196,22.032,71.604,37.332,82.009c4.284,3.06,9.18,6.119,14.076,8.567 c-0.612,0.612-0.612,1.225-1.224,1.836c-28.152,44.064-65.484,6.12-82.62-25.092c-2.448-4.896-9.18-0.612-7.344,4.284 c14.076,32.436,42.84,70.38,81.396,48.348c9.18-5.508,17.136-13.464,22.644-23.256c33.66,13.464,72.829,13.464,97.308-17.136 c29.376-36.72,11.017-84.456-8.567-119.952c0.611-0.612,0.611-0.612,1.224-1.224c34.884-33.66,56.304-81.396,78.336-124.236 c4.284,3.06,9.181,6.12,13.464,9.18c3.061,1.836,7.345,1.224,9.792-1.224c17.748-20.808,31.212-45.9,35.496-73.44 C351.055,2.768,344.324-2.128,337.591,0.932z M178.471,207.787c-23.256,13.464-46.512-3.06-63.648-18.972 c-22.644-20.808-16.524-54.468,18.36-47.735c17.748,3.672,31.824,19.584,43.452,32.436c6.12,6.732,12.241,14.687,17.749,23.255 C189.488,201.056,183.979,204.728,178.471,207.787z M116.047,319.171C116.047,319.171,115.435,319.171,116.047,319.171 c-16.524-8.567-28.764-20.808-38.556-36.107c-4.284-6.732-7.956-14.076-9.792-22.032c-6.12-20.808,26.928-10.404,35.496-6.12 C126.451,267.764,124.615,297.14,116.047,319.171z M306.379,67.028c-0.612,0-0.612-0.612-1.224-0.612 c0-1.836-1.225-3.672-3.672-4.896c-4.284-1.836-8.568-4.284-12.853-6.732c-1.836-1.224-5.508-4.896-5.508-3.672 c0-0.612-0.612-1.224-1.224-1.224c6.731-3.672,13.464-8.568,20.195-12.24c8.568-4.896,17.748-9.792,26.929-14.688 C324.74,38.264,316.784,53.564,306.379,67.028z"></path>
                    </g>
                </svg>
            </div>
        </div>
        <footer className="footer footer-center drop-shadow shadow-inner p-10 text-base-content rounded">
            <nav className="grid grid-flow-col gap-4">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Design</a>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-8">
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 448 512" className="fill-current"><path fill="black" d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z" /></svg></a>
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="34.14" height="24" viewBox="0 0 256 180" className="fill-current"><path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134" /><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z" /></svg></a>
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" className="fill-current"><defs><linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2aabee" /><stop offset="100%" stop-color="#229ed9" /></linearGradient></defs><path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0" /><path fill="#fff" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072" /></svg></a>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by Shoe Shark </p>
            </aside>
        </footer>
    </section>
}

