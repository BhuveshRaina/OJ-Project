import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

const SolvedStats = () => {
  const stats = {
    total: 310,
    totalQuestions: 3595,
    easy: { solved: 25, total: 883, percentage: 2.8 },
    medium: { solved: 189, total: 1867, percentage: 10.1 },
    hard: { solved: 96, total: 845, percentage: 11.4 }
  };

  return (
    <Card className="bg-dark-card border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-bold text-white">
          <CheckCircle className="w-5 h-5 mr-2 text-code-orange" />
          Problems Solved
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-gray-400">/{stats.totalQuestions}</div>
            <div className="text-sm text-green-400">✓ Solved</div>
            <div className="text-xs text-gray-500 mt-1">5 Attempting</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-center mb-2">
              <div className="text-sm text-blue-400 font-medium">Easy</div>
              <div className="text-lg font-bold text-white">{stats.easy.solved}</div>
              <div className="text-xs text-gray-400">/{stats.easy.total}</div>
            </div>
            <Progress 
              value={stats.easy.percentage} 
              className="h-2 bg-gray-700 [&>div]:bg-blue-500"
            />
          </div>

          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-center mb-2">
              <div className="text-sm text-yellow-400 font-medium">Med.</div>
              <div className="text-lg font-bold text-white">{stats.medium.solved}</div>
              <div className="text-xs text-gray-400">/{stats.medium.total}</div>
            </div>
            <Progress 
              value={stats.medium.percentage} 
              className="h-2 bg-gray-700 [&>div]:bg-yellow-500"
            />
          </div>

          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-center mb-2">
              <div className="text-sm text-red-400 font-medium">Hard</div>
              <div className="text-lg font-bold text-white">{stats.hard.solved}</div>
              <div className="text-xs text-gray-400">/{stats.hard.total}</div>
            </div>
            <Progress 
              value={stats.hard.percentage} 
              className="h-2 bg-gray-700 [&>div]:bg-red-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolvedStats;