import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import { MarketMapPreview } from "@/components/MarketMapPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-3xl px-4 pb-24">
        <div className="space-y-20">
          {/* Market Map Report Preview */}
          <section className="-mt-12">
            <MarketMapPreview />
          </section>

          <section className="space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary">In Development</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Agentic Control Layer Leaderboard
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                We're benchmarking the leading agentic control layers to evaluate their performance across reliability, speed, and documentation quality.
              </p>
            </div>
            
            <SubscribeSection />
          </section>

          <VotingSection />
        </div>
      </main>

      <footer className="border-t border-border bg-muted/30 py-8 mt-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Reliable Agents Leaderboard. Empowering agentic developers worldwide.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Created by</span>
              <a 
                href="https://www.linkedin.com/in/ednevsky/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Alex
              </a>
              <span>and</span>
              <a 
                href="https://www.linkedin.com/in/briansehn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Brian
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
