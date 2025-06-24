import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const RecentSubmissions = ({ onSubmissionClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const submissions = [
    {
      id: 1,
      problemTitle: 'Two Sum',
      difficulty: 'Easy',
      language: 'Python',
      runtime: '52 ms',
      memory: '14.2 MB',
      submittedAt: '2 hours ago',
      code: `def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`
    },
    {
      id: 2,
      problemTitle: 'Valid Parentheses',
      difficulty: 'Easy',
      language: 'JavaScript',
      runtime: '68 ms',
      memory: '42.1 MB',
      submittedAt: '5 hours ago',
      code: `function isValid(s) {
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`
    },
    {
      id: 3,
      problemTitle: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      language: 'Java',
      runtime: '12 ms',
      memory: '44.8 MB',
      submittedAt: '1 day ago',
      code: `public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int left = 0, maxLength = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left));
            left++;
        }
        set.add(s.charAt(right));
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`
    },
    {
      id: 4,
      problemTitle: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      language: 'C++',
      runtime: '16 ms',
      memory: '89.4 MB',
      submittedAt: '2 days ago',
      code: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size()) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    int m = nums1.size(), n = nums2.size();
    int left = 0, right = m;
    
    while (left <= right) {
        int partitionA = (left + right) / 2;
        int partitionB = (m + n + 1) / 2 - partitionA;
        
        int maxLeftA = (partitionA == 0) ? INT_MIN : nums1[partitionA - 1];
        int minRightA = (partitionA == m) ? INT_MAX : nums1[partitionA];
        
        int maxLeftB = (partitionB == 0) ? INT_MIN : nums2[partitionB - 1];
        int minRightB = (partitionB == n) ? INT_MAX : nums2[partitionB];
        
        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
            if ((m + n) % 2 == 0) {
                return (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0;
            } else {
                return max(maxLeftA, maxLeftB);
            }
        } else if (maxLeftA > minRightB) {
            right = partitionA - 1;
        } else {
            left = partitionA + 1;
        }
    }
    
    return 0.0;
}`
    },
    {
      id: 5,
      problemTitle: 'Binary Tree Maximum Path Sum',
      difficulty: 'Hard',
      language: 'Python',
      runtime: '84 ms',
      memory: '21.4 MB',
      submittedAt: '3 days ago',
      code: `def maxPathSum(root):
    def helper(node):
        if not node:
            return 0
        
        left = max(helper(node.left), 0)
        right = max(helper(node.right), 0)
        
        current_max = node.val + left + right
        helper.max_sum = max(helper.max_sum, current_max)
        
        return node.val + max(left, right)
    
    helper.max_sum = float('-inf')
    helper(root)
    return helper.max_sum`
    },
    {
      id: 6,
      problemTitle: 'Word Ladder',
      difficulty: 'Hard',
      language: 'Java',
      runtime: '45 ms',
      memory: '52.1 MB',
      submittedAt: '4 days ago',
      code: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord)) return 0;
    
    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int level = 1;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            String current = queue.poll();
            if (current.equals(endWord)) return level;
            
            for (int j = 0; j < current.length(); j++) {
                char[] chars = current.toCharArray();
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[j] = c;
                    String newWord = new String(chars);
                    if (wordSet.contains(newWord)) {
                        queue.offer(newWord);
                        wordSet.remove(newWord);
                    }
                }
            }
        }
        level++;
    }
    return 0;
}`
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-900/50 text-green-400 border-green-700';
      case 'Medium':
        return 'bg-yellow-900/50 text-yellow-400 border-yellow-700';
      case 'Hard':
        return 'bg-red-900/50 text-red-400 border-red-700';
      default:
        return 'bg-gray-900/50 text-gray-400 border-gray-700';
    }
  };

  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = submissions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <Card className="bg-dark-card border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-bold text-white">
          <CheckCircle className="w-5 h-5 mr-2 text-code-green" />
          Recent Submissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
              onClick={() => onSubmissionClick(submission)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">{submission.problemTitle}</h3>
                <Badge className={getDifficultyColor(submission.difficulty)}>
                  {submission.difficulty}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-400 mb-2">
                <div>
                  Language: <span className="text-gray-300">{submission.language}</span>
                </div>
                <div>
                  Runtime: <span className="text-gray-300">{submission.runtime}</span>
                </div>
                <div>
                  Memory: <span className="text-gray-300">{submission.memory}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="text-gray-300">{submission.submittedAt}</span>
                </div>
              </div>

              <div className="text-xs text-green-400 font-medium">✓ Accepted</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, submissions.length)} of {submissions.length} submissions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToPage(page)}
                className={
                  currentPage === page
                    ? 'bg-code-blue text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSubmissions;
