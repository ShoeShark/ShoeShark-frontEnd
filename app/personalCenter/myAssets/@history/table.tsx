"use client"
import { Pagination } from "@nextui-org/react";
import { formatAddress, formatNumber } from "utils/format";
import { formatUnits } from "viem";

function formatNum(value: string, tokenDecimal: string) {
    if (!value) return ""
    return formatNumber(formatUnits(BigInt(value), +tokenDecimal))
}

function DisplayTr({ data }: { data: Record<string, any> }) {

    return <tr>
        <td>Transfer</td>
        <td>{formatNum(data.value, data.tokenDecimal)}</td>
        <td>{formatAddress(data.from)}</td>
        <td>{formatAddress(data.to)}</td>
        <td>{new Date(data.timeStamp * 1000).toLocaleString()}</td>
    </tr>
}

export default function Table({
    listData
}: {
    listData: Record<string, any>[]
}) {

    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    return <>
        <div className="bg-white rounded-lg h-[calc(100vh-20rem)] w-full">
            <div className="overflow-x-auto">
                <table className="table">
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
                            listData.slice((currentPage - 1) * pageSize, (currentPage) * pageSize).map(item =>
                                <DisplayTr data={item} key={item.hash + item.from} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
        {
            listData.length ?
                <Pagination
                    classNames={{
                        base: "absolute bottom-[-2rem]"
                    }}
                    isCompact
                    showControls
                    total={Math.ceil(listData.length / pageSize)}
                    page={currentPage}
                    aria-current="page"
                    onChange={setCurrentPage}
                    color="danger"
                /> : null
        }
    </>

}
