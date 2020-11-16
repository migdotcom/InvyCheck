import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { restController } from "./../helperClasses/RESTApi";
import Fab from "@material-ui/core/Fab";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = (theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    zIndex: 0,
    position: "relative",
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
    textAlign: "left",
    fontWeight: "bold",
    color: "black",
    fontSize: "20px",
  },
  grow: {
    flexGrow: 1,
  },
  fab: {
    position: "fixed",
    bottom: 80,
    right: 10,
    zIndex: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  listFoodItem: {
    background: "#C2FEDB",
    width: "95%",
    margin: "auto",
    justifyContent: "space-between",
    fontSize: "18px",
    marginBottom: "10px",
  },
});

const sendPayload = [
  {
    foodName: "Eggs",
    amount: 9,
  },
  {
    foodName: "Milk - 1 Gallon",
    amount: 3,
  },
  {
    foodName: "Broccoli",
    amount: 1,
  },
  {
    foodName: "Diet Coke - 2 liter",
    amount: 1,
  },
  {
    foodName: "Pork chops",
    amount: 3,
  },
  {
    foodName: "Shrimp",
    amount: 5,
  },
  {
    foodName: "Turkey - Whole",
    amount: 2,
  },
];

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      fridgeInventory: [],
      loadingCapture: false,
      newFridgeItems: []
    };
  }

  handleClick(event) {
    let payload = sendPayload;
    this.setState({loadingCapture: true});
    axios.post(restController.updateFridgeInventory(), {payload}).then(res=>{
      
      window.location.href = "/capture"
    });
  }

  componentDidMount() {
    this.getFridgeInventory();
  }

  getFridgeInventory() {
    axios.get(restController.getFridgeInventory()).then((res) => {
      console.log(res.data[0]);
      this.setState({ fridgeInventory: res.data });
      console.log(this.state.fridgeInventory);
    });
  }

  render() {
    const { classes } = this.props;
    let captureIconComponent;
    if (this.state.loadingCapture === true){
      captureIconComponent = <CircularProgress size={25} color="secondary" className={classes.extendedIcon} />
    }
    else{
      captureIconComponent = <PhotoCameraIcon className={classes.extendedIcon} />
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper square className={classes.paper}>
          <Typography className={classes.text} variant="h4" gutterBottom>
            Your Refrigerator
          </Typography>
          <List className={classes.list}>
            {this.state.fridgeInventory.map(
              ({ categoryID, categoryName, foodItems }) => (
                <React.Fragment id={categoryName + categoryID}>
                  <ListSubheader className={classes.subheader}>
                    {categoryName}
                  </ListSubheader>
                  {foodItems.map(({ foodID, foodName, amount }) => (
                    <ListItem className={classes.listFoodItem}>
                      <div style={{ float: "let" }}>{foodName}</div>
                      <div style={{ float: "right" }}>Amount: {amount}</div>
                    </ListItem>
                  ))}
                </React.Fragment>
              )
            )}
          </List>
        </Paper>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="capture"
          className={classes.fab}
          onClick={this.handleClick}
        >
          {captureIconComponent}
          Capture
        </Fab>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Home);
