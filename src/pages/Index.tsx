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

          {/* Reliable Agents Leaderboard Block */}
          <section className="space-y-8">
            <div className="space-y-3">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ 
                  backgroundColor: 'hsl(var(--status-warning) / 0.1)',
                  borderColor: 'hsl(var(--status-warning) / 0.2)'
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'hsl(var(--status-warning))' }} />
                <span className="text-xs font-medium" style={{ color: 'hsl(var(--status-warning))' }}>In Development</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Reliable Agents Leaderboard
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                We're benchmarking the leading agentic control layers to evaluate their performance across <strong className="text-foreground font-semibold">reliability</strong>, speed, and documentation quality.
              </p>
            </div>
            
            <SubscribeSection />
            
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />
            
            <VotingSection />
          </section>
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
                Made by{" "}
                <a 
                  href="https://www.linkedin.com/in/ednevsky/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                >
                  🚀 Alex
                </a>
                , repeat founder with an AI exit and creator of{" "}
                <a 
                  href="https://nocap.so" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                >
                  No Cap
                </a>
                , viral AI investing agent, and{" "}
                <a 
                  href="https://oldestlivingboy.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                >
                  🌐 Brian
                </a>
                ,{" "}
                <br className="hidden sm:inline" />
                first devrel engineer at Google and founder of two profitable browser and networking companies.
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
