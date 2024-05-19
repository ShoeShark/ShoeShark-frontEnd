import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { sepolia, avalancheFuji } from "wagmi/chains";

const chains = [sepolia, avalancheFuji] as const;

export const wagmiConfig = getDefaultConfig({
    appName: "Shoe Shark",
    projectId: "YOUR_PROJECT_ID",
    chains: chains,
    ssr: true,
});

export const chainConfig = {
    targetNetworks: chains,
};
