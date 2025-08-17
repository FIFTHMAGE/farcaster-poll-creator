'use client'

import { ReactNode } from 'react'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { base } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, publicClient } = configureChains(
  [base],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'PollCaster',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo',
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}