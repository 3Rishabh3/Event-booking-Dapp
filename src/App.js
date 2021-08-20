import { useEffect, useState } from "react";

//Loader
import Loader from "./Utils/loader.gif";

//Toast container
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";

//Web3 library
import Web3 from "web3";

//Components
import NavBar from "./Components/NavBar";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [networkId, setNetWorkId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      toast("Please Connect To A Wallet. Try Using Metamask.", {
        type: "error",
        autoClose: 15000
      });
    }
  };

  const loadBlockchainData = async () => {
    if (typeof window.ethereum == "undefined") {
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

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <img src={Loader} alt="Loading..."></img>
    </div>
  ) : (
    <div>
      <NavBar address={currentAccount} />
      <ToastContainer />
      <h1>Book Your Show</h1>
    </div>
  );
};

export default App;
