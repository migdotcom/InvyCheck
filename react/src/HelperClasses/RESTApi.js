import {ip} from './../LocalHostIP';
class RESTApi {
  constructor() {
    this.port = ip;
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

