import { Pagination } from "@nextui-org/react";

export default function History() {

    return <div className="relative flex flex-col  items-center">
        <div className="bg-white rounded-lg h-[calc(100vh-22rem)] w-full">
            <div className="overflow-x-auto">
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
                        {/* row 1 */}
                        <tr>
                            <td>Cy Ganderton</td>
                            <td>Quality Control</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support</td>
                            <td>Purple</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
        <Pagination isCompact showControls total={10} initialPage={1} color="danger" />
    </div>

}
