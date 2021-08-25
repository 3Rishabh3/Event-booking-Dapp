import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import { TextField, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import UserContext from "../Contexts/UserContext";
import Web3 from "web3";

const Ticket = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "2",
    label: "2"
  },
  {
    value: "3",
    label: "3"
  },
  {
    value: "4",
    label: "4"
  },
  {
    value: "5",
    label: "5"
  }
];

export default function Createevent() {
  const context = useContext(UserContext);

  const classes = useStyles();
  window.document.title = "Book Event";

  const [Tickets, setTicket] = React.useState(1);

  const handleChange = (event) => {
    setTicket(event.target.value);
  };

  const handleBuyTicket = () => {
    context?.buyTicket(Tickets);
  }

  const handleCancelTicket = () => {
    context?.cancelTicket();
}

  return (
    <section>
      <div class={classes.Createevent}>
        <h1 class={classes.heading}>
          <i>
            <AccountCircleIcon color="blue" fontSize={"large"} />
          </i>
          PhoenixDAO Events Marketplace
        </h1>
        <h1 class={classes.subHeading}>What are you going to do?</h1>
      </div>
      <div class={classes.root}>
        <div>
          <i>
            <CreateTwoToneIcon color="blue" fontSize={"large"} />
            <b>Event Registration</b>
          </i>
          <hr></hr>
        </div>
        <div class={classes.adj}>
          <h1>
            <i>Event Registration Dapp</i>
          </h1>
          <hr></hr>
          <p>
            <div style={{ display: "flex" }}>
              <p>
                <b>Event Details</b>{" "}
              </p>{" "}
              <p style={{ marginLeft: "8%" }}>Blockchain Hackathon, India</p>
            </div>
          </p>
          <hr></hr>
          <p>
            <div style={{ display: "flex" }}>
              <p>
                {" "}
                <b>Date </b>{" "}
              </p>{" "}
              <p style={{ marginLeft: "16%" }}> Sep 30 , 2021 </p>
            </div>
          </p>
          <hr></hr>
          <p>
            <div style={{ display: "flex" }}>
              <p>
                {" "}
                <b>Ticket Price </b>{" "}
              </p>
              <p style={{ marginLeft: "8%" }}> {Web3.utils.fromWei(Web3.utils.toBN(context?.priceOfTicket), "ether")} ETH</p>
            </div>
          </p>
          <hr></hr>
          <p>
            <div style={{ display: "flex" }}>
              <p>
                {" "}
                <b> Quota </b>
              </p>
              <p style={{ marginLeft: "16%" }}> {context?.quota}</p>
            </div>
          </p>
          <hr></hr>
          <p>
            <div style={{ display: "flex" }}>
              <p>
                {" "}
                <b> Registrants </b>{" "}
              </p>
              <p style={{ marginLeft: "14%" }}> {context?.numOfTicketSold}</p>
            </div>
          </p>
          <hr></hr>
          <br></br>
          <h1> Register For Event</h1>
          <p> Address : {context?.currentAccount}</p>
          <p> Balance : {Web3.utils.fromWei(Web3.utils.toBN(context?.ethBalance), "ether")} ETH</p>
          <form>
            <InputLabel>Select number of tickets to buy</InputLabel>
            <br/>
            <TextField
              style={{ width: "95% ", marginBottom: "4%" }}
              id="outlined-select-currency"
              select
              value={Tickets}
              onChange={handleChange}
              variant="outlined"
            >
              {Ticket.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/*<p>Total : 0EH </p>*/}
            <div style={{ display: "flex" }}>
              <Button
                style={{ width: "45% ", margin: "3%" }}
                variant="contained"
                color="primary"
                component="span"
                onClick={()=>{handleBuyTicket()}}
              >
                Buy ticket
              </Button>

              <Button
                style={{ width: "45% ", margin: "3%" }}
                variant="contained"
                color="primary"
                component="span"
                onClick={()=>{handleCancelTicket()}}
              >
                cancel ticket
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    backgroundPosition: "center",
    padding: "24px",
    paddingBottom: "100px",
    borderRadius: "5px",
    margin: "6%",
    hieght: "100%"
  },

  input: {
    marginTop: "4%",
    width: "68%",
    marginBottom: "2%"
  },

  Createevent: {
    width: "80%",
    margin: "auto",
    marginTop: "24px",
    marginBottom: "24px"
  },
  heading: {
    color: "white",
    fontSize: "3rem",
    fontWeight: "900",
    margin: 0,
    padding: 0,
    marginTop: "10%"
  },
  subHeading: {
    color: "white",
    fontSize: "1.8rem",
    padding: "0",
    margin: "0",
    marginBottom: "2rem"
  }
}));
