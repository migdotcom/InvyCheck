import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    marginBottom: "20px",
    backgroundColor: "#C3FEDB"
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.state = {
      expanded: false,
    };
  }

  handleExpandClick(event) {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes } = this.props;
    const singleRecipe = this.props.eachRecipe
    return (
      <Card className={classes.root}>
        <CardHeader
          title={singleRecipe.title}
          titleTypographyProps={{variant:"h6"}}
          subheader={"Missing Ingredients:" + singleRecipe.missedIngredientCount}
        />
        <CardMedia
          className={classes.media}
          image={singleRecipe.image}
          title={singleRecipe.title}
        />
        <CardActions disableSpacing style={{height: "50px"}}>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method: </Typography>
            
            {singleRecipe.missedIngredients.map( (eachIngredient) => (
                <Typography paragraph>
                    + {eachIngredient.originalString}
                </Typography>
            ))}
            {singleRecipe.usedIngredients.map( (eachIngredient) => (
                <Typography paragraph>
                    + {eachIngredient.originalString}
                </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(useStyles)(RecipeCard);
