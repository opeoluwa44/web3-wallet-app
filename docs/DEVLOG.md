Day 2

Built: Wallet connection UI handling four connection states (connecting, reconnecting, connected, disconnected) with rejection feedback, using wagmi v3 hooks.

Failed: I had empty connection checks that never fired because of the generic injected entry, and the ProviderNotFoundError surfacing as a raw message.

Learned: I learned how mutation state differs from persisted connection state - mutation state is stored in memory hence it is lost upon reload while the persisted state is stored in local storage and automatically reconnects on mount. I also learned the difference between vite and tsc checks. Vite transpiles typescript into javascript without running any checks. The browser catches runtime error when the code is executed. While tsc checks for static type errors before the code is executed.

Can explain unaided:

1. The difference between mutation state and persisted state.

Two account finding: So i noticed that when two accounts are connected to the app at once, which ever one is currently in view in the wallet would also reflect the wallet address on the app and it automatically update the address on the app whenever i switch the account on the wallet.

So i found out that even if two components are subscribed to a query, the query is only called once and the result is cached under the key and supplied to the subscribed components (observers)

Day 3

Built: Wallet balance panel, handling three states initial loading, refetching, error. Added a balance refresh button

useBalance parameters includes: address, blockNumber, blockTag, chainId, config, scopeKey

Test cases

input value: 0n
expected output: "0"

input value: 1n
expected output: "<0.0001"

input value: 10000000000000n
expected output: "<0.0001"

input value: 99999999999999n
expected output: "<0.0001"

input value: 100000000000000n
expected output: "0.0001"

input value: 1000000000000000000n
expected output: "1"

input value: 1500000000000000000n
expected output: "1.5"

input value: 123450000000000000n
expected output:"0.1234"

input value: 1999999999999999999n
expected output: "1.9999"

input value: 123456789012345678901234567890n
expected output: "123456789012.3456"

Learned:

1. Wagmi's v3 useBalance returns {decimals, symbol, value} with no formatted, so a v2 era example would have rendered undefined.

2. The balance query key is ["balance", {address, chainId}], which is why an account switch can't show the wrong balance

3. 9 x 10^15 wei is only about 0.009 ETH (safe integer limit), so most real balances exceed what Number can hold exactly.

Failed: I changed a test's expected value to match the function's output.

Can explain unaided:

1. I can explain why an account switch can't show the wrong balance.

2. I can explain why viem uses bigint to represent integer amount in wei instead of Javascript Number

3. I can explain why viem provides formatEther() instead of using Javascript Number() to convert wei to ETH.

Read-path trace

1. Component: When the React component mounts, it calls useBalance() with the connected wallet address and displays the balance when the data becomes available.

2. Wagmi hook: useBalance() builds the key ["balance", {address, chainId}]that identifies the balance query and a function that calls viem. it hands both the key and function to Tanstack Query.

3. Tanstack Query: it receives the key and the function. It checks it's cache under that key, and if the data is missing or stale, it runs the function once, stores the result under the key, and tracks isLoading, isFetching, and error state, If two components ask for the same key they share one cache entry and one request. Viem alone can't do this because it has no memory of what has already been asked.

4. Viem: it runs the function by sending the JSON-RPC method eth-getBalance with the address through the transport.

5. Transport: Determines how the JSON-RPC request is sent to the configured RPC-endpoint.

6. RPC node: The Ethereum RPC node receives the request, reads the account's balance from the blockchain state and returns the result.
