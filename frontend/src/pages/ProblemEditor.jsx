import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSnippet } from "@/store/editorSlice";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor          from "../components/CodeEditor";
import ProblemDescription  from "../components/ProblemDescription";
import TestCases           from "../components/TestCases";

/* ─────── boiler-plate templates ─────── */
const boilerplate = {
  cpp: `
#include <iostream>
using namespace std;
int main(){
  cout << "Hello";
  return 0;
}`.trim(),

  java: `
public class Main{
  public static void main(String[] args){
    System.out.println("Hello");
  }
}`.trim(),

  python: `print("Hello")`,
};
const getBoilerplate = (lang) => boilerplate[lang] ?? "";

export default function RunPage() {
  const { id }  = useParams();                // problem number (string)
  const { toast } = useToast();
  const dispatch  = useDispatch();

  /* ─────────── problem data ─────────── */
  const [problem, setProblem]             = useState({});
  const [sampleTestCases, setSampleCases] = useState([]);
  const [loading, setLoading]             = useState(true);

  /* ─────────── editor language & text ─────────── */
  const [selectedLang, setSelectedLang] = useState("cpp");

  /** 1️⃣ read persisted snippet (pruned to ≤24 h by redux-persist) */
  const persistedSnippet = useSelector(
    (s) => s.editor.snippets[id]?.[selectedLang]?.code
  );

  /** 2️⃣ local Monaco text */
  const [code, setCode] = useState(
    persistedSnippet ?? getBoilerplate(selectedLang)
  );

  /** 3️⃣ when problem id or language changes, reload snippet / boilerplate */
  useEffect(() => {
    setCode(persistedSnippet ?? getBoilerplate(selectedLang));
  }, [persistedSnippet, selectedLang]);

  /** 4️⃣ save every keystroke */
  useEffect(() => {
    if (!id) return;
    dispatch(saveSnippet({ problemNumber: id, language: selectedLang, code }));
  }, [code, selectedLang, id, dispatch]);

  /* ─────────── editable sample cases ─────────── */
  const [userCases, setUserCases] = useState([]);

  /* ─────────── RUN & SUBMIT state (original) ─────────── */
  const [running, setRunning]       = useState(false);
  const [runId, setRunId]           = useState(null);
  const [outputs, setOutputs]       = useState([]);
  const [compileErrRun, setCERun]   = useState(null);
  const runPollRef = useRef(null);

  const [submitting, setSubmitting]     = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [verdict, setVerdict]           = useState(null);
  const [submissionError, setSubmError] = useState(null);
  const [failedCase, setFailedCase]     = useState(null);
  const submPollRef = useRef(null);

  /* ─────────── fetch problem once ─────────── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/problems/sample/number/${id}`,
          { withCredentials: true }
        );
        if (data.success) {
          setProblem({...data.problem});
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
  /* initialise editable list */
  useEffect(() => {
    if (sampleTestCases.length) {
      setUserCases(
        sampleTestCases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
        }))
      );
    }
  }, [sampleTestCases]);

  /* ─────────── language select handler ─────────── */
  const handleLanguageChange = (l) => setSelectedLang(l);

  /* ─────────── RUN handler (unchanged) ─────────── */
  const handleRun = async () => {
    if (!problem) return;
    setVerdict(null); setSubmError(null); setFailedCase(null);
    setRunning(true); setOutputs([]); setCERun(null);

    try {
      const payload = {
        problemNumber: problem.problemNumber,
        code,
        language: selectedLang,
        testCases: userCases.map((tc) => ({ input: tc.input })),
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/run",
        payload,
        { withCredentials: true }
      );
      setRunId(data.runId);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not start run", variant: "destructive" });
      setRunning(false);
    }
  };

  /* ─────────── RUN polling (unchanged) ─────────── */
  useEffect(() => {
    if (!runId) return;
    const start = Date.now();
    runPollRef.current = setInterval(async () => {
      const elapsed = Date.now() - start;
      if (elapsed > 10_000) {
        clearInterval(runPollRef.current); setRunning(false);
        toast({ title: "Timeout", description: "Run timed out", variant: "destructive" });
        return;
      }
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/run/${runId}`,
          { withCredentials: true }
        );
        setOutputs((data.outputs || []).map((o) => o.output));
        if (data.verdict !== "pending") {
          clearInterval(runPollRef.current); setRunning(false);
          if (data.verdict === "Compilation Error") {
            setCERun(data.error || "Compilation Error");
          } else if (data.verdict !== "done") {
            toast({ title: data.verdict, description: data.error || "", variant: "destructive" });
          }
        }
      } catch (err) {
        console.error(err);
        clearInterval(runPollRef.current); setRunning(false);
      }
    }, 500);
    return () => clearInterval(runPollRef.current);
  }, [runId, toast]);

  /* ─────────── SUBMIT handler  (your original code) ─────────── */
  const handleSubmit = async () => {
    if (!problem) return;

    setSubmitting(true);
    setVerdict(null);
    setSubmError(null);
    setFailedCase(null);
    setOutputs([]);
    setCERun(null);

    try {
      const payload = { problemId: problem.problemNumber, code, language: selectedLang };
      const { data } = await axios.post(
        "http://localhost:8000/api/submissions/submit",
        payload,
        { withCredentials: true }
      );
      setSubmissionId(data.submissionId);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not submit code", variant: "destructive" });
      setSubmitting(false);
    }
  };

  /* ─────────── SUBMIT polling (unchanged) ─────────── */
   useEffect(() => {
    if (!submissionId) return;
    const start = Date.now();
    submPollRef.current = setInterval(async () => {
      const elapsed = Date.now() - start;
      if (elapsed > 10_000) {
        clearInterval(submPollRef.current); setSubmitting(false);
        toast({ title: "Timeout", description: "Judging took too long", variant: "destructive" });
        return;
      }
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/submissions/submit/${submissionId}`,
          { withCredentials: true }
        );
        if (data.verdict === "pending" || data.verdict === "Pending") return;

        clearInterval(submPollRef.current); setSubmitting(false);
        setVerdict(data.verdict);

        switch (data.verdict) {
          case "Accepted":
            toast({ title: "Accepted ✔️", description: "All hidden tests passed!" });
            try {
              console.log(problem);
              await axios.post(
                "http://localhost:8000/api/users/solved",
                { problemId: problem._id },        
                { withCredentials: true }
              );
            } catch (e) {
              console.error("Could not update solved list", e);
            }
            break;

          case "Compilation Error":
            setSubmError(data.errorMessage || data.error || "Compilation Error");
            toast({ title: "Compilation Error", description: data.errorMessage || data.error, variant: "destructive" });
            break;

          case "Wrong Answer":
            setSubmError("Wrong Answer");
            setFailedCase(data.failedTestCase);
            toast({ title: "Wrong Answer", description: "See failing test case", variant: "destructive" });
            break;

          case "Time Limit Exceeded":
          case "Memory Limit Exceeded":
          case "Runtime Error":
            setSubmError(data.verdict);
            toast({ title: data.verdict, variant: "destructive" });
            break;

          default:
            toast({ title: data.verdict });
        }
      } catch (err) {
        console.error(err);
        clearInterval(submPollRef.current); setSubmitting(false);
      }
    }, 1000);
    return () => clearInterval(submPollRef.current);
  }, [submissionId, toast, problem]); 

  /* ─────────── guards ─────────── */
  if (loading)  return <div className="p-6 text-gray-400">Loading…</div>;
  if (!problem) return <div className="p-6 text-red-400">Problem not found</div>;

  /* ─────────── render ─────────── */
  return (
    <div className="h-screen bg-[#0f1419] text-gray-100 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={45} minSize={30}>
          <ProblemDescription problem={problem} sampleTestCases={sampleTestCases}/>
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-[#1e2328]" />

        <ResizablePanel defaultSize={55} minSize={40}>
          <ResizablePanelGroup direction="vertical" className="h-full">
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

            <ResizableHandle className="h-2 bg-[#1e2328]" />

            <ResizablePanel defaultSize={30} minSize={20}>
              <TestCases
                testCases={userCases}
                setTestCases={setUserCases}
                running={running}
                outputs={outputs}
                runCompileError={compileErrRun}
                verdict={verdict}
                submissionError={submissionError}
                failedCase={failedCase}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
