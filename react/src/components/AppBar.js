import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = (theme) => ({
  appBar: {
    alignItems: "center",
    background: "#02A144",
  },
});

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <HideOnScroll>
        <AppBar className = {classes.appBar}>
          <Toolbar>
            <Typography variant="h5">{this.props.titleName}</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  }
}

export default withStyles(useStyles)(Home);
