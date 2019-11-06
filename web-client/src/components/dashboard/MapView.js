import React from "react";
import Grid from "@material-ui/core/Grid";
import Leaflet from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import MessageBox from "./MessageBox";

const useStyles = makeStyles(theme => ({
  mapStyle: {
    height: "80vh",
    zIndex: "1"
  }
}));

export default function MapView() {
  const classes = useStyles();

  return (
    <Grid Item className={classes.mapStyle} xs={7}>
      <Map
        maxZoom={19}
        center={["57.046662", "9.919612"]}
        style={{ height: "100%" }}
        zoom={13}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>{" "}
      <MessageBox />
    </Grid>
  );
}
