// Sample service to make network call

import { API, NetworkManager } from "./core";

export class AuthService {
  static async loginByEmail(payload) {
    const instance = NetworkManager(API.AUTH.LOGIN);
    return await instance.request(payload);
  }
  static async logoutOnClick(payload) {
    const instance = NetworkManager(API.AUTH.LOGOUT);
    return await instance.request(payload);
  }
  static async SignUp(payload) {
    const instance = NetworkManager(API.AUTH.SIGNUP);
    return await instance.request(payload);
  }
}
