import { Card } from "@/components/ui/card";
import { Brain, Code, Globe, Monitor, Search, Linkedin, Database, Shield } from "lucide-react";

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
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-foreground">Upcoming Leaderboards</h2>
          <p className="text-base text-muted-foreground">
            More comprehensive benchmarks coming soon
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              General Categories
            </h3>
            <div className="space-y-3">
              {generalLeaderboards.map((item, index) => (
                <Card 
                  key={index} 
                  className="p-5 border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-muted">
                      <item.icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium mb-1 text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Vertical Specializations
            </h3>
            <div className="space-y-3">
              {verticalLeaderboards.map((item, index) => (
                <Card 
                  key={index} 
                  className="p-5 border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-muted">
                      <item.icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium mb-1 text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingLeaderboards;
