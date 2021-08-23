import React, { useState } from "react";
import "./Swap.css";
import Button from "@material-ui/core/Button";
export default function Swap() {
  window.document.title = "Swap";
  let [fromAmt, setfromAmt] = useState(0);
  return (
    <div className="root">
      <div id="swapcontainer">
        <h1 id="heading">Swap</h1>
        <div className="childcontainer" id="From">
          <div className="selectfromcurrent">
            FROM
            <Button className="modalbtn" variant="contained" color="primary">
              ETH
            </Button>
          </div>
          <input id="enterfromamount" value={fromAmt} type="text" />
        </div>
        <div className="childcontainer" id="To"></div>
      </div>
    </div>
  );
}
