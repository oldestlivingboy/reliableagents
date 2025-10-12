import Hero from "@/components/Hero";
import LeaderboardChart from "@/components/LeaderboardChart";
import LeaderboardTable from "@/components/LeaderboardTable";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import CreatedBy from "@/components/CreatedBy";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-4xl px-4 space-y-6 md:space-y-12 pb-8 md:pb-24">
        <section className="space-y-3 md:space-y-6">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Leaderboard in the making
            </h2>
          </div>
          
          <LeaderboardChart />
          <LeaderboardTable />
        </section>

        <VotingSection />
        
        <SubscribeSection />

        <CreatedBy />
      </main>

      <footer className="border-t border-border py-4 md:py-12 mt-8 md:mt-24">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © 2025 Reliable Agents Leaderboard. Empowering agentic developers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
