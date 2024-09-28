export const useGetNetwork = (chainId: string) => {
  switch (chainId) {
    case "0x1":
      return "Ethereum Mainnet";
    case "0x106a":
      return "Lisk Sepolia";
    case "0xaa36a7":
      return "Sepolia";
    case "0x4":
      return "Rinkeby Testnet";
    case "0x5":
      return "Goerli Testnet";
    default:
      return "Unknown Network";
  }
};
