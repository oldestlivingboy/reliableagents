import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Code, Globe, Monitor, Search, Linkedin, Database, Shield } from "lucide-react";
import SubscribeDialog from "./SubscribeDialog";

const generalLeaderboards = [
  { icon: Brain, title: "Agent Brain Foundational Models", description: "Core AI models powering agent decision-making" },
  { icon: Code, title: "Low Level Browser Control Frameworks", description: "Direct browser automation libraries and tools" },
  { icon: Globe, title: "Browsers as a Service", description: "Cloud-based browser infrastructure providers" },
  { icon: Monitor, title: "Desktop Computer Use", description: "Full desktop environment control and automation" },
];

const verticalLeaderboards = [
  { icon: Search, title: "Google Search", description: "Specialized tools for search automation" },
  { icon: Linkedin, title: "LinkedIn", description: "LinkedIn-specific automation capabilities" },
  { icon: Database, title: "Crunchbase", description: "Business intelligence data extraction" },
  { icon: Shield, title: "Cloudflare Protected Sites", description: "Tools handling anti-bot protection" },
];

const UpcomingLeaderboards = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<{ type: string; title: string } | null>(null);

  const handleSubscribeClick = (type: string, title: string) => {
    setSelectedLeaderboard({ type, title });
    setDialogOpen(true);
  };

  return (
    <section className="py-8 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-6 md:space-y-12">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Upcoming Leaderboards</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            More comprehensive benchmarks coming soon
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 md:mb-4">
              General Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {generalLeaderboards.map((item, index) => (
                <Card 
                  key={index} 
                  className="p-4 md:p-5 border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 md:p-2 rounded-md bg-muted flex-shrink-0">
                        <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs md:text-sm font-medium mb-0.5 md:mb-1 text-foreground">{item.title}</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSubscribeClick(`general_${index}`, item.title)}
                    >
                      Subscribe
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 md:mb-4">
              Vertical Specializations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {verticalLeaderboards.map((item, index) => (
                <Card 
                  key={index} 
                  className="p-4 md:p-5 border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 md:p-2 rounded-md bg-muted flex-shrink-0">
                        <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs md:text-sm font-medium mb-0.5 md:mb-1 text-foreground">{item.title}</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSubscribeClick(`vertical_${index}`, item.title)}
                    >
                      Subscribe
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedLeaderboard && (
        <SubscribeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          subscriptionType={selectedLeaderboard.type}
          title={selectedLeaderboard.title}
        />
      )}
    </section>
  );
};

export default UpcomingLeaderboards;
