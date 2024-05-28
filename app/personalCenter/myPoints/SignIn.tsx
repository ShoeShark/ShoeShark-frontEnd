"use client"

import { signIn } from "actions/points"
import { message } from "antd"
enum SIGN_STATUS {
    SIGNIN = "Sign in",
    SIGNED = "Signed in"
}

export default function SignIn({
    signed
}: { signed: boolean }) {
    const [signTxt, setSignTxt] = useState(signed ? SIGN_STATUS.SIGNED : SIGN_STATUS.SIGNIN)
    async function sign() {
        await signIn()
        message.success("Sign in successful!")
        setSignTxt(SIGN_STATUS.SIGNED)
    }

    return <button
        className="btn btn-outline btn-sm text-main hover:bg-main hover:border-main hover:text-white"
        disabled={signTxt !== SIGN_STATUS.SIGNIN}
        onClick={sign}
    >
        {signTxt}
    </button>
}
