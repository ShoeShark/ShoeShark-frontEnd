import { ScrollShadow } from "@nextui-org/react";

export default function PointsHistory({
    records
}: {
    records: Record<string, any>
}) {

    return (
        <ScrollShadow
            hideScrollBar
            offset={100}
            orientation="horizontal"
            className="max-w-[80%] max-h-[300px] mt-5"
        >
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records?.map(item =>
                                <tr>
                                    <td>{item.Source}</td>
                                    <td>{item.Points}</td>
                                    <td>{new Date(item.CreatedAt).toLocaleString()}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </ScrollShadow>
    );
}
