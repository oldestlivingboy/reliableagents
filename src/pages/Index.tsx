import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import { MarketMapPreview } from "@/components/MarketMapPreview";
import { CalEmbed } from "@/components/CalEmbed";

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

      <footer className="border-t border-border mt-32 bg-secondary/30">
        <div className="container mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand Section */}
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground">
                Reliable Agents
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
                The definitive platform for benchmarking and understanding agentic automation technologies.
              </p>
            </div>

            {/* Mission Section */}
            <div className="space-y-4 text-center">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Mission
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering developers worldwide with transparent, reliable benchmarks for the future of autonomous agents.
              </p>
            </div>

            {/* Creators Section */}
            <div className="space-y-4 text-center md:text-right">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Created By
              </h4>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://www.linkedin.com/in/ednevsky/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center justify-center md:justify-end gap-2 group"
                >
                  <span className="font-medium">Alex Ednevsky</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/briansehn/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center justify-center md:justify-end gap-2 group"
                >
                  <span className="font-medium">Brian Sehn</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/70">
              © 2025 Reliable Agents. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Built with precision for the agentic future
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
