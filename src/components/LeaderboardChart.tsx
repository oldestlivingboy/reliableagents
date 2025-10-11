import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Browser Use", score: 87, color: "hsl(var(--chart-1))" },
  { name: "Stagehand", score: 82, color: "hsl(var(--chart-2))" },
  { name: "Skyvern", score: 78, color: "hsl(var(--chart-3))" },
  { name: "LaVague", score: 75, color: "hsl(var(--chart-4))" },
];

const LeaderboardChart = () => {
  return (
    <Card className="p-6 border-border bg-card/50 backdrop-blur">
      <h3 className="text-2xl font-bold mb-6 text-foreground">
        Agentic Control Layer Performance
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
              color: "hsl(var(--foreground))"
            }}
          />
          <Bar 
            dataKey="score" 
            fill="hsl(var(--primary))"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LeaderboardChart;
