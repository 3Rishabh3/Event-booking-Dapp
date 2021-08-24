import { Route, Switch, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// all pages imported
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Swap from "./components/Swap";
import Userticket from "./components/Userticket";

//Contexts
import UserContext from "./Contexts/UserContext";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";

//Web3 library
import Web3 from "web3";

//import Abis
import SwapAbi from "./contracts/Swap.json";
import TokenAbi from "./contracts/Token.json";

export default function App() {
  let location = useLocation();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [networkId, setNetWorkId] = useState(null);
  const [token, setToken] = useState(null);
  const [swap, setSwap] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        autoClose: 15000,
      });
    }
  };

  const loadBlockchainData = async () => {
    if (typeof window.ethereum === "undefined") {
      return;
    }

    const web3 = new Web3(window.ethereum);

    var accounts = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    setNetWorkId(networkId);

    if (networkId !== 4) {
      toast("Use Rinkeby Test network", { type: "error", autoClose: 15000 });
      return;
    }

    var ethBalance = await web3.eth.getBalance(accounts[0]);
    setEthBalance(ethBalance);
    console.log(ethBalance);

    // Load Token
    const tokenData = TokenAbi.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(TokenAbi.abi, tokenData.address);
      setToken(token);
      let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
      setTokenBalance(tokenBalance.toString());
    } else {
      toast("Token contract not deployed to detected network.", {
        type: "error",
      });
    }

    // Load Swap
    const SwapData = SwapAbi.networks[networkId];
    if (SwapData) {
      const swap = new web3.eth.Contract(SwapAbi.abi, SwapData.address);
      setSwap(swap);
    } else {
      toast("Swap contract not deployed to detected network.", {
        type: "error",
      });
    }
  };

  const buyTokens = (etherAmount) => {
    setIsLoading(true);
    swap.methods
      .buyTokens()
      .send({ value: etherAmount, from: currentAccount })
      .on("transactionHash", (hash) => {
        setIsLoading(false);
      });
  };

  const sellTokens = (tokenAmount) => {
    setIsLoading(true);
    token.methods
      .approve(swap.address, tokenAmount)
      .send({ from: currentAccount })
      .on("transactionHash", (hash) => {
        swap.methods
          .sellTokens(tokenAmount)
          .send({ from: currentAccount })
          .on("transactionHash", (hash) => {
            setIsLoading(false);
          });
      });
  };

  if (networkId !== 4)
    return (
      <h1 className="text-center mt-5">Please connect to Rinkeby Testnet...</h1>
    );

  return (
    <>
      <ToastContainer />
      <UserContext.Provider
        value={{
          currentAccount,
          ethBalance,
          tokenBalance,
          token,
          swap,
          buyTokens,
          sellTokens,
        }}
      >
        <NavBar address={currentAccount} />
        <Switch location={location} key={location.key}>
          <Route path="/" exact component={Homepage} />
          <Route path="/swap" exact component={Swap} />
          <Route path="/userticket" exact component={Userticket} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}
