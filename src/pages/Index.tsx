import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import { MarketMapPreview } from "@/components/MarketMapPreview";
import { Linkedin } from "lucide-react";
import CalEmbed from "@/components/CalEmbed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CalEmbed />
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

      <footer className="border-t border-border bg-muted/30 py-10 mt-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Made by</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                <div className="flex flex-col items-center gap-2">
                  <a 
                    href="https://www.linkedin.com/in/ednevsky/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Alex</span>
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-muted-foreground max-w-xs text-center">
                    3x founder, AI exit (WANNA → Farfetch). Created No Cap AI agent.
                  </p>
                </div>
                <span className="hidden md:block text-border">•</span>
                <div className="flex flex-col items-center gap-2">
                  <a 
                    href="https://www.linkedin.com/in/oldestlivingboy/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Brian</span>
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-muted-foreground max-w-xs text-center">
                    Ex-Googler. Co-founded Disconnect (750M+ users) and Massive.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50">
              © 2025 Reliable Agents Leaderboard. Empowering agentic developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
