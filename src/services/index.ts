import * as states from "./dashboard/states";
import * as pingStatuses from "./pingStatus";
import * as info from "./dashboard/info";
import * as history from "./dashboard/history";
import * as ISPRanking from "./dashboard/ISPRanking";
import * as metrics from "./dashboard/metrics";
import * as Chart from "./Chart";

const api = { states, info, history, pingStatuses, metrics, ISPRanking, Chart };

export default api;
