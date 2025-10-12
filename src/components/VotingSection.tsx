import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowUp,
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
    <section className="space-y-6 md:space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
          Vote for the category/niche to benchmark/analyze next
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Help us prioritize which leaderboard to create next. {totalVotes > 0 && `${totalVotes} votes so far.`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const voteCount = votes[category.id] || 0;
          const hasVoted = votedCategories.has(category.id);

          return (
            <div
              key={category.id}
              className="group flex items-center gap-4 border border-border rounded-lg p-4 hover:border-foreground/20 transition-all bg-card"
            >
              <button
                onClick={() => handleVote(category.id, category.title)}
                disabled={hasVoted}
                className={`
                  flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md
                  transition-all duration-150 flex-shrink-0
                  ${hasVoted 
                    ? 'bg-foreground text-background' 
                    : 'border border-border hover:border-foreground/40 hover:bg-muted/50 active:scale-95'
                  }
                `}
                aria-label={hasVoted ? 'Voted' : 'Vote'}
              >
                <ArrowUp 
                  className="w-4 h-4"
                  strokeWidth={2.5}
                />
                <span className="text-xs font-semibold tabular-nums">
                  {voteCount}
                </span>
              </button>

              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-md bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-foreground/60" />
                </div>
                
                <h3 className="font-medium text-sm md:text-base text-foreground leading-snug">
                  {category.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VotingSection;
