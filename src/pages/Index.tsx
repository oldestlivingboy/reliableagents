import Hero from "@/components/Hero";
import LeaderboardChart from "@/components/LeaderboardChart";
import LeaderboardTable from "@/components/LeaderboardTable";
import UpcomingLeaderboards from "@/components/UpcomingLeaderboards";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-6xl px-4 space-y-16 pb-20">
        <section className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured: Agentic Control Layer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare leading frameworks that enable agents to decide and execute web actions
            </p>
          </div>
          
          <LeaderboardChart />
          <LeaderboardTable />
        </section>

        <UpcomingLeaderboards />
      </main>

      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto max-w-6xl px-4 text-center text-muted-foreground">
          <p>© 2025 Reliable Agents Leaderboard. Empowering agentic developers worldwide.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
