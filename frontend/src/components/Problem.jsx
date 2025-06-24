import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProblemSlider from '@/components/ProblemSlider';
import ProblemCard from '@/components/ProblemCard';
import ProblemStats from '@/components/ProblemStats';

const Problems = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [currentPage, setCurrentPage] = useState(1);

  const userProgressLevel = 3;
  const problemsPerPage = userProgressLevel * 5;

  const problems = [
    { id:1, title:'Two Sum', difficulty:'Easy', acceptance:'55.8%', solved:true,  topics:['Array','Hash Table'],            premium:false },
    { id:2, title:'Add Two Numbers', difficulty:'Medium', acceptance:'46.2%', solved:false, topics:['Linked List','Math'],            premium:false },
    { id:3, title:'Longest Substring Without Repeating Characters', difficulty:'Medium', acceptance:'37.0%', solved:true,  topics:['Hash Table','String','Sliding Window'], premium:false },
    { id:4, title:'Median of Two Sorted Arrays', difficulty:'Hard', acceptance:'43.8%', solved:false, topics:['Array','Binary Search','Divide and Conquer'], premium:false },
    { id:5, title:'Longest Palindromic Substring', difficulty:'Medium', acceptance:'35.9%', solved:true,  topics:['String','Dynamic Programming'],    premium:true  },
    { id:6, title:'Container With Most Water', difficulty:'Medium', acceptance:'54.1%', solved:false, topics:['Array','Two Pointers'],            premium:false },
    { id:7, title:'3Sum', difficulty:'Medium', acceptance:'32.1%', solved:true,  topics:['Array','Two Pointers','Sorting'], premium:false },
    { id:8, title:'Regular Expression Matching', difficulty:'Hard', acceptance:'27.5%', solved:false, topics:['String','Dynamic Programming','Recursion'], premium:false },
    { id:9, title:'Valid Parentheses', difficulty:'Easy', acceptance:'40.8%', solved:true,  topics:['String','Stack'],                 premium:false },
    { id:10,title:'Merge Two Sorted Lists', difficulty:'Easy', acceptance:'62.3%', solved:false, topics:['Linked List','Recursion'],           premium:false },
    { id:11,title:'Best Time to Buy and Sell Stock', difficulty:'Easy', acceptance:'58.1%', solved:true,  topics:['Array','Dynamic Programming'],   premium:false },
    { id:12,title:'Maximum Subarray', difficulty:'Medium', acceptance:'49.5%', solved:false, topics:['Array','Dynamic Programming'],   premium:false },
    { id:13,title:'Climbing Stairs', difficulty:'Easy', acceptance:'52.3%', solved:true,  topics:['Math','Dynamic Programming'],    premium:false },
    { id:14,title:'Binary Tree Inorder Traversal', difficulty:'Easy', acceptance:'76.8%', solved:false, topics:['Stack','Tree','Binary Tree'],      premium:false },
    { id:15,title:'Maximum Depth of Binary Tree', difficulty:'Easy', acceptance:'73.9%', solved:true,  topics:['Tree','Binary Tree','DFS'],       premium:false },
    { id:16,title:'Same Tree', difficulty:'Easy', acceptance:'57.2%', solved:false, topics:['Tree','Binary Tree','DFS'],       premium:false },
    { id:17,title:'Symmetric Tree', difficulty:'Easy', acceptance:'52.4%', solved:true,  topics:['Tree','Binary Tree','DFS'],       premium:false },
    { id:18,title:'Convert Sorted Array to Binary Search Tree', difficulty:'Easy', acceptance:'68.9%', solved:false, topics:['Array','Tree','Binary Search Tree'], premium:false },
    { id:19,title:"Pascal's Triangle", difficulty:'Easy', acceptance:'70.1%', solved:true,  topics:['Array','Dynamic Programming'],   premium:false },
    { id:20,title:'Single Number', difficulty:'Easy', acceptance:'71.2%', solved:false, topics:['Array','Bit Manipulation'],        premium:false }
  ];

  const topics      = ['All Topics','Array','Hash Table','String','Linked List','Math','Binary Search','Dynamic Programming'];
  const difficulties = ['All','Easy','Medium','Hard'];
  const statuses    = ['All','Solved','Unsolved'];

  // apply filters
  const filteredProblems = problems.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (difficultyFilter === 'All' || p.difficulty === difficultyFilter) &&
    (statusFilter === 'All' ||
      (statusFilter === 'Solved' && p.solved) ||
      (statusFilter === 'Unsolved' && !p.solved)
    ) &&
    (topicFilter === 'All Topics' || p.topics.includes(topicFilter))
  );

  // pagination
  const totalPages        = Math.ceil(filteredProblems.length / problemsPerPage);
  const startIndex        = (currentPage - 1) * problemsPerPage;
  const paginatedProblems = filteredProblems.slice(startIndex, startIndex + problemsPerPage);

  const handleNextPage = () => setCurrentPage(cp => Math.min(cp + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(cp => Math.max(cp - 1, 1));

  const handleFilterChange = (type, value) => {
    setCurrentPage(1);
    if (type === 'difficulty') setDifficultyFilter(value);
    if (type === 'status')     setStatusFilter(value);
    if (type === 'topic')      setTopicFilter(value);
    if (type === 'search')     setSearchTerm(value);
  };

  // daily challenge decorator
  const dailyChallengeData = [
    { date:new Date(2025,5,1), solved:false },
    { date:new Date(2025,5,2), solved:true  },
    { date:new Date(2025,5,3), solved:true  },
    { date:new Date(2025,5,4), solved:false },
    { date:new Date(2025,5,5), solved:true  },
    { date:new Date(2025,5,6), solved:false },
    { date:new Date(2025,5,7), solved:true  },
    { date:new Date(2025,5,8), solved:true  },
    { date:new Date(2025,5,9), solved:false },
    { date:new Date(2025,5,10),solved:true  }
  ];
  const fmt = d => d ? `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` : '';
  const getDailyChallengeStatus = d =>
    d ? dailyChallengeData.find(ch => fmt(ch.date) === fmt(d)) : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      <Header />

      {/* Hero */}
      <section className="px-4 py-12 bg-gradient-to-br from-dark-bg via-dark-card/30 to-dark-bg">
        <div className="container text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Coding{' '}
            <span className="bg-gradient-to-r from-code-blue to-code-purple bg-clip-text text-transparent">
              Problems
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Solve problems, practice algorithms, and improve your coding skills
          </p>
        </div>
      </section>

      {/* Slider */}
      <section className="px-4 py-8">
        <div className="container">
          <ProblemSlider />
        </div>
      </section>

      {/* Main */}
      <section className="flex-1 px-4 py-8">
        <div className="container grid lg:grid-cols-4 gap-8">
          {/* Filters & List */}
          <div className="lg:col-span-3">
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={e => handleFilterChange('search', e.target.value)}
                  className="pl-10 bg-dark-card/80 border-gray-600 text-white placeholder-gray-400 focus:border-code-blue focus:ring-code-blue/20"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex gap-2">
                  {difficulties.map(d => (
                    <Button
                      key={d}
                      variant={difficultyFilter === d ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('difficulty', d)}
                      className={
                        difficultyFilter === d
                          ? 'bg-gradient-to-r from-code-purple to-code-blue text-white shadow-lg font-semibold'
                          : 'border-gray-500 text-gray-900 bg-gray-100 hover:bg-dark-card/80 hover:text-white hover:border-code-blue/50 font-semibold'
                      }
                    >
                      {d}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {statuses.map(s => (
                    <Button
                      key={s}
                      variant={statusFilter === s ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('status', s)}
                      className={
                        statusFilter === s
                          ? 'bg-gradient-to-r from-code-purple to-code-blue text-white shadow-lg font-semibold'
                          : 'border-gray-500 text-gray-900 bg-gray-100 hover:bg-dark-card/80 hover:text-white hover:border-code-blue/50 font-semibold'
                      }
                    >
                      {s}
                    </Button>
                  ))}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-500 text-gray-900 bg-gray-100 hover:bg-dark-card/80 hover:text-white hover:border-code-blue/50 font-semibold min-w-[120px] justify-between"
                    >
                      {topicFilter}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-dark-card border-gray-600 shadow-xl z-50" align="start">
                    {topics.map(t => (
                      <DropdownMenuItem
                        key={t}
                        onClick={() => handleFilterChange('topic', t)}
                        className={`text-white hover:bg-code-blue/20 hover:text-code-blue cursor-pointer font-medium ${
                          topicFilter === t ? 'bg-code-blue/20 text-code-blue' : ''
                        }`}
                      >
                        {t}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found (Level {userProgressLevel}: {problemsPerPage} per page)
            </p>

            <div className="space-y-3 mb-6">
              {paginatedProblems.map(p => <ProblemCard key={p.id} problem={p} />)}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="border-gray-500 text-gray-900 bg-gray-100 hover:bg-dark-card/80 hover:text-white hover:border-code-blue/50 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  className="bg-gradient-to-r from-code-purple to-code-blue text-white shadow-lg min-w-[2.5rem] font-bold"
                >
                  {currentPage}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="border-gray-500 text-gray-900 bg-gray-100 hover:bg-dark-card/80 hover:text-white hover:border-code-blue/50 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-8">
              <Card className="bg-dark-card/95 border-gray-600 shadow-xl overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle className="text-white flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-code-blue" />
                    Daily Challenge - June 2025
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    defaultMonth={new Date(2025, 5)}
                    className="w-full text-white border-0 bg-transparent [&_.rdp-months]:w-full [&_.rdp-month]:w-full [&_.rdp-table]:w-full"
                  />
                </CardContent>
              </Card>

              <ProblemStats />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Problems;
