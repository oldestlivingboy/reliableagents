import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast as sonnerToast } from "sonner";
import { 
  ArrowUp,
  BarChart3, 
  Building2, 
  Code2, 
  Globe, 
  LineChart, 
  Briefcase, 
  Rocket,
  Plus,
  Lightbulb
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "cat_1", title: "Browser use frameworks", icon: Rocket },
  { id: "cat_2", title: "Browser use libraries/protocols", icon: Code2 },
  { id: "cat_4", title: "Browsers as a service", icon: BarChart3 },
  { id: "cat_6", title: "Scraping & crawling APIs", icon: Globe },
  { id: "cat_7", title: "Computer use models", icon: Building2 },
  { id: "cat_10", title: "Consumer browsers", icon: Code2 },
];

const VotingSection = () => {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [votedCategories, setVotedCategories] = useState<Set<string>>(new Set());
  const [customCategory, setCustomCategory] = useState("");

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
      .select("category_id, category_title, vote_count");

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
      sonnerToast.info("Already voted for this category");
      return;
    }

    // Use secure RPC function for atomic vote increment
    const { data, error } = await supabase.rpc('increment_vote', {
      p_category_id: categoryId,
      p_category_title: categoryTitle,
    });

    if (error) {
      console.error("Error voting:", error);
      sonnerToast.error("Unable to register your vote");
      return;
    }

    const newVoted = new Set(votedCategories).add(categoryId);
    setVotedCategories(newVoted);
    localStorage.setItem("votedCategories", JSON.stringify([...newVoted]));

    // Update local state with new count from server
    setVotes(prev => ({ ...prev, [categoryId]: data }));

    sonnerToast.success("Vote recorded!");
  };

  const handleCustomCategorySubmit = async () => {
    const trimmed = customCategory.trim();
    
    if (!trimmed) {
      sonnerToast.error("Please enter a category name");
      return;
    }
    
    if (trimmed.length > 100) {
      sonnerToast.error("Please keep it under 100 characters");
      return;
    }
    
    // Create a unique ID for the custom category
    const categoryId = `custom_${Date.now()}`;
    
    // Use secure RPC function for atomic vote increment
    const { data, error } = await supabase.rpc('increment_vote', {
      p_category_id: categoryId,
      p_category_title: trimmed,
    });

    if (error) {
      console.error("Error submitting category:", error);
      sonnerToast.error("Unable to submit your category");
      return;
    }

    const newVoted = new Set(votedCategories).add(categoryId);
    setVotedCategories(newVoted);
    localStorage.setItem("votedCategories", JSON.stringify([...newVoted]));
    setCustomCategory("");

    // Update local state with new count from server
    setVotes(prev => ({ ...prev, [categoryId]: data }));

    sonnerToast.success("Category submitted!");
    
    fetchVotes(); // Refresh to show new custom category
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  const sortedCategories = [...categories].sort((a, b) => {
    const votesA = votes[a.id] || 0;
    const votesB = votes[b.id] || 0;
    return votesB - votesA;
  });

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          Vote for which category to benchmark next
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Help us prioritize which part of the stack to test next. {totalVotes > 0 && (
            <span className="font-medium text-foreground">{totalVotes} votes</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {sortedCategories.map((category, index) => {
          const Icon = category.icon;
          const voteCount = votes[category.id] || 0;
          const hasVoted = votedCategories.has(category.id);

          return (
            <div
              key={category.id}
              className="group relative flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-200"
            >
              {/* Upvote Button */}
              <button
                onClick={() => handleVote(category.id, category.title)}
                disabled={hasVoted}
                className={`
                  flex flex-col items-center justify-center gap-0.5 w-11 h-11 rounded-lg flex-shrink-0 font-semibold transition-all duration-200
                  ${hasVoted 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'border border-border hover:border-primary hover:bg-primary/5 active:scale-95'
                  }
                `}
                aria-label={hasVoted ? 'Voted' : 'Vote'}
              >
                <ArrowUp 
                  className="w-4 h-4"
                  strokeWidth={2.5}
                />
                <span className="text-xs tabular-nums leading-none">
                  {voteCount}
                </span>
              </button>

              {/* Content */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `hsl(var(--category-${(index % 4) + 1}) / 0.1)`
                  }}
                >
                  <Icon 
                    className="w-4 h-4"
                    style={{
                      color: `hsl(var(--category-${(index % 4) + 1}))`
                    }}
                  />
                </div>
                
                <h3 className="font-medium text-sm text-foreground leading-tight flex-1 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>

                {/* Rank Badge */}
                {index < 3 && voteCount > 0 && (
                  <div 
                    className="px-2 py-0.5 rounded-md text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: index === 0 ? 'hsl(var(--rank-gold) / 0.2)' : 
                                     index === 1 ? 'hsl(var(--rank-silver) / 0.3)' :
                                     'hsl(var(--rank-bronze) / 0.2)',
                      color: index === 0 ? 'hsl(var(--rank-gold))' : 
                            index === 1 ? 'hsl(var(--rank-silver))' :
                            'hsl(var(--rank-bronze))'
                    }}
                  >
                    #{index + 1}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Category Section */}
      <div className="pt-8 mt-8 border-t border-border/50">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
              style={{ backgroundColor: 'hsl(var(--status-warning) / 0.1)' }}
            >
              <Lightbulb className="w-4 h-4" style={{ color: 'hsl(var(--status-warning))' }} />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Suggest your own custom category
                </h3>
                <p className="text-xs text-muted-foreground">
                  Don't see what you're looking for? Submit your own benchmark idea.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCustomCategorySubmit()}
                  placeholder="e.g., Testing unlogged LinkedIn scraping"
                  className="flex-1 text-sm"
                  maxLength={100}
                />
                <Button
                  onClick={handleCustomCategorySubmit}
                  disabled={!customCategory.trim()}
                  size="sm"
                  className="gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VotingSection;
