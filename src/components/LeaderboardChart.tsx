import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Browser Use", score: 87 },
  { name: "Stagehand", score: 82 },
  { name: "Skyvern", score: 78 },
  { name: "LaVague", score: 75 },
];

const LeaderboardChart = () => {
  return (
    <Card className="p-8 border border-border bg-card">
      <h3 className="text-xl font-semibold mb-8 text-foreground">
        Agentic Control Layer Performance
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--foreground))", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
              color: "hsl(var(--foreground))",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
            cursor={{ fill: "hsl(var(--muted))" }}
          />
          <Bar 
            dataKey="score" 
            fill="hsl(var(--foreground))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LeaderboardChart;
