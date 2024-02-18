/**
 * API Module:
 * - Consolidates various API modules for cleaner imports.
 * - Each submodule corresponds to a specific API category.
 */
import * as states from "./dashboard/states";
import * as pingStatuses from "./pingStatus";
import * as info from "./dashboard/info";
import * as history from "./dashboard/history";
import * as ISPRanking from "./dashboard/ISPRanking";
import * as metrics from "./dashboard/metrics";
import * as Chart from "./Chart";

/**
 * API Object:
 * - Consolidates all API modules into a single object for export.
 * - Provides a clean and organized way to access different API functionalities.
 */
const api = { states, info, history, pingStatuses, metrics, ISPRanking, Chart };

export default api;
