import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  FileText,
} from "lucide-react";

const ProblemsList = ({ onEditProblem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All Levels");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock problems data
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["array", "hash-table"],
      created: "26/10/2023",
      status: "Published",
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      tags: ["string", "sliding-window", "hash-table"],
      created: "25/10/2023",
      status: "Draft",
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      tags: ["array", "binary-search", "divide-and-conquer"],
      created: "24/10/2023",
      status: "Under Review",
    },
    {
      id: 4,
      title: "Validate Binary Search Tree",
      difficulty: "Medium",
      tags: ["tree", "depth-first-search", "recursion"],
      created: "23/10/2023",
      status: "Published",
    },
    {
      id: 5,
      title: "Implement Queue using Stacks",
      difficulty: "Easy",
      tags: ["stack", "queue", "data-structures"],
      created: "22/10/2023",
      status: "Published",
    },
    {
      id: 6,
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      tags: ["tree", "breadth-first-search"],
      created: "21/10/2023",
      status: "Published",
    },
    {
      id: 7,
      title: "Reverse Linked List",
      difficulty: "Easy",
      tags: ["linked-list", "recursion"],
      created: "20/10/2023",
      status: "Draft",
    },
    {
      id: 8,
      title: "Maximum Subarray",
      difficulty: "Medium",
      tags: ["array", "dynamic-programming"],
      created: "19/10/2023",
      status: "Published",
    },
  ];

  const difficulties = ["All Levels", "Easy", "Medium", "Hard"];

  /* ---------- Filters ---------- */
  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDiff =
      difficultyFilter === "All Levels" || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  /* ---------- Pagination ---------- */
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedProblems = filteredProblems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* ---------- Handlers ---------- */
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEditProblem = (problem) => {
    if (onEditProblem) onEditProblem(problem);
  };

  const handleDeleteProblem = (problem) => {
    console.log("Deleting problem:", problem);
    // deletion logic here
  };

  /* ---------- Helpers ---------- */
  const difficultyColor = (d) =>
    ({
      Easy: "bg-green-500/20 text-green-400 border-green-500/30",
      Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Hard: "bg-red-500/20 text-red-400 border-red-500/30",
    }[d] || "bg-gray-500/20 text-gray-400 border-gray-500/30");

  const statusColor = (s) =>
    ({
      Published: "bg-green-500/20 text-green-400 border-green-500/30",
      Draft: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      "Under Review": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    }[s] || "bg-gray-500/20 text-gray-400 border-gray-500/30");

  /* ---------- Render ---------- */
  return (
    <Card className="bg-dark-card/95 border-gray-600 shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-6 w-6 text-code-blue" />
          Browse Problems
        </CardTitle>
        <p className="text-gray-400">
          Find problems by title, difficulty, or tags
        </p>
      </CardHeader>

      <CardContent>
        {/* Search + Difficulty Filter */}
        <div className="mb-4 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-dark-card/80 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          {/* Difficulty dropdown */}
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-300 bg-gray-100/10 min-w-[120px] justify-between hover:bg-dark-card/80 hover:text-white"
                >
                  {difficultyFilter}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-40 bg-dark-card border-gray-600 shadow-xl"
                align="start"
              >
                {difficulties.map((d) => (
                  <DropdownMenuItem
                    key={d}
                    onClick={() => {
                      setDifficultyFilter(d);
                      setCurrentPage(1);
                    }}
                    className={`text-white cursor-pointer hover:bg-code-blue/20 hover:text-code-blue ${
                      difficultyFilter === d
                        ? "bg-code-blue/20 text-code-blue"
                        : ""
                    }`}
                  >
                    {d}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Count */}
        <p className="text-gray-400 text-sm mb-3">
          {filteredProblems.length} problem
          {filteredProblems.length !== 1 ? "s" : ""} found
        </p>

        {/* Table */}
        <div className="rounded-md border border-gray-600 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600 hover:bg-dark-card/30">
                <TableHead className="text-gray-300 font-semibold">
                  Problem
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Difficulty
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">Tags</TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Created
                </TableHead>
                <TableHead className="text-gray-300 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedProblems.map((p) => (
                <TableRow
                  key={p.id}
                  className="border-gray-600 hover:bg-dark-card/30 h-16 md:h-20 transition-colors"
                >
                  <TableCell className="text-white font-medium">
                    {p.title}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={`font-semibold ${difficultyColor(p.difficulty)}`}>
                      {p.difficulty}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-gray-600/30 text-gray-300 border-gray-500/50 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {p.tags.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-600/30 text-gray-300 border-gray-500/50 text-xs"
                        >
                          +{p.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={`font-semibold ${statusColor(p.status)}`}>
                      {p.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-gray-400">{p.created}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-dark-card/50"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="bg-dark-card border-gray-600 shadow-xl"
                      >
                        <DropdownMenuItem
                          className="text-white cursor-pointer hover:bg-code-blue/20 hover:text-code-blue"
                          onClick={() => handleEditProblem(p)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-400 cursor-pointer hover:bg-red-500/20 hover:text-red-300"
                          onClick={() => handleDeleteProblem(p)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* No results */}
        {paginatedProblems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No problems found matching your criteria</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(validCurrentPage - 1)}
                    className={`cursor-pointer ${
                      validCurrentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-code-blue/20 hover:text-code-blue"
                    }`}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    isActive
                    className="bg-code-blue/20 text-code-blue border-code-blue/50 font-bold min-w-[40px]"
                  >
                    {validCurrentPage}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(validCurrentPage + 1)}
                    className={`cursor-pointer ${
                      validCurrentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-code-blue/20 hover:text-code-blue"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProblemsList;