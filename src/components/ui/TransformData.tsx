import { WebsiteData, HourlyStatus } from '../../utils/types';

/**
 * Transforms raw data into an array of WebsiteData objects.
 * @param data - The raw data to be transformed.
 * @returns An array of WebsiteData objects representing the transformed data.
 */
const TransformData = (data: any): WebsiteData[] => {
    if (Array.isArray(data)) {
        return data.map(item => ({
            name: item.name,
            url: item.url,
            date: item.date,
            hourly_status: item.hourly_status,
        }));
    } else {
        return Object.keys(data).map(category => {
            const dailyStatuses = data[category].reduce((acc: HourlyStatus[], item: any, index: number) => {
                let analysisObjects;
                try {
                    const jsonString = item.primary_analysis.replace(/'/g, '"');
                    analysisObjects = JSON.parse(jsonString);
                } catch (error) {
                    console.error('Error parsing primary_analysis:', error);
                    analysisObjects = [];
                }

                if (index % 24 === 0) {
                    acc.push({
                        hour: item.analysis_at.substring(0, 10),
                        details: [],
                    });
                }

                acc[acc.length - 1].details.push({
                    time: item.analysis_at,
                    status: item.status_code.toString(),
                    color: item.color,
                    messageFA: analysisObjects[0]?.analysis?.persian || '',
                    time_range: item.time_range || '',
                });

                return acc;
            }, []);

            return {
                name: category,
                url: '',
                date: dailyStatuses[0]?.hour || '',
                hourly_status: dailyStatuses,
            };
        });
    }
};

export default TransformData