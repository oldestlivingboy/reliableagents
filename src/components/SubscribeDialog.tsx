import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface SubscribeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptionType: string;
  title: string;
}

const SubscribeDialog = ({ open, onOpenChange, subscriptionType, title }: SubscribeDialogProps) => {
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
          subscription_type: subscriptionType 
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
          description: "You'll receive updates when this leaderboard launches",
        });
        setEmail("");
        onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to {title}</DialogTitle>
          <DialogDescription>
            Get notified when this leaderboard launches
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeDialog;
