import { describe, expect, it } from "vitest";
import { formatBalance } from "./format";

describe("formatBalance", () => {
  it("format 0 ETH correctly", () => {
    expect(formatBalance(0n)).toBe("0");
  });
  it("format <0.0001 ETH correctly", () => {
    expect(formatBalance(1n)).toBe("<0.0001");
  });
  it("format <0.0001 ETH correctly", () => {
    expect(formatBalance(10000000000000n)).toBe("<0.0001");
  });
  it("format <0.0001 ETH correctly", () => {
    expect(formatBalance(99999999999999n)).toBe("<0.0001");
  });
  it("format 0.0001 ETH correctly", () => {
    expect(formatBalance(100000000000000n)).toBe("0.0001");
  });
  it("format 1 ETH correctly", () => {
    expect(formatBalance(1000000000000000000n)).toBe("1");
  });
  it("format 1.5 ETH correctly", () => {
    expect(formatBalance(1500000000000000000n)).toBe("1.5");
  });
  it("format 0.1234 ETH correctly", () => {
    expect(formatBalance(123450000000000000n)).toBe("0.1234");
  });
  it("format 1.9999 ETH correctly", () => {
    expect(formatBalance(1999999999999999999n)).toBe("1.9999");
  });
  it("format 123456789012.3456 ETH correctly", () => {
    expect(formatBalance(123456789012345678901234567890n)).toBe(
      "123456789012.3456",
    );
  });
});
