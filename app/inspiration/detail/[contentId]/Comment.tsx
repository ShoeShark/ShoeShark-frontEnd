'use client'

import { Avatar } from "@nextui-org/react"

export function Comment() {
    return <div className="mx-32 mt-14">
        <div className="relative inline-block w-full">
            <textarea className="textarea textarea-bordered resize-none w-full" rows={3} placeholder="Bio">
            </textarea>
            <span className="icon-[ic--baseline-send] absolute bottom-4 right-2 text-3xl block cursor-pointer"></span>
        </div>

        {/* comment list */}
        <div className="mt-8">
            <div className="card border rounded-lg relative p-4 mx-12 my-4">
                <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2">
                    <Avatar name="hi" src="" />
                </div>
                <div className="text-left pl-4">
                    <div className="font-bold">name</div>
                    <div>content</div>
                    <div className="text-right">2024</div>
                </div>
            </div>
            <div className="card border rounded-lg relative p-4 mx-12 my-4">
                <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2">
                    <Avatar name="hi" src="" />
                </div>
                <div className="text-left pl-4">
                    <div className="font-bold">name</div>
                    <div>content</div>
                    <div className="text-right">2024</div>
                </div>
            </div>
            <div className="card border rounded-lg relative p-4 mx-12 my-4">
                <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2">
                    <Avatar name="hi" src="" />
                </div>
                <div className="text-left pl-4">
                    <div className="font-bold">name</div>
                    <div>content</div>
                    <div className="text-right">2024</div>
                </div>
            </div>
        </div>
    </div>
}
