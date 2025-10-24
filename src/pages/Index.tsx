import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import { MarketMapPreview } from "@/components/MarketMapPreview";
import ConsultationPopup from "@/components/ConsultationPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ConsultationPopup />
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
          <div className="flex flex-col items-center gap-6">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <p className="text-base font-semibold text-foreground">
                Reliable Agents
              </p>
              <p className="text-xs text-muted-foreground">
                Empowering agentic developers worldwide
              </p>
            </div>
            
            <div className="space-y-3 text-xs max-w-2xl mx-auto">
              <p className="text-muted-foreground text-center leading-relaxed">
                Created by{" "}
                <a 
                  href="https://www.linkedin.com/in/ednevsky/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                >
                  🚀 Alex
                </a>
                , a repeat AI founder with an exit and creator of{" "}
                <a 
                  href="https://nocap.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                >
                  No Cap
                </a>
                , a viral AI investing agent, and{" "}
                <a 
                  href="https://www.linkedin.com/in/briansehn/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                >
                  🌐 Brian
                </a>
                , the first DevRel at Google and founder of multiple browser-related companies.
              </p>
            </div>
            
            <p className="text-[10px] text-muted-foreground/50 max-w-2xl mx-auto">
              © 2025 All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
