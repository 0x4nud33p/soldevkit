import { NextRequest, NextResponse } from "next/server";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// Your donation wallet address from environment variables
const DONATION_WALLET_ADDRESS =
  process.env.SOLANA_DONATION_WALLET ||
  "So11111111111111111111111111111111111111112"; // Default to wrapped SOL mint as placeholder
const DONATION_WALLET = new PublicKey(DONATION_WALLET_ADDRESS);

export async function GET(request: NextRequest) {
  try {
    const baseHref = new URL("/api/actions/donate", request.url).toString();

    const response = {
      type: "action",
      icon: new URL("/soldevkit-logo.svg", request.url).toString(),
      title: "Support SoldevKit UI",
      description:
        "Help us build amazing Solana UI components by making a donation. Your support keeps this project alive and growing!",
      label: "Donate",
      links: {
        actions: [
          {
            label: "Donate 0.1 SOL",
            href: `${baseHref}?amount=0.1`,
            type: "post",
          },
          {
            label: "Donate 0.5 SOL",
            href: `${baseHref}?amount=0.5`,
            type: "post",
          },
          {
            label: "Donate 1 SOL",
            href: `${baseHref}?amount=1`,
            type: "post",
          },
          {
            label: "Donate 2 SOL",
            href: `${baseHref}?amount=2`,
            type: "post",
          },
          {
            label: "Donate 5 SOL",
            href: `${baseHref}?amount=5`,
            type: "post",
          },
          {
            label: "Custom Amount",
            href: `${baseHref}?amount={amount}`,
            type: "post",
            parameters: [
              {
                name: "amount",
                label: "Enter SOL amount",
                required: true,
                type: "number",
              },
            ],
          },
        ],
      },
    };

    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, Content-Encoding, Accept-Encoding",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/actions/donate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get("amount");

    const body = await request.json();
    const { account } = body;

    if (!account) {
      return NextResponse.json(
        { error: "Missing account in request body" },
        { status: 400 },
      );
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 },
      );
    }

    const donationAmount = Number(amount);
    const lamports = Math.floor(donationAmount * LAMPORTS_PER_SOL);

    // Create connection to Solana (using mainnet-beta for production)
    const connection = new Connection(
      process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
    );

    const senderPublicKey = new PublicKey(account);

    // Get recent blockhash
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    // Create transfer instruction
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: DONATION_WALLET,
      lamports,
    });

    // Create transaction
    const transaction = new Transaction({
      feePayer: senderPublicKey,
      blockhash,
      lastValidBlockHeight,
    }).add(transferInstruction);

    // Serialize transaction
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    const base64Transaction = serializedTransaction.toString("base64");

    const response = {
      transaction: base64Transaction,
      message: `Thank you for donating ${donationAmount} SOL to support SoldevKit UI! 🚀`,
      links: {
        next: {
          type: "inline",
          action: {
            type: "completed",
            icon: new URL("/success-icon.svg", request.url).toString(),
            title: "Donation Successful! 🎉",
            description: `Your ${donationAmount} SOL donation helps us continue building amazing Solana UI components. Thank you for your support!`,
            label: "Donation Complete",
          },
        },
      },
    };

    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, Content-Encoding, Accept-Encoding",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in POST /api/actions/donate:", error);
    return NextResponse.json(
      { error: "Failed to create donation transaction" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, Content-Encoding, Accept-Encoding",
      },
    },
  );
}
