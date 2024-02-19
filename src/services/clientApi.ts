import axios, { AxiosInstance } from "axios";
import config from "./config";
import storage from "./storage";

/**
 * Class representing an HTTP client with interceptors for token handling.
 */
export default class ClientApi {
  /**
 * Axios instance for making HTTP requests.
 */
  http: AxiosInstance;
  /**
   * Constructor for the ClientApi class.
   */
  constructor() {
    /**
     * Create an Axios instance with base URL and timeout from the configuration.
     */
    this.http = axios.create({
      baseURL: config.rootAddress,
      timeout: config.timeout,
    });
    /**
     * Request interceptor to add the authorization header with the token.
     */
    this.http.interceptors.request.use(async (request) => {
      if (request && request.headers) {
        const token = storage.get(config.tokenName);
        token &&
          (request.headers.Authorization = `Bearer ${storage.get(
            config.tokenName
          )}`);
      }

      return request;
    });
    /**
     * Response interceptor to handle token updates from the server response.
     */
    this.http.interceptors.response.use((response) => {
      if (response.data.datas) {
        const { token } = response.data.datas;

        token && storage.set(config.tokenName, token);
      }

      return response.data;
    });
  }
}
