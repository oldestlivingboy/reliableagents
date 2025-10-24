import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Wrench, BookOpen, Settings, Cloud, Building2, Bug, Brain, Briefcase, User, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { CompanyLogo } from "@/components/CompanyLogo";
import ConsultationPopup from "@/components/ConsultationPopup";
import Papa from 'papaparse';

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
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    fetchMarketMapData();
  }, []);

  const getCompanyUrl = (companyName: string): string => {
    const cleanName = companyName
      .toLowerCase()
      .replace(/\s*\(.*?\)\s*/g, '')
      .trim();
    
    const urlMap: { [key: string]: string } = {
      'magnitude.run': 'https://magnitude.run/',
      'trigger.dev': 'https://trigger.dev/',
      'browserbase': 'https://www.browserbase.com/',
      'stagehand': 'https://www.browserbase.com/',
      'director': 'https://www.browserbase.com/',
      'browser use': 'https://github.com/a-r-n-o-l-d/browser-use',
      'simular': 'https://www.simular.ai/',
      'skyvern': 'https://www.skyvern.com/',
      'puppeteer': 'https://pptr.dev/',
      'playwright': 'https://playwright.dev/',
      'scrapybara': 'https://scrapybara.com/',
      'cua': 'https://cua.ai/',
      'trycua': 'https://cua.ai/',
      'lavague': 'https://lavague.ai/',
      'steel.dev': 'https://steel.dev/',
      'browserless': 'https://www.browserless.io/',
      'kernel': 'https://www.onkernel.com/',
      'anchor browser': 'https://anchorbrowser.io/',
      'hyperbrowser': 'https://www.hyperbrowser.ai/',
      'morph.so': 'https://www.morph.so/',
      'halluminate': 'https://halluminate.ai/',
      'lightpanda': 'https://lightpanda.io/',
      'langgraph': 'https://www.langchain.com/langgraph',
      'temporal': 'https://temporal.io/',
      'inngest': 'https://www.inngest.com/',
      'ingnest': 'https://www.inngest.com/',
      'anon': 'https://www.anon.com/',
      'riveterhq.com': 'https://riveterhq.com/',
      'zyte.com': 'https://www.zyte.com/',
      'scrapy': 'https://www.zyte.com/',
      'exa.ai': 'https://exa.ai/',
      'tavily': 'https://tavily.com/',
      'kaizen': 'https://kaizen.com/',
      'bright data': 'https://brightdata.com/',
      'browser.ai': 'https://brightdata.com/',
      'apify': 'https://apify.com/',
      'firecrawl': 'https://www.firecrawl.dev/',
      'omniparser': 'https://microsoft.github.io/OmniParser/',
      'google gemini 2.5': 'https://gemini.google.com/',
      'chrome': 'https://www.google.com/chrome/',
      'coact-1': 'https://linxins.net/coact/',
      'axiom-1': 'https://inductionlabs.com/',
      'opencua': 'https://opencua.xlang.ai/',
      'qwen2.5-vl': 'https://qwenlm.github.io/blog/qwen2.5-vl/',
      'glm-4.5v': 'https://bigmodel.cn/',
      'anthropic claude computer use': 'https://www.anthropic.com/',
      'amazon nova': 'https://nova.amazon.com/',
      'bytedance ui-tars': 'https://seed.bytedance.com/en/ui-tars',
      'google project mariner': 'https://deepmind.google/models/project-mariner/',
      'openai operator': 'https://openai.com/',
      'openai cua': 'https://openai.com/',
      'openai atlas': 'https://openai.com/',
      'notte.cc': 'https://www.notte.cc/',
      'kura ai': 'https://www.trykura.com/',
      'emergence': 'https://www.emergence.ai/',
      'twin': 'https://twin.so/',
      'narada': 'https://www.narada.ai/',
      'athena intelligence': 'https://www.athenaintel.com/',
      'copycat': 'https://www.ycombinator.com/companies/copycat',
      'h': 'https://www.hcompany.ai/',
      'orby': 'https://www.uniphore.com/orby-ai/',
      'basepilot': 'https://www.basepilot.com/',
      'asteroid': 'https://asteroid.ai/',
      'yutori': 'https://yutori.com/',
      'manus': 'https://manus.im/',
      'nanobrowser': 'https://nanobrowser.ai/',
      'general agents': 'https://generalagents.com/',
      'godmode ai': 'https://app.godmode.space/',
      'convergence proxy': 'https://www.aiapps.com/items/proxy-by-convergence-ai/',
      'kairos': 'https://www.kairos.computer/',
      'dex': 'https://thirdlayer.inc/',
      'microsoft edge copilot': 'https://www.microsoft.com/en-us/edge/copilot',
      'perplexity search api': 'https://www.perplexity.ai/',
      'comet': 'https://www.perplexity.ai/',
      'opera': 'https://www.opera.com/',
      'dia': 'https://www.diabrowser.com/',
    };
    
    return urlMap[cleanName] || `https://${cleanName.replace(/\s+/g, '')}.com`;
  };

  const getCompanyDomain = (companyName: string): string => {
    const url = getCompanyUrl(companyName);
    return url.replace('https://', '').replace('http://', '').split('/')[0];
  };

  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: any } = {
      '1. Browser use frameworks': Wrench,
      '2. Browser use libraries/protocols': BookOpen,
      '3. Specialized browser use': Settings,
      '4. Browsers as a service': Cloud,
      '5. Supporting infrastructure': Building2,
      '6. Scraping & crawling APIs': Bug,
      '7. Computer use models': Brain,
      '8. Enterprise automation': Briefcase,
      '9. Consumer automation': User,
      '10. Consumer browsers': Globe,
    };
    return iconMap[categoryName] || Settings;
  };

  const getCategoryOrder = (categoryName: string): number => {
    const orderMap: { [key: string]: number } = {
      '1. Browser use frameworks': 1,
      '2. Browser use libraries/protocols': 2,
      '3. Specialized browser use': 3,
      '4. Browsers as a service': 4,
      '5. Supporting infrastructure': 5,
      '6. Scraping & crawling APIs': 6,
      '7. Computer use models': 7,
      '8. Enterprise automation': 8,
      '9. Consumer automation': 9,
      '10. Consumer browsers': 10,
    };
    return orderMap[categoryName] || 999;
  };

  const fetchMarketMapData = async () => {
    try {
      const response = await fetch('/market-map.csv');
      const csvText = await response.text();
      
      // Use Papa Parse for proper CSV parsing
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });
      
      const categoriesMap = new Map<string, Company[]>();
      
      parsed.data.forEach((row: any) => {
        const name = row['Company']?.trim();
        const categoryRaw = row['Category']?.trim();
        const oneLiner = row['One-liner']?.trim() || '';
        
        if (!name || !categoryRaw) return;
        
        // Split multiple categories by semicolon
        const categories = categoryRaw
          .split(';')
          .map(c => c.trim())
          .filter(c => c.length > 0);
        
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
        'hsl(220 70% 50%)',
        'hsl(190 70% 50%)',
        'hsl(280 60% 55%)',
        'hsl(200 80% 55%)',
        'hsl(160 60% 45%)',
        'hsl(30 75% 55%)',
        'hsl(340 70% 55%)',
        'hsl(260 70% 55%)',
        'hsl(140 60% 50%)',
        'hsl(210 75% 60%)',
      ];

      const categorizedData: CategoryData[] = [];
      
      categoriesMap.forEach((companies, categoryName) => {
        const order = getCategoryOrder(categoryName);
        categorizedData.push({
          name: categoryName,
          companies: companies.sort((a, b) => a.name.localeCompare(b.name)),
          color: categoryColors[(order - 1) % categoryColors.length]
        });
      });

      setMarketMap(categorizedData.sort((a, b) => getCategoryOrder(a.name) - getCategoryOrder(b.name)));
    } catch (error) {
      console.error('Error loading market map:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ConsultationPopup />
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-16">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 md:mb-8 -ml-3 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </Link>

        <header className="space-y-4 md:space-y-6 mb-12 md:mb-20 max-w-4xl">
          <h1 className="text-3xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
            State of Agentic Browser/Computer Use 🤖
          </h1>
          <div className="inline-block px-3 py-1.5 text-sm font-semibold tracking-wide bg-primary/10 text-primary rounded-full border border-primary/20">
            Q4 2025
          </div>
        </header>

        {/* INTRO Section */}
        <section className="space-y-6 md:space-y-8 mb-16 md:mb-24 max-w-3xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 md:mb-6">Introduction</h2>
            <div className="space-y-4 md:space-y-6 text-foreground/80 leading-relaxed text-base md:text-lg">
              <p>
                2025 hasn't quite been the "year of the agent"
                <a href="https://www.barrons.com/articles/nvidia-ceo-says-2025-is-the-year-of-ai-agents-6ad2b4aa" target="_blank" rel="noopener noreferrer" className="text-[10px] align-super text-primary hover:underline">1</a>{" "}
                <a href="https://blog.samaltman.com/reflections" target="_blank" rel="noopener noreferrer" className="text-[10px] align-super text-primary hover:underline">2</a>, 
                but developers and investors are clearly pushing toward a near future of ubiquitous agents in work and everyday life
                <a href="https://www.cbinsights.com/research/report/yc-2025-spring-batch-agentic-ai/" target="_blank" rel="noopener noreferrer" className="text-[10px] align-super text-primary hover:underline">3</a>. 
                What's missing for real agentic adoption is reliability – the ability to produce accurate, predictable results based on domain-specific knowledge and external sources of truth.
              </p>
              <p>
                If you're a developer taking this challenge on, there are lots of new and existing tools and services offering to help – 
                actually, an overwhelming amount – so we started sorting the mess out for ourselves and are sharing our findings. 
                Given that market maps are useful but not actionable, we're going further to identify which developer tools perform best at particular tasks.
              </p>
              <p className="font-semibold text-foreground text-lg md:text-xl">
                Today, with this report, we're launching Reliable Agents – a one-stop shop for understanding and benchmarking the state of agentic automation!
              </p>
              <div className="pt-6 border-t border-border/30 mt-8">
                <p className="text-[11px] text-muted-foreground leading-relaxed space-y-1">
                  <span className="block">1. <a href="https://www.barrons.com/articles/nvidia-ceo-says-2025-is-the-year-of-ai-agents-6ad2b4aa" target="_blank" rel="noopener noreferrer" className="hover:underline">Nvidia CEO Says 2025 Is the Year of AI Agents, Barron's</a></span>
                  <span className="block">2. <a href="https://blog.samaltman.com/reflections" target="_blank" rel="noopener noreferrer" className="hover:underline">Reflections, Sam Altman</a></span>
                  <span className="block">3. <a href="https://www.cbinsights.com/research/report/yc-2025-spring-batch-agentic-ai/" target="_blank" rel="noopener noreferrer" className="hover:underline">Y Combinator's 2025 Spring batch reveals the future of agentic AI, CB Insights</a></span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MARKET MAP Section */}
        <section className="space-y-8 mb-24">
          <div className="max-w-3xl">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Market Map (as of Q4 2025)</h2>
            <p className="text-sm text-muted-foreground">
              An interactive overview of the agentic browser/computer use landscape
            </p>
          </div>

          <div className="flex gap-6 items-stretch relative">
            {/* Y-axis visualization */}
            <div className="relative flex flex-col items-center w-24 pt-6 pb-6 flex-shrink-0">
              {/* Top label */}
              <div className="mb-6">
                <div className="text-[11px] font-bold text-primary tracking-wide text-center leading-snug px-3 py-2 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg border-2 border-primary/30 shadow-sm">
                  <div className="whitespace-nowrap">Top of the stack</div>
                  <div className="text-[9px] font-semibold text-primary/70 mt-0.5">Consumer tools</div>
                </div>
              </div>
              
              {/* Vertical gradient line with enhanced styling */}
              <div className="flex-1 flex flex-col items-center w-full relative" style={{ minHeight: '600px' }}>
                <div className="absolute inset-0 flex flex-col items-center">
                  <div className="w-1 flex-1 bg-gradient-to-b from-primary via-primary/60 to-primary rounded-full shadow-lg relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 blur-sm rounded-full" />
                  </div>
                </div>
                
                {/* Enhanced arrow pointing down */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
                  <div className="relative">
                    <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[16px] border-t-primary drop-shadow-md" />
                    {/* Arrow glow */}
                    <div className="absolute inset-0 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[16px] border-t-primary/30 blur-sm -translate-y-1" />
                  </div>
                </div>
              </div>
              
              {/* Bottom label */}
              <div className="mt-6">
                <div className="text-[11px] font-bold text-primary tracking-wide text-center leading-snug px-3 py-2 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg border-2 border-primary/30 shadow-sm">
                  <div className="whitespace-nowrap">Bottom of the stack</div>
                  <div className="text-[9px] font-semibold text-primary/70 mt-0.5">Dev tools</div>
                </div>
              </div>
            </div>

            {/* Market map grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 flex-1">
              {marketMap.map((category, idx) => {
                const CategoryIcon = getCategoryIcon(category.name);
                return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                    <h3 className="text-xs font-semibold text-foreground tracking-tight">
                      {category.name.replace(/^\d+\.\s*/, '')}
                    </h3>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {category.companies.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-6 sm:grid-cols-7 gap-1.5">
                  {category.companies.map((company, companyIdx) => {
                    const domain = getCompanyDomain(company.name);
                    const categoryCount = company.category.split(';').length;
                    const isMultiCategory = categoryCount > 1;
                    
                    return (
                      <a
                        key={companyIdx}
                        href={getCompanyUrl(company.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-1 transition-transform hover:scale-105 relative"
                        title={`${company.name}${company.oneLiner ? ': ' + company.oneLiner : ''}${isMultiCategory ? ' (appears in ' + categoryCount + ' categories)' : ''}`}
                      >
                        <div className={`w-9 h-9 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden p-1 shadow-sm group-hover:shadow transition-all ${isMultiCategory ? 'border-2 border-primary/30' : 'border border-border/30'}`}>
                          <CompanyLogo
                            companyName={company.name}
                            domain={domain}
                            categoryColor={category.color}
                          />
                        </div>
                        {isMultiCategory && (
                          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border border-background flex items-center justify-center">
                            <span className="text-[6px] font-bold text-primary-foreground">{categoryCount}</span>
                          </div>
                        )}
                        <span className="text-[8px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-tight w-full">
                          {company.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* WHERE TO START Section */}
        <section className="space-y-12 mb-24 max-w-4xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Where to Start</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Practical tips for navigating the map
            </p>
          </div>

          {/* The stack you can control */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">The stack you can control</h3>
            <div className="space-y-1 bg-muted/30 rounded-2xl p-8 border border-border/40">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">01</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Agent brain</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Your vertical logic + models</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">02</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Agentic control layer</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Browser Use, Stagehand, Skyvern, LaVague (decide actions)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">03</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Browser control</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">CDP, Playwright, Puppeteer (send actions to a browser)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">04</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Execution environment</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Local headless or cloud browsers: Anchor, Browserbase, Hyperbrowser</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">05</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Desktop OS control <span className="text-xs text-muted-foreground">(optional)</span></p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Cua, SCRAPYBARA when there's no DOM, Citrix native apps</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">06</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Orchestration</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Temporal, Inngest, LangGraph for retries, timeouts, state, audit</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-border/50">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <span className="font-semibold">Key insight:</span> Pick the agentic control layer first, then pick where it runs. 
                  Treat frameworks like Stagehand or Browser Use as your "React" - and Browserbase/Anchor/Hyperbrowser as your "Vercel".
                </p>
              </div>
            </div>
          </div>

          {/* Decision Flow */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">Decision Flow</h3>

            <div className="bg-muted/30 rounded-2xl p-8 border border-border/40 space-y-8">
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-base">Is interaction required? <span className="text-sm text-muted-foreground font-normal">(login, forms, upload, pagination)</span></h3>
                <div className="space-y-2 ml-4 text-sm">
                  <p className="text-muted-foreground"><span className="font-semibold text-foreground">No</span> → use Firecrawl or similar crawler to fetch content cheaply</p>
                  <p className="text-muted-foreground"><span className="font-semibold text-foreground">Yes</span> → go agentic ↓</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-base">Pick control layer</h3>
                <ul className="space-y-1.5 ml-4 text-sm text-muted-foreground">
                  <li>• Browser Use for speed</li>
                  <li>• Stagehand for reliability</li>
                  <li>• Skyvern for vision-heavy pages</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-base">Pick infrastructure</h3>
                <ul className="space-y-1.5 ml-4 text-sm text-muted-foreground">
                  <li>• Browserbase if you need replay and observability</li>
                  <li>• Anchor for simple scalable sessions</li>
                  <li>• Hyperbrowser for anti-bot heavy environments</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-base">Pick model</h3>
                <ul className="space-y-1.5 ml-4 text-sm text-muted-foreground">
                  <li>• Claude Computer Use or OpenAI CUA for pixel control</li>
                  <li>• Gemini 2.5 for balanced performance</li>
                  <li>• Or a strong general LLM for DOM/code stacks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Problems */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">Common Problems</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Why do agents still face-plant in production?
            </p>

            <div className="bg-muted/30 rounded-2xl p-8 border border-border/40 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Timeouts</p>
                  <p className="text-sm text-muted-foreground">Long trajectories, slow DOMs, flaky waits</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Pop-ups & modals</p>
                  <p className="text-sm text-muted-foreground">Can't close or mis-detect overlays</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Captcha & fingerprinting</p>
                  <p className="text-sm text-muted-foreground">Infra issues often block agents more than reasoning does</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Auth flows</p>
                  <p className="text-sm text-muted-foreground">Login, MFA, device checks, bot walls</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Slow execution</p>
                  <p className="text-sm text-muted-foreground">Vision loops for trivial steps explode cost & latency</p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border/50">
                <p className="text-sm font-semibold text-foreground">
                  Translation: fix infra first - then policy.
                </p>
              </div>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">Quick FAQ</h3>

            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
                <h4 className="font-semibold text-foreground mb-3 text-base">Do I start with a provider-hosted Computer Use model or a framework?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Start with provider-hosted to ship a demo today. Move to framework + infra when you need replay, audits, stealth control, data residency.
                </p>
              </div>

              <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
                <h4 className="font-semibold text-foreground mb-3 text-base">Is pixel better than DOM?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reading is easy either way. For write-heavy flows, DOM-first plus deterministic code paths often wins on latency and stability - pixel is improving fast.
                </p>
              </div>

              <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
                <h4 className="font-semibold text-foreground mb-3 text-base">Why vertical agents?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Context specialization and narrower action spaces raise reliability - the near-term path to production wins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FUTURE LEADERBOARDS Section */}
        <section className="space-y-8 mb-24 max-w-5xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Future Leaderboards</h2>
            <p className="text-sm text-muted-foreground">
              Help shape our roadmap! <Link to="/" className="text-primary hover:underline font-medium">Vote on the homepage</Link> for which leaderboard you'd like to see next.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 bg-muted/30 rounded-xl border border-border/40 hover:border-border transition-colors">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Enterprise agents</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Verticalized flows with compliance, audit, replay, residency</p>
            </div>
            <div className="p-5 bg-muted/30 rounded-xl border border-border/40 hover:border-border transition-colors">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Consumer agents & AI browsers</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Prosumer UX, speed, utility</p>
            </div>
            <div className="p-5 bg-muted/30 rounded-xl border border-border/40 hover:border-border transition-colors">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Desktop OS control</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Citrix, legacy thick clients</p>
            </div>
            <div className="p-5 bg-muted/30 rounded-xl border border-border/40 hover:border-border transition-colors">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Memory services</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Persistence, retrieval, tutoring across repeated tasks</p>
            </div>
            <div className="p-5 bg-muted/30 rounded-xl border border-border/40 hover:border-border transition-colors">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Anti-bot setups</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Proxies, fingerprints, captchas compared fairly</p>
            </div>
            <div className="p-5 bg-muted/30 rounded-xl border border-border/40 hover:border-border transition-colors">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Training environments</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Sandbox replicas for safe RL/SFT on real flows</p>
            </div>
          </div>
        </section>

        <footer className="mt-24 pt-8 border-t border-border/30 max-w-5xl space-y-6">
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">P.S.</span> Created & maintained by{" "}
              <a 
                href="https://www.linkedin.com/in/ednevsky/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Alex
              </a>
              {" "}—{" "}
              A 3x founder with an AI exit (WANNA virtual try-on tech later sold to Farfetch). 
              He also created No Cap, the world's first AI agent that invested in a company. 
              No Cap coached 10k+ founders and runs nc acc - an accelerator for solopreneurs.
              {" "}& {" "}
              <a 
                href="https://www.linkedin.com/in/caseyoppenheim/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Brian
              </a>
              {" "}—{" "}
              Ex-Googler who worked on the company's first mobile ad server and started their DevRel team. 
              Co-founded Disconnect (privacy software shipped with most modern browsers - protecting 750,000,000 users) 
              and Massive (alternative to ads paywalls) - named Proxyway's 2025 "Newcomer of the Year" for bandwidth monetization.
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border/30">
            © 2025 Reliable Agents. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Report2025;
