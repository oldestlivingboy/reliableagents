import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-6 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-4 md:space-y-12">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
              Reliable Agents Leaderboard
            </h1>
            
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              The definitive source for benchmarking and knowledge about agentic automation, 
              web browsing agents, and computer use tools.
            </p>
          </div>

          <Link to="/2025" className="block">
            <div className="border border-border rounded-lg hover:shadow-lg transition-all hover:border-primary/50">
              <div className="w-full justify-between p-3 md:p-6 flex items-center gap-3">
                <div className="space-y-0.5 md:space-y-1 flex-1">
                  <h2 className="text-sm md:text-xl font-semibold text-foreground leading-tight">
                    The Current State of Agentic Web/Browser Automation - Q1 2025
                  </h2>
                  <p className="text-xs md:text-sm text-muted-foreground leading-snug">
                    A comprehensive market map for agentic developers
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-muted-foreground" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
