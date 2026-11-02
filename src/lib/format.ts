import { formatEther } from "viem";

const SMALL_BALANCE_THRESHOLD = 10n ** 14n;

export function formatBalance(value: bigint): string {
  if (value === 0n) {
    return "0";
  }

  if (value < SMALL_BALANCE_THRESHOLD) {
    return "<0.0001";
  }

  const formatted = formatEther(value);

  const [whole, fraction = ""] = formatted.split(".");

  const decimals = fraction.slice(0, 4).replace(/0+$/, "");

  return decimals ? `${whole}.${decimals}` : `${whole}`;
}
