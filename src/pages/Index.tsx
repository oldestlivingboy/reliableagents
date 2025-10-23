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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-medium text-amber-600 dark:text-amber-500">In Development</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Reliable Agents Leaderboard
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

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center space-y-1">
              <p className="text-base font-semibold text-foreground">
                Reliable Agents
              </p>
              <p className="text-xs text-muted-foreground">
                Empowering agentic developers worldwide
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Created by</span>
              <a 
                href="https://www.linkedin.com/in/ednevsky/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Alex
              </a>
              <span>and</span>
              <a 
                href="https://www.linkedin.com/in/briansehn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Brian
              </a>
            </div>
            <p className="text-[10px] text-muted-foreground/50">
              © 2025 All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
