import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { CompanyLogo } from "./CompanyLogo";

const previewCategories = [
  {
    name: "🔧 Browser use frameworks",
    color: "hsl(220 70% 50%)",
    companies: [
      { name: "Browser Use", domain: "github.com" },
      { name: "Stagehand", domain: "stagehand.dev" },
      { name: "Skyvern", domain: "skyvern.com" },
      { name: "Magnitude", domain: "magnitude.run" },
      { name: "Trigger.dev", domain: "trigger.dev" },
    ]
  },
  {
    name: "☁️ Browsers as a service",
    color: "hsl(200 80% 55%)",
    companies: [
      { name: "Browserbase", domain: "browserbase.com" },
      { name: "hyperbrowser", domain: "hyperbrowser.ai" },
      { name: "Browserless", domain: "browserless.io" },
      { name: "Steel.dev", domain: "steel.dev" },
    ]
  },
  {
    name: "🤖 Computer use models",
    color: "hsl(340 70% 55%)",
    companies: [
      { name: "OpenAI Operator", domain: "openai.com" },
      { name: "Google Gemini", domain: "gemini.google.com" },
      { name: "Anthropic Claude", domain: "anthropic.com" },
      { name: "Amazon Nova", domain: "nova.amazon.com" },
    ]
  }
];

export const MarketMapPreview = () => {
  return (
    <Link to="/2025-Q4" className="block group">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/40 to-background p-6 md:p-8 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <div className="inline-block px-3 py-1.5 text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
              New Report
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              State of Agentic Browser/Computer Use 🤖
            </h2>
            <div className="inline-block px-2.5 py-1 text-xs font-semibold tracking-wide bg-primary/10 text-primary rounded-full border border-primary/20">
              Q4 2025
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              A comprehensive market map of 80+ companies across 10 categories
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
