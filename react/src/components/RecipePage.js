import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { restController } from "./../helperClasses/RESTApi";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = (theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    marginTop: "80px",
    marginBottom: "50px",
    paddingBottom: "20px",
    zIndex: 0,
    position: "relative",
    textAlign: "left",
  },
});

export class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fridgeInventory: {},
      allRecipes: [],
      loadingRecipe: true
    };
  }

  loadRecipe() {
    let ingredients = [];
    this.state.fridgeInventory.map(
      ({ categoryID, categoryName, foodItems }) => (
          foodItems.map(({ foodID, foodName, amount }) => {
            let tempFoodName = foodName;
            tempFoodName = tempFoodName.replaceAll(" ", "%20");
            ingredients.push(tempFoodName);
          })
      )
    );
    axios.get(restController.getRecipeFromIngredient(ingredients)).then(res => {
      this.setState({allRecipes: res.data, loadingRecipe: false})
    })
    
  }

  componentDidMount() {
    const allFridgeItems = JSON.parse(localStorage.getItem("fridgeInventory"));
    this.setState({loadingRecipe: true})
    this.setState({ fridgeInventory: allFridgeItems }, this.loadRecipe);
  }

  renderRecipesComponent(loadingState){
    const { classes } = this.props;
    const allRecipes = this.state.allRecipes
    let recipesComponent;
    if (loadingState) {
      recipesComponent = (
        <CircularProgress
          size={40}
          color="secondary"
          style={{marginTop: "200px"}}
        />
      );
    } else {
      recipesComponent = (
        <Paper square className={classes.paper}>
          {allRecipes.map((singleRecipe) => (
            <RecipeCard eachRecipe={singleRecipe} />
          ))}
        </Paper>
      );
    }
    return recipesComponent
  }

  render() {
    const { classes } = this.props;
    const title = "Recipe Suggestion";
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar titleName={title} />
        {this.renderRecipesComponent(this.state.loadingRecipe)}
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(RecipePage);
