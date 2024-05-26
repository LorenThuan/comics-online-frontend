import {useState} from "react";

const useLoginPopup = () => {
  const [loginPopup, setLoginPopup] = useState(false);

  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  }

  return { loginPopup, setLoginPopup, handleLoginPopup };
};

export default useLoginPopup;