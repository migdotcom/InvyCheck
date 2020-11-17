import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import AppBar from './AppBar'

const useStyles = (theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 20,
    zIndex: 0
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  }
});

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    const title="Recipe Suggestion"
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar titleName={title}/>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Home);
