import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import CreatedBy from "@/components/CreatedBy";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-3xl px-4 space-y-20 pb-20">
        <section>
          <div className="border border-border rounded-xl p-8 bg-gradient-to-br from-muted/20 to-background">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Agentic Control Layer Leaderboard
            </h2>
            <div className="space-y-2.5">
              <p className="text-base text-muted-foreground leading-relaxed">
                We're benchmarking the leading agentic control layers including Browser Use, Stagehand, Skyvern, and LaVague to evaluate their performance across reliability, speed, and documentation quality.
              </p>
              <p className="text-sm text-muted-foreground/80 italic">
                Currently in development - comprehensive results coming soon.
              </p>
            </div>
          </div>
        </section>

        <VotingSection />
        
        <SubscribeSection />

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
