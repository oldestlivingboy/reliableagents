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
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";

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

  const getScoreBadge = (score: number) => {
    if (score >= 85) return <Badge className="bg-primary">Outstanding</Badge>;
    if (score >= 80) return <Badge className="bg-accent text-accent-foreground">Excellent</Badge>;
    if (score >= 75) return <Badge variant="secondary">Good</Badge>;
    return <Badge variant="outline">Fair</Badge>;
  };

  return (
    <Card className="p-6 border-border bg-card/50 backdrop-blur">
      <h3 className="text-2xl font-bold mb-6 text-foreground">
        Detailed Rankings - Agentic Control Layer
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort("rank")}
              >
                <div className="flex items-center gap-2">
                  Rank <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">
                  Tool <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort("score")}
              >
                <div className="flex items-center gap-2">
                  Score <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Reliability</TableHead>
              <TableHead>Speed</TableHead>
              <TableHead>Documentation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((tool) => (
              <TableRow key={tool.name} className="border-border hover:bg-muted/50">
                <TableCell className="font-medium">#{tool.rank}</TableCell>
                <TableCell className="font-semibold text-foreground">{tool.name}</TableCell>
                <TableCell className="font-bold text-primary">{tool.score}</TableCell>
                <TableCell>{getScoreBadge(tool.score)}</TableCell>
                <TableCell>{tool.reliability}</TableCell>
                <TableCell>{tool.speed}</TableCell>
                <TableCell>{tool.documentation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default LeaderboardTable;
