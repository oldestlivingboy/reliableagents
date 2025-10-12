import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="space-y-16">
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Reliable Agents Leaderboard
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              The definitive source for benchmarking and knowledge about agentic automation, 
              web browsing agents, and computer use tools.
            </p>
          </div>

          <Link to="/2025" className="block group max-w-2xl">
            <div className="border-2 border-border rounded-xl hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
              <div className="p-6 md:p-8 flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-semibold text-foreground leading-snug group-hover:text-orange-600 transition-colors">
                    The Current State of Agentic Web/Browser Automation - Q1 2025
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    A comprehensive market map for agentic developers
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
