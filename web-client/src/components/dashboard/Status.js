import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  statusStyle: {
    margin: "5px 2px",
    background: "#bdc3c7",
    height: "100px",
    color: "#fff"
  },
  profileImageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  profileImageStyle: {
    height: "35px",
    borderRadius: "50%"
  },
  detailsBoxStyle: {
    textAlign: "left",
    paddingLeft: "15px"
  },
  vehicleNumber: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "6px"
  },
  vehicleDetails: {
    fontSize: "14px"
  }
}));

export default function Status({
  name,
  speed,
  time,
  guardImage,
  status,
  statusColor,
  textColor
}) {
  const classes = useStyles();

  return (
    <Card
      className={classes.statusStyle}
      style={{ background: statusColor, color: textColor }}
    >
      <CardContent>
        <Grid container>
          <Grid className={classes.profileImageWrapper} item={true} xs={2}>
            <img
              className={classes.profileImageStyle}
              src={guardImage}
              alt="Profile"
            />
          </Grid>
          <Grid className={classes.detailsBoxStyle} item={true} xs={8}>
            <Typography className={classes.vehicleNumber}>{name}</Typography>
            <Typography className={classes.vehicleDetails}>
              Fart: {speed} meter i min
            </Typography>
            <Typography className={classes.vehicleDetails}>{status}</Typography>
          </Grid>
          <Grid item={true} xs={2}>
            <Typography className={classes.vehicleDetails}>{time}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
