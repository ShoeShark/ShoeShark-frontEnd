"use server"
import { contentList } from "actions/content"
import List from "./list"

export default async function MyInspirationPage() {
    const { data } = await contentList({
        account_address: "0x02eee39506a085317e296DF31741AAa2952a4f2E"
    })

    return <div className="bg-white p-2 rounded-lg h-full shadow-[0_0px_20px_#00000010]">
        <span className="pl-4">total: {data?.total}</span>
        <List listdata={data?.records} />
    </div>

}
