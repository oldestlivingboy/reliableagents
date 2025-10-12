import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowUpCircle, 
  BarChart3, 
  Building2, 
  Code2, 
  Globe, 
  LineChart, 
  Briefcase, 
  Rocket 
} from "lucide-react";

const categories = [
  { id: "general_0", title: "General Consumer Agentic Browsing", icon: Globe },
  { id: "general_1", title: "AI Browsers with Automations", icon: Code2 },
  { id: "general_2", title: "Enterprise Agentic Automations", icon: Building2 },
  { id: "general_3", title: "General Go-to Frameworks", icon: Rocket },
  { id: "vertical_0", title: "Browser-as-a-Service Infrastructure", icon: BarChart3 },
  { id: "vertical_1", title: "Computer Use Foundation Models", icon: LineChart },
  { id: "vertical_2", title: "Crawlers/Scrapers/APIs", icon: Code2 },
  { id: "vertical_3", title: "Supporting Infrastructure", icon: Briefcase },
];

const VotingSection = () => {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [votedCategories, setVotedCategories] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    fetchVotes();
    subscribeToVotes();
    
    const voted = localStorage.getItem("votedCategories");
    if (voted) {
      setVotedCategories(new Set(JSON.parse(voted)));
    }
  }, []);

  const fetchVotes = async () => {
    const { data, error } = await supabase
      .from("votes")
      .select("category_id, vote_count");

    if (!error && data) {
      const votesMap: Record<string, number> = {};
      data.forEach((vote) => {
        votesMap[vote.category_id] = vote.vote_count;
      });
      setVotes(votesMap);
    }
  };

  const subscribeToVotes = () => {
    const channel = supabase
      .channel("votes-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
        },
        () => {
          fetchVotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleVote = async (categoryId: string, categoryTitle: string) => {
    if (votedCategories.has(categoryId)) {
      toast({
        title: "Already voted",
        description: "You've already voted for this category",
      });
      return;
    }

    const currentVotes = votes[categoryId] || 0;
    
    const { error } = await supabase
      .from("votes")
      .upsert(
        { 
          category_id: categoryId, 
          category_title: categoryTitle,
          vote_count: currentVotes + 1 
        },
        { onConflict: "category_id" }
      );

    if (error) {
      toast({
        title: "Vote failed",
        description: "Unable to register your vote. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const newVoted = new Set(votedCategories).add(categoryId);
    setVotedCategories(newVoted);
    localStorage.setItem("votedCategories", JSON.stringify([...newVoted]));

    toast({
      title: "Vote recorded!",
      description: "Thank you for helping shape our next benchmark",
    });
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  return (
    <section className="space-y-3 md:space-y-6">
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
          Vote for the category/niche to benchmark/analyze next
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Help us prioritize which leaderboard to create next. {totalVotes > 0 && `${totalVotes} votes so far.`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const voteCount = votes[category.id] || 0;
          const hasVoted = votedCategories.has(category.id);
          const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

          return (
            <Card 
              key={category.id} 
              className="p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm md:text-base text-foreground mb-2">
                    {category.title}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                      <span>{voteCount} votes</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => handleVote(category.id, category.title)}
                    disabled={hasVoted}
                    variant={hasVoted ? "outline" : "default"}
                    size="sm"
                    className="mt-3 w-full"
                  >
                    {hasVoted ? (
                      "Voted"
                    ) : (
                      <>
                        <ArrowUpCircle className="w-4 h-4 mr-2" />
                        Vote
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default VotingSection;
