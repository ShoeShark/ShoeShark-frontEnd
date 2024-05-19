import { env } from "../env";
import { ChainId } from "./chainId";

export class RPC {
    public static env = process.env;

    private static _get(args: { key: string; err?: string; first: true; fallback: string }): string;
    private static _get(args: { key: string; err?: string; first?: never; fallback: string }): string[];
    private static _get(args: { key: string; err?: string; first: true; fallback?: never }): string | undefined;
    private static _get(args: { key: string; err?: string; first?: never; fallback?: never }): string[] | undefined;
    private static _get(args: { key: string; err?: string; first?: boolean; fallback?: string }) {
        const value = this.env[args.key] || args.fallback;

        if (!value) console.warn(args.err);

        if (value === undefined) return value;

        return args.first ? value : value.split(" ");
    }
    public static getNodeUrls = (chainId: ChainId) => {
        switch (chainId) {
            case ChainId.AVALANCHE_TESTNET:
                return this._get({
                    key: `REACT_APP_ETHEREUM_NODE_URL`,
                    fallback: `https://api.avax-test.network/ext/bc/C/rpc`,
                });
        }
    };
}
