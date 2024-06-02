"use server"
import { getContentList } from "actions/content"
import List from "./list"
import { getCookieAddress } from "actions/token"

export default async function MyInspirationPage() {
    const address = await getCookieAddress()
    // const { data } = await contentList({
    //     // account_address: "0x02eee39506a085317e296DF31741AAa2952a4f2E"
    //     account_address: address,
    // })
    //
    const list = await getContentList(address)

    return <div className="bg-white p-2 rounded-lg h-full shadow-[0_0px_20px_#00000010]">
        <span className="pl-4 font-bold">My total inspiration: {list?.length}</span>
        <List listdata={list} />
    </div>

}
