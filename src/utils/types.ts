export type Detail = {
    time: string;
    status: string;
};

export type Details = Detail[];

export type StatusDetail = {
    time: string;
    status: string;
    messageFA: string;
    color: string;
    time_range: string;
};

export type HourlyStatus = {
    hour: string;
    details: StatusDetail[];
};

export type WebsiteData = {
    name: string;
    url: string;
    date: string;
    hourly_status: HourlyStatus[];
};