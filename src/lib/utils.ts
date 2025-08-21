import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PublicKey } from "@solana/web3.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const validatePublicKey = (address: PublicKey | string) => {
  try {
    if (typeof address == "string") {
      new PublicKey(address);
    } else {
      address.toBase58();
    }
    return true;
  } catch {
    return false;
  }
};
export const shortAddress = (address: PublicKey | string) => {
  const key = typeof address === "string" ? address : address.toBase58();
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};
