import React, { useState } from 'react';

export function useTokenBoundModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

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
    setSelectedOption(""); // Set to the default option or any desired value
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
