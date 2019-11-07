import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ProfileImage from "../../assets/images/profile.png";

const useStyles = makeStyles(theme => ({
  statusStyle: {
    margin: "5px 2px",
    background: "#6dd400",
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

export default function Status() {
  const classes = useStyles();

  return (
    <Card className={classes.statusStyle}>
      <CardContent>
        <Grid container>
          <Grid className={classes.profileImageWrapper} item xs="2">
            <img
              className={classes.profileImageStyle}
              src={ProfileImage}
              alt="Profile"
            />
          </Grid>
          <Grid className={classes.detailsBoxStyle} item xs="8">
            <Typography className={classes.vehicleNumber}>Vogn 12</Typography>
            <Typography className={classes.vehicleDetails}>
              Fart: 5 km/t
            </Typography>
            <Typography className={classes.vehicleDetails}>Alt ok</Typography>
          </Grid>
          <Grid item xs="2">
            <Typography className={classes.vehicleDetails}>10:46:10</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
