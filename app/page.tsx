import { BasciConnect } from "components/ConnectWallet";
import { getToken } from "actions/token";
import { log } from "utils/util";
import type { NextPage } from "next";
import Head from "next/head";

const Home = async () => {
    const token = await getToken()
    log('token is', token)

    return (
        <div>
            123
            {/* 中间内容写在这里 */}
            {token}
        </div>
    );
};

export default Home;

