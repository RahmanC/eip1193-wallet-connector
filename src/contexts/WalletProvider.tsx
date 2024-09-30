import React, { useState, useEffect, useCallback } from "react";
import { WalletContext } from "./WalletContext";

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: "",
    balance: "",
    chainId: "",
    isConnected: false,
  });

  const updateWalletState = useCallback(async (address: string) => {
    if (address) {
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const chainId = await window.ethereum!.request({ method: "eth_chainId" });

      setWalletState({
        address,
        balance: parseInt(balance, 16).toString(),
        chainId,
        isConnected: true,
      });
    } else {
      setWalletState({
        address: "",
        balance: "",
        chainId: "",
        isConnected: false,
      });
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await updateWalletState(accounts[0]);
      } catch (err: unknown) {
        console.error((err as Error).message);
      }
    } else {
      alert("Please install a wallet");
    }
  }, [updateWalletState]);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: "",
      balance: "",
      chainId: "",
      isConnected: false,
    });
  }, []);

  const fetchBalance = useCallback(async (address: string) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        return parseInt(balance, 16).toString();
      } catch (err: unknown) {
        console.error((err as Error).message);
        return "Error fetching balance";
      }
    }
    return "Wallet not connected";
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          await updateWalletState(accounts[0]);
        }
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        updateWalletState(accounts[0]);
      } else {
        disconnectWallet();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [updateWalletState, disconnectWallet]);

  return (
    <WalletContext.Provider
      value={{
        ...walletState,
        connectWallet,
        disconnectWallet,
        fetchBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
