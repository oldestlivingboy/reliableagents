import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Reliable Agents
            </span>
            <br />
            <span className="text-foreground">Leaderboard</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The definitive source for benchmarking and knowledge about agentic automation, 
            web browsing agents, and computer use tools
          </p>

          <div className="pt-6">
            <Button 
              size="lg" 
              className="gap-2 bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-xl"
              asChild
            >
              <a 
                href="#report" 
                className="inline-flex items-center"
              >
                The Current State of Agentic Web/Browser Automation - Q1 2025
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
