"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowRight, Loader2, Wallet } from "lucide-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import {
  TokenListProvider,
  TokenInfo as RegistryTokenInfo,
} from "@solana/spl-token-registry";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/soldevkit-ui/form";
import { Input } from "@/components/soldevkit-ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/soldevkit-ui/select";
import { WalletConnectButton } from "@/registry/default/ui/wallet/wallet-connect-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/soldevkit-ui/card";

// Type for our form values
type FormValues = {
  destination: string;
  amount: number | undefined;
  token: string;
};

// Type for token options
export type TokenInfo = {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  decimals: number;
  mintAddress?: string;
  icon?: string;
};

// Custom resolver
const customResolver = (data: FormValues) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!data.destination) {
    errors.destination = {
      type: "required",
      message: "Destination address is required",
    };
  } else if (data.destination.length < 32) {
    errors.destination = {
      type: "minLength",
      message: "Destination address must be a valid Solana address",
    };
  }

  if (data.amount === undefined || data.amount === null) {
    errors.amount = {
      type: "required",
      message: "Amount is required",
    };
  } else if (data.amount <= 0) {
    errors.amount = {
      type: "min",
      message: "Amount must be greater than 0",
    };
  }

  if (!data.token) {
    errors.token = {
      type: "required",
      message: "Please select a token",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? data : {},
    errors,
  };
};

export interface SendTokenFormProps {
  onSendToken?: (values: FormValues) => Promise<void>;
  tokens?: TokenInfo[];
  isLoading?: boolean;
  showTokenBalance?: boolean;
  validateDestination?: (address: string) => Promise<boolean>;
  className?: string;
}

export function SendTokenForm({
  tokens,
  isLoading = false,
  showTokenBalance = true,
  className,
}: SendTokenFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);
  const [isUpdatingBalance] = useState(false);
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [amountValue, setAmountValue] = useState<string>("");

  const form = useForm<FormValues>({
    defaultValues: {
      destination: "",
      amount: undefined,
      token: "",
    },
    resolver: customResolver,
  });

  const [availableTokens, setAvailableTokens] = useState<TokenInfo[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, RegistryTokenInfo>>(
    new Map(),
  );

  // Load token registry once
  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const tokenList = tokens.filterByChainId(101).getList(); // 101 = mainnet-beta
      const map = new Map(tokenList.map((t) => [t.address, t]));
      setTokenMap(map);
    });
  }, []);

  const networkName = useMemo(() => {
    if (!connection) return "Unknown";
    const endpoint = connection.rpcEndpoint;
    if (endpoint.includes("devnet")) return "Devnet";
    if (endpoint.includes("testnet")) return "Testnet";
    if (endpoint.includes("mainnet")) return "Mainnet";
    if (endpoint.includes("localhost") || endpoint.includes("127.0.0.1"))
      return "Localnet";
    const url = new URL(endpoint);
    return url.hostname;
  }, [connection]);

  // Fetch token accounts
  const fetchTokenAccounts = async (ownerPublicKey: PublicKey) => {
    try {
      setIsLoadingTokens(true);

      let solBalance = 0;
      try {
        solBalance =
          (await connection.getBalance(ownerPublicKey)) / LAMPORTS_PER_SOL;
      } catch (error) {
        console.error("Error fetching SOL balance:", error);
      }

      const defaultTokens: TokenInfo[] = [
        {
          id: "sol",
          symbol: "SOL",
          name: "Solana",
          balance: solBalance,
          decimals: 9,
          mintAddress: "So11111111111111111111111111111111111111112",
          icon: "/logo/solana-logo.svg",
        },
      ];

      const splTokens: TokenInfo[] = [];
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          ownerPublicKey,
          {
            programId: new PublicKey(
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            ),
          },
        );

        for (const account of tokenAccounts.value) {
          const accountData = account.account.data.parsed.info;
          const mintAddress = accountData.mint;
          const tokenAmount = accountData.tokenAmount;

          if (tokenAmount.uiAmount > 0) {
            const registryInfo = tokenMap.get(mintAddress);

            splTokens.push({
              id: mintAddress,
              symbol:
                registryInfo?.symbol || mintAddress.substring(0, 4) + "...",
              name:
                registryInfo?.name || "Token " + mintAddress.substring(0, 6),
              balance: tokenAmount.uiAmount,
              decimals: tokenAmount.decimals,
              mintAddress: mintAddress,
              icon: registryInfo?.logoURI,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching SPL token accounts:", error);
      }

      return [...defaultTokens, ...splTokens];
    } catch (error) {
      console.error("Error fetching token accounts:", error);
      return [
        {
          id: "sol",
          symbol: "SOL",
          name: "Solana",
          balance: 0,
          decimals: 9,
          icon: "/crypto-logos/solana-logo.svg",
        },
      ];
    } finally {
      setIsLoadingTokens(false);
    }
  };

  useEffect(() => {
    if (tokens) {
      setAvailableTokens(tokens);
    } else if (connected && publicKey) {
      fetchTokenAccounts(publicKey)
        .then((fetchedTokens) => {
          setAvailableTokens(fetchedTokens);
        })
        .catch((error) => {
          console.error("Error setting tokens:", error);
          setAvailableTokens([
            {
              id: "sol",
              symbol: "SOL",
              name: "Solana",
              balance: 0,
              decimals: 9,
              icon: "/crypto-logos/solana-logo.svg",
            },
          ]);
        });
    }
  }, [tokens, connected, publicKey, tokenMap]);

  // ✅ Add back handleSubmit
  async function handleSubmit(values: FormValues) {
    if (!connected || !publicKey || !connection) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to send tokens",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const destinationPubkey = new PublicKey(values.destination);
      const selectedTokenInfo = availableTokens.find(
        (t) => t.id === values.token,
      );

      if (!selectedTokenInfo || values.amount === undefined) {
        throw new Error("Invalid token or amount");
      }

      const transaction = new Transaction();

      if (values.token === "sol") {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: destinationPubkey,
            lamports: Math.floor(values.amount * LAMPORTS_PER_SOL),
          }),
        );
      } else if (selectedTokenInfo.mintAddress) {
        const mintPubkey = new PublicKey(selectedTokenInfo.mintAddress);
        const senderATA = await getAssociatedTokenAddress(
          mintPubkey,
          publicKey,
        );
        const receiverATA = await getAssociatedTokenAddress(
          mintPubkey,
          destinationPubkey,
        );

        transaction.add(
          createTransferInstruction(
            senderATA,
            receiverATA,
            publicKey,
            Math.floor(
              values.amount * Math.pow(10, selectedTokenInfo.decimals),
            ),
          ),
        );
      }

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);

      toast.success("Transaction sent", {
        description: `Signature: ${signature}`,
      });
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Transaction failed", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleTokenChange = (value: string) => {
    const token = availableTokens.find((t) => t.id === value);
    if (token) {
      setSelectedToken(token);
      form.setValue("token", value);
    }
  };

  const renderTokenItem = (token: TokenInfo) => (
    <SelectItem key={token.id} value={token.id}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {token.icon && (
            <div className="w-5 h-5 mr-2 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={token.icon || "/placeholder.svg"}
                alt={token.symbol}
                className="w-4 h-4 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          <span>{token.symbol}</span>
        </div>
        {showTokenBalance && (
          <span className="text-muted-foreground ml-2 text-sm">
            {token.balance.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: token.decimals > 6 ? 6 : token.decimals,
            })}
          </span>
        )}
      </div>
    </SelectItem>
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="h-5 w-5 mr-2" />
          Send Tokens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Destination */}
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Destination Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter wallet address"
                      {...field}
                      disabled={!connected}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Token + Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Token</FormLabel>
                    <Select
                      onValueChange={handleTokenChange}
                      defaultValue={field.value}
                      disabled={!connected}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full min-w-[180px]">
                          <SelectValue
                            placeholder={
                              isLoadingTokens || isUpdatingBalance
                                ? "Loading tokens..."
                                : "Select a token"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingTokens || isUpdatingBalance ? (
                          <div className="flex items-center justify-center p-2">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>
                              {isUpdatingBalance
                                ? "Updating balances..."
                                : "Loading tokens..."}
                            </span>
                          </div>
                        ) : availableTokens.length > 0 ? (
                          <SelectGroup>
                            {availableTokens.map(renderTokenItem)}
                          </SelectGroup>
                        ) : (
                          <div className="p-2 text-muted-foreground text-center">
                            No tokens found
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.0"
                        step="any"
                        value={amountValue}
                        onChange={(e) => {
                          setAmountValue(e.target.value);
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number.parseFloat(e.target.value),
                          );
                        }}
                        disabled={!connected}
                      />
                    </FormControl>
                    {selectedToken && showTokenBalance && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Available:{" "}
                        {selectedToken.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits:
                            selectedToken.decimals > 6
                              ? 6
                              : selectedToken.decimals,
                        })}{" "}
                        {selectedToken.symbol}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            {connected ? (
              <Button
                type="button"
                onClick={() => form.handleSubmit(handleSubmit)()}
                className="w-full"
                disabled={isSubmitting || isLoading || isLoadingTokens}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Transaction...
                  </>
                ) : (
                  <>
                    Send Tokens
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <WalletConnectButton className="w-full">
                Connect Wallet
              </WalletConnectButton>
            )}

            {/* Network */}
            {connected && (
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Network</span>
                  <span className="font-medium bg-muted px-2 py-1 rounded">
                    {networkName}
                  </span>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
