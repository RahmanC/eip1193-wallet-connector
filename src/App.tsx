/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./App.css";

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: Array<any> }) => Promise<any>;
      on: (eventName: string, callback: (accounts: string[]) => void) => void;
    };
  }
}

function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      alert("Please install a wallet");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to your wallet using the Connect button");
        }
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      alert("Please install a wallet");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setWalletAddress(accounts[0]);
      });
    } else {
      alert("Please install a wallet");
    }
  };

  return (
    <div className="main">
      <button type="button" onClick={connectWallet}>
        {walletAddress && walletAddress.length > 0
          ? `Connected: ${walletAddress.substring(
              0,
              4
            )}...${walletAddress.substring(38)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
}

export default App;
