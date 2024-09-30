/* eslint-disable @typescript-eslint/no-explicit-any */
interface WalletState {
  address: string;
  balance: string;
  chainId: string;
  isConnected: boolean;
}

interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  fetchBalance: (address: string) => Promise<string>;
}

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: Array<any> }) => Promise<any>;
    on: (eventName: string, callback: (accounts: string[]) => void) => void;
    removeListener: any;
  };
}
