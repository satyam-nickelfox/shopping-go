// Higher Order Class to make all network calls
import { Cookies } from "react-cookie"
import axios from "axios"
import { APIWithOfflineRouter, HTTP_METHODS } from "./httpHelper"
import { APIConfig } from "./serverConfig"
import { APIError, APIResponse } from "./responseParser"
import { refreshAuthToken } from "./tokenRefresher"
import { CookieKeys } from "../../constants/cookieKeys"
import { APIAborter } from "./abortController"
import offlineManager from "./offlineManager"

// ********************
// Create a new Instance of NetworkManager by passing APIRouter argument
// After creating instance, call `request` method to make network request
// Example:
// const payload = {email: "example@gmail.com", password: "123456"}
// const instance = NetworkManager(API.Auth.Login)
// const result = await instance.request(payload)
// --------------------
// You can also pass some id in the url as parameter
// If params are named params then pass an object, the key name must match the param name
// Eg. If the URL is like "https://example.com/login?type=regular", then request would look like below
// const result = await instance.request(payload, {type: "regular"})
// --------------------
// If the params are not named then pass an array of data
// Eg. If the URL is like "https://example.com/user/1/2", then request would look like below
// const result = await instance.request(payload, ["id1", "id2"])
// ********************

export default function networkManager(router, withFile = false) {
  const { API_URL, TIMEOUT, API_AUTH_HEADER, AUTH_TYPE, CONTENT_TYPE } = APIConfig
  console.log("API_URL",API_URL);
  const REQ_CONTENT_TYPE = withFile ? CONTENT_TYPE.MULTIPART : CONTENT_TYPE.JSON
  axios.defaults.baseURL = API_URL
  axios.defaults.timeout = TIMEOUT
  axios.defaults.headers.common["Content-Type"] = REQ_CONTENT_TYPE
  axios.defaults.headers.common["Accept-Language"] = "en"

  const cookie = new Cookies()
  const authToken = cookie.get(CookieKeys.Auth)

  if (authToken) {
    axios.defaults.headers.common[API_AUTH_HEADER] = `${AUTH_TYPE} ${authToken}`
  }

  async function request(body = {}, params = {} || []) {
    const url = urlBuilder(router, params)
    console.log("url",url);
    const getHttpMethod = router.method !== HTTP_METHODS.GET
    const getArrayParams = !Array.isArray(params) && Object.keys(params).length
    const httpBody = httpBodyBuilder(body, withFile)

    try {
      const result = await axios.request({
        signal: APIAborter.initiate().signal,
        url: url,
        method: router.method,
        ...(getHttpMethod && { data: httpBody }),
        ...(getArrayParams && { params: params })
      })
      // If token expired, get it refreshed
      if (result.status === 401) {
        const refreshToken = cookie.get(CookieKeys.REFRESH_TOKEN)
        await refreshAuthToken(refreshToken)
        // pass the control back to network manager
        return await request(body, params)
      }
      return new APIResponse(result?.data, result?.status)
    } catch (err) {
      // Catch all errors
      // eslint-disable-next-line no-console

      // Below code block will exit the user and display login page if token is expired
      if (err?.response?.data?.message === "User is not authorized") {
        // eslint-disable-next-line no-console
        const allCookies = cookie.getAll([CookieKeys.Auth])
        let allKeys = Object.keys(allCookies)
        allKeys.forEach((cookie) => {
          document.cookie = cookie + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/"
        })
        window.location.reload()
        return
      }

      if (router instanceof APIWithOfflineRouter) {
        return offlineManager(router.offlineJson)
      }
      return new APIError(err?.response?.status, err.message, err?.response?.data?.message)
    }
  }
  return {
    request
  }
}

// Prepare endpoint url with params
function urlBuilder(router, params) {
  let uri = `${router.endpoint}`
  // all params in form of uri/id1/id2/id3
  if (Array.isArray(params)) {
    for (let key of params) {
      uri += `/${key}`
    }
  }
  return uri
}

// Prepare endpoint body for no GET requests
function httpBodyBuilder(body, withFile) {
  if (withFile) {
    const formData = new FormData()
    for (let key in body) {
      if (body[key] instanceof FileList) {
        for (let file of body[key]) {
          formData.append(key, file)
        }
      } else {
        formData.append(key, body[key])
      }
    }
    return formData
  } else {
    return body
  }
}
