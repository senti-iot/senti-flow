import React from "react";
import Status from "./Status";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const defaultStatus = [
  {
    key: "altOk",
    statusColor: "#6dd400",
    text: "Alt Ok",
    textColor: "#FFFFFF"
  },
  {
    key: "staaStille",
    statusColor: "#ffd200",
    text: "Stå stille",
    textColor: "#000000"
  },
  {
    key: "traeghed",
    statusColor: "#ffd200",
    text: "Træghed",
    textColor: "#000000"
  },
  {
    key: "samarit",
    statusColor: "#e01f20",
    text: "Brug for samarit",
    textColor: "#FFFFFF"
  },
  {
    key: "politi",
    statusColor: "#e01f20",
    text: "Politi",
    textColor: "#FFFFFF"
  }
];

const useStyles = makeStyles(theme => ({
  headerStyle: {
    display: "flex",
    justifyContent: "center",
    height: "55px",
    backgroundColor: "#16125f",
    margin: "auto",
    boxShadow: "none"
  },
  statusStyle: {
    background: "#ededed"
  },
  statusContentStyle: {
    overflowY: "auto",
    height: "84vh"
  }
}));

export default function StatusContainer({ guards }) {
  const classes = useStyles();

  return (
    <Grid item={true} className={classes.statusStyle} xs={3}>
      <AppBar className={classes.headerStyle} position="static">
        <Typography variant="h6" className={classes.title}>
          Status
        </Typography>
      </AppBar>
      <div className={classes.statusContentStyle}>
        {guards.map(oneGuard => {
          if (oneGuard.guardStatus) {
            return (
              <Status
                key={oneGuard.id}
                textColor={
                  defaultStatus[
                    defaultStatus.findIndex(
                      s => s.key === oneGuard.guardStatus.userStatus
                    )
                  ].textColor
                }
                statusColor={
                  defaultStatus[
                    defaultStatus.findIndex(
                      s => s.key === oneGuard.guardStatus.userStatus
                    )
                  ].statusColor
                }
                guardImage={oneGuard.userAvatar}
                name={oneGuard.userFullName}
                status={
                  defaultStatus[
                    defaultStatus.findIndex(
                      s => s.key === oneGuard.guardStatus.userStatus
                    )
                  ].text
                }
                // Need to implemente speed, not done yet! default is 5 just for test
                speed={oneGuard.speed}
                time={moment(oneGuard.guardStatus.timestamp).format("HH:mm:ss")}
              />
            );
          }
          return null;
        })}
      </div>
    </Grid>
  );
}
