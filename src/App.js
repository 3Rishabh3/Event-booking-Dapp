import { Route, Switch, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// all pages imported
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Swap from "./components/Swap";
import Userticket from "./components/Userticket";
import BookEvent from "./components/BookEvent";

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
import EventRegistrationAbi from "./contracts/EventRegistration.json";

export default function App() {
  let location = useLocation();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [networkId, setNetWorkId] = useState(null);

  // smart contracts
  const [token, setToken] = useState(null);
  const [swap, setSwap] = useState(null);
  const [event, setEvent] = useState(null);

  // wallet balance
  const [tokenBalance, setTokenBalance] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  // data related to event for a registrant
  const [amountPaid, setAmountPaid] = useState(null);
  const [priceOfTicket, setPriceOfTicket] = useState("");
  const [quota, setQuota] = useState(null);
  const [numOfTicketsBooked, setNumOfTicketsBooked] = useState(null);
  const [numOfTicketSold, setNumOfTicketSold] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadWeb3();
  }, [priceOfTicket, quota, numOfTicketsBooked, numOfTicketSold, amountPaid]);

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

    // Load Event Registration
    const EventRegistrationData = EventRegistrationAbi.networks[networkId];
    if (EventRegistrationData) {
      const event = new web3.eth.Contract(
        EventRegistrationAbi.abi,
        EventRegistrationData.address
      );
      setEvent(event);
      const amountPaid = await event.methods.getRegistrantAmountPaid().call();
      const priceOfTicket = await event.methods.price().call();
      const quota = await event.methods.quota().call();
      const numOfTicketSold = await event.methods.numTicketSold().call();
      const numOfTicketsBooked = await event.methods
        .getRegistrantNumOfTickets()
        .call();
      setAmountPaid(amountPaid);
      setPriceOfTicket(priceOfTicket);
      setQuota(quota);
      setNumOfTicketSold(numOfTicketSold);
      setNumOfTicketsBooked(numOfTicketsBooked);
    } else {
      toast("Event Registration contract not deployed to detected network.", {
        type: "error",
      });
    }
  };

  //functions for swap contract
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
  //functions for event booking
  const buyTicket = (numOfTickets) => {
    setIsLoading(true);
    event.methods
      .buyTicket(numOfTickets)
      .send({ value: numOfTickets * priceOfTicket, from: currentAccount })
      .on("transactionHash", (hash) => {
        setIsLoading(false);
      });
  };

  const cancelTicket = () => {
    event.methods.refundTicket().send({ from: currentAccount });
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
          buyTokens,
          sellTokens,
          buyTicket,
          cancelTicket,
          quota,
          numOfTicketSold,
          priceOfTicket,
        }}
      >
        <NavBar address={currentAccount} />
        <Switch location={location} key={location.key}>
          <Route path="/" exact component={Homepage} />
          <Route path="/swap" exact component={Swap} />
          <Route path="/userticket" exact component={Userticket} />
          <Route path="/bookEvent" exact component={BookEvent} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}
