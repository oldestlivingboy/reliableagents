import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import CreatedBy from "@/components/CreatedBy";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-4xl px-4 space-y-6 md:space-y-12 pb-8 md:pb-24">
        <section className="space-y-3 md:space-y-6">
          <div className="border border-border rounded-lg p-6 md:p-8 bg-muted/20">
            <h2 className="text-lg md:text-xl font-medium text-foreground mb-3">
              Agentic Control Layer Leaderboard
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                We're benchmarking the leading agentic control layers including Browser Use, Stagehand, Skyvern, and LaVague to evaluate their performance across reliability, speed, and documentation quality.
              </p>
              <p className="text-xs md:text-sm text-muted-foreground italic">
                Currently in development - comprehensive results coming soon.
              </p>
            </div>
          </div>
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
