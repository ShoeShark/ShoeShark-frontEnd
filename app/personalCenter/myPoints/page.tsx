"use client"
import { message, notification } from "antd";
import PointsHistory from "./pointsHistory";

enum SIGN_STATUS {
    SIGNIN = "Sign in",
    SIGNED = "Signed in"
}

export default function MyPointsPage() {
    const [point, setPoint] = useState("0")

    const [signTxt, setSignTxt] = useState<SIGN_STATUS>(SIGN_STATUS.SIGNIN)
    function sign() {
        message.success("Sign in successful!")
    }

    return (
        <div className="p-8">
            <div className="card w-96 bg-base-100 shadow-[0_0_8px_rgba(0,0,0,.1)]">
                <div className="card-body py-6 gap-0">
                    <div className="flex justify-between">
                        <h3 className="card-title">My Points: {point}</h3>
                        <button
                            className="btn btn-outline btn-sm"
                            disabled={signTxt !== SIGN_STATUS.SIGNIN}
                            onClick={sign}
                        >{signTxt}</button>
                    </div>
                    <details className="collapse collapse-arrow rounded-none">
                        <summary
                            className="collapse-title text-ms after:!top-3 p-0"
                            style={{ minHeight: "1.25rem" }}
                        >
                            Points Rules
                        </summary>
                        <div className="collapse-content bg-red !pb-0">
                            <div className="text-xs">Daily Sign-in: +5 points, daily limit: 5 points.</div>
                            <div className="text-xs">User Interaction: +2 points, daily limit: 10 points</div>
                            <div className="text-xs">Content Publishing: +10 points, weekly limit: 30 points.</div>
                        </div>
                    </details>
                </div>
            </div>
            <PointsHistory />
        </div>
    );
}

