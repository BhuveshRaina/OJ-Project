import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

export default function TestCases({
  testCases,
  setTestCases,
  running,
  outputs = [],
  compileError = null,
  verdict = null,              // NEW
}) {
  const [activeTab, setActiveTab] = useState("testcase");
  const [selectedIdx, setSelectedIdx] = useState(0);

  /* auto-switch to result when verdict arrives */
  useEffect(() => {
    if (verdict) setActiveTab("result");
  }, [verdict]);

  /* helpers */
  const addNew = () => {
    if (testCases.length >= 5) return;
    setTestCases([...testCases, { input: "", expectedOutput: "" }]);
    setSelectedIdx(testCases.length);
  };

  const del = (idx) => {
    if (testCases.length <= 1) return;
    const upd = testCases.filter((_, i) => i !== idx);
    setTestCases(upd);
    setSelectedIdx(Math.min(idx, upd.length - 1));
  };

  const updInput = (idx, val) => {
    const upd = [...testCases];
    upd[idx] = { ...upd[idx], input: val };
    setTestCases(upd);
  };

  /* render */
  return (
    <div className="h-full bg-[#0f1419] border-t border-[#1e2328]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        {/* top bar */}
        <div className="flex items-center justify-between p-4 border-b border-[#1e2328]">
          <TabsList className="bg-[#1e2328] border-[#2a2f36]">
            <TabsTrigger value="testcase" className="text-gray-300 data-[state=active]:bg-[#2a2f36]">
              Testcase
            </TabsTrigger>
            <TabsTrigger value="result" className="text-gray-300 data-[state=active]:bg-[#2a2f36]">
              Test Result
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TESTCASE tab */}
        <TabsContent value="testcase" className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            {/* buttons */}
            <div className="flex gap-2 p-4 border-b border-[#1e2328]/50">
              {testCases.map((_, idx) => (
                <div key={idx} className="relative group">
                  <Button
                    variant={selectedIdx === idx ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedIdx(idx)}
                    className={selectedIdx === idx
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-[#1e2328] border-[#2a2f36] text-gray-300 hover:bg-[#2a2f36]"}
                  >
                    Case {idx + 1}
                  </Button>
                  {testCases.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); del(idx); }}
                      className="absolute -top-1 -left-1 w-3 h-3 bg-[#1e2328] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[#2a2f36]"
                    >
                      <X className="w-1.5 h-1.5 text-gray-400" />
                    </button>
                  )}
                </div>
              ))}
              {testCases.length < 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addNew}
                  className="bg-[#1e2328] border-[#2a2f36] text-gray-300 hover:bg-[#2a2f36]"
                >
                  +
                </Button>
              )}
            </div>

            {/* input */}
            <div className="p-4 space-y-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Input</h4>
              <Textarea
                value={testCases[selectedIdx]?.input || ""}
                onChange={e => updInput(selectedIdx, e.target.value)}
                className="bg-[#1e2328]/50 border-[#2a2f36] text-gray-100 font-mono text-sm min-h-[80px] resize-none"
              />
            </div>

            {/* output */}
            <div className="p-4 space-y-4">
              {running ? (
                <div className="text-center text-gray-400">Running…</div>
              ) : (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Output</h4>
                  <div className="bg-[#1e2328]/50 rounded p-3 border border-[#2a2f36] min-h-[80px]">
                    <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                      {compileError ?? outputs[selectedIdx] ?? (
                        <span className="text-gray-500 italic">No output yet.</span>
                      )}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* RESULT tab */}
        <TabsContent value="result" className="flex-1 p-6 overflow-auto">
          {verdict ? (
            <div
              className={
                verdict === "Accepted"
                  ? "text-green-400 text-lg font-semibold"
                  : "text-red-400 text-lg font-semibold"
              }
            >
              {verdict}
              {compileError && verdict === "Compilation Error" && (
                <pre className="mt-2 text-sm whitespace-pre-wrap text-gray-200">
                  {compileError}
                </pre>
              )}
            </div>
          ) : (
            <div className="text-gray-400">Submit code to see verdict.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
