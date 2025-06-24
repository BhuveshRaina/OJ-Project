import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  const [code, setCode] = useState('');

  // Boilerplates keyed by language
  const boilerplateCode = {
    cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        
    }
};`,
    java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
    }
}`,
    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1, l2):
        `
  };

  // Map to Monaco's language ids (could alias if you add more languages)
  const languageMap = {
    cpp: 'cpp',
    java: 'java',
    python: 'python'
  };

  /* Whenever the chosen language changes, preload its template
     and propagate the change upward. */
  useEffect(() => {
    const newCode = boilerplateCode[language] || '';
    setCode(newCode);
    onChange(newCode);
  }, [language, onChange]);

  // Keep local state in sync with the editor’s content
  const handleCodeChange = (newValue = '') => {
    setCode(newValue);
    onChange(newValue);
  };

  return (
    <div className="h-full bg-dark-bg">
      <Editor
        height="100%"
        language={languageMap[language]}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
          cursorStyle: 'line',
          renderLineHighlight: 'line'
        }}
      />
    </div>
  );
};

export default CodeEditor;
