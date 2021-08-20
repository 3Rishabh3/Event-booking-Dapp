import { useEffect, useState } from "react";

//Loader
import CircularProgress from "@material-ui/core/CircularProgress";

//Toast container
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";

//Web3 library
import Web3 from "web3";

const ConnectToMetmask = ({ setCurrentAccountToHome }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [networkId, setNetWorkId] = useState(null);

  useEffect(() => {
    loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      loadBlockchainData();
    } else {
      toast("Please Connect To A Wallet. Try Using Metamask.", {
        type: "error",
        autoClose: 15000
      });
    }
  };

  const loadBlockchainData = async () => {
    if (typeof window.ethereum === "undefined") {
      return;
    }

    const web3 = new Web3(window.ethereum);

    const accounts = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    setNetWorkId(networkId);

    if (networkId !== 4) {
      toast("Use Rinkeby Test network", { type: "error", autoClose: 15000 });
      return;
    }
  };

  if (networkId !== 4)
    return (
      <h1 className="text-center mt-5">Please connect to Rinkeby Testnet...</h1>
    );
  return currentAccount === null ? (
    <CircularProgress />
  ) : (
    <>{setCurrentAccountToHome(currentAccount)}</>
  );
};

export default ConnectToMetmask;
