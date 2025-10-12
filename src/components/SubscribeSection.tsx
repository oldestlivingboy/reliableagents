import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
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
        .insert({ email, subscription_type: "general_updates" });

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
      <div className="border border-orange-500/30 rounded-xl p-8 bg-gradient-to-br from-orange-500/[0.03] to-orange-600/[0.08]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Mail className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Get future updates
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                We're testing every new big agentic automation update so that you get fresh hot takes in your inbox
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11 text-base bg-background border focus:border-orange-500 focus:ring-orange-500/20"
                required
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="h-11 px-6 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
