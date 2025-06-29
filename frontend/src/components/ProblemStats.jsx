import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap } from 'lucide-react';

const ProblemStats = () => {
  const dispatch = useDispatch()
  const { user, status } = useSelector((state) => state.auth)
  useEffect(() => {
      if (status === 'idle') {
        dispatch(getProfile())
      }
    }, [dispatch, status])
  const { solvedTotal, solvedEasy, solvedMedium, solvedHard, attempting } = user

  const [platform, setPlatform] = useState({ total: 0, Easy: 0, Medium: 0, Hard: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlatform = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:8000/api/problems/summary',
          { withCredentials: true }
        );
        if (data.success) setPlatform(data.stats);
      } catch (err) {
        console.error('Failed to fetch platform totals:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPlatform();
  }, []);

  if (loading) return null;

  const pct = (num, denom) => (denom ? ((num / denom) * 100).toFixed(1) : '0.0');

  const overallPct = pct(solvedTotal, platform.total);
  const easyPct    = pct(solvedEasy, platform.Easy);
  const medPct     = pct(solvedMedium, platform.Medium);
  const hardPct    = pct(solvedHard, platform.Hard);

  return (
    <Card className="bg-dark-card/95 border-gray-600 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-code-blue" />
          Your Progress
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* overall */}
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">{solvedTotal}</div>
          <div className="text-sm text-gray-300 mb-3">
            problems solved out of {platform.total}
          </div>
          <div className="bg-gray-700/50 rounded-full p-1">
            <Progress
              value={overallPct}
              className="h-3 bg-transparent [&>div]:bg-gradient-to-r [&>div]:from-code-purple [&>div]:to-code-blue [&>div]:rounded-full [&>div]:shadow-lg"
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">{overallPct}%</div>
        </div>

        {/* breakdown */}
        <StatRow
          icon={<Target className="h-4 w-4 text-green-500" />}
          label="Easy"
          solved={solvedEasy}
          total={platform.Easy}
          percentage={easyPct}
          color="green-500"
        />
        <StatRow
          icon={<Zap className="h-4 w-4 text-yellow-500" />}
          label="Medium"
          solved={solvedMedium}
          total={platform.Medium}
          percentage={medPct}
          color="yellow-500"
        />
        <StatRow
          icon={<Trophy className="h-4 w-4 text-red-600" />}
          label="Hard"
          solved={solvedHard}
          total={platform.Hard}
          percentage={hardPct}
          color="red-600"
        />
      </CardContent>
    </Card>
  );
};

const StatRow = ({ icon, label, solved, total, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className={`text-${color} font-medium`}>{label}</span>
      </div>
      <span className="text-sm text-gray-300 font-medium">
        {solved}/{total}
      </span>
    </div>
    <div className="bg-gray-700/50 rounded-full p-1">
      <Progress
        value={percentage}
        className={`h-2 bg-transparent [&>div]:bg-${color} [&>div]:rounded-full [&>div]:shadow-sm`}
      />
    </div>
    <div className="text-xs text-gray-400 text-right">{percentage}%</div>
  </div>
);

export default ProblemStats;
