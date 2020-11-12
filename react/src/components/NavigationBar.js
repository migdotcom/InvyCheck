import React from "react";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import KitchenIcon from "@material-ui/icons/Kitchen";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Home from "./Home";
import RecipePage from "./RecipePage";

const useStyles = (theme) => ({
  root: {
    background: "#02A144",
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 1
  },
  eachNav: {
    "&$selected":{
        color: "#BAD7F2"
    }
  },
  selected: {}
});

export class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "inventory",
    };
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
    console.log(newValue);
  }

  renderPage() {
    let component;
    if (this.state.value === "inventory") component = <Home />;
    else if ((this.state.value === "recipe")) component = <RecipePage />;
    return component;
  }

  render() {
    const { classes } = this.props;
    let component = this.renderPage();
    return (
      <React.Fragment>
        {component}
        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            value="inventory"
            label="Your Fridge"
            icon={<KitchenIcon />}
            classes={{root: classes.eachNav, selected: classes.selected}}
          />
          <BottomNavigationAction
            value="recipe"
            label="Recipe"
            icon={<MenuBookIcon />}
            classes={{root: classes.eachNav, selected: classes.selected}}
          />
          <BottomNavigationAction
            value="profile"
            label="Profile"
            icon={<AccountBoxIcon />}
            classes={{root: classes.eachNav, selected: classes.selected}}
          />
        </BottomNavigation>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(NavigationBar);
