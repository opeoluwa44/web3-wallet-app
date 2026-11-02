import { useBalance, useConnect, useConnection } from "wagmi";
import "./App.css";
import type { Address } from "viem";
import { useDisconnect } from "wagmi";
import { useConnectors } from "wagmi";
import { config } from "./config";
import BalancePanel from "./components/BalancePanel";

function shortenAddress(address: Address | undefined): string {
  if (address === undefined) {
    return "No Connection found";
  }
  const maskedAddress = `${address.slice(0, 7)}...${address.slice(-5)}`;
  return maskedAddress;
}

function App() {
  const { address, status } = useConnection();
  const connectors = useConnectors();
  const disconnect = useDisconnect();
  const { mutate: connectWallet, error } = useConnect();
  const {
    data: balance,
    isLoading: initialLoading,
    isFetching: refreshing,
    error: balanceError,
    refetch,
  } = useBalance({
    address,
    config,
  });

  return (
    <>
      <h1>WEB3 WALLET APP</h1>
      {status === "connected" ? (
        <>
          <p>{shortenAddress(address)}</p>
          <BalancePanel
            loading={initialLoading}
            error={balanceError}
            balance={balance}
            refetch={refetch}
            isFetching={refreshing}
          />
          <button onClick={() => disconnect.mutate()}>Disconnect</button>
        </>
      ) : status === "connecting" ? (
        <>
          <p>Connecting Wallet...</p>
        </>
      ) : status === "reconnecting" ? (
        <>
          <p>Reconnecting Wallet...</p>
        </>
      ) : (
        <>
          <p>Connect a wallet to see your balance.</p>
          <div
            style={{
              display: "flex",
              margin: "0 auto",
              marginInline: "10px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connectWallet({ connector })}
                style={{
                  display: "flex",
                  width: "140px",
                  height: "42px",
                  margin: "auto 0",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4ﬁpx",
                }}
              >
                {connector.icon && (
                  <img src={connector.icon} alt={connector.name} />
                )}
                {connector.name}
              </button>
            ))}
          </div>
        </>
      )}

      {error && (
        <p role="alert">
          {(error.name as string) === "UserRejectedRequestError" ? (
            "You cancelled the wallet connection. Try again whenever you're ready."
          ) : (error.name as string) === "ProviderNotFoundError" ? (
            <>
              No wallet found.{" "}
              <a
                href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install MetaMask
              </a>
            </>
          ) : (
            error.message
          )}
        </p>
      )}
    </>
  );
}

export default App;
