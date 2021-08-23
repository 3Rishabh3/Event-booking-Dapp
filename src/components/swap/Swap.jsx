import React, { useState } from "react";
import "./Swap.css";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
export default function Swap() {
  window.document.title = "Swap";
  let [fromAmt, setfromAmt] = useState(0);
  let [toAmt, settoAmt] = useState(0);
  return (
    <div className="root">
      <div id="swapcontainer">
        <h1 id="heading">Swap</h1>
        <div className="childcontainer" id="From">
          <div className="selectfromcurrent">
            FROM
            <Button
              className="modalbtn"
              endIcon={<ExpandMoreIcon fontSize="large" />}
              variant="contained"
              color="primary"
            >
              ETH
            </Button>
          </div>
          <input
            id="enterfromamount"
            onChange={(e) => {
              setfromAmt(e.target.value);
            }}
            value={fromAmt}
            type="text"
          />
        </div>
        <div className="childcontainer" id="To">
          <div className="selecttocurrent">
            TO
            <Button
              className="modalbtn"
              variant="contained"
              color="secondary"
              style={{ color: "white", background: "black" }}
              disabled
            >
              OurC
            </Button>
          </div>
          <input
            id="entertoamount"
            onChange={(e) => {
              settoAmt(e.target.value);
            }}
            value={toAmt}
            type="text"
          />
        </div>
      </div>
    </div>
  );
}
