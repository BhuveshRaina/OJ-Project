import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "../components/CodeEditor";
import ProblemDescription from "../components/ProblemDescription";
import TestCases from "../components/TestCases";

export default function RunPage() {
  const { id } = useParams();
  const { toast } = useToast();

  /* ──────────────── problem + boilerplate ──────────────── */
  const [problem, setProblem]             = useState(null);
  const [sampleTestCases, setSampleCases] = useState([]);
  const [loading, setLoading]             = useState(true);

  const [userCases, setUserCases]         = useState([]);
  const [selectedLang, setSelectedLang]   = useState("cpp");
  const [code, setCode]                   = useState(getBoilerplate("cpp"));

  /* ──────────────── run (sample tests) ──────────────── */
  const [running, setRunning]             = useState(false);
  const [runId, setRunId]                 = useState(null);
  const [outputs, setOutputs]             = useState([]);
  const [compileErrRun, setCompileErrRun] = useState(null);     // compile error during Run
  const runPollRef = useRef(null);

  /* ──────────────── submit (hidden tests) ──────────────── */
  const [submitting, setSubmitting]       = useState(false);
  const [submissionId, setSubmissionId]   = useState(null);
  const [verdict, setVerdict]             = useState(null);     // Accepted / WA / etc.
  const [compileErrSubm, setCompileErrSubm] = useState(null);   // compile error during Submit
  const submPollRef = useRef(null);

  /* ──────────────── load problem on mount ──────────────── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/problems/sample/number/${id}`,
          { withCredentials: true }
        );
        if (data.success) {
          setProblem(data.problem);
          setSampleCases(data.sampleTestCases);
        } else {
          toast({ title: "Error", description: data.error, variant: "destructive" });
        }
      } catch (err) {
        console.error(err);
        toast({ title: "Error", description: "Could not load problem", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, toast]);

  /* ──────────────── initialise sample cases ──────────────── */
  useEffect(() => {
    if (sampleTestCases.length) {
      setUserCases(sampleTestCases.map(tc => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
      })));
    }
  }, [sampleTestCases]);

  /* ──────────────── helpers ──────────────── */
  function getBoilerplate(lang) {
    switch (lang) {
      case "cpp":
        return `#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n  cout << "Hello";\n  return 0;\n}`;
      case "java":
        return `public class Main {\n  public static void main(String[] args){\n    System.out.println("Hello");\n  }\n}`;
      case "python":
        return `print("Hello")`;
      default:
        return "";
    }
  }

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setCode(getBoilerplate(lang));
  };

  const handleRun = async () => {
    if (!problem) return;

    setRunning(true);
    setOutputs([]);
    setCompileErrRun(null);

    try {
      const payload = {
        problemNumber: problem.problemNumber,
        code,
        language: selectedLang,
        testCases: userCases.map(tc => ({ input: tc.input })),
      };
      const { data } = await axios.post("http://localhost:8000/api/run", payload, { withCredentials: true });
      setRunId(data.runId);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not start run", variant: "destructive" });
      setRunning(false);
    }
  };

  useEffect(() => {
    if (!runId) return;
    const start = Date.now();

    runPollRef.current = setInterval(async () => {
      const elapsed = Date.now() - start;
      if (elapsed > 10_000) {         
        clearInterval(runPollRef.current);
        setRunning(false);
        toast({ title: "Timeout", description: "Run timed out, please try again", variant: "destructive" });
        return;
      }

      try {
        const { data } = await axios.get(`http://localhost:8000/api/run/${runId}`, { withCredentials: true });
        setOutputs((data.outputs || []).map(o => o.output));

        if (data.verdict !== "pending") {
          clearInterval(runPollRef.current);
          setRunning(false);

          if (data.verdict === "Compilation Error") {
            const msg = data.error || "Compilation Error";
            setCompileErrRun(msg);
            setOutputs(Array(userCases.length).fill(msg));
            toast({ title: "Compilation Error", description: msg, variant: "destructive" });
          } else if (data.verdict !== "done") {
            toast({ title: data.verdict, description: data.error || "", variant: "destructive" });
          }
        }
      } catch (err) {
        console.error(err);
        clearInterval(runPollRef.current);
        setRunning(false);
      }
    }, 500);

    return () => clearInterval(runPollRef.current);
  }, [runId, userCases.length, toast]);

  /* ──────────────── SUBMIT handler ──────────────── */
  const handleSubmit = async () => {
    if (!problem) return;

    setSubmitting(true);
    setVerdict(null);
    setCompileErrSubm(null);

    try {
      const payload = {
        problemNumber: problem.problemNumber,
        code,
        language: selectedLang,
      };
      const { data } = await axios.post("http://localhost:8000/api/submit", payload, { withCredentials: true });
      setSubmissionId(data.submissionId);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not submit code", variant: "destructive" });
      setSubmitting(false);
    }
  };

  /* ──────────────── SUBMIT polling (10 s) ──────────────── */
  useEffect(() => {
    if (!submissionId) return;
    const start = Date.now();

    submPollRef.current = setInterval(async () => {
      const elapsed = Date.now() - start;
      if (elapsed > 10_000) {          // 10-s timeout for judging
        clearInterval(submPollRef.current);
        setSubmitting(false);
        toast({ title: "Timeout", description: "Judging took too long", variant: "destructive" });
        return;
      }

      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/submit/${submissionId}`,
          { withCredentials: true }
        );

        if (data.verdict === "pending") return;

        clearInterval(submPollRef.current);
        setSubmitting(false);
        setVerdict(data.verdict);

        if (data.verdict === "Compilation Error") {
          const msg = data.error || "Compilation Error";
          setCompileErrSubm(msg);
          /* For consistency, mirror into outputs too */
          setOutputs(Array(userCases.length).fill(msg));
          toast({ title: "Compilation Error", description: msg, variant: "destructive" });
        } else if (data.verdict !== "Accepted") {
          toast({ title: data.verdict, description: data.error || "", variant: "destructive" });
        } else {
          toast({ title: "Accepted 🎉", description: "All hidden tests passed!" });
        }
      } catch (err) {
        console.error(err);
        clearInterval(submPollRef.current);
        setSubmitting(false);
      }
    }, 1000);

    return () => clearInterval(submPollRef.current);
  }, [submissionId, userCases.length, toast]);

  /* ──────────────── guards ──────────────── */
  if (loading)  return <div className="p-6 text-gray-400">Loading…</div>;
  if (!problem) return <div className="p-6 text-red-400">Problem not found</div>;

  /* ──────────────── render ──────────────── */
  return (
    <div className="h-screen bg-[#0f1419] text-gray-100 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* description */}
        <ResizablePanel defaultSize={45} minSize={30}>
          <ProblemDescription problem={problem} sampleTestCases={sampleTestCases} />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-[#1e2328] hover:bg-[#2a2f36] transition-colors" />

        {/* editor + test cases */}
        <ResizablePanel defaultSize={55} minSize={40}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* code editor */}
            <ResizablePanel defaultSize={70} minSize={40}>
              <CodeEditor
                language={selectedLang}
                code={code}
                onCodeChange={setCode}
                onLanguageChange={handleLanguageChange}
                running={running}
                submitting={submitting}
                onRun={handleRun}
                onSubmit={handleSubmit}
              />
            </ResizablePanel>

            <ResizableHandle className="h-2 bg-[#1e2328] hover:bg-[#2a2f36] transition-colors" />

            {/* test cases */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <TestCases
                testCases={userCases}
                setTestCases={setUserCases}
                running={running}
                outputs={outputs}
                compileError={compileErrRun || compileErrSubm}
                verdict={verdict}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
