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
  Rocket,
  Plus,
  Lightbulb,
  Github
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "cat_1", title: "Browser use frameworks", icon: Rocket },
  { id: "cat_2", title: "Browser use libraries/protocols", icon: Code2 },
  { id: "cat_3", title: "Specialized browser use", icon: LineChart },
  { id: "cat_4", title: "Browsers as a service", icon: BarChart3 },
  { id: "cat_5", title: "Supporting infrastructure", icon: Briefcase },
  { id: "cat_6", title: "Scraping & crawling APIs", icon: Globe },
  { id: "cat_7", title: "Computer use models", icon: Building2 },
  { id: "cat_8", title: "Enterprise automation", icon: Briefcase },
  { id: "cat_9", title: "Consumer automation", icon: Globe },
  { id: "cat_10", title: "Consumer browsers", icon: Code2 },
];

const VotingSection = () => {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [votedCategories, setVotedCategories] = useState<Set<string>>(new Set());
  const [customCategory, setCustomCategory] = useState("");
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

  const handleCustomCategorySubmit = async () => {
    const trimmed = customCategory.trim();
    
    if (!trimmed) {
      toast({
        title: "Category name required",
        description: "Please enter a category name",
        variant: "destructive",
      });
      return;
    }
    
    if (trimmed.length > 100) {
      toast({
        title: "Category name too long",
        description: "Please keep it under 100 characters",
        variant: "destructive",
      });
      return;
    }
    
    // Create a unique ID for the custom category
    const categoryId = `custom_${Date.now()}`;
    
    // Check if already voted for a custom category
    const hasVotedForCustom = Array.from(votedCategories).some(id => id.startsWith("custom_"));
    if (hasVotedForCustom) {
      toast({
        title: "Already voted",
        description: "You've already voted for a custom category",
      });
      return;
    }
    
    const { error } = await supabase
      .from("votes")
      .insert({ 
        category_id: categoryId, 
        category_title: trimmed,
        vote_count: 1 
      });

    if (error) {
      toast({
        title: "Submission failed",
        description: "Unable to submit your category. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const newVoted = new Set(votedCategories).add(categoryId);
    setVotedCategories(newVoted);
    localStorage.setItem("votedCategories", JSON.stringify([...newVoted]));
    setCustomCategory("");

    toast({
      title: "Category submitted!",
      description: "Thank you for your suggestion",
    });
    
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
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Vote for which category to benchmark next
        </h2>
        <p className="text-base text-muted-foreground">
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
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                  ${index % 4 === 0 ? 'bg-blue-500/10' : ''}
                  ${index % 4 === 1 ? 'bg-purple-500/10' : ''}
                  ${index % 4 === 2 ? 'bg-green-500/10' : ''}
                  ${index % 4 === 3 ? 'bg-pink-500/10' : ''}
                `}>
                  <Icon className={`
                    w-4 h-4
                    ${index % 4 === 0 ? 'text-blue-600 dark:text-blue-400' : ''}
                    ${index % 4 === 1 ? 'text-purple-600 dark:text-purple-400' : ''}
                    ${index % 4 === 2 ? 'text-green-600 dark:text-green-400' : ''}
                    ${index % 4 === 3 ? 'text-pink-600 dark:text-pink-400' : ''}
                  `} />
                </div>
                
                <h3 className="font-medium text-sm text-foreground leading-tight flex-1 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>

                {/* Rank Badge */}
                {index < 3 && voteCount > 0 && (
                  <div className={`
                    px-2 py-0.5 rounded-md text-xs font-bold flex-shrink-0
                    ${index === 0 ? 'bg-yellow-400/20 text-yellow-700 dark:text-yellow-300' : ''}
                    ${index === 1 ? 'bg-gray-300/30 text-gray-700 dark:text-gray-300' : ''}
                    ${index === 2 ? 'bg-orange-400/20 text-orange-700 dark:text-orange-300' : ''}
                  `}>
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
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Suggest your own category
                </h3>
                <p className="text-xs text-muted-foreground">
                  Don't see what you're looking for? Submit your own benchmark idea
                </p>
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCustomCategorySubmit()}
                  placeholder="e.g., Testing frameworks for agents"
                  className="flex-1 text-sm"
                  maxLength={100}
                  disabled={Array.from(votedCategories).some(id => id.startsWith("custom_"))}
                />
                <Button
                  onClick={handleCustomCategorySubmit}
                  disabled={!customCategory.trim() || Array.from(votedCategories).some(id => id.startsWith("custom_"))}
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

      {/* GitHub Section */}
      <div className="pt-4">
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
    </section>
  );
};

export default VotingSection;
