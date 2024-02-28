import { useState } from 'react';

export const useHide = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [hide, setHide] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    setHide(true);
  };
  console.log('z hf,jnf.');
  return { hide, toggleDropdown };
};
