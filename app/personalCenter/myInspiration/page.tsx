"use server"
import { getContentList, getPendingTask } from "actions/content"
import List from "./list"
import { getCookieAddress } from "actions/token"
import { Address } from "abitype"

export default async function MyInspirationPage() {
    const address = await getCookieAddress()
    // const { data } = await contentList({
    //     // account_address: "0x02eee39506a085317e296DF31741AAa2952a4f2E"
    //     account_address: address,
    // })
    //
    const [contentList, taskList] = await Promise.all([
        getContentList(address),
        getPendingTask(address as Address)
    ])

    const listdata = contentList.sort((p, n) => Number(n.createdAt - p.createdAt))

    return <div className="bg-white p-2 rounded-lg h-full shadow-[0_0px_20px_#00000010]">
        {/* <span className="pl-4 font-bold">My published inspiration: {contentList?.length}</span> */}
        <List listdata={listdata} taskList={taskList} />
    </div>

}
