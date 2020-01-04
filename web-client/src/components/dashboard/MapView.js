import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import MessageBox from "./MessageBox";
import L from "leaflet";

const defaultStatus = [
  {
    key: "altOk",
    class: "green"
  },
  {
    key: "staaStille",
    class: "yellow"
  },
  {
    key: "traeghed",
    class: "yellow"
  },
  {
    key: "samarit",
    class: "red"
  },
  {
    key: "politi",
    class: "red"
  }
];

const useStyles = makeStyles(theme => ({
  mapStyle: {
    height: "80vh",
    zIndex: "1"
  },
  default: {
    border: "5px solid gray",
    borderRadius: 50
  },
  green: {
    border: "5px solid #6dd400",
    borderRadius: 50
  },
  red: {
    border: "5px solid #e01f20",
    borderRadius: 50
  },
  yellow: {
    border: "5px solid #ffd200",
    borderRadius: 50
  }
}));

export default function MapView({ guards, guardsToken, notify, zoomedGuard }) {
  const classes = useStyles();
  let myIconClass = "default";
  let length = guardsToken.length;
  return (
    <Grid className={classes.mapStyle} xs={7} item={true}>
      <Map
        maxZoom={19}
        center={
          zoomedGuard.length === 2 && length === 1
            ? zoomedGuard
            : ["57.046662", "9.919612"]
        }
        style={{ height: "100%" }}
        zoom={zoomedGuard.length === 2 && length === 1 ? 20 : 13}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {guards.map(guard => {
          var myIcon = L.icon({
            className: classes.default,
            iconUrl: guard.userAvatar,
            iconSize: [30, 30]
          });

          if (guard.guardStatus && guard.id === guard.guardStatus.id) {
            myIconClass =
              defaultStatus[
                defaultStatus.findIndex(
                  s => s.key === guard.guardStatus.userStatus
                )
              ].class;

            myIcon = L.icon({
              className: classes[myIconClass],
              iconUrl: guard.userAvatar,
              iconSize: [30, 30]
            });
          }

          if (guardsToken.length > 0) {
            if (guard.checked) {
              return (
                <Marker
                  key={guard.id}
                  position={[
                    guard.guardLocation.latitude,
                    guard.guardLocation.longitude
                  ]}
                  icon={myIcon}
                >
                  <Popup>
                    <span>{guard.userFullName}</span>
                    <br />
                    <span>Fart: {guard.speed} meter i min</span>
                  </Popup>
                </Marker>
              );
            }
            return null;
          } else {
            return (
              <Marker
                key={guard.id}
                position={[
                  guard.guardLocation.latitude,
                  guard.guardLocation.longitude
                ]}
                icon={myIcon}
              >
                <Popup>
                  <span>{guard.userFullName}</span>
                  <br />
                  <span>Fart: {guard.speed} meter i min</span>
                </Popup>
              </Marker>
            );
          }
        })}
      </Map>
      <MessageBox
        notify={(text, type) => notify(text, type)}
        guardsToken={guardsToken}
      />
    </Grid>
  );
}
