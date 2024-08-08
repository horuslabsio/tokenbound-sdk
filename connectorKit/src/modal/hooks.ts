import { WALLET_API } from '@starknet-io/types-js';
import React, { useState } from 'react';

function useTokenBoundModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [walletSWO, setWalletSWO] =
    useState<WALLET_API.StarknetWindowObject | null>(null);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleWalletChange = (wallet: WALLET_API.StarknetWindowObject) => {
    console.log(wallet, "hello");
    setWalletSWO(wallet);
  };

  const resetInputValues = () => {
    setValue('');
    setSelectedOption('');
  };

  return {
    isOpen,
    openModal,
    closeModal,
    value,
    selectedOption,
    walletSWO,
    handleChange,
    handleChangeInput,
    resetInputValues,
    handleWalletChange,
  };
}

export default useTokenBoundModal;
