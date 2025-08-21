import { LAMPORTS_PER_SOL } from "@solana/web3.js";

/**
 * Convert lamports to SOL
 */
export function getLamportsToSol(
  lamports: number,
  digitsToDisplay?: number,
): { sol: number } {
  const sol = lamports / LAMPORTS_PER_SOL;
  return { sol: digitsToDisplay ? toFixed(sol, digitsToDisplay) : sol };
}

/**
 * Convert SOL to lamports
 */
export function getSolToLamports(sol: number): { lamports: number } {
  return { lamports: sol * LAMPORTS_PER_SOL };
}

/**
 * Round number to fixed digits
 */
export function toFixed(num: number, digits: number): number {
  const factor = Math.pow(10, digits);
  return Math.round(num * factor) / factor;
}
