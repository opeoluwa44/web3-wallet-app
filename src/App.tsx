import { useConnect, useConnection } from "wagmi";
import "./App.css";
import type { Address } from "viem";
import { useDisconnect } from "wagmi";
import { useConnectors } from "wagmi";

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

  console.log("Status:", status);

  return (
    <>
      <h1>WEB3 WALLET APP</h1>
      {status === "connected" ? (
        <>
          <p>{shortenAddress(address)}</p>
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
      ) : status === "disconnected" ? (
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            marginInline: "10px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {connectors.length > 0 ? (
            connectors.map((connector) => (
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
                  gap: "4px",
                }}
              >
                {connector.icon && (
                  <img src={connector.icon} alt={connector.name} />
                )}
                {connector.name}
              </button>
            ))
          ) : (
            <>You have no wallet extension install on your browser.</>
          )}
        </div>
      ) : null}

      {error && (
        <p role="alert">
          {(error.name as string) === "UserRejectedRequestError"
            ? "You cancelled the wallet connection. Try again whenever you're ready."
            : (error.name as string) === "ProviderNotFoundError"
              ? "No wallet found. Please install or enable one."
              : error.message}
        </p>
      )}
    </>
  );
}

export default App;
