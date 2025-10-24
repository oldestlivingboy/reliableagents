import { Button } from "@/components/ui/button";
import shieldLogo from "@/assets/shield-logo.png";

const Hero = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto max-w-4xl relative">
        <div className="space-y-8 text-center">
          <div className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Live benchmarks & analysis
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src={shieldLogo} 
              alt="Reliable Agents Shield" 
              className="w-20 h-20 md:w-28 md:h-28 animate-fade-in"
            />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] animate-fade-in">
              Reliable Agents
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The definitive guide to understanding and benchmarking agentic automation, web browsing, and computer use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
