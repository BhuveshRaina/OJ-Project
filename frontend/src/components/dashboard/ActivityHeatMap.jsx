import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';

const ActivityHeatmap = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  // Generate sample heatmap data for the year
  const generateHeatmapData = () => {
    const data = [];
    const startDate = new Date(parseInt(selectedYear, 10), 0, 1);
    const endDate = new Date(parseInt(selectedYear, 10), 11, 31);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const solved = Math.floor(Math.random() * 8); // 0–7 problems solved per day
      data.push({
        date: d.toISOString().split('T')[0],
        count: solved,
        month: d.getMonth(),
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-gray-700';
    if (count <= 2) return 'bg-green-900';
    if (count <= 4) return 'bg-green-700';
    if (count <= 6) return 'bg-green-500';
    return 'bg-green-400';
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return (
    <Card className="bg-dark-card border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg font-bold text-white">
            <CalendarIcon className="w-5 h-5 mr-2 text-code-blue" />
            Activity Heatmap
          </CardTitle>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-24 bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="2024" className="text-white hover:bg-gray-700">
                2024
              </SelectItem>
              <SelectItem value="2023" className="text-white hover:bg-gray-700">
                2023
              </SelectItem>
              <SelectItem value="2022" className="text-white hover:bg-gray-700">
                2022
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Month labels */}
          <div className="grid grid-cols-12 gap-1 text-xs text-gray-400 mb-2">
            {months.map((month, idx) => (
              <div key={idx} className="text-center">
                {month}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="grid grid-cols-12 gap-1">
            {months.map((_, monthIndex) => {
              const monthData = heatmapData.filter((d) => d.month === monthIndex);
              return (
                <div key={monthIndex} className="space-y-1">
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({ length: 35 }).map((_, i) => {
                      const dayData = monthData[i];
                      return (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-sm ${
                            dayData ? getIntensityClass(dayData.count) : 'bg-gray-800'
                          }`}
                          title={dayData ? `${dayData.date}: ${dayData.count} problems` : ''}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gray-700 rounded-sm" />
              <div className="w-3 h-3 bg-green-900 rounded-sm" />
              <div className="w-3 h-3 bg-green-700 rounded-sm" />
              <div className="w-3 h-3 bg-green-500 rounded-sm" />
              <div className="w-3 h-3 bg-green-400 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityHeatmap;
