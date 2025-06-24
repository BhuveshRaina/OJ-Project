import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Zap, Target } from 'lucide-react';

const challengingProblems = [
  {
    id: 1,
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    description: "Find the maximum element in every sliding window of size k",
    icon: Trophy,
    gradient: "from-red-500 to-pink-500",
    topics: ["Array", "Sliding Window", "Heap"]
  },
  {
    id: 2,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    description: "Merge k sorted linked lists and return one sorted list",
    icon: Star,
    gradient: "from-purple-500 to-indigo-500",
    topics: ["Linked List", "Divide and Conquer", "Heap"]
  },
  {
    id: 3,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    description: "Calculate how much water can be trapped after raining",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    topics: ["Array", "Two Pointers", "Dynamic Programming"]
  },
  {
    id: 4,
    title: "Longest Valid Parentheses",
    difficulty: "Hard",
    description: "Find the length of longest valid parentheses substring",
    icon: Target,
    gradient: "from-green-500 to-emerald-500",
    topics: ["String", "Dynamic Programming", "Stack"]
  }
];

const ProblemSlider = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Top Challenging Problems</h2>
        <p className="text-gray-400">Test your skills with these difficult problems</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {challengingProblems.map((problem) => {
          const IconComponent = problem.icon;
          return (
            <Card
              key={problem.id}
              className="group bg-dark-card/90 border-gray-700 hover:bg-dark-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${problem.gradient}
                              flex items-center justify-center mb-3 group-hover:scale-110
                              transition-transform`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white line-clamp-2 leading-tight">
                  {problem.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {problem.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30">
                    {problem.difficulty}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {problem.topics.slice(0, 2).map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="text-xs bg-gray-700/50 text-gray-300"
                    >
                      {topic}
                    </Badge>
                  ))}
                  {problem.topics.length > 2 && (
                    <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300">
                      +{problem.topics.length - 2}
                    </Badge>
                  )}
                </div>

                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-code-purple to-code-blue
                             hover:from-code-blue hover:to-code-purple text-white transition-all"
                >
                  Solve Challenge
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemSlider;
