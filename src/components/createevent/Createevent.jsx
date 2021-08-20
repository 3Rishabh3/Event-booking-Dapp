import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import { TextField, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Radio } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function Createevent() {
  const classes = useStyles();
  window.document.title = "CreateEvent";

  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [checkedd, setCheckedd] = React.useState(true);
  const handleChange1 = (event) => {
    setCheckedd(event.target.checked);
  };

  return (
    <section>
      <div class={classes.Createevent}>
        <h1 class={classes.heading}>
          {" "}
          <i>
            <AccountCircleIcon color="blue" fontSize={"large"} />
          </i>{" "}
          PhoenixDAO Events Marketplace
        </h1>
        <h1 class={classes.subHeading}>What are you going to do?</h1>
      </div>
      <div class={classes.root}>
        <div>
          <i>
            <CreateTwoToneIcon color="blue" fontSize={"large"} />
            <b> Create Event</b>
          </i>
          <hr></hr>
        </div>
        <div class={classes.adj}>
          <form>
            <InputLabel>Event Name</InputLabel>
            <TextField
              style={{ width: "95% ", marginBottom: "4%" }}
              variant="outlined"
              name="name"
              type="text"
            />
            <InputLabel>Event Description</InputLabel>
            <TextField
              type="text"
              variant="outlined"
              multiline
              rows={4}
              maxRows={10}
              style={{ width: "95% ", marginBottom: "4%" }}
            />
            <InputLabel>Event Location</InputLabel>
            <TextField
              style={{ width: "95% ", marginBottom: "4%" }}
              variant="outlined"
              name="loc"
              type="text"
            />
            <InputLabel>Event Date and Time</InputLabel>
            <TextField
              style={{ width: "95% ", marginBottom: "4%" }}
              variant="outlined"
              name="name"
              type="datetime-local"
            />
            <InputLabel>Event Cover Image </InputLabel>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
            <InputLabel>Organizer Name </InputLabel>
            <TextField
              style={{ width: "95% ", marginBottom: "4%" }}
              variant="outlined"
              name="name"
              type="text"
            />
            <InputLabel>Event Type</InputLabel>
            <TextField
              style={{ width: "95% ", marginBottom: "4%" }}
              variant="outlined"
              name="name"
              type="text"
            />
            <InputLabel>Event Topic</InputLabel>
            <TextField
              style={{ width: "95% ", marginBottom: "4%" }}
              variant="outlined"
              name="name"
              type="text"
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Event Options</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="paid"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Paid Event"
                  value="paid"
                />

                <FormControlLabel
                  control={<Radio color="primary" />}
                  label="Free Event"
                  value="free"
                />
              </RadioGroup>
            </FormControl>
            <InputLabel>Ticket Price</InputLabel>
            <InputLabel>Ticket Options:</InputLabel>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChange} />}
              label="Limited Tickets"
            />
            <InputLabel>Terms and Conditions:</InputLabel>
            <FormControlLabel
              control={<Checkbox checked={checkedd} onChange={handleChange1} />}
              label="By creating an event , I agree to the policies and terms of use."
            />
            <Button
              style={{ width: "45% ", margin: "5%" }}
              variant="contained"
              color="primary"
              component="span"
            >
              Make Your Event Live
            </Button>
          </form>
        </div>
        <div class={classes.adjj}>
          <p>Event Preview</p>
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
    paddingBottom: "1100px",
    borderRadius: "5px",
    margin: "6%",
    hieght: "100%"
  },

  input: {
    marginTop: "4%",
    width: "68%",
    marginBottom: "2%"
  },
  adj: {
    float: "left",
    width: "70%"
  },
  adjj: {
    float: "left",
    width: "30%"
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
