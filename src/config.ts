import { sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia], //Blockchain Networks our app will be talking to
  transports: {
    [sepolia.id]: http(), // RPC URL our app uses to send JSON-RPC formatted requests to sepolia
  },
  connectors: [injected()], // Injected refers to wallets in the browser that has window.ethereum
});
