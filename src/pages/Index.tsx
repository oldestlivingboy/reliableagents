import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import CreatedBy from "@/components/CreatedBy";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-3xl px-4 space-y-16 pb-20">
        <section className="space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-medium text-orange-700 dark:text-orange-400">In Development</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Agentic Control Layer Leaderboard
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We're benchmarking the leading agentic control layers including Browser Use, Stagehand, Skyvern, and LaVague to evaluate their performance across reliability, speed, and documentation quality.
            </p>
          </div>
          
          <SubscribeSection />
        </section>

        <VotingSection />

        <CreatedBy />
      </main>

      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Reliable Agents Leaderboard. Empowering agentic developers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
