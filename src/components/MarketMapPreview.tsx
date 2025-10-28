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
    <Link to="/2025-Q4" className="block group animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/40 to-background p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1.5 text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary rounded-full border border-primary/20 shadow-sm">
              New Report
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              State of Agentic Browser/Computer Use 🤖
            </h2>
            <div className="inline-block px-2.5 py-1 text-xs font-semibold tracking-wide bg-primary/10 text-primary rounded-full border border-primary/20">
              Q4 2025
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              With an interactive market map of projects across 10 categories (vibe-coded & collected with browser automation, of course)
            </p>
            
            <div className="pt-3">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-semibold text-sm border border-primary/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-105">
                <span>View Full Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="space-y-5">
          {previewCategories.map((category, idx) => (
            <div key={idx} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-semibold text-foreground">
                  {category.name}
                </h3>
                <span className="text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                  {category.companies.length}+
                </span>
              </div>
              
              <div className="flex items-center gap-2.5 overflow-hidden">
                {category.companies.map((company, companyIdx) => (
                  <div
                    key={companyIdx}
                    className="flex flex-col items-center gap-1 shrink-0 group/logo"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-border/30 p-1.5 transition-all duration-200 group-hover/logo:scale-110 group-hover/logo:shadow-md group-hover/logo:border-primary/30">
                      <CompanyLogo
                        companyName={company.name}
                        domain={company.domain}
                        categoryColor={category.color}
                      />
                    </div>
                    <span className="text-[8px] text-muted-foreground text-center line-clamp-1 w-full group-hover/logo:text-foreground transition-colors">
                      {company.name}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2 opacity-70">
                  <span>+</span>
                  <span>many more</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      </div>
    </Link>
  );
};
