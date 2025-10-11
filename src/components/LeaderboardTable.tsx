import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tool {
  rank: number;
  name: string;
  score: number;
  reliability: string;
  speed: string;
  documentation: string;
}

const initialData: Tool[] = [
  { rank: 1, name: "Browser Use", score: 87, reliability: "Excellent", speed: "Fast", documentation: "Comprehensive" },
  { rank: 2, name: "Stagehand", score: 82, reliability: "Very Good", speed: "Fast", documentation: "Good" },
  { rank: 3, name: "Skyvern", score: 78, reliability: "Good", speed: "Medium", documentation: "Good" },
  { rank: 4, name: "LaVague", score: 75, reliability: "Good", speed: "Medium", documentation: "Moderate" },
];

const LeaderboardTable = () => {
  const [data, setData] = useState(initialData);
  const [sortField, setSortField] = useState<keyof Tool>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Tool) => {
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...data].sort((a, b) => {
      if (a[field] < b[field]) return newDirection === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newDirection === "asc" ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  return (
    <Card className="p-8 border border-border bg-card">
      <h3 className="text-xl font-semibold mb-6 text-foreground">
        Detailed Rankings
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="h-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs font-medium -ml-2"
                  onClick={() => handleSort("rank")}
                >
                  Rank
                  <ArrowUpDown className="ml-2 w-3 h-3" />
                </Button>
              </TableHead>
              <TableHead className="h-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs font-medium -ml-2"
                  onClick={() => handleSort("name")}
                >
                  Tool
                  <ArrowUpDown className="ml-2 w-3 h-3" />
                </Button>
              </TableHead>
              <TableHead className="h-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs font-medium -ml-2"
                  onClick={() => handleSort("score")}
                >
                  Score
                  <ArrowUpDown className="ml-2 w-3 h-3" />
                </Button>
              </TableHead>
              <TableHead className="h-10 text-xs font-medium">Reliability</TableHead>
              <TableHead className="h-10 text-xs font-medium">Speed</TableHead>
              <TableHead className="h-10 text-xs font-medium">Documentation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((tool) => (
              <TableRow key={tool.name} className="border-border hover:bg-muted/50">
                <TableCell className="text-sm text-muted-foreground">#{tool.rank}</TableCell>
                <TableCell className="font-medium text-sm">{tool.name}</TableCell>
                <TableCell className="font-semibold text-sm">{tool.score}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{tool.reliability}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{tool.speed}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{tool.documentation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default LeaderboardTable;
