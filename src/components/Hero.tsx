import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
              Reliable Agents Leaderboard
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              The definitive source for benchmarking and knowledge about agentic automation, 
              web browsing agents, and computer use tools.
            </p>
          </div>

          <div>
            <Button 
              variant="outline"
              className="gap-2 h-11"
              asChild
            >
              <a 
                href="#report" 
                className="inline-flex items-center"
              >
                <span>The Current State of Agentic Web/Browser Automation - Q1 2025</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
