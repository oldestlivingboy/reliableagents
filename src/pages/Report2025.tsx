import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CompanyLogo } from "@/components/CompanyLogo";

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
      'dex': 'https://dex.ai',
      'kairos': 'https://kairos.ai',
      'please': 'https://please.com',
      'convergence proxy': 'https://convergence.ai',
      'godmode ai': 'https://godmode.space',
      'general agents': 'https://generalagents.ai',
      'nanobrowser': 'https://nanobrowser.com',
      'dia': 'https://dia.so',
      'opera': 'https://opera.com',
      'perplexity search api': 'https://perplexity.ai',
      'comet': 'https://comet.com',
      'asteroid': 'https://asteroid.ai',
      'basepilot': 'https://basepilot.ai',
      'orby': 'https://orby.ai',
      'h': 'https://h.company',
      'copycat': 'https://copycat.ai',
      'athena intelligence': 'https://athena.io',
      'narada': 'https://narada.ai',
      'twin': 'https://twin.so',
      'emergence': 'https://emergence.ai',
      'skyvern': 'https://skyvern.com',
      'simular': 'https://simular.ai',
      'browser use': 'https://github.com/browser-use/browser-use',
      'lavague': 'https://lavague.ai',
      'hyperbrowser': 'https://hyperbrowser.ai',
      'cua': 'https://cua.dev',
      'trycua': 'https://cua.dev',
      'browserbase': 'https://browserbase.com',
      'stagehand': 'https://stagehand.dev',
      'director': 'https://browserbase.com',
      'anon': 'https://anon.com',
      'openai operator': 'https://openai.com',
      'google project mariner': 'https://deepmind.google/technologies/project-mariner',
      'bytedance ui-tars': 'https://bytedance.com',
      'amazon nova': 'https://aws.amazon.com/ai/generative-ai/nova',
      'omniparser': 'https://github.com/microsoft/OmniParser',
      'anthropic claude computer use': 'https://anthropic.com/claude',
      'glm-4.5v': 'https://chatglm.cn',
      'qwen2.5-vl': 'https://qwenlm.github.io',
      'opencua': 'https://github.com/opencua/opencua',
      'axiom-1': 'https://inductionlabs.ai',
      'coact-1': 'https://coact.ai',
      'inngest': 'https://inngest.com',
      'ingnest': 'https://inngest.com',
      'temporal': 'https://temporal.io',
      'langgraph': 'https://langchain.com/langgraph',
      'playwright': 'https://playwright.dev',
      'puppeteer': 'https://pptr.dev',
      'lightpanda': 'https://lightpanda.io',
      'anchor browser': 'https://anchor.io',
      'kernel': 'https://kernel.io',
      's1': 'https://s1.ai',
      'scrapybara': 'https://scrapybara.com',
      'yutori': 'https://yutori.ai',
      'manus': 'https://manus.app',
      'google gemini 2.5': 'https://deepmind.google/gemini',
      'chrome': 'https://google.com/chrome',
      'microsoft edge copilot': 'https://microsoft.com/edge',
      'kura ai': 'https://kura.ai',
      'firecrawl': 'https://firecrawl.dev',
      'trigger.dev': 'https://trigger.dev',
      'apify': 'https://apify.com',
      'bright data': 'https://brightdata.com',
      'browser.ai': 'https://browser.ai',
      'kaizen': 'https://kaizen.ai',
      'halluminate': 'https://halluminate.ai',
      'tavily': 'https://tavily.com',
      'exa.ai': 'https://exa.ai',
      'browserless': 'https://browserless.io',
      'zyte.com': 'https://zyte.com',
      'scrapy': 'https://scrapy.org',
    };
    
    return urlMap[cleanName] || `https://${cleanName.replace(/\s+/g, '')}.com`;
  };

  const getCompanyDomain = (companyName: string): string => {
    const url = getCompanyUrl(companyName);
    return url.replace('https://', '').replace('http://', '').split('/')[0];
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
        
        // Split multiple categories and clean up quotes
        const categories = categoryRaw
          .split(';')
          .map(c => c.trim().replace(/^["']|["']$/g, ''))
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
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-16">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 md:mb-8 -ml-3 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </Link>

        <header className="space-y-4 md:space-y-6 mb-12 md:mb-20 max-w-4xl">
          <div className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase bg-primary/10 text-primary rounded-full">
            Q4 2025
          </div>
          <h1 className="text-3xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
            The Current State of Agentic Browser/Web/Computer Automation
          </h1>
        </header>

        {/* INTRO Section */}
        <section className="space-y-6 md:space-y-8 mb-16 md:mb-24 max-w-3xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 md:mb-6">Introduction</h2>
            <div className="space-y-4 md:space-y-6 text-foreground/80 leading-relaxed text-base md:text-lg">
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
              <p className="font-semibold text-foreground text-lg md:text-xl">
                So, starting today and with this report, we're launching RAL (Reliable Agents Leaderboard) - 
                your one-stop shop for understanding and benchmarking agentic automation.
              </p>
            </div>
          </div>

          {/* Created by Section */}
          <div className="pt-12 border-t border-border/50">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-primary mb-8">Created by</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="font-semibold text-foreground text-lg">Alex</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A 3x founder with an AI exit (WANNA virtual try-on tech later sold to Farfetch). 
                  He also created No Cap, the world's first AI agent that invested in a company. 
                  No Cap coached 10k+ founders and runs nc acc - an accelerator for solopreneurs.
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground text-lg">Brian</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ex-Googler who worked on the company's first mobile ad server and started their DevRel team. 
                  Co-founded Disconnect (privacy software shipped with most modern browsers - protecting 750,000,000 users) 
                  and Massive (alternative to ads paywalls) - named Proxyway's 2025 "Newcomer of the Year" for bandwidth monetization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MARKET MAP Section */}
        <section className="space-y-8 mb-24">
          <div className="max-w-3xl">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Market Map</h2>
            <p className="text-sm text-muted-foreground">
              Categorizing {marketMap.reduce((sum, cat) => sum + cat.companies.length, 0)} companies 
              across {marketMap.length} key categories
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {marketMap.map((category, idx) => (
              <div key={idx} className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="text-xs font-semibold text-foreground tracking-tight">
                    {category.name}
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {category.companies.length}
                  </span>
                </div>
                
                <div className="grid grid-cols-6 sm:grid-cols-7 gap-2">
                  {category.companies.map((company, companyIdx) => {
                    const domain = getCompanyDomain(company.name);
                    return (
                      <a
                        key={companyIdx}
                        href={getCompanyUrl(company.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-1 transition-transform hover:scale-105"
                        title={`${company.name}${company.oneLiner ? ': ' + company.oneLiner : ''}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-border/30 p-1 shadow-sm group-hover:shadow transition-shadow">
                          <CompanyLogo
                            companyName={company.name}
                            domain={domain}
                            categoryColor={category.color}
                          />
                        </div>
                        <span className="text-[8px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-tight w-full">
                          {company.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHERE TO START Section */}
        <section className="space-y-8 mb-24 max-w-4xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Where to Start</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Scary, right? These maps look impressive - but how do you actually navigate them?
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">The stack you really control</h3>
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
        </section>

        {/* MAP CATEGORIES → STACK LAYERS Section */}
        <section className="space-y-8 mb-24 max-w-5xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Map categories → stack layers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Here is how the categories in the market map plug straight into this stack. Use this to decide what to evaluate vs what to merely get inspired by.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 font-semibold text-foreground/60 text-xs uppercase tracking-wide">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground/60 text-xs uppercase tracking-wide">Layer</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground/60 text-xs uppercase tracking-wide">What it does</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground/60 text-xs uppercase tracking-wide">Examples</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground text-sm">
                <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">Consumer agents</td>
                  <td className="py-3 px-4">1-2</td>
                  <td className="py-3 px-4">Agent brain + agentic control</td>
                  <td className="py-3 px-4">Manus, Yutori, DEX, KAIROS</td>
                </tr>
                <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">AI browsers</td>
                  <td className="py-3 px-4">2, 4</td>
                  <td className="py-3 px-4">Built-in agent layer + execution env</td>
                  <td className="py-3 px-4">Dia, Opera, Comet</td>
                </tr>
                <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">Enterprise agents</td>
                  <td className="py-3 px-4">1-2, 6</td>
                  <td className="py-3 px-4">Compliance, audit, SSO</td>
                  <td className="py-3 px-4">Orby, CopyCat, Athena, Narada</td>
                </tr>
                <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">Frameworks & libraries</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">Decide actions - plan, click, type, recover</td>
                  <td className="py-3 px-4">Browser Use, Stagehand, Skyvern, LaVague</td>
                </tr>
                <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">Browser control & protocols</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">Send actions to the browser</td>
                  <td className="py-3 px-4">Playwright, Puppeteer, CDP</td>
                </tr>
                <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">Browser-as-a-Service infra</td>
                  <td className="py-3 px-4">4</td>
                  <td className="py-3 px-4">Hosted cloud browser sessions, proxies, replay</td>
                  <td className="py-3 px-4">Browserbase, Anchor, Hyperbrowser</td>
                </tr>
                <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">Desktop OS control</td>
                  <td className="py-3 px-4">5</td>
                  <td className="py-3 px-4">Automate non-web UIs, VDI, Citrix</td>
                  <td className="py-3 px-4">Cua, SCRAPYBARA</td>
                </tr>
                <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">Orchestration</td>
                  <td className="py-3 px-4">6</td>
                  <td className="py-3 px-4">Retries, state, timeouts, audit, SLAs</td>
                  <td className="py-3 px-4">Temporal, Inngest, LangGraph</td>
                </tr>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">Computer Use models</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">Policy reasoning</td>
                  <td className="py-3 px-4">Claude Computer Use, OpenAI CUA, Gemini 2.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* DECISION FLOW Section */}
        <section className="space-y-8 mb-24 max-w-4xl">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-6">Decision Flow</h2>

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
        </section>

        {/* COMMON PROBLEMS Section */}
        <section className="space-y-8 mb-24 max-w-4xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Common Problems</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Why do agents still face-plant in production?
            </p>
          </div>

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
        </section>

        {/* RAL LAUNCH Section */}
        <section className="space-y-8 mb-24 max-w-4xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">RAL Launch</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we're launching RAL (Reliable Agents Leaderboard) with a focus on agentic control layers + browser infra combinations.
            </p>
          </div>

          <div className="bg-muted/30 rounded-2xl p-8 border border-border/40 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide mb-4">Method - simple and reproducible</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="text-primary">•</span> Separate READ vs WRITE task classes</li>
                <li className="flex gap-3"><span className="text-primary">•</span> 3 canonical flows: login + 2FA, paginate & extract, form submit + upload</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Require replay video + console + HAR + DOM snapshots per attempt</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Report: success rate, median steps, p50 time, cost per successful task, human handoff rate</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Keep proxy, fingerprint, captcha policies identical across runs</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Log infra vs agent failure root causes</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-foreground/80 leading-relaxed">
                <span className="font-semibold">Why this matters:</span> you can finally compare apples to apples. Frameworks are tested like frameworks. 
                Infra is tested like infra. Models are held constant where appropriate.
              </p>
            </div>
          </div>
        </section>

        {/* FUTURE LEADERBOARDS Section */}
        <section className="space-y-8 mb-24 max-w-5xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Future Leaderboards</h2>
            <p className="text-sm text-muted-foreground">Subscribe to stay updated!</p>
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

        {/* APPENDIX - QUICK FAQ Section */}
        <section className="space-y-8 mb-24 max-w-4xl">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-primary">Quick FAQ</h2>

          <div className="space-y-4">
            <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
              <h3 className="font-semibold text-foreground mb-3 text-base">Do I start with a provider-hosted Computer Use model or a framework?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Start with provider-hosted to ship a demo today. Move to framework + infra when you need replay, audits, stealth control, data residency.
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
              <h3 className="font-semibold text-foreground mb-3 text-base">Is pixel better than DOM?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reading is easy either way. For write-heavy flows, DOM-first plus deterministic code paths often wins on latency and stability - pixel is improving fast.
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
              <h3 className="font-semibold text-foreground mb-3 text-base">Why vertical agents?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Context specialization and narrower action spaces raise reliability - the near-term path to production wins.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-24 pt-8 border-t border-border/30 max-w-5xl">
          <p className="text-xs text-muted-foreground text-center">
            © 2025 Reliable Agents Leaderboard. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Report2025;
