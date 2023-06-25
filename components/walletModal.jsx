import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import * as dotenv from 'dotenv';
dotenv.config();

import { useState, useEffect } from 'react';

export default function walletModal() {

  const [web3Modal, setWeb3Modal] = useState(null)

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: env.INFURA_KEY,
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      network: "goerli",
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal)
  }, [])

  async function connectWallet() {
    const provider = await web3Modal.connect();
  }

  return <button onClick={connectWallet}>Connect wallet</button>
}