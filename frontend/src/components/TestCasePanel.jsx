import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const TestCasePanel = () => {
  const [activeCase, setActiveCase] = useState('case1');
  const [customInput, setCustomInput] = useState('');

  const testCases = {
    case1: {
      input: 'l1 = [2,4,3]\nl2 = [5,6,4]',
      expectedOutput: '[7,0,8]',
    },
    case2: {
      input: 'l1 = [0]\nl2 = [0]',
      expectedOutput: '[0]',
    },
    case3: {
      input: 'l1 = [9,9,9,9,9,9,9]\nl2 = [9,9,9,9]',
      expectedOutput: '[8,9,9,9,0,0,0,1]',
    },
  };

  return (
    <div className="h-full flex flex-col">
      {/* Test Case Tabs */}
      <div className="flex items-center gap-2 mb-4">
        {Object.keys(testCases).map((caseKey, index) => (
          <Button
            key={caseKey}
            onClick={() => setActiveCase(caseKey)}
            variant={activeCase === caseKey ? 'default' : 'outline'}
            size="sm"
            className={
              activeCase === caseKey
                ? 'bg-gray-700 text-white'
                : 'bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700/50'
            }
          >
            Case {index + 1}
          </Button>
        ))}

        {/* Custom case tab */}
        <Button
          onClick={() => setActiveCase('custom')}
          variant={activeCase === 'custom' ? 'default' : 'outline'}
          size="sm"
          className={
            activeCase === 'custom'
              ? 'bg-gray-700 text-white'
              : 'bg-transparent border-gray-600 text-gray-400 hover:bg-gray-700/50'
          }
        >
          +
        </Button>
      </div>

      {/* Test Case Content */}
      <div className="flex-1">
        {activeCase === 'custom' ? (
          <div className="h-full">
            <div className="text-sm text-gray-400 mb-2">Custom Input:</div>
            <Textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter your custom test case..."
              className="h-32 bg-dark-card/50 border-gray-600 text-white resize-none"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Input block */}
            <div>
              <div className="text-sm text-gray-400 mb-2">Input:</div>
              <div className="bg-dark-card/50 border border-gray-600 rounded-md p-3">
                <pre className="text-white font-mono text-sm whitespace-pre-wrap">
                  {testCases[activeCase].input}
                </pre>
              </div>
            </div>

            {/* Output block */}
            <div>
              <div className="text-sm text-gray-400 mb-2">Output:</div>
              <div className="bg-dark-card/50 border border-gray-600 rounded-md p-3">
                <pre className="text-white font-mono text-sm">
                  {testCases[activeCase].expectedOutput}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasePanel;
