/**
 * Represents a detailed status at a specific time.
 * @typedef {Object} Detail
 * @property {string} time - The timestamp of the status.
 * @property {string} status - The status code.
 */

/**
 * Represents a list of status details.
 * @typedef {Detail[]} Details
 */

/**
 * Represents a detailed status with additional information for display.
 * @typedef {Object} StatusDetail
 * @property {string} time - The timestamp of the status.
 * @property {string} status - The status code.
 * @property {string} messageFA - The localized message in Farsi.
 * @property {string} color - The color associated with the status.
 * @property {string} time_range - The time range associated with the status.
 */

/**
 * Represents the hourly status of a website.
 * @typedef {Object} HourlyStatus
 * @property {string} hour - The hour of the status.
 * @property {StatusDetail[]} details - The details of status for each hour.
 */

/**
 * Represents data for a specific website, including its name, URL, and hourly status.
 * @typedef {Object} WebsiteData
 * @property {string} name - The name of the website.
 * @property {string} url - The URL of the website.
 * @property {string} date - The date associated with the data.
 * @property {HourlyStatus[]} hourly_status - The hourly status details for the website.
 */

/** @type {Detail} */
export type Detail = {
    time: string;
    status: string;
};

/** @type {Details} */
export type Details = Detail[];

/** @type {StatusDetail} */
export type StatusDetail = {
    time: string;
    status: string;
    messageFA: string;
    color: string;
    time_range: string;
};

/** @type {HourlyStatus} */
export type HourlyStatus = {
    hour: string;
    details: StatusDetail[];
};

/** @type {WebsiteData} */
export type WebsiteData = {
    name: string;
    url: string;
    date: string;
    hourly_status: HourlyStatus[];
};
