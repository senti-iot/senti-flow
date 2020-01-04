import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";
import { create } from "apisauce";

const useStyles = makeStyles(theme => ({
  messageBoxStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "13vh",
    background: "#1a1a32",
    padding: "20px",
    boxSizing: "border-box"
  },
  messageFieldStyle: {
    width: "100%",
    margin: "auto",
    fontSize: "17px",
    background: "#FFFFFF",
    borderRadius: "6px",
    padding: "15px",
    boxSizing: "border-box",
    resize: "none",
    "&:focus": {
      outline: "none"
    }
  },
  sendButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "120px",
    height: "36px",
    background: "#ff9800",
    color: "#FFFFFF",
    fontWeight: "600",
    "&:hover": {
      background: "#e38d10"
    }
  }
}));

export default function MessageBox({ guardsToken, notify }) {
  const classes = useStyles();
  const [message, setMessage] = useState({ value: "" });

  const sendToPushServer = async (message, guardsToken) => {
    if (message.value === "") {
      notify("⚠️ Please type a message first", "error");
    } else if (guardsToken.length < 1) {
      notify("⚠️ Please select at least one recipient", "error");
    } else {
      const api = create({
        baseURL: "http://localhost:3001/",
        timeout: 30000,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      let data = {
        message: message.value,
        tokens: guardsToken
      };

      await api
        .post(`send`, data)
        .then(res => {
          setMessage({ value: "" });
          notify("👍 Push notifications sent", "success");
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <Grid className={classes.messageBoxStyle} container>
      <Grid item={true} xs={9}>
        <TextareaAutosize
          rowsMax={3}
          rows={3}
          className={classes.messageFieldStyle}
          value={message.value}
          onChange={e => setMessage({ value: e.target.value })}
        />
      </Grid>
      <Grid item={true} xs={3}>
        <Button
          variant={"contained"}
          fullWidth
          color={"secondary"}
          className={(classes.button, classes.sendButton)}
          onClick={() => {
            sendToPushServer(message, guardsToken);
          }}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
}
