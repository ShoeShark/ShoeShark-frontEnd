import { ScrollShadow } from "@nextui-org/react";

export default function Assets() {

    return <ScrollShadow className="px-2 pt-3 pb-8 h-[calc(100vh-20rem)]">
        <div className="card w-96 bg-base-100 shadow-[0_0_8px_rgba(0,0,0,.1)]">
            <div className="card-body py-6 gap-0">
                <h3 className="card-title">Shoe Shark Token
                    <button className="icon-[ic--round-content-copy] w-4 h-4" />
                </h3>
                <div className="flex items-end">
                    Balance:
                    <span className="text-2xl ml-2">123</span>
                </div>
            </div>
        </div>
        <h2 className="my-4 font-bold">Nfts</h2>
        <div className="flex flex-wrap gap-8">
            <div className="card card-compact w-[12rem] bg-base-100 shadow-xl">
                <figure><img src="https://ipfs.io/ipfs/QmeYu678BJhy5EroetqZzVJeZSycDbh7A8NSVuWNjuRkN5/images/1.png.png" alt="Shoes" /></figure>
                <div className="card-body py-2 gap-0">
                    <h2 className="card-title text-lg">Shoes Shark #001</h2>
                    <div className="card-actions justify-between">
                        <span className="text-[#A5A5A5]">unlisted</span>
                        <details className="dropdown dropdown-top">
                            <summary className="icon-[ic--baseline-more-horiz] w-6 h-6"></summary>
                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                <li><a>to Nft market</a></li>
                                <li><a>transfer</a></li>
                            </ul>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    </ScrollShadow>

}
