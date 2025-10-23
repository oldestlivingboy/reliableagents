import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Brain, Code, Globe, Monitor, Search, Linkedin, Database, Shield, Bell } from "lucide-react";
import SubscribeDialog from "./SubscribeDialog";
import { z } from "zod";

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
  const [generalEmail, setGeneralEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribeClick = (type: string, title: string) => {
    setSelectedLeaderboard({ type, title });
    setDialogOpen(true);
  };

  const handleGeneralSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailSchema = z.string().email().max(255);
    const validation = emailSchema.safeParse(generalEmail);
    
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: validation.data, subscription_type: "general_updates" });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to updates",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Subscribed!",
          description: "You'll receive updates about all new leaderboards",
        });
        setGeneralEmail("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-8 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-6 md:space-y-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Upcoming Leaderboards</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              New benchmarking updates/reports delivered to your inbox whenever they come out
            </p>
          </div>
          
          <Card className="p-5 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 md:min-w-[360px] shadow-lg">
            <form onSubmit={handleGeneralSubscribe} className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">Get All Updates</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={generalEmail}
                  onChange={(e) => setGeneralEmail(e.target.value)}
                  className="flex-1 h-10 text-sm bg-background border-border/50 focus:border-primary transition-colors"
                  required
                />
                <Button type="submit" size="default" disabled={isLoading} className="whitespace-nowrap px-6">
                  {isLoading ? "..." : "Subscribe"}
                </Button>
              </div>
            </form>
          </Card>
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
                  className="p-4 border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-muted flex-shrink-0">
                      <item.icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="flex-shrink-0 text-xs h-8 px-3"
                      onClick={() => handleSubscribeClick(`general_${index}`, item.title)}
                    >
                      <Bell className="w-3 h-3 mr-1.5" />
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
                  className="p-4 border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-muted flex-shrink-0">
                      <item.icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="flex-shrink-0 text-xs h-8 px-3"
                      onClick={() => handleSubscribeClick(`vertical_${index}`, item.title)}
                    >
                      <Bell className="w-3 h-3 mr-1.5" />
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
