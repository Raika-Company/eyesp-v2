/**
 * Represents a simple storage utility for handling data in localStorage.
 */
const storage = {
  /**
 * Retrieves the value associated with the specified key from localStorage.
 * @template T - The type of the expected value.
 * @param {string} key - The key used to identify the stored value.
 * @param {boolean} [isJson=false] - Flag indicating whether the stored value is JSON-encoded.
 * @returns {T | null} The retrieved value, or null if the key is not found.
 */
  get<T>(key: string, isJson: boolean = false): T {
    const data: any = localStorage.getItem(key);

    return data && isJson ? JSON.parse(data) : data;
  },
  /**
   * Sets the value associated with the specified key in localStorage.
   * @template T - The type of the value to be stored.
   * @param {string} key - The key used to identify the stored value.
   * @param {T} value - The value to be stored.
   * @param {boolean} [isJson=false] - Flag indicating whether the value should be JSON-encoded.
   */
  set<T>(key: string, value: T, isJson: boolean = false): void {
    const data = value && isJson ? JSON.stringify(value) : value;
    localStorage.setItem(key, String(data));
  },
  /**
   * Removes the value associated with the specified key from localStorage.
   * @param {string} key - The key used to identify the stored value to be removed.
   */
  remove(key: string): void {
    return localStorage.removeItem(key);
  },
};

export { storage as default };
