import {useState} from "react";

const useSearchPopup = () => {
  const [searchPopup, setSearchPopup] = useState(false);

  const handleSearchPopup = () => {
    setSearchPopup(!searchPopup);
  }

  return { searchPopup, setSearchPopup, handleSearchPopup };
};

export default useSearchPopup;