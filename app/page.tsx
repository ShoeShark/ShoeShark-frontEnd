import { BasciConnect } from "components/ConnectWallet";
import { getToken } from "actions/token";
import { log } from "utils/util";
import FullPage from 'components/FullPage'

const Home = async () => {
    const token = await getToken()
    log('token is', token)

    return <div className="relative flex flex-col h-screen">
        <FullPage />
    </div>
};

export default Home;
