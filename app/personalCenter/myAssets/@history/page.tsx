"use client"

import { getTxHistory } from "actions/transaction";
import { useAccount } from "wagmi";
import Table from "./table";

export default function History() {
    const account = useAccount()

    const [list, setList] = useState<Record<string, any>[]>()

    async function getData() {
        const { result } = await getTxHistory(account.address!, "0x6689F6C3E4bEd414038c1c2f390867c9b23f8B53")

        setList(result)
    }

    useEffect(() => {
        getData()

    }, [])

    return <div className="relative flex flex-col  items-center">
        {
            list ?
                <Table listData={list!} />
                : <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Transaction</th>
                                <th>Amount</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array(8).fill("").map((_, k1) => <tr key={k1}>
                                    {
                                        Array(5).fill("").map((_, k2) => <td key={k2}>
                                            <div className="skeleton h-4 w-full my-2 bg-gray-200"></div>
                                        </td>)
                                    }
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
        }
    </div>

}
