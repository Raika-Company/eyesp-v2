import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface DataPoint {
  time: string;
  value: number;
}

const data: DataPoint[] = [
  { time: '22:10', value: 70 },
  { time: '22:11', value: 25 },
  { time: '22:12', value: 90 },
  { time: '22:13', value: 95 },
  { time: '22:14', value: 85 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload[0].value}%
      </div>
    );
  }
  return null;
};

const Chart: React.FC = () => (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="time" axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
        <ReferenceLine y={0} stroke="#FFFFFF" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;