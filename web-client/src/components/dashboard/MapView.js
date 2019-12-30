import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import MessageBox from "./MessageBox";
import L from "leaflet";

const useStyles = makeStyles(theme => ({
  mapStyle: {
    height: "80vh",
    zIndex: "1"
  },
  divIcon: {
    border: "5px solid green",
    borderRadius: 50
  }
}));

export default function MapView({ guards }) {
  const classes = useStyles();

  var myIcon = L.icon({
    className: classes.divIcon,
    iconUrl: "https://starbyface.com/ImgBase/testPhoto/test1.jpg",
    iconRetinaUrl: "https://starbyface.com/ImgBase/testPhoto/test1.jpg",
    iconSize: [30, 30]
  });

  return (
    <Grid className={classes.mapStyle} xs={7} item={true}>
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
        {guards.map(guard => (
          <Marker
            key={guard.id}
            position={[
              guard.guardLocation.latitude,
              guard.guardLocation.longitude
            ]}
            icon={myIcon}
          >
            <Popup>
              <span>Guard Name</span>
            </Popup>
          </Marker>
        ))}
      </Map>
      <MessageBox />
    </Grid>
  );
}
