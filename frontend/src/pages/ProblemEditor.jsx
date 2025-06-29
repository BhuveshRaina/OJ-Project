import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, AlertCircle, Play, ChevronDown } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CodeEditor from '@/components/CodeEditor';
import TestCasePanel from '@/components/TestCasePanel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProblemEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [verdict, setVerdict] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('testcase');
  const [showTags, setShowTags] = useState(false);

  /* ───────────────────────────────────────────
     MOCK PROBLEM DATA
  ─────────────────────────────────────────── */
  const problem = {
    id: 2,
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    status: 'solved', // "solved", "attempted", or "unattempted"
    description:
      'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 ≤ Node.val ≤ 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.',
    ],
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807',
      },
      {
        input: 'l1 = [0], l2 = [0]',
        output: '[0]',
        explanation: '0 + 0 = 0',
      },
      {
        input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]',
        output: '[8,9,9,9,0,0,0,1]',
        explanation: '9999999 + 9999 = 10009998',
      },
      {
        input: 'l1 = [1,2], l2 = [3,4,5]',
        output: '[4,6,5]',
        explanation: '21 + 543 = 564',
      },
    ],
    tags: ['Linked List', 'Math', 'Recursion'],
  };

  const languages = [
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
  ];

  /* ───────────────────────────────────────────
     HELPERS
  ─────────────────────────────────────────── */
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-code-green/20 text-code-green hover:bg-code-green/30';
      case 'Medium':
        return 'bg-code-orange/20 text-code-orange hover:bg-code-orange/30';
      case 'Hard':
        return 'bg-red-500/20 text-red-400 hover:bg-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderStatusIndicator = (status) => {
    switch (status) {
      case 'solved':
        return (
          <div className="absolute top-4 right-4 z-10">
            <Check className="w-6 h-6 text-code-green" />
          </div>
        );
      case 'attempted':
        return (
          <div className="absolute top-4 right-4 z-10">
            <div className="relative">
              <div className="w-8 h-8 bg-code-orange/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-code-orange" />
              </div>
            </div>
          </div>
        );
      case 'unattempted':
        return (
          <div className="absolute top-4 right-4 z-10">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-400/40 rounded-full absolute"></div>
              <div className="w-6 h-6 border-2 border-gray-400/60 rounded-full absolute"></div>
              <div className="w-4 h-4 border-2 border-gray-400/80 rounded-full"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  /* ───────────────────────────────────────────
     ACTION HANDLERS
  ─────────────────────────────────────────── */
  const handleRun = () => {
    setIsRunning(true);
    setActiveTab('result');
    setTimeout(() => {
      setOutput('Sample output for your code execution...');
      setVerdict('');
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setActiveTab('result');
    setTimeout(() => {
      const verdicts = [
        'Accepted',
        'Wrong Answer on test case 13',
        'Runtime Error',
        'Compilation Error',
        'Time Limit Exceeded',
      ];
      const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];
      setVerdict(randomVerdict);
      setOutput('');
      setIsSubmitting(false);
    }, 3000);
  };

  /* ───────────────────────────────────────────
     RENDER
  ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* LEFT: Problem */}
          <ResizablePanel defaultSize={50} minSize={30} className="relative">
            {renderStatusIndicator(problem.status)}

            <div className="h-full overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-white text-lg font-light">{problem.id}.</span>
                    <h1 className="text-xl font-bold">{problem.title}</h1>
                  </div>

                  <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-300 leading-relaxed">{problem.description}</p>
                </div>

                {/* Examples */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Examples</h3>
                  {problem.examples.map((ex, i) => (
                    <Card key={i} className="bg-dark-card/50 border-gray-600 mb-4">
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-400">Input:</span>
                          <code className="ml-2 text-white font-mono text-sm">{ex.input}</code>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-400">Output:</span>
                          <code className="ml-2 text-white font-mono text-sm">{ex.output}</code>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Constraints */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                  {problem.constraints.map((c, i) => (
                    <div key={i} className="text-gray-300 text-sm">
                      • {c}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Tags</h3>
                    <Button
                      onClick={() => setShowTags(!showTags)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white hover:bg-gray-700/50"
                    >
                      {showTags ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  {showTags && (
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-gray-700/80 text-white hover:bg-gray-600/80 cursor-pointer border border-gray-500"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-gray-700 hover:bg-gray-600" />

          {/* RIGHT: Editor & Results */}
          <ResizablePanel defaultSize={50} minSize={30} className="relative">
            {renderStatusIndicator(problem.status)}

            <ResizablePanelGroup direction="vertical" className="h-full">
              {/* CODE EDITOR */}
              <ResizablePanel defaultSize={70} minSize={30}>
                <div className="flex flex-col h-full">
                  {/* Editor toolbar */}
                  <div className="border-b border-gray-700 p-4">
                    <div className="flex items-center justify-between">
                      {/* Language dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-dark-card border-gray-600 text-white hover:bg-gray-700 px-3 py-2 flex items-center gap-2 w-24 justify-between"
                          >
                            {languages.find((l) => l.value === selectedLanguage)?.label}
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-dark-card border-gray-600 w-24" align="start">
                          {languages.map((lang) => (
                            <DropdownMenuItem
                              key={lang.value}
                              onClick={() => setSelectedLanguage(lang.value)}
                              className="text-white hover:bg-gray-700 cursor-pointer"
                            >
                              {lang.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <span className="text-gray-400 text-sm">Auto</span>

                      {/* Run / Submit */}
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={handleRun}
                          disabled={isRunning}
                          variant="outline"
                          size="sm"
                          className="bg-dark-bg border-gray-600 text-white hover:bg-gray-700 w-20"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          {isRunning ? 'Running...' : 'Run'}
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          size="sm"
                          className="bg-code-green hover:bg-code-green/80 text-white w-28 h-9"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Monaco / CodeMirror component */}
                  <div className="flex-1">
                    <CodeEditor language={selectedLanguage} value={code} onChange={setCode} />
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-gray-700 hover:bg-gray-600" />

              {/* OUTPUT / TESTCASES */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="h-full border-t border-gray-700">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <TabsList className="bg-dark-card border-b border-gray-700 rounded-none justify-start p-0">
                      <TabsTrigger
                        value="testcase"
                        className="text-white data-[state=inactive]:text-white hover:bg-white hover:text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-600"
                      >
                        Testcase
                      </TabsTrigger>
                      <TabsTrigger
                        value="result"
                        className="text-white data-[state=inactive]:text-white hover:bg-white hover:text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-600"
                      >
                        Test Result
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="testcase" className="flex-1 overflow-hidden">
                      <ScrollArea className="h-full">
                        <div className="p-4 pl-6">
                          <TestCasePanel />
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="result" className="flex-1 p-4">
                      {verdict && (
                        <div
                          className={`p-3 rounded-md mb-4 ${
                            verdict === 'Accepted'
                              ? 'bg-code-green/20 text-code-green border border-code-green/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          <div className="font-semibold">{verdict}</div>
                        </div>
                      )}

                      {output && (
                        <div className="bg-dark-card/50 border border-gray-600 rounded-md p-3">
                          <div className="text-sm text-gray-400 mb-2">Output:</div>
                          <pre className="text-white font-mono text-sm whitespace-pre-wrap">{output}</pre>
                        </div>
                      )}

                      {(isRunning || isSubmitting) && (
                        <div className="flex items-center justify-center h-32">
                          <span className="text-gray-400">
                            {isRunning ? 'Running your code...' : 'Submitting your solution...'}
                          </span>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProblemEditor;
