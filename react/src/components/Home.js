import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { restController } from './../HelperClasses/RESTApi';
import Fab from '@material-ui/core/Fab';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = (theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    zIndex: 0,
    position: "relative"
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black'
  },
  grow: {
    flexGrow: 1,
  },
  fab: {
    position: "fixed",
    bottom: 80,
    right: 10,
    zIndex: 1
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fridgeInventory: []
    }
  }

  componentDidMount(){
    this.getFridgeInventory();
  }

  getFridgeInventory(){
    axios.get(restController.getFridgeInventory()).then(
      res => {
        console.log(res.data[0]);
        this.setState({fridgeInventory: res.data});
        console.log(this.state.fridgeInventory);
      }
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper square className={classes.paper}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Your Refrigerator
          </Typography>
          <List className={classes.list}>
            {this.state.fridgeInventory.map(({ categoryID, categoryName, foodItems }) => (
              <React.Fragment id={categoryName + categoryID}>
                <ListSubheader className={classes.subheader}>
                  {categoryName}
                </ListSubheader>
                {foodItems.map( ({foodID, foodName, amount}) => (<ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={foodName}
                    secondary={amount}
                  />
                </ListItem>))}
              </React.Fragment>
            ))}
          </List>
        </Paper>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="capture"
          className={classes.fab}
        >
          <PhotoCameraIcon className={classes.extendedIcon} />
          Capture
        </Fab>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Home);
