import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import OrgIcon from "@material-ui/icons/Domain";
import AccountIcon from "@material-ui/icons/Person";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Logo from "../../assets/images/senti.flow.png";
import { loginUser } from "../../redux/action/authActions";

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

  const [state, setState] = useState({
    email: "",
    password: "",
    orgId: "",
    showPassword: false
  });

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
    props.loginUser(userData);
  }

  function handleShowPassword() {
    setState({ ...state, showPassword: !state.showPassword });
  }

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  function setFieldError() {
    let text = props.error;
    if (Object.entries(text).length != 0) {
      return true;
    }
  }

  return (
    <Grid item className={classes.gridFlex} xs={12}>
      <form onSubmit={handleSubmit}>
        <Card className={(classes.card, classes.gridFlex)}>
          <img className={classes.logoStyle} src={Logo} alt="Senti Flow" />

          <TextField
            error={setFieldError()}
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
            error={setFieldError()}
            onChange={handleChange}
            id="outlined-password-input"
            name="password"
            label="Password"
            className={classes.textField}
            type={state.showPassword ? "text" : "password"}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleShowPassword}>
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            error={setFieldError()}
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
  user: state.auth.profile,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});

export default connect(mapStateToProps, { loginUser })(Login);
