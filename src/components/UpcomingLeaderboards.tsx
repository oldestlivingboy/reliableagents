import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-foreground">Upcoming Leaderboards</h2>
          <p className="text-xl text-muted-foreground">
            More comprehensive benchmarks coming soon
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-foreground">General Categories</h3>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {generalLeaderboards.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 border-border bg-card/50 backdrop-blur hover:bg-card/70 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-foreground">Vertical Specializations</h3>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {verticalLeaderboards.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 border-border bg-card/50 backdrop-blur hover:bg-card/70 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingLeaderboards;
