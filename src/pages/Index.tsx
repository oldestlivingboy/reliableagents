import Hero from "@/components/Hero";
import VotingSection from "@/components/VotingSection";
import SubscribeSection from "@/components/SubscribeSection";
import CreatedBy from "@/components/CreatedBy";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto max-w-4xl px-4 space-y-6 md:space-y-12 pb-8 md:pb-24">
        <section className="space-y-3 md:space-y-6">
          <div className="border border-border rounded-lg p-6 md:p-8 bg-muted/20">
            <h2 className="text-lg md:text-xl font-medium text-muted-foreground mb-2">
              Leaderboard in the making
            </h2>
            <p className="text-sm text-muted-foreground">
              We're currently benchmarking and analyzing agentic automation tools. The first comprehensive leaderboard will be published soon.
            </p>
          </div>
        </section>

        <VotingSection />
        
        <SubscribeSection />

        <CreatedBy />
      </main>

      <footer className="border-t border-border py-4 md:py-12 mt-8 md:mt-24">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © 2025 Reliable Agents Leaderboard. Empowering agentic developers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
