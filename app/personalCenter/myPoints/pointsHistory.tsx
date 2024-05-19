import { ScrollShadow } from "@nextui-org/react";

export default function PointsHistory() {
    return (
        <ScrollShadow
            hideScrollBar
            offset={100}
            orientation="horizontal"
            className="max-w-[400px] max-h-[300px] mt-5"
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
                        <tr>
                            <td>Sign In</td>
                            <td>+5</td>
                            <td>2024-05-17 20:00:00</td>
                        </tr>
                        <tr>
                            <td>comment</td>
                            <td>+2</td>
                            <td>2024-05-17 20:00:00</td>
                        </tr>
                        <tr>
                            <td>publish</td>
                            <td>+10</td>
                            <td>2024-05-17 20:00:00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ScrollShadow>
    );
}
