import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import { MarketMapPreview } from "@/components/MarketMapPreview";
import { Linkedin } from "lucide-react";

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

      <footer className="border-t border-border bg-muted/30 py-12 mt-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Alex</h3>
                <a 
                  href="https://www.linkedin.com/in/ednevsky/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Alex's LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A 3x founder with an AI exit (WANNA virtual try-on tech later sold to Farfetch). 
                Created No Cap, the world's first AI agent that invested in a company. 
                Runs nc/acc - an accelerator for solopreneurs.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Brian</h3>
                <a 
                  href="https://www.linkedin.com/in/oldestlivingboy/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Brian's LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ex-Googler who worked on the company's first mobile ad server. 
                Co-founded Disconnect (privacy software protecting 750M+ users) 
                and Massive - named Proxyway's 2025 "Newcomer of the Year".
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center pt-6 border-t border-border/50">
            © 2025 Reliable Agents Leaderboard. Empowering agentic developers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
