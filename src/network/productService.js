// Sample service to make network call

import { API, NetworkManager } from "./core";

export class ProductService {
  static async allProductList() {
    const instance = NetworkManager(API.PRODUCT.ALLPRODUCT);
    return await instance.request();
  }
  static async createCheckout(payload) {
    const instance = NetworkManager(API.PRODUCT.CHECKOUT);
    return await instance.request(payload);
  }
}
