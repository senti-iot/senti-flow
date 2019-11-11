import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../redux/action/authActions";
import Logo from "../../assets/images/senti.flow.png";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import AccountIcon from "@material-ui/icons/Person";
import PasswordIcon from "@material-ui/icons/Visibility";
import OrgIcon from "@material-ui/icons/Domain";

const useStyles = makeStyles(theme => ({
  gridFlex: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: "20%"
  },
  loginButton: {
    marginTop: "20px",
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
  },
  logoStyle: {
    height: "70px"
  },
  card: {
    boxSizing: "border-box"
  }
}));

function Login(props) {
  const classes = useStyles();
  const [state, setState] = useState({ email: "", password: "", orgId: "" });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      username: state.email,
      password: state.password,
      orgNickname: state.orgId
    };
    console.log(userData);
    props.loginUser(userData);
  }

  return (
    <Grid item className={classes.gridFlex} xs={12}>
      <form onSubmit={handleSubmit}>
        <Card className={(classes.card, classes.gridFlex)}>
          <img className={classes.logoStyle} src={Logo} alt="Senti Flow" />
          <TextField
            onChange={handleChange}
            id="outlined-email-input"
            name="email"
            label="E-mail"
            className={classes.textField}
            type="email"
            autoComplete="current-email"
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <AccountIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            onChange={handleChange}
            id="outlined-password-input"
            name="password"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <PasswordIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            onChange={handleChange}
            id="outlined-orgId-input"
            name="orgId"
            label="Organisation ID"
            className={classes.textField}
            type="orgId"
            autoComplete="current-orgId"
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <OrgIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            variant={"contained"}
            fullWidth
            color={"secondary"}
            className={(classes.button, classes.loginButton)}
          >
            Login
          </Button>
        </Card>
      </form>
    </Grid>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
