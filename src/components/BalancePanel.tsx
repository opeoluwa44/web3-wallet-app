import type { GetBalanceErrorType } from "wagmi/actions";
import type { GetBalanceData } from "wagmi/query";
import { formatBalance } from "../lib/format";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

interface BalancePanelProp {
  loading: boolean;
  error: GetBalanceErrorType | null;
  balance: GetBalanceData | undefined;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
  isFetching: boolean;
}

function BalancePanel({
  loading,
  error,
  balance,
  refetch,
  isFetching,
}: BalancePanelProp) {
  if (loading) {
    return <p>Loading balance ...</p>;
  }

  if (error) {
    console.log(error.message);
    return <p>Couldn’t load your balance. Try again.</p>;
  }

  if (!balance) {
    return <p>Balance unavailable</p>;
  }

  return (
    <div>
      Balance: {formatBalance(balance.value)} {balance.symbol}
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}

export default BalancePanel;
