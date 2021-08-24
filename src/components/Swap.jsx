import React, { useState,useContext } from "react";
import "./Swap.css";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import UserContext from "../Contexts/UserContext";

export default function Swap() {
  window.document.title = "Swap";
  const context = useContext(UserContext);

  let [fromAmt, setfromAmt] = useState(0);
  let [toAmt, settoAmt] = useState(0);

  const performSwap = (value) => {
    context.buyTokens(value*10**18);
  }

  return (
    <div className="root">
      <div id="swapcontainer">
        <h1 id="heading">Swap</h1>
        <div className="childcontainer" id="From">
          <div className="selectfromcurrent">
          Balance: {context?.ethBalance/10**18}
            <Button
              className="modalbtn"
              endIcon={<ExpandMoreIcon fontSize="large" />}
              variant="outlined"
              color="primary"
            >
              ETH
            </Button>
          </div>
          <input
            id="enterfromamount"
            onChange={(e) => {
              setfromAmt(e.target.value);
              settoAmt(e.target.value*100);
            }}
            value={fromAmt}
            type="text"
          />
        </div>
        <div className="childcontainer" id="To">
          <div className="selecttocurrent">
          Balance: {context?.tokenBalance/10**18}
            <Button
              className="modalbtn"
              variant="outlined"
              color="secondary"
              style={{ color: "white", background: "black" }}
              disabled
            >
              ECR
            </Button>
          </div>
          <input
            id="entertoamount"
            onChange={(e) => {
              settoAmt(e.target.value);
            }}
            value={toAmt}
            disabled={true}
            type="text"
          />
        </div>
        <Button
          style={{ marginTop: "10px", width: "100%", fontSize: "1.4rem" }}
          variant="contained"
          color="secondary"
          onClick={()=>{performSwap(fromAmt)}}
        >
          SWAP
        </Button>
      </div>
    </div>
  );
}
