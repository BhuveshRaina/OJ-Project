import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const RatingChart = () => {
  const ratingData = [
    { contest: '425', rating: 1650, fullName: 'Biweekly Contest 425', change: '+28' },
    { contest: '426', rating: 1678, fullName: 'Weekly Contest 426', change: '+28' },
    { contest: '427', rating: 1645, fullName: 'Biweekly Contest 427', change: '-33' },
    { contest: '428', rating: 1712, fullName: 'Weekly Contest 428', change: '+67' },
    { contest: '429', rating: 1734, fullName: 'Biweekly Contest 429', change: '+22' },
    { contest: '430', rating: 1856, fullName: 'Weekly Contest 430', change: '+122' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-lg">
          <h4 className="font-semibold text-white text-sm">{data.fullName}</h4>
          <p className="text-blue-400 font-medium">Rating: {data.rating}</p>
          <p className={`text-sm ${data.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            Change: {data.change}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r="4"
        fill="#6366F1"
        stroke="#fff"
        strokeWidth="2"
        className="cursor-pointer hover:r-6 transition-all"
      />
    );
  };

  const minRating = Math.min(...ratingData.map(d => d.rating)) - 50;
  const maxRating = Math.max(...ratingData.map(d => d.rating)) + 50;

  return (
    <Card className="bg-dark-card border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-bold text-white">
          <TrendingUp className="w-5 h-5 mr-2 text-code-purple" />
          Contest Rating
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold text-white">1856</div>
          <div className="text-sm text-green-400">+122 this month</div>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={ratingData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <XAxis
                dataKey="contest"
                axisLine={{ stroke: '#4B5563' }}
                tickLine={{ stroke: '#4B5563' }}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                label={{
                  value: 'Contest',
                  position: 'insideBottom',
                  offset: -10,
                  style: { textAnchor: 'middle', fill: '#9CA3AF' },
                }}
              />
              <YAxis
                domain={[minRating, maxRating]}
                axisLine={{ stroke: '#4B5563' }}
                tickLine={{ stroke: '#4B5563' }}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                label={{
                  value: 'Rating',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#9CA3AF' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#6366F1"
                strokeWidth={3}
                dot={<CustomDot />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingChart;
