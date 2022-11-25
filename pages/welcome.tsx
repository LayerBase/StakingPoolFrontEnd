import React from 'react';
import Router from 'next/router'
import Head from 'next/head';
import { 
  Box,
  Typography,
  Button
} from '@mui/material'
import buildingPNG from '../assets/images/buildings.png'

const buttonStyle = {
  background: 'linear-gradient(126deg, #063230 0%, #07807C 100%) !important',
  marginRight: '20px'
}

export default function Dex() {
  const handleCreatePool = () => {
    Router.push('/staking')
  }

  return (
    <>
      <Head>
        <title>Lunagens</title>
      </Head>
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
                onClick={handleCreatePool}
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
    </>
  );
}
