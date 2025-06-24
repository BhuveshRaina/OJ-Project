import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap } from 'lucide-react';

const ProblemStats = () => {
  const stats = {
    easy: { solved: 45, total: 120, percentage: 37.5 },
    medium: { solved: 32, total: 180, percentage: 17.8 },
    hard: { solved: 8, total: 75, percentage: 10.7 }
  };

  const totalSolved = stats.easy.solved + stats.medium.solved + stats.hard.solved;
  const totalProblems = stats.easy.total + stats.medium.total + stats.hard.total;

  const overallPercentage = Math.round((totalSolved / totalProblems) * 100);

  return (
    <Card className="bg-dark-card/95 border-gray-600 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-code-blue" />
          Your Progress
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Total Stats */}
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">{totalSolved}</div>
          <div className="text-sm text-gray-300 mb-3">
            problems solved out of {totalProblems}
          </div>
          <div className="bg-gray-700/50 rounded-full p-1">
            <Progress
              value={(totalSolved / totalProblems) * 100}
              className="h-3 bg-transparent [&>div]:bg-gradient-to-r [&>div]:from-code-purple [&>div]:to-code-blue [&>div]:rounded-full [&>div]:shadow-lg"
            />
          </div>
          <div className="text-xs text-gray-400 mt-1 text-right">
            {overallPercentage}%
          </div>
        </div>

        {/* Individual Stats */}
        <div className="space-y-4">
          {/* Easy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-code-green" />
                <span className="text-code-green font-medium">Easy</span>
              </div>
              <span className="text-sm text-gray-300 font-medium">
                {stats.easy.solved}/{stats.easy.total}
              </span>
            </div>
            <div className="bg-gray-700/50 rounded-full p-1">
              <Progress
                value={stats.easy.percentage}
                className="h-2 bg-transparent [&>div]:bg-code-green [&>div]:rounded-full [&>div]:shadow-sm"
              />
            </div>
            <div className="text-xs text-gray-400 text-right">
              {stats.easy.percentage}%
            </div>
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-code-orange" />
                <span className="text-code-orange font-medium">Medium</span>
              </div>
              <span className="text-sm text-gray-300 font-medium">
                {stats.medium.solved}/{stats.medium.total}
              </span>
            </div>
            <div className="bg-gray-700/50 rounded-full p-1">
              <Progress
                value={stats.medium.percentage}
                className="h-2 bg-transparent [&>div]:bg-code-orange [&>div]:rounded-full [&>div]:shadow-sm"
              />
            </div>
            <div className="text-xs text-gray-400 text-right">
              {stats.medium.percentage}%
            </div>
          </div>

          {/* Hard */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-red-400" />
                <span className="text-red-400 font-medium">Hard</span>
              </div>
              <span className="text-sm text-gray-300 font-medium">
                {stats.hard.solved}/{stats.hard.total}
              </span>
            </div>
            <div className="bg-gray-700/50 rounded-full p-1">
              <Progress
                value={stats.hard.percentage}
                className="h-2 bg-transparent [&>div]:bg-red-400 [&>div]:rounded-full [&>div]:shadow-sm"
              />
            </div>
            <div className="text-xs text-gray-400 text-right">
              {stats.hard.percentage}%
            </div>
          </div>
        </div>

        {/* Recent Achievement */}
        <div className="mt-6 p-4 bg-gradient-to-r from-code-purple/25 to-code-blue/25 rounded-lg border border-code-purple/40 shadow-inner">
          <div className="text-sm text-code-blue font-medium mb-1 flex items-center gap-2">
            <span className="text-lg">🎉</span>
            Recent Achievement
          </div>
          <div className="text-xs text-gray-200">
            Solved 5 problems this week!
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemStats;
