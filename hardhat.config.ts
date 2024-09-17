import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


require("dotenv").config();

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    networks: {
      hardhat: {
    forking: {
        url: process.env.ALCHEMY_RPC_URL as string,
      }, // Set to "auto" or specify a higher limit
      gasPrice: 29912165556, // Disable gas price for Hardhat to calculate automatically
    }
  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "lisk-sepolia": "123",
    },
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
