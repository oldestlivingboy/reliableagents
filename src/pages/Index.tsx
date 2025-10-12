import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import CreatedBy from "@/components/CreatedBy";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-5xl px-4 space-y-20 pb-24">
        <section className="space-y-6">
          <div className="border-2 border-border rounded-2xl p-10 bg-gradient-to-br from-muted/30 to-muted/10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Agentic Control Layer Leaderboard
            </h2>
            <div className="space-y-3">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                We're benchmarking the leading agentic control layers including Browser Use, Stagehand, Skyvern, and LaVague to evaluate their performance across reliability, speed, and documentation quality.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Currently in development - comprehensive results coming soon.
              </p>
            </div>
          </div>
        </section>

        <VotingSection />
        
        <SubscribeSection />

        <CreatedBy />
      </main>

      <footer className="border-t border-border py-12 mt-24">
        <div className="container mx-auto max-w-5xl px-4">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Reliable Agents Leaderboard. Empowering agentic developers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
