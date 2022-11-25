import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'moment';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UnsupportedChainIdError, Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import Header from '../components/Header';
import { APIContextProvider } from '../contexts/api';
import ParticlesComponent from '../components/Particles';
import { Box, Typography, Container } from '@mui/material'
import { DEXSettingsContextProvider } from '../contexts/dex/settings';
import { Web3ContextProvider, useWeb3Context } from '../contexts/web3';
import WalletConnect from '../assets/images/wallet_connect.png'

function getLibrary(provider: any) {
  return new Web3(provider);
}

const AppContent = ({ children }: any) => {
  const { active, error } = useWeb3Context();
  return (
    <>
      <Head>
        <title>Lunagens</title>
      </Head>
      <Container maxWidth="lg">
        <ParticlesComponent />
        <Header />
        <Box>
          {!active ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 20 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mr: '40px', mb: '40px' }} zIndex={1}>
                <img src={WalletConnect.src} alt="wallet_connect" />
                <Typography color="#fff" sx={{ fontSize: '48px', fontWeight: 600, lineHeight: '50px', mt: '24px' }}>
                  Connect your wallet
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              {!!error && error instanceof UnsupportedChainIdError ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <span className="text-white/70 font-[700] text-[50px] font-Montserrat">{error.message}</span>
                </div>
              ) : (
                <>{children}</>
              )}
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics gaMeasurementId={process.env.NEXT_PUBLIC_GA_KEY} trackPageViews />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ContextProvider>
          <DEXSettingsContextProvider>
            <APIContextProvider>
              <AppContent>
                <Component {...pageProps} />
              </AppContent>
            </APIContextProvider>
          </DEXSettingsContextProvider>
        </Web3ContextProvider>
      </Web3ReactProvider>
    </>
  );
}
