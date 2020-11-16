import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import capture from "./../capture/capture.jpg";
import Fab from "@material-ui/core/Fab";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = (theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 10,
    zIndex: 0,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  imageRoot: {
    top: "25%",
    position: "fixed"
  },
  image: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "5px",
    width: "100%",
    height: "auto"
  },
  fab: {
    position: "fixed",
    bottom: "5%",
    zIndex: 1,
    left: 0,
    right:0
  }
});

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper square className={classes.paper}>
          <Typography className={classes.text} variant="h4" gutterBottom>
            Fridge View
          </Typography>
        </Paper>
        <div className={classes.imageRoot}>
            <img className={classes.image} src={capture} />
        </div>
        <div className={classes.fab}>
        <Fab
          href = "/"
          variant="extended"
          size="medium"
          color="primary"
          aria-label="capture"
        >
          <ArrowLeftIcon className = {classes.extendedIcon}/>
          Your Fridge
        </Fab>
        </div>
        
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Home);
