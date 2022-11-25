import React, { ReactElement, useState, useEffect, Children, useMemo } from 'react';
import { Transition } from '@headlessui/react';
import Link, { LinkProps } from 'next/link';
import Router, { useRouter } from 'next/router';
import { FaWallet, FaDiceSix, FaHandshake } from 'react-icons/fa';
import { RiMenu4Fill } from 'react-icons/ri';
import { FiX, FiChevronDown, FiLogOut, FiCheck, FiLink } from 'react-icons/fi';
import { IoMdRefresh } from 'react-icons/io';
import {
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Link as MuiLink
} from '@mui/material'
import { formatEthAddress } from 'eth-address';
import _ from 'lodash';
import { hexValue } from '@ethersproject/bytes';
import { useWeb3Context } from '../../contexts/web3';
import ProviderSelectModal from '../ProviderSelectModal';
import chains from '../../assets/chains.json';
import { switchChain } from '../../utils';
import Logo from '../../assets/images/logo.png'

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

const buttonStyle = {
  background: 'linear-gradient(180deg, #063230 0%, #07807C 100%) !important'
}

const NAVITEMS = [{
  name: 'Swap', link: 'https://www.lunagens.com/'
}, {
  name: 'Pools', link: ''
}]

const ActiveLink = ({ children, activeClassName, ...props }: ActiveLinkProps) => {
  const { asPath, isReady } = useRouter();

  const child = Children.only(children);
  const childClassName = child.props.className || '';
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL((props.as || props.href) as string, location.href).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName = linkPathname === activePathname ? `${childClassName} ${activeClassName}`.trim() : childClassName;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [asPath, isReady, props.as, props.href, childClassName, activeClassName, setClassName, className]);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  );
};

export default function Header() {
  const { reload } = useRouter();
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [showProviderModal, setShowProviderModal] = useState<boolean>(false);
  const { active, account, error: web3Error, disconnectWallet, chainId } = useWeb3Context();
  const selectedChain = useMemo(() => chains[(chainId as unknown as keyof typeof chains) || 97], [chainId]);
  return (
    <>
      {web3Error && (
        <div className="alert alert-error w-full rounded-[2px]">
          <div>
            <FiX />
            <span className="text-white font-poppins">{web3Error.message}</span>
          </div>
        </div>
      )}
      <Box className="font-Montserrat" sx={{ display: 'flex', py: 1, justifyContent: 'space-between' }}>
        <AppBar component="div" sx={{ background: 'transparent' }}>
          <Toolbar>
            <Box
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={Logo.src} alt="" style={{ width: '36px', marginRight: '8px' }} />
                <Typography color="#fff" sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => { Router.push('/welcome') }}>LUNAGENS</Typography>
              </Box>
            </Box>
            <MuiLink
              href='https://www.lunagens.com/'
              color="#fff"
              underline="none"
              sx={{
                mr: 2,
                textTransform: 'uppercase',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Swap
            </MuiLink>
            <MuiLink
              onClick={() => {Router.push('/staking')}}
              color="#fff"
              underline="none"
              sx={{
                mr: 2,
                textTransform: 'uppercase',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Pools
            </MuiLink>
            <div className="flex justify-center items-center gap-2">
              {!active ? (
                <Button variant="contained" sx={{ borderRadius: 50, ...buttonStyle }} onClick={() => setShowProviderModal(true)}>
                  <FaWallet />
                  <Typography sx={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 600, py: 1, ml: 2 }}>
                    Connect Wallet
                  </Typography>
                </Button>
              ) : (
                <div className="flex justify-center items-center gap-2 flex-1">
                  <div className="dropdown dropdown-hover">
                    <button
                      tabIndex={0}
                      className="hidden md:flex justify-center items-center bg-[#000]/40 py-[9px] px-[10px] rounded-[25px] text-[18px] text-white gap-2"
                    >
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={selectedChain.logoURI} alt={selectedChain.symbol} />
                        </div>
                      </div>
                      <span className="text-white text-[18px] ml-[2px]">{selectedChain.name}</span> <FiChevronDown />
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#000]/[0.85] rounded-box w-full text-white">
                      {_.map(Object.keys(chains), (key, index) => (
                        <li key={index}>
                          <a className="gap-2" onClick={() => switchChain(hexValue(parseInt(key)), chains)}>
                            <div className="avatar">
                              <div className="w-8 rounded-full">
                                <img src={chains[key as keyof typeof chains].logoURI} alt={chains[key as keyof typeof chains].symbol} />
                              </div>
                            </div>
                            {chains[key as keyof typeof chains].name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="dropdown dropdown-hover">
                    <Button
                      tabIndex={0}
                      className="hidden md:flex justify-center items-center bg-[#1673b9] py-[9px] px-[10px] rounded-[25px] text-[18px] text-white gap-2"
                      sx={buttonStyle}
                    >
                      <FaWallet />
                      <span className="text-white text-[18px] ml-[2px]">{formatEthAddress(account as string, 4)}</span> <FiChevronDown />
                    </Button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#000]/[0.6] rounded-box w-52 text-white">
                      <li>
                        <a onClick={disconnectWallet} className="btn btn-ghost gap-2">
                          <FiLogOut /> Disconnect
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <Button
                className="md:hidden flex justify-center items-center bg-[#1673b9] py-[9px] px-[10px] rounded-[5px] text-[18px] text-white"
                onClick={() => setShowMobileSidebar((val) => !val)}
              >
                {!showMobileSidebar ? <RiMenu4Fill /> : <FiX />}
              </Button>
              {active && (
                <Button onClick={reload} className="btn btn-ghost btn-square text-white text-[30px]">
                  <IoMdRefresh />
                </Button>
              )}
            </div>
          </Toolbar>
          <Transition
            as="div"
            className="flex flex-row md:hidden bg-[#000]/80 h-[50px] gap-2 overflow-auto hidden-scrollbar justify-between items-center w-full px-4 py-4"
            enter="transform transition ease-in-out duration-[500ms]"
            enterFrom="opacity-0 -translate-y-6"
            enterTo="opacity-100 translate-y-0"
            show={showMobileSidebar}
          >
            {!active ? (
              <button
                onClick={() => setShowProviderModal(true)}
                className="md:hidden flex justify-center items-center bg-[#1673b9] py-[9px] px-[10px] rounded-[5px] text-[18px] text-white"
              >
                <FaWallet />
              </button>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <label
                  htmlFor="chain-modal"
                  className="md:hidden flex justify-center items-center bg-[#000]/40 py-[9px] px-[10px] rounded-[5px] text-[18px] text-white"
                >
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={selectedChain.logoURI} alt={selectedChain.symbol} />
                    </div>
                  </div>
                </label>
                <button
                  onClick={disconnectWallet}
                  className="md:hidden flex justify-center items-center bg-green-500 py-[9px] px-[10px] rounded-[5px] text-[18px] text-white"
                >
                  <FiCheck />
                </button>
              </div>
            )}
          </Transition>
        </AppBar>
      </Box>

      <ProviderSelectModal isOpen={showProviderModal} onClose={() => setShowProviderModal(false)} />
      <input type="checkbox" id="chain-modal" className="modal-toggle" />
      <div className="modal modal-bottom">
        <div className="modal-box relative bg-[#000]">
          <label htmlFor="chain-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            <FiX />
          </label>
          <ul className="menu p-2 shadow bg-[#000]/[0.6] rounded-box w-full text-white">
            {_.map(Object.keys(chains), (key, index) => (
              <li key={index}>
                <label htmlFor="chain-modal" className="gap-2" onClick={() => switchChain(hexValue(parseInt(key)), chains)}>
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={chains[key as keyof typeof chains].logoURI} alt={chains[key as keyof typeof chains].symbol} />
                    </div>
                  </div>
                  {chains[key as keyof typeof chains].name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
