import { Route, Switch, useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
// all pages imported
import Homepage from "./components/homepage/Homepage";
import Createevent from "./components/createevent/Createevent";
import Dashboard from "./components/dashboard/Dashboard";
import Pastevent from "./components/pastevent/Pastevent";
import Swap from "./components/swap/Swap";
import Upcomingevent from "./components/upcomingevent/Upcomingevent";
import Userticket from "./components/userticket/Userticket";
import ConnectToMetmask from "./MetamaskConnect";
import { useState } from "react";

export default function App() {
  let location = useLocation();
  let [currentaccount, setCurrentAccountToHome] = useState(undefined);
  console.log(currentaccount);

  return (
    <>
      <ConnectToMetmask setCurrentAccountToHome={setCurrentAccountToHome} />
      {currentaccount === undefined ? (
        <CircularProgress />
      ) : (
        <h3
          style={{
            margin: "0",
            padding: "8px 4px",
            background: "white",
            boxShadow: "0px 2px 5px #0007",
            textAlign: "center"
          }}
        >
          Current Address : {currentaccount}
        </h3>
      )}

      <Switch location={location} key={location.key}>
        <Route path="/" exact component={Homepage} />
        <Route path="/upcomingevent" exact component={Upcomingevent} />
        <Route path="/pastevent" exact component={Pastevent} />
        <Route path="/createevent" exact component={Createevent} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/swap" exact component={Swap} />
        <Route path="/userticket" exact component={Userticket} />
      </Switch>
    </>
  );
}
