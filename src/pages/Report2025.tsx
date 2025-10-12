import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Company {
  name: string;
  category: string;
  oneLiner: string;
}

interface CategoryData {
  name: string;
  companies: Company[];
  color: string;
}

const Report2025 = () => {
  const [marketMap, setMarketMap] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetchMarketMapData();
  }, []);

  const getCompanyUrl = (companyName: string): string => {
    // Clean up company name and create URL
    const cleanName = companyName
      .toLowerCase()
      .replace(/\s*\(.*?\)\s*/g, '') // Remove parentheses content
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    
    // Special cases
    const specialCases: { [key: string]: string } = {
      'browseruse': 'https://github.com/browser-use/browser-use',
      'lavague': 'https://lavague.ai',
      'skyvern': 'https://skyvern.com',
      'browserbase': 'https://browserbase.com',
      'stagehand': 'https://stagehand.dev',
      'hyperbrowser': 'https://hyperbrowser.ai',
      'playwright': 'https://playwright.dev',
      'puppeteer': 'https://pptr.dev',
      'firecrawl': 'https://firecrawl.dev',
      'apify': 'https://apify.com',
      'brightdata': 'https://brightdata.com',
      'tavily': 'https://tavily.com',
      'exaai': 'https://exa.ai',
      'temporal': 'https://temporal.io',
      'langgraph': 'https://langchain.com/langgraph',
      'inngest': 'https://inngest.com',
      'perplexity': 'https://perplexity.ai',
      'anthropic': 'https://anthropic.com',
      'openai': 'https://openai.com',
      'google': 'https://deepmind.google',
    };
    
    return specialCases[cleanName] || `https://${cleanName}.com`;
  };

  const getCompanyLogoUrl = (companyName: string): string => {
    const url = getCompanyUrl(companyName);
    const domain = url.replace('https://', '').replace('http://', '').split('/')[0];
    // Use Clearbit logo API for better quality logos
    return `https://logo.clearbit.com/${domain}`;
  };

  const fetchMarketMapData = async () => {
    try {
      const response = await fetch('/market-map.csv');
      const csvText = await response.text();
      const lines = csvText.split('\n').slice(1); // Skip header
      
      const categoriesMap = new Map<string, Company[]>();
      
      lines.forEach(line => {
        if (!line.trim()) return;
        
        const parts = line.split(',');
        if (parts.length < 3) return;
        
        const name = parts[0]?.replace(/^﻿/, '').trim();
        const categoryRaw = parts[2]?.trim();
        const oneLiner = parts[4]?.trim() || '';
        
        if (!name || !categoryRaw) return;
        
        // Split multiple categories
        const categories = categoryRaw.split(';').map(c => c.trim());
        
        categories.forEach(category => {
          if (!categoriesMap.has(category)) {
            categoriesMap.set(category, []);
          }
          categoriesMap.get(category)?.push({
            name,
            category,
            oneLiner
          });
        });
      });

      const categoryColors = [
        'hsl(var(--primary))',
        'hsl(var(--secondary))',
        'hsl(var(--accent))',
        'hsl(210 100% 50%)',
        'hsl(280 100% 60%)',
        'hsl(160 100% 40%)',
        'hsl(30 100% 50%)',
        'hsl(340 100% 50%)',
      ];

      const categorizedData: CategoryData[] = [];
      let colorIndex = 0;
      
      categoriesMap.forEach((companies, categoryName) => {
        categorizedData.push({
          name: categoryName,
          companies: companies.sort((a, b) => a.name.localeCompare(b.name)),
          color: categoryColors[colorIndex % categoryColors.length]
        });
        colorIndex++;
      });

      setMarketMap(categorizedData.sort((a, b) => b.companies.length - a.companies.length));
    } catch (error) {
      console.error('Error loading market map:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-6 md:py-12">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <header className="space-y-4 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            The Current State of Agentic Browser/Web/Computer Automation
          </h1>
          <p className="text-lg text-muted-foreground">Q4 2025</p>
        </header>

        {/* INTRO Section */}
        <section className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-foreground">INTRO</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Gen AI / agents craze is at its peak. Deservedly, unlike some "luddites" may claim. 
              BUT one piece of the puzzle is still not fully there. Agents being able to reliably 
              (emphasis wink-wink) use browsers to browse the web and use computers.
            </p>
            <p>
              If you're an agentic developer, how do you navigate the stack and what does the stack 
              actually consist of? Market maps are great - but not really actionable.
            </p>
            <p>
              We've tasked ourselves with digging through the mess and establishing a good answer to 
              this question: what's the state of the art in browser automation and who are the best 
              companies you can use as a developer!
            </p>
            <p className="font-medium text-foreground">
              So, starting today and with this report, we're launching RAL (Reliable Agents Leaderboard) - 
              your one-stop shop for understanding and benchmarking agentic automation.
            </p>
          </div>
        </section>

        {/* MARKET MAP Section */}
        <section className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-foreground">MARKET MAP</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Categorizing {marketMap.reduce((sum, cat) => sum + cat.companies.length, 0)} companies 
            across {marketMap.length} key categories
          </p>

          <div className="space-y-8">
            {marketMap.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b-2" style={{ borderColor: category.color }}>
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="text-lg font-bold text-foreground">
                    {category.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {category.companies.length}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {category.companies.map((company, companyIdx) => (
                    <a
                      key={companyIdx}
                      href={getCompanyUrl(company.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-foreground/20 transition-all hover:shadow-md"
                      title={company.oneLiner || company.name}
                    >
                      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center overflow-hidden shrink-0 border border-border/50">
                        <img
                          src={getCompanyLogoUrl(company.name)}
                          alt={`${company.name} logo`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-full h-full items-center justify-center text-lg font-bold hidden"
                          style={{ 
                            display: 'none',
                            color: category.color
                          }}
                        >
                          {company.name.charAt(0)}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {company.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHERE TO START Section */}
        <section className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-foreground">WHERE TO START</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Scary, right? These maps look impressive - but how do you actually navigate them?
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">The stack you really control</h3>
            <Card className="p-6 space-y-4 bg-muted/20">
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground">1. Agent brain</p>
                  <p className="text-sm text-muted-foreground">Your vertical logic + models</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">2. Agentic control layer</p>
                  <p className="text-sm text-muted-foreground">Browser Use, Stagehand, Skyvern, LaVague (decide actions)</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">3. Browser control</p>
                  <p className="text-sm text-muted-foreground">CDP, Playwright, Puppeteer (send actions to a browser)</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">4. Execution environment</p>
                  <p className="text-sm text-muted-foreground">Local headless or cloud browsers: Anchor, Browserbase, Hyperbrowser</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">5. Desktop OS control (optional)</p>
                  <p className="text-sm text-muted-foreground">Cua, SCRAPYBARA when there's no DOM, Citrix native apps</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">6. Orchestration</p>
                  <p className="text-sm text-muted-foreground">Temporal, Inngest, LangGraph for retries, timeouts, state, audit</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground">
                  💡 What you really care about: Pick the agentic control layer first, then pick where it runs. 
                  Treat frameworks like Stagehand or Browser Use as your "React" - and Browserbase/Anchor/Hyperbrowser as your "Vercel".
                </p>
              </div>
            </Card>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Reliable Agents Leaderboard. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Report2025;
