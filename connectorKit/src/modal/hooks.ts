import React, { useState } from 'react';

function useTokenBoundModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const resetInputValues = () => {
    setValue("");
    setSelectedOption("");
  };

  return {
    isOpen,
    openModal,
    closeModal,
    value,
    selectedOption,
    handleChange,
    handleChangeInput,
    resetInputValues
  };
}

export default useTokenBoundModal;