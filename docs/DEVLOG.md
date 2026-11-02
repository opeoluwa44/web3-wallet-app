Day 2

Built: Wallet connection UI handling four connection states (connecting, reconnecting, connected, disconnected) with rejection feedback, using wagmi v3 hooks.

Failed: I had empty connection checks that never fired because of the generic injected entry, and the ProviderNotFoundError surfacing as a raw message.

Learned: I learned how mutation state differs from persisted connection state - mutation state is stored in memory hence it is lost upon reload while the persisted state is stored in local storage and automatically reconnects on mount. I also learned the difference between vite and tsc checks. Vite transpiles typescript into javascript without running any checks. The browser catches runtime error when the code is executed. While tsc checks for stripped typescript before the code is executed.
Can explain unaided: The difference between mutation state and persisted state.
