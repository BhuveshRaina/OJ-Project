import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Lock } from 'lucide-react';

const ProblemCard = ({ problem }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-code-green';
      case 'Medium':
        return 'text-code-orange';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-dark-card/95 border-gray-600 hover:bg-dark-card hover:border-code-blue/50 transition-all duration-300 p-4 shadow-lg hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Status Icon */}
          <div className="flex items-center justify-center w-6 h-6">
            {problem.solved ? (
              <div className="w-5 h-5 bg-code-green rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-3 h-3 text-white" />
              </div>
            ) : (
              <div className="w-5 h-5 border-2 border-gray-500 rounded-full hover:border-code-blue transition-colors"></div>
            )}
          </div>

          {/* Problem Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-400 text-sm font-medium">{problem.id}.</span>
              <h3 className="text-white hover:text-code-blue cursor-pointer transition-colors font-medium">
                {problem.title}
              </h3>
              {problem.premium && <Lock className="w-4 h-4 text-code-orange" />}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {problem.topics.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs bg-gray-700/80 text-gray-200 hover:bg-gray-600/80 border border-gray-600/50"
                >
                  {topic}
                </Badge>
              ))}
              {problem.topics.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{problem.topics.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Difficulty and Acceptance */}
        <div className="flex items-center gap-6 text-sm">
          <span className={`font-semibold ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
          <span className="text-gray-300 font-medium">{problem.acceptance}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProblemCard;
