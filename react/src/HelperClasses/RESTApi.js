import {ip} from './../LocalHostIP';
class RESTApi {
  constructor() {
    this.port = ip;
    this.recipeAPI = "https://api.spoonacular.com/"
    this.apiKEY = "&apiKey=c54c5e3dc245439dbfad8b86ffa788b9"
    this.findByIngredientsApi="recipes/findByIngredients?ingredients="
    this.numberOfIngredient = "&number=4&ignorePantry=true"
    this.getFridgeInventoryApi = "api/getFoodInventoryByCat";
    this.updateFridgeInventoryApi = "api/updateFoodInventory";
  }

  getFridgeInventory(){
    const endpoint = this.port + this.getFridgeInventoryApi;
    return endpoint;
  }

  updateFridgeInventory(){
    const endpoint = this.port + this.updateFridgeInventoryApi;
    return endpoint;
  }

  getRecipeFromIngredient(allIngredients){
    let combineIngredients = this.findByIngredientsApi + allIngredients[0];
    for(let i = 1; i < allIngredients.length; i++){
      combineIngredients += ",+" + allIngredients[i];
    }
    const endpoint = this.recipeAPI + combineIngredients + this.numberOfIngredient + this.apiKEY;
    return endpoint
  }

  storeAllQuery(searchQuery){
    let query = '';
    for (const key of Object.keys(searchQuery)){
      if (searchQuery[key] !== ''){
        query = this.addQuery(query);
        query = query + key + '=' + searchQuery[key];
      }
    }
    return query;
  }

  addQuery(query){
    let returnQuery = query;
    if (returnQuery !== ''){
      returnQuery += '&';
    }

    return returnQuery;
  }

}

let restController = new RESTApi();
export {restController};

