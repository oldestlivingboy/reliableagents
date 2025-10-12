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

  const sortedCategories = [...categories].sort((a, b) => {
    const votesA = votes[a.id] || 0;
    const votesB = votes[b.id] || 0;
    return votesB - votesA;
  });

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Vote for the category/niche to benchmark/analyze next
        </h2>
        <p className="text-base text-muted-foreground">
          Help us prioritize which leaderboard to create next. {totalVotes > 0 && (
            <span className="font-medium text-foreground">{totalVotes} votes cast</span>
          )}
        </p>
      </div>

      <div className="space-y-3">
        {sortedCategories.map((category, index) => {
          const Icon = category.icon;
          const voteCount = votes[category.id] || 0;
          const hasVoted = votedCategories.has(category.id);

          return (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300"
            >
              {/* Upvote Button */}
              <button
                onClick={() => handleVote(category.id, category.title)}
                disabled={hasVoted}
                className={`
                  relative flex flex-col items-center justify-center gap-0.5 w-14 h-14 rounded-lg
                  transition-all duration-300 flex-shrink-0 font-semibold
                  ${hasVoted 
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 scale-105' 
                    : 'border-2 border-border bg-background hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:scale-105 active:scale-95'
                  }
                `}
                aria-label={hasVoted ? 'Voted' : 'Vote'}
              >
                <ArrowUp 
                  className={`w-5 h-5 ${hasVoted ? '' : 'text-muted-foreground group-hover:text-orange-600'}`}
                  strokeWidth={2.5}
                />
                <span className={`text-sm tabular-nums ${hasVoted ? '' : 'text-foreground'}`}>
                  {voteCount}
                </span>
              </button>

              {/* Content */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Icon with gradient background */}
                <div className={`
                  w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0
                  ${index % 4 === 0 ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/20' : ''}
                  ${index % 4 === 1 ? 'bg-gradient-to-br from-purple-500/10 to-purple-600/20' : ''}
                  ${index % 4 === 2 ? 'bg-gradient-to-br from-green-500/10 to-green-600/20' : ''}
                  ${index % 4 === 3 ? 'bg-gradient-to-br from-pink-500/10 to-pink-600/20' : ''}
                `}>
                  <Icon className={`
                    w-5 h-5
                    ${index % 4 === 0 ? 'text-blue-600 dark:text-blue-400' : ''}
                    ${index % 4 === 1 ? 'text-purple-600 dark:text-purple-400' : ''}
                    ${index % 4 === 2 ? 'text-green-600 dark:text-green-400' : ''}
                    ${index % 4 === 3 ? 'text-pink-600 dark:text-pink-400' : ''}
                  `} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-foreground leading-tight group-hover:text-orange-600 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Rank Badge */}
                {index < 3 && voteCount > 0 && (
                  <div className={`
                    px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-950' : ''}
                    ${index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' : ''}
                    ${index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-orange-950' : ''}
                  `}>
                    #{index + 1}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VotingSection;
