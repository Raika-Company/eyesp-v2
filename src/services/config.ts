/**
 * API Configuration:
 * - `rootAddress`: The root URL for API requests.
 * - `timeout`: Request timeout duration in milliseconds.
 * - `tokenName`: Local storage key for authentication token.
 * - `refreshTokenName`: Local storage key for refresh token (if used).
 * - `cid`: Client ID for user identification.
 */
const config = {
  rootAddress: "/api/v1",      // API root address.
  timeout: 25000,              // Request timeout duration.
  tokenName: "eyesp_dashboard_token",  // Auth token local storage key.
  refreshTokenName: "",        // Refresh token local storage key (if used).
  cid: "user-id",              // Client ID for user identification.
};

/**
 * Generic Axios return type:
 * - `status`: HTTP status code indicating success or failure.
 * - `data`: Payload containing response data.
 * - `message`: Additional context or information message.
 * @template T - Type of the data payload in the response.
 */
export type AxiosReturnType<T> = {
  status: number;               // HTTP status code.
  data: T;                      // Response data payload.
  message: string;              // Additional context or information.
};

export default config;
