import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'moment';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { UnsupportedChainIdError, Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import Header from '../components/Header';
import { DEXSettingsContextProvider } from '../contexts/dex/settings';
import { Web3ContextProvider, useWeb3Context } from '../contexts/web3';
import { APIContextProvider } from '../contexts/api';
import ParticlesComponent from '../components/Particles';
import { Box, Typography, Button, Container } from '@mui/material'
import buildingPNG from '../assets/images/buildings.png'

const buttonStyle = {
  background: 'linear-gradient(126deg, #063230 0%, #07807C 100%) !important',
  marginRight: '20px'
}

function getLibrary(provider: any) {
  return new Web3(provider);
}

const AppContent = ({ children }: any) => {
  const { active, error } = useWeb3Context();
  return (
    <Container maxWidth="lg">
      <ParticlesComponent />
      <Header />
      {/* <div className="overflow-auto flex-1 backdrop-opacity-10 backdrop-invert bg-[#000]/70">
        {!active ? (
          <div className="flex justify-center items-center w-full my-[100px]">
            <div className="flex flex-col-reverse justify-center items-center gap-6">
              <span className="text-white font-[700] text-[18px] md:text-[50px] font-Montserrat">Connect your wallet!</span>
              <Image src="/images/connect_wallet.svg" width={398.34} height={378} alt="connect_wallet" />
            </div>
          </div>
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
      </div> */}
      <Box sx={{ pt: 20 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mr: '40px', mb: '40px' }} zIndex={1}>
            <Typography color="#fff" sx={{ fontSize: '48px', fontWeight: 600, lineHeight: '50px', mb: '24px' }}>
              Just stake some tokens to earn
            </Typography>
            <Typography color="#fff" sx={{ fontSize: '20px', fontWeight: 300, lineHeight: '24px' }}>
              High APR, Low Risk
            </Typography>
            <Typography color="#fff" sx={{ fontSize: '20px', fontWeight: 300, lineHeight: '24px', mb: '24px' }}>
              Create pools for your project
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Button
                component="button"
                variant="contained"
                sx={{ textAlign: 'center', ...buttonStyle }}
                href="https://pancakeswap.finance/swap?outputCurrency=0x28B9aed756De31B6b362aA0f23211D13093EBb79"
              >
                BUY LUNAGENS
              </Button>
              <Button
                variant="contained"
                sx={{ ...buttonStyle }}
              >
                CREATE POOL
              </Button>
              <Button
                variant="contained"
                sx={{ textAlign: 'center', ...buttonStyle }}
                href="https://docs.google.com/forms/d/e/1FAIpQLSc9NK4x0_T0xcV9cp5ZoWPb5cVWUg09G_WGVTUcgxaC6HypWQ/viewform?usp=sharing"
              >
                REQUEST A POOL
              </Button>
            </Box>
          </Box>
          <Box sx={{ zIndex: 1, maxWidth: '640px', width: '100%' }}>
            <img src={buildingPNG.src} alt="" style={{ width: '100%' }} />
          </Box>
        </Box>
      </Box>

    </Container>
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
