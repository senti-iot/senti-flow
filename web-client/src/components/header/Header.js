import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import Gravatar from "react-gravatar";
import { connect } from "react-redux";
import Logo from "../../assets/images/senti.flow.negativ.png";
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
    borderRadius: "50%",
    marginLeft: "10px"
  },
  userInfoMenu: {
    minWidth: "200px"
  },
  nameAndEmail: {
    // height: 46,
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
    "&:hover": {
      background: "inherit"
    },
    "&:focus": {
      background: "inherit"
    },
    cursor: "default"
  }
}));

function Header(props) {
  const classes = useStyles();
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

  const user = props.auth.user;

  return (
    <div>
      <AppBar className={classes.headerStyle} position="static">
        <Toolbar>
          <img className={classes.logoStyle} src={Logo} alt="Senti Flow" />
          <Typography variant="h6" className={classes.title}>
            Aalborg Karneval Parade
          </Typography>
          <div>
            <MenuItem onClick={handleMenu}>
              <ExpandMoreIcon></ExpandMoreIcon>
              {`${user.firstName}`}

              <Gravatar
                alt="Profile"
                size={40}
                className={classes.profileImageStyle}
                email={user.email}
              />
            </MenuItem>

            <Menu
              style={{ marginTop: 50 }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                disableRipple
                component={"div"}
                className={classes.nameAndEmail}
              >
                <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <PowerSettingsNewIcon
                  style={{ marginRight: "10px" }}
                ></PowerSettingsNewIcon>
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { logOut })(Header);
