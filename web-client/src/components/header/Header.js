import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ProfileImage from "../../assets/images/profile.png";
import Logo from "../../assets/images/senti.flow.negativ.png";
import { connect } from "react-redux";
import { logOut } from "../../redux/action/authActions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  headerStyle: {
    height: "7vh",
    backgroundColor: "#1a1a32"
  },
  logoStyle: {
    height: "50px"
  },
  profileImageStyle: {
    height: "35px",
    borderRadius: "50%"
  }
}));

function Header(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.logOut();
  };

  return (
    <div>
      <AppBar className={classes.headerStyle} position="static">
        <Toolbar>
          <img className={classes.logoStyle} src={Logo} alt="Senti Flow" />
          <Typography variant="h6" className={classes.title}>
            Aalborg Karneval Parade
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <img
                  className={classes.profileImageStyle}
                  src={ProfileImage}
                  alt="Profile"
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOut }
)(Header);
