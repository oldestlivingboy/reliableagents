import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Github } from "lucide-react";
import { z } from "zod";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailSchema = z.string().email().max(255);
    const validation = emailSchema.safeParse(email);
    
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
      // Call secure edge function with rate limiting
      const { data, error } = await supabase.functions.invoke('subscribe', {
        body: { 
          email: validation.data, 
          subscription_type: "general_updates" 
        }
      });

      if (error) throw error;

      if (data.error) {
        if (data.error === 'ALREADY_SUBSCRIBED') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to updates",
          });
        } else if (data.error === 'RATE_LIMIT_EXCEEDED') {
          toast({
            title: "Too many attempts",
            description: "Please try again later",
            variant: "destructive",
          });
        } else {
          throw new Error(data.message);
        }
      } else {
        toast({
          title: "Subscribed!",
          description: "You'll receive fresh hot takes about agentic automation in your inbox",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
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
    <div className="space-y-4">
      <section>
        <div className="border border-primary/20 rounded-xl p-5 bg-gradient-to-br from-primary/[0.03] to-primary/[0.08]">
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">
                👻 Get Future Updates
              </h3>
              <p className="text-sm text-muted-foreground">
                New benchmarking updates/reports delivered to your inbox whenever they come out
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-9 text-sm bg-background"
                required
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                size="sm"
                className="whitespace-nowrap"
              >
                {isLoading ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <a 
        href="https://github.com/ednevsky/reliableagents"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-200 group"
      >
        <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/10 transition-colors">
          <Github className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            Contribute on GitHub
          </h3>
          <p className="text-xs text-muted-foreground">
            This project is open source. Star the repo, report issues, or submit improvements
          </p>
        </div>
      </a>
    </div>
  );
};

export default SubscribeSection;
