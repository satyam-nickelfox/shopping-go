// List all endpoints here
// import { OFFLINE } from "network/offlineResponse"
import { HTTP_METHODS, APIRouter } from "./httpHelper";

// ******************
// Endpoint class takes 3 params in constructor ==> "endpoint", "http-method", "API-version"
// By default, version is set to v1
// ******************
export const API = {
  AUTH: {
    LOGIN: new APIRouter("/user/login", HTTP_METHODS.POST),
    LOGOUT: new APIRouter("/user/authenticate", HTTP_METHODS.DEL),
    SIGNUP: new APIRouter("/user/register", HTTP_METHODS.POST),
  },
  PRODUCT: {
    ALLPRODUCT: new APIRouter("/product/productlist", HTTP_METHODS.GET),
    CHECKOUT: new APIRouter("/product/create-checkout-session", HTTP_METHODS.POST),
  },
};
