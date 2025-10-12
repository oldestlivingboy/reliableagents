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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const voteCount = votes[category.id] || 0;
          const hasVoted = votedCategories.has(category.id);
          const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

          return (
            <div
              key={category.id}
              className="group relative border border-border rounded-xl p-5 hover:border-foreground/20 transition-all duration-200 bg-card"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground/70" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base text-foreground mb-3 leading-snug">
                    {category.title}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="text-2xl font-semibold text-foreground tabular-nums">
                          {voteCount}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {voteCount === 1 ? 'vote' : 'votes'}
                        </span>
                      </div>
                      
                      <div className="relative w-full h-1 bg-muted/50 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-foreground/80 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleVote(category.id, category.title)}
                      disabled={hasVoted}
                      className={`
                        flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center
                        transition-all duration-200 
                        ${hasVoted 
                          ? 'bg-foreground text-background cursor-default' 
                          : 'bg-muted/50 hover:bg-foreground hover:text-background active:scale-95 cursor-pointer'
                        }
                      `}
                      aria-label={hasVoted ? 'Voted' : 'Vote'}
                    >
                      <ArrowUp 
                        className={`w-5 h-5 transition-transform duration-200 ${
                          hasVoted ? '' : 'group-hover:translate-y-[-2px]'
                        }`}
                        strokeWidth={2.5}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VotingSection;
