import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import homebg1 from "../../Utils/homebg1.jpg";
import { Link } from "react-router-dom";
// icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EventIcon from "@material-ui/icons/Event";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

export default function Home() {
  const classes = useStyles();
  window.document.title = "homepage";
  return (
    <div class={classes.homepage}>
      <h1 class={classes.heading}>
        {" "}
        <i>
          <AccountCircleIcon color="blue" fontSize={"large"} />
        </i>{" "}
        Ticky Ticket
      </h1>
      <h1 class={classes.subHeading}>What are you going to do?</h1>
      <div class={classes.root}>
        <h1 class={classes.subHeading}>Welcome to Ticky Ticket</h1>
        <p class={classes.ptag}>
          The PhoenixDAO Events Marketplace is a dApp that allows people to
          create events and sell tickets online, with the option to make an
          event, paid or free.
        </p>
        <p class={classes.ptag}>
          The tickets created on this service are ERC721 tokens, which means
          that users are able to move, gift, or sell those tickets to other
          users.
        </p>
        <p class={classes.ptag}>
          The PhoenixDAO Events Marketplace is a dApp powered by the Matic
          Network. In order to create events or purchase tickets, you are
          required have an wallet. If you do not have one currently, you can use
          MetaMask.
        </p>

        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <Link style={{ textDecoration: "none" }} to="/upcomingevent">
              {" "}
              <Paper class={classes.paper}>
                <EventIcon style={{ fontSize: "4rem" }} />
                <br />
                Upcomming Events
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link style={{ textDecoration: "none" }} to="/pastevent">
              <Paper class={classes.paper}>
                <EventAvailableIcon style={{ fontSize: "4rem" }} />
                <br />
                Past Events
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link style={{ textDecoration: "none" }} to="/createevent">
              <Paper class={classes.paper}>
                <AddBoxIcon style={{ fontSize: "4rem" }} />
                <br />
                Create Event
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link style={{ textDecoration: "none" }} to="/dashboard">
              <Paper class={classes.paper}>
                <DashboardIcon style={{ fontSize: "4rem" }} />
                <br />
                Dashboard
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link style={{ textDecoration: "none" }} to="/swap">
              <Paper class={classes.paper}>
                <SwapHorizIcon style={{ fontSize: "4rem" }} />
                <br />
                Swap Ticket
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link style={{ textDecoration: "none" }} to="/userticket">
              <Paper class={classes.paper}>
                <ConfirmationNumberIcon style={{ fontSize: "4rem" }} />
                <br />
                Your Ticket
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "url(" + homebg1 + ")",
    backgroundPosition: "center",
    padding: "24px",
    borderRadius: "5px"
  },
  homepage: {
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
  },
  ptag: {
    color: "white",
    textAlign: "justify"
  },
  paper: {
    padding: theme.spacing(2),
    height: "120px",
    margin: "5%",
    textAlign: "center",
    color: "white",
    border: "2px solid white",
    borderRadius: "10px",
    transition: ".2s steps(60)",
    "&:hover": {
      transform: "scale(1.03)",
      transformOrigin: "center",
      border: "2px solid #0f09",
      cursor: "pointer",
      background: "#8a86"
    }
  }
}));
