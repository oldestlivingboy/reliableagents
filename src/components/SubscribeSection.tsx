import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
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
          description: "You'll receive fresh hot takes about agentic automation in your inbox",
        });
        setEmail("");
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
    <section>
      <div className="border border-primary/20 rounded-xl p-5 bg-gradient-to-br from-primary/[0.03] to-primary/[0.08]">
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              Get Future Updates
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
  );
};

export default SubscribeSection;
