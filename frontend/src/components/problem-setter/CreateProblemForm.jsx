import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileJson,
  Upload,
  X,
  Info,
  Code,
  TestTube,
  EyeOff,
  AlertCircle,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateProblemForm = ({ editingProblem, onProblemSaved }) => {
  const { toast } = useToast();

  const [activeStep, setActiveStep] = useState("basic");
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "",
    tags: [],
    statement: "",
    constraints: "",
    sampleTestCases: null,
    hiddenTestCases: null,
  });
  const [currentTag, setCurrentTag] = useState("");

  /* ------------------ Prefill on edit ------------------ */
  useEffect(() => {
    if (editingProblem) {
      setFormData({
        title: editingProblem.title || "",
        difficulty: editingProblem.difficulty || "",
        tags: editingProblem.tags || [],
        statement:
          editingProblem.statement ||
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        constraints:
          editingProblem.constraints ||
          "2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹\nOnly one valid answer exists",
        sampleTestCases: null,
        hiddenTestCases: null,
      });
    }
  }, [editingProblem]);

  /* ------------------ Helpers ------------------ */
  const handleAddTag = () => {
    const trimmed = currentTag.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleFileUpload = (type, file) => {
    if (file && file.type !== "application/json") {
      toast({
        title: "Invalid file type",
        description: "Please upload a JSON file",
        variant: "destructive",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [type === "sample" ? "sampleTestCases" : "hiddenTestCases"]: file,
    }));

    if (file) {
      toast({
        title: "File uploaded",
        description: `${
          type === "sample" ? "Sample" : "Hidden"
        } test cases file uploaded successfully`,
      });
    }
  };

  const handleDownloadFile = (type) => {
    const fileName =
      type === "sample" ? "sample_test_cases.json" : "hidden_test_cases.json";
    const dummyData = {
      testCases: [
        { input: [2, 7, 11, 15], target: 9, output: [0, 1] },
        { input: [3, 2, 4], target: 6, output: [1, 2] },
      ],
    };

    const blob = new Blob([JSON.stringify(dummyData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "File downloaded",
      description: `${
        type === "sample" ? "Sample" : "Hidden"
      } test cases downloaded successfully`,
    });
  };

  const handleSaveProblem = () => {
    if (!formData.title || !formData.difficulty || !formData.statement) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log(
      editingProblem ? "Updating problem:" : "Creating problem:",
      formData,
    );

    toast({
      title: editingProblem
        ? "Problem updated successfully!"
        : "Problem created successfully!",
      description: editingProblem
        ? "Your changes have been saved"
        : "Your problem has been submitted for review",
    });

    if (!editingProblem) {
      setFormData({
        title: "",
        difficulty: "",
        tags: [],
        statement: "",
        constraints: "",
        sampleTestCases: null,
        hiddenTestCases: null,
      });
      setActiveStep("basic");
    }

    if (onProblemSaved) onProblemSaved();
  };

  /* ------------------ File Upload UI ------------------ */
  const renderFileUpload = (type) => {
    const isEditing = !!editingProblem;
    const fileName =
      type === "sample" ? "sample_test_cases.json" : "hidden_test_cases.json";
    const fileState =
      formData[type === "sample" ? "sampleTestCases" : "hiddenTestCases"];

    return (
      <div className="space-y-4">
        <Label className="text-white mb-2 block">
          {type === "sample"
            ? "Sample Test Cases (JSON)"
            : "Hidden Test Cases (JSON)"}
        </Label>
        <p className="text-gray-400 text-sm mb-4">
          {type === "sample"
            ? "Upload a JSON file containing sample test cases that will be visible to users"
            : "Upload a JSON file containing hidden test cases for evaluation"}
        </p>

        {/* Current file (edit mode) */}
        {isEditing && (
          <div className="mb-4 p-4 bg-dark-card/30 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileJson className="h-5 w-5 text-code-blue" />
                <div>
                  <p className="text-white font-medium">Current File: {fileName}</p>
                  <p className="text-gray-400 text-sm">Existing test cases file</p>
                </div>
              </div>
              <Button
                onClick={() => handleDownloadFile(type)}
                className="bg-gradient-to-r from-code-purple to-code-blue hover:from-code-blue hover:to-code-purple"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}

        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <FileJson className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          {fileState ? (
            <>
              <p className="text-white">{fileState.name}</p>
              <p className="text-gray-400 text-sm">
                {(fileState.size / 1024).toFixed(2)} KB
              </p>
              <Button
                variant="outline"
                onClick={() => handleFileUpload(type, null)}
                className="border-gray-500 text-gray-300 hover:bg-dark-card/80 hover:text-white"
              >
                Remove File
              </Button>
            </>
          ) : (
            <>
              <p className="text-gray-400">
                {isEditing
                  ? "Upload a new file to replace the existing one"
                  : "Drop your JSON file here or click to browse"}
              </p>
              <input
                id={`${type}-upload`}
                type="file"
                accept=".json"
                onChange={(e) =>
                  handleFileUpload(type, e.target.files?.[0] || null)
                }
                className="hidden"
              />
              <Button
                asChild
                className="bg-gradient-to-r from-code-purple to-code-blue hover:from-code-blue hover:to-code-purple"
              >
                <label htmlFor={`${type}-upload`} className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {isEditing ? "Upload New File" : "Upload JSON File"}
                </label>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  /* ------------------ Render ------------------ */
  return (
    <Card className="bg-dark-card/95 border-gray-600 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code className="h-6 w-6 text-code-blue" />
          {editingProblem ? "Edit Problem" : "Create Problem"}
        </CardTitle>
        <p className="text-gray-400">
          {editingProblem
            ? "Update an existing challenge"
            : "Craft a new challenge for the community"}
        </p>
      </CardHeader>

      <CardContent>
        <Tabs
          value={activeStep}
          onValueChange={setActiveStep}
          className="w-full"
        >
          {/* ---------- Tab Headers ---------- */}
          <TabsList className="grid w-full grid-cols-5 bg-dark-card/50 border border-gray-600">
            {[
              { val: "basic", icon: <Info className="h-4 w-4 mr-1" />, label: "Basic Info" },
              { val: "statement", icon: <FileJson className="h-4 w-4 mr-1" />, label: "Statement" },
              { val: "constraints", icon: <AlertCircle className="h-4 w-4 mr-1" />, label: "Constraints" },
              { val: "sample", icon: <TestTube className="h-4 w-4 mr-1" />, label: "Sample Cases" },
              { val: "hidden", icon: <EyeOff className="h-4 w-4 mr-1" />, label: "Hidden Tests" },
            ].map(({ val, icon, label }) => (
              <TabsTrigger
                key={val}
                value={val}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-code-purple data-[state=active]:to-code-blue data-[state=active]:text-white text-gray-300"
              >
                {icon}
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ---------- Basic Info ---------- */}
          <TabsContent value="basic" className="mt-6 space-y-6">
            <div className="grid gap-6">
              <div>
                <Label htmlFor="title" className="text-white mb-2 block">
                  Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Two Sum"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, title: e.target.value }))
                  }
                  className="bg-dark-card/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="difficulty" className="text-white mb-2 block">
                  Difficulty *
                </Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, difficulty: v }))
                  }
                >
                  <SelectTrigger className="bg-dark-card/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-card border-gray-600">
                    {["Easy", "Medium", "Hard"].map((d) => (
                      <SelectItem key={d} value={d} className="text-white">
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags" className="text-white mb-2 block">
                  Tags
                </Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    id="tags"
                    placeholder="Add a tag and press Enter"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="bg-dark-card/50 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={handleAddTag}
                    className="bg-gradient-to-r from-code-purple to-code-blue"
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-code-blue/20 text-code-blue border-code-blue/30"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer hover:text-red-400"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ---------- Statement ---------- */}
          <TabsContent value="statement" className="mt-6">
            <Label htmlFor="statement" className="text-white mb-2 block">
              Problem Statement *
            </Label>
            <Textarea
              id="statement"
              placeholder="Describe the problem, provide examples, constraints, etc."
              value={formData.statement}
              onChange={(e) =>
                setFormData((p) => ({ ...p, statement: e.target.value }))
              }
              className="min-h-[300px] bg-dark-card/50 border-gray-600 text-white"
            />
          </TabsContent>

          {/* ---------- Constraints ---------- */}
          <TabsContent value="constraints" className="mt-6">
            <Label htmlFor="constraints" className="text-white mb-2 block">
              Constraints
            </Label>
            <Textarea
              id="constraints"
              placeholder="e.g., 1 ≤ nums.length ≤ 10^4 ..."
              value={formData.constraints}
              onChange={(e) =>
                setFormData((p) => ({ ...p, constraints: e.target.value }))
              }
              className="min-h-[200px] bg-dark-card/50 border-gray-600 text-white"
            />
            <p className="text-gray-400 text-sm mt-2">
              Define the limits and constraints for the problem inputs
            </p>
          </TabsContent>

          {/* ---------- File Tabs ---------- */}
          <TabsContent value="sample" className="mt-6">
            {renderFileUpload("sample")}
          </TabsContent>
          <TabsContent value="hidden" className="mt-6">
            {renderFileUpload("hidden")}
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSaveProblem}
            className="bg-gradient-to-r from-code-purple to-code-blue hover:from-code-blue hover:to-code-purple text-white px-8 py-2 font-semibold"
          >
            {editingProblem ? "Update Problem" : "Create Problem"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateProblemForm;
