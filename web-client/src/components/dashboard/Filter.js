import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  headerStyle: {
    display: "flex",
    justifyContent: "center",
    height: "55px",
    backgroundColor: "#16125f",
    margin: "auto",
    boxShadow: "none"
  },
  filterStyle: {
    background: "#ededed",
    boxShadow: "-8px 2px 23px -11px rgba(0,0,0,0.75)",
    zIndex: "1"
  },
  filterContentStyle: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "30px",
    textAlign: "left",
    overflowY: "auto",
    height: "84vh"
  }
}));

export default function Filter({
  guards,
  setGuards,
  guardsToken,
  setGuardsToken,
  setView
}) {
  const classes = useStyles();
  const handleChcked = guard => {
    let newGuards = [...guards];
    let guardIndex = guards.findIndex(oneGuard => oneGuard.id === guard.id);
    newGuards[guardIndex].checked = !guard.checked;
    if (newGuards[guardIndex].checked) {
      setGuardsToken([...guardsToken, guard.pushToken]);
      if (guardsToken.length === 0) {
        setView([guard.guardLocation.latitude, guard.guardLocation.longitude]);
      }
    } else {
      let newGuardsToken = [...guardsToken];
      let guardTokenIndex = newGuardsToken.findIndex(
        oneToken => oneToken === newGuards[guardIndex].token
      );
      newGuardsToken.splice(guardTokenIndex, 1);
      setGuardsToken(newGuardsToken);
      setView([]);
    }
    setGuards(newGuards);
  };

  return (
    <Grid item={true} className={classes.filterStyle} xs={2}>
      <AppBar className={classes.headerStyle} position="static">
        <Typography variant="h6" className={classes.title}>
          Filter
        </Typography>
      </AppBar>

      <div className={classes.filterContentStyle}>
        {/* <FormControlLabel
          control={
            <Checkbox
              value="all"
              color="primary"
              labelstyle={{ color: "#16125f" }}
              iconstyle={{ fill: "#16125f" }}
              inputstyle={{ color: "#16125f" }}
              style={{ color: "#16125f" }}
              inputProps={{
                "aria-label": "secondary checkbox"
              }}
            />
          }
          label="Alle"
        /> */}

        {guards.map(oneGuard => {
          return (
            <FormControlLabel
              key={oneGuard.id}
              control={
                <Checkbox
                  checked={oneGuard.checked}
                  value={oneGuard.id}
                  color="primary"
                  onChange={() => handleChcked(oneGuard)}
                  labelstyle={{ color: "#16125f" }}
                  iconstyle={{ fill: "#16125f" }}
                  inputstyle={{ color: "#16125f" }}
                  style={{ color: "#16125f" }}
                  inputProps={{
                    "aria-label": "secondary checkbox"
                  }}
                />
              }
              label={oneGuard.userFullName}
            />
          );
        })}
      </div>
    </Grid>
  );
}
