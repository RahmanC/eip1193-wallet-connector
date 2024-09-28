/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: Array<any> }) => Promise<any>;
      on: (eventName: string, callback: (accounts: string[]) => void) => void;
      removeListener: any;
    };
  }
}

import React, { useState } from "react";
import { useWalletConnection } from "./hooks/useWalletConnection";
import SingleRow from "./components/SingleRow";
import { useGetNetwork } from "./hooks/useGetNetwork";

const App: React.FC = () => {
  const {
    address,
    balance,
    chainId,
    isConnected,
    connectWallet,
    disconnectWallet,
    fetchBalance,
  } = useWalletConnection();
  const [inputAddress, setInputAddress] = useState("");
  const [inputBalance, setInputBalance] = useState("");

  const networkName = useGetNetwork(chainId);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(e.target.value);
  };

  const handleCheckBalance = async () => {
    if (typeof window.ethereum !== "undefined" && inputAddress) {
      const balance = await fetchBalance(inputAddress);
      setInputBalance(balance);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 w-screen h-screen">
      <div className="flex items-center w-full gap-4 justify-between mb-5">
        <h1 className="text-xl font-semibold text-neutral-900">
          EIP1193 Wallet Connection
        </h1>

        <button
          type="button"
          onClick={connectWallet}
          className="rounded-md px-4 py-2 bg-blue-500 text-white text-lg font-medium"
        >
          {isConnected && address.length > 0
            ? `${address.substring(0, 6)}...${address.substring(38)}`
            : "Connect Wallet"}
        </button>
      </div>

      {isConnected && (
        <div className="flex flex-col gap-3 border border-neutral-400 p-5 w-full">
          <SingleRow label="Connected Address" value={address} />
          <SingleRow label="Balance" unit="wei" value={balance} />
          <SingleRow label="Network" value={networkName} />
          <SingleRow label="Chain ID" value={chainId} />
        </div>
      )}

      {isConnected && (
        <button
          type="button"
          className="bg-red-400 text-white text-lg font-medium rounded-md px-4 py-2 w-max my-8"
          onClick={disconnectWallet}
        >
          Disconnect Wallet
        </button>
      )}

      <div className="w-full border-t border-t-neutral-300 border-dashed">
        <h2 className="text-center text-2xl font-medium my-2">
          Check Balance for Any Address
        </h2>
        <div className="flex items-center gap-4 w-full">
          <input
            type="text"
            value={inputAddress}
            onChange={handleAddressChange}
            placeholder="Enter Ethereum address"
            className="w-2/3 p-4 rounded-md text-lg bg-neutral-100 border border-blue-100"
          />
          <button
            type="button"
            onClick={handleCheckBalance}
            className="bg-blue-400 text-white text-lg font-medium rounded-md px-4 py-2 w-max my-8"
          >
            Check Balance
          </button>
        </div>

        {inputBalance && (
          <div className=" border border-neutral-400 p-5 w-full">
            <SingleRow label="Balance" unit="wei" value={inputBalance} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
