import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { CompanyLogo } from "./CompanyLogo";

const previewCategories = [
  {
    name: "General go-to frameworks",
    color: "hsl(var(--primary))",
    companies: [
      { name: "Browser Use", domain: "github.com" },
      { name: "Stagehand", domain: "stagehand.dev" },
      { name: "Skyvern", domain: "skyvern.com" },
      { name: "LaVague", domain: "lavague.ai" },
      { name: "Trigger.dev", domain: "trigger.dev" },
    ]
  },
  {
    name: "Browser-as-a-service infra",
    color: "hsl(var(--secondary))",
    companies: [
      { name: "Browserbase", domain: "browserbase.com" },
      { name: "hyperbrowser", domain: "hyperbrowser.ai" },
      { name: "Browserless", domain: "browserless.io" },
    ]
  },
  {
    name: "Crawlers/scrapers/APIs",
    color: "hsl(var(--accent))",
    companies: [
      { name: "Firecrawl", domain: "firecrawl.dev" },
      { name: "Apify", domain: "apify.com" },
      { name: "Tavily", domain: "tavily.com" },
      { name: "Bright Data", domain: "brightdata.com" },
    ]
  }
];

export const MarketMapPreview = () => {
  return (
    <Link to="/2025" className="block group">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/30 to-background p-8 transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase bg-primary/10 text-primary rounded-full">
              New Report
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              The Current State of Agentic Browser Automation
            </h2>
            <p className="text-muted-foreground">
              A comprehensive market map of 60+ companies across 9 categories
            </p>
          </div>

        <div className="space-y-4">
          {previewCategories.map((category, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="text-xs font-semibold text-foreground">
                  {category.name}
                </h3>
                <span className="text-[10px] text-muted-foreground">
                  {category.companies.length}+
                </span>
              </div>
              
              <div className="flex items-center gap-2 overflow-hidden">
                {category.companies.map((company, companyIdx) => (
                  <div
                    key={companyIdx}
                    className="flex flex-col items-center gap-1 shrink-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-border/30 p-1">
                      <CompanyLogo
                        companyName={company.name}
                        domain={company.domain}
                        categoryColor={category.color}
                      />
                    </div>
                    <span className="text-[8px] text-muted-foreground text-center line-clamp-1 w-full">
                      {company.name}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
                  <span>+</span>
                  <span>many more</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
            <span>View Full Report</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      </div>
    </Link>
  );
};
