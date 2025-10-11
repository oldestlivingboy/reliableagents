import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

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

          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-border rounded-lg">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost"
                className="w-full justify-between p-3 md:p-6 h-auto text-left hover:bg-accent/50"
              >
                <div className="space-y-0.5 md:space-y-1 flex-1 pr-2">
                  <h2 className="text-sm md:text-xl font-semibold text-foreground leading-tight">
                    The Current State of Agentic Web/Browser Automation - Q1 2025
                  </h2>
                  <p className="text-xs md:text-sm text-muted-foreground leading-snug">
                    A comprehensive report for the hundreds of thousands of agentic developers
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="px-3 md:px-6 pb-3 md:pb-6">
              <div className="pt-3 md:pt-4 border-t border-border space-y-3 md:space-y-6 text-xs md:text-sm text-foreground/90 leading-relaxed">
                <p>
                  The landscape of agentic web automation has evolved dramatically. This report synthesizes the 
                  current state-of-the-art stack for enabling agents to interact with the web like humans do.
                </p>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-base text-foreground">Key Findings</h3>
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                    <li>Agentic control layers have matured significantly with frameworks like Browser Use, Stagehand, and Skyvern leading adoption</li>
                    <li>Computer use capabilities are expanding beyond traditional browser automation</li>
                    <li>Integration patterns between agent brains and control layers are becoming standardized</li>
                    <li>Vertical-specific solutions are emerging for complex platforms like LinkedIn and Crunchbase</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-base text-foreground">The Stack</h3>
                  <p className="text-muted-foreground">
                    Modern agentic systems typically combine three layers: a foundational model (the "brain"), 
                    a control layer for decision-making and action execution, and low-level automation frameworks 
                    for reliable browser interaction. Our benchmarks focus on measuring each layer independently.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-base text-foreground">Methodology</h3>
                  <p className="text-muted-foreground">
                    Each framework is evaluated across multiple dimensions: reliability, speed, cost-efficiency, 
                    and ease of integration. Our tests simulate real-world scenarios including navigation, 
                    form filling, data extraction, and multi-step workflows.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};

export default Hero;
