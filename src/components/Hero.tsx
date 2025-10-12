import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            Reliable Agents Leaderboard
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            The definitive source for benchmarking and knowledge about agentic automation, 
            web browsing agents, and computer use tools.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
