import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Reliable Agents Leaderboard
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              The definitive source for benchmarking and knowledge about agentic automation, 
              web browsing agents, and computer use tools.
            </p>
          </div>

          <Link to="/2025" className="block group">
            <div className="border-2 border-border rounded-2xl hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
              <div className="p-8 md:p-10 flex items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-orange-600 transition-colors">
                    The Current State of Agentic Web/Browser Automation - Q1 2025
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground">
                    A comprehensive market map for agentic developers
                  </p>
                </div>
                <ExternalLink className="w-6 h-6 flex-shrink-0 text-muted-foreground group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
