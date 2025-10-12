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

          {/* Created by Section */}
          <Card className="p-6 bg-muted/20 mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Created by:</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Alex</p>
                <p>
                  A 3x founder with an AI exit (WANNA virtual try-on tech later sold to Farfetch). 
                  He also created No Cap, the world's first AI agent that invested in a company. 
                  No Cap coached 10k+ founders and runs nc acc - an accelerator for solopreneurs.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">Brian</p>
                <p>
                  Ex-Googler who worked on the company's first mobile ad server and started their DevRel team. 
                  Co-founded Disconnect (privacy software shipped with most modern browsers - protecting 750,000,000 users) 
                  and Massive (alternative to ads paywalls) - named Proxyway's 2025 "Newcomer of the Year" for bandwidth monetization.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* MARKET MAP Section */}
        <section className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-foreground">MARKET MAP</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Categorizing {marketMap.reduce((sum, cat) => sum + cat.companies.length, 0)} companies 
            across {marketMap.length} key categories
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketMap.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: category.color }}>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="text-sm font-bold text-foreground">
                    {category.name}
                  </h3>
                  <Badge variant="outline" className="text-[10px] px-1 py-0">
                    {category.companies.length}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                  {category.companies.map((company, companyIdx) => {
                    const domain = getCompanyDomain(company.name);
                    return (
                      <a
                        key={companyIdx}
                        href={getCompanyUrl(company.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-1 p-1.5 rounded border border-border bg-card hover:bg-accent hover:border-foreground/20 transition-all"
                        title={`${company.name}${company.oneLiner ? ': ' + company.oneLiner : ''}`}
                      >
                        <div className="w-8 h-8 rounded bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden border border-border/30 p-0.5">
                          <img
                            src={`https://logo.clearbit.com/${domain}`}
                            alt={company.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              if (img.src.includes('clearbit')) {
                                img.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                              } else if (img.src.includes('google.com/s2/favicons')) {
                                img.src = `https://logo.dev/${domain}?token=pk_X-NykimYQeaw19u1busJ7w`;
                              } else {
                                img.style.display = 'none';
                                const parent = img.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-sm font-bold" style="color: ${category.color}">${company.name.charAt(0)}</div>`;
                                }
                              }
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-center text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-tight w-full px-0.5">
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
        <section className="space-y-6 mb-16">
          <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-lg border-l-4 border-primary">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">WHERE TO START</h2>
            <p className="text-muted-foreground leading-relaxed">
              Scary, right? These maps look impressive - but how do you actually navigate them?
            </p>
          </div>

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

        {/* MAP CATEGORIES → STACK LAYERS Section */}
        <section className="space-y-6 mb-16">
          <div className="bg-gradient-to-r from-secondary/10 to-transparent p-6 rounded-lg border-l-4 border-secondary">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Map categories → stack layers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Here is how the categories in the market map plug straight into this stack. Use this to decide what to evaluate vs what to merely get inspired by.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Category</th>
                  <th className="text-left p-3 font-semibold text-foreground">Stack Layer</th>
                  <th className="text-left p-3 font-semibold text-foreground">What it does</th>
                  <th className="text-left p-3 font-semibold text-foreground">Examples</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">Consumer agents</td>
                  <td className="p-3">1-2</td>
                  <td className="p-3">Agent brain + agentic control</td>
                  <td className="p-3">Manus, Yutori, DEX, KAIROS</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">AI browsers</td>
                  <td className="p-3">2, 4</td>
                  <td className="p-3">Built-in agent layer + execution env</td>
                  <td className="p-3">Dia, Opera, Comet</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">Enterprise agents</td>
                  <td className="p-3">1-2, 6</td>
                  <td className="p-3">Compliance, audit, SSO</td>
                  <td className="p-3">Orby, CopyCat, Athena, Narada</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">Frameworks & libraries</td>
                  <td className="p-3">2</td>
                  <td className="p-3">Decide actions - plan, click, type, recover</td>
                  <td className="p-3">Browser Use, Stagehand, Skyvern, LaVague</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">Browser control & protocols</td>
                  <td className="p-3">3</td>
                  <td className="p-3">Send actions to the browser</td>
                  <td className="p-3">Playwright, Puppeteer, CDP</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">Browser-as-a-Service infra</td>
                  <td className="p-3">4</td>
                  <td className="p-3">Hosted cloud browser sessions, proxies, replay</td>
                  <td className="p-3">Browserbase, Anchor, Hyperbrowser</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">Desktop OS control</td>
                  <td className="p-3">5</td>
                  <td className="p-3">Automate non-web UIs, VDI, Citrix</td>
                  <td className="p-3">Cua, SCRAPYBARA</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">Orchestration</td>
                  <td className="p-3">6</td>
                  <td className="p-3">Retries, state, timeouts, audit, SLAs</td>
                  <td className="p-3">Temporal, Inngest, LangGraph</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">Computer Use models</td>
                  <td className="p-3">1</td>
                  <td className="p-3">Policy reasoning</td>
                  <td className="p-3">Claude Computer Use, OpenAI CUA, Gemini 2.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* DECISION FLOW Section */}
        <section className="space-y-6 mb-16">
          <div className="bg-gradient-to-r from-accent/10 to-transparent p-6 rounded-lg border-l-4 border-accent">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Decision Flow</h2>
          </div>

          <Card className="p-6 space-y-6 bg-muted/20">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Is interaction required? (login, forms, upload, pagination)</h3>
              <ul className="space-y-2 ml-4">
                <li className="text-muted-foreground">• <strong>No</strong> - use Firecrawl or similar crawler to fetch content cheaply</li>
                <li className="text-muted-foreground">• <strong>Yes</strong> - go agentic ↓</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Pick control layer:</h3>
              <ul className="space-y-1 ml-4 text-muted-foreground">
                <li>• Browser Use for speed</li>
                <li>• Stagehand for reliability</li>
                <li>• Skyvern for vision-heavy pages</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Pick infrastructure:</h3>
              <ul className="space-y-1 ml-4 text-muted-foreground">
                <li>• Browserbase if you need replay and observability</li>
                <li>• Anchor for simple scalable sessions</li>
                <li>• Hyperbrowser for anti-bot heavy environments</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Pick model:</h3>
              <ul className="space-y-1 ml-4 text-muted-foreground">
                <li>• Claude Computer Use or OpenAI CUA for pixel control</li>
                <li>• Gemini 2.5 for balanced performance</li>
                <li>• Or a strong general LLM for DOM/code stacks</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* COMMON PROBLEMS Section */}
        <section className="space-y-6 mb-16">
          <div className="bg-gradient-to-r from-destructive/10 to-transparent p-6 rounded-lg border-l-4 border-destructive">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">COMMON PROBLEMS</h2>
            <p className="text-muted-foreground leading-relaxed">
              Why do agents still face-plant in production?
            </p>
          </div>

          <Card className="p-6 bg-muted/20">
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-destructive font-bold">•</span>
                <div>
                  <strong className="text-foreground">Timeouts</strong> - long trajectories, slow DOMs, flaky waits
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold">•</span>
                <div>
                  <strong className="text-foreground">Pop-ups & modals</strong> - can't close or mis-detect overlays
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold">•</span>
                <div>
                  <strong className="text-foreground">Captcha & fingerprinting</strong> - infra issues often block agents more than reasoning does
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold">•</span>
                <div>
                  <strong className="text-foreground">Auth flows</strong> - login, MFA, device checks, bot walls
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold">•</span>
                <div>
                  <strong className="text-foreground">Slow execution</strong> - vision loops for trivial steps explode cost & latency
                </div>
              </li>
            </ul>
            <p className="mt-6 font-semibold text-foreground">
              Translation: fix infra first - then policy.
            </p>
          </Card>
        </section>

        {/* RAL LAUNCH Section */}
        <section className="space-y-6 mb-16">
          <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-lg border-l-4 border-primary">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">RAL LAUNCH</h2>
            <p className="text-muted-foreground leading-relaxed">
              Today, we're launching RAL (Reliable Agents Leaderboard) with a focus on agentic control layers + browser infra combinations.
            </p>
          </div>

          <Card className="p-6 space-y-4 bg-muted/20">
            <h3 className="font-semibold text-foreground text-lg">Method - simple and reproducible</h3>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li>• Separate READ vs WRITE task classes</li>
              <li>• 3 canonical flows: login + 2FA, paginate & extract, form submit + upload</li>
              <li>• Require replay video + console + HAR + DOM snapshots per attempt</li>
              <li>• Report: success rate, median steps, p50 time, cost per successful task, human handoff rate</li>
              <li>• Keep proxy, fingerprint, captcha policies identical across runs</li>
              <li>• Log infra vs agent failure root causes</li>
            </ul>
            <p className="pt-4 font-medium text-foreground border-t border-border">
              Why this matters: you can finally compare apples to apples. Frameworks are tested like frameworks. 
              Infra is tested like infra. Models are held constant where appropriate.
            </p>
          </Card>
        </section>

        {/* FUTURE LEADERBOARDS Section */}
        <section className="space-y-6 mb-16">
          <div className="bg-gradient-to-r from-secondary/10 to-transparent p-6 rounded-lg border-l-4 border-secondary">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">FUTURE LEADERBOARDS TO COME</h2>
            <p className="text-muted-foreground">Subscribe to stay updated!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Enterprise agents</h3>
              <p className="text-sm text-muted-foreground">Verticalized flows with compliance, audit, replay, residency</p>
            </Card>
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Consumer agents & AI browsers</h3>
              <p className="text-sm text-muted-foreground">Prosumer UX, speed, utility</p>
            </Card>
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Desktop OS control</h3>
              <p className="text-sm text-muted-foreground">Citrix, legacy thick clients</p>
            </Card>
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Memory services</h3>
              <p className="text-sm text-muted-foreground">Persistence, retrieval, tutoring across repeated tasks</p>
            </Card>
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Anti-bot setups</h3>
              <p className="text-sm text-muted-foreground">Proxies, fingerprints, captchas compared fairly</p>
            </Card>
            <Card className="p-4 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Training environments</h3>
              <p className="text-sm text-muted-foreground">Sandbox replicas for safe RL/SFT on real flows</p>
            </Card>
          </div>
        </section>

        {/* APPENDIX - QUICK FAQ Section */}
        <section className="space-y-6 mb-16">
          <div className="bg-gradient-to-r from-accent/10 to-transparent p-6 rounded-lg border-l-4 border-accent">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">APPENDIX - QUICK FAQ</h2>
          </div>

          <div className="space-y-4">
            <Card className="p-5 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Do I start with a provider-hosted Computer Use model or a framework?</h3>
              <p className="text-sm text-muted-foreground">
                Start with provider-hosted to ship a demo today. Move to framework + infra when you need replay, audits, stealth control, data residency.
              </p>
            </Card>

            <Card className="p-5 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Is pixel better than DOM?</h3>
              <p className="text-sm text-muted-foreground">
                Reading is easy either way. For write-heavy flows, DOM-first plus deterministic code paths often wins on latency and stability - pixel is improving fast.
              </p>
            </Card>

            <Card className="p-5 bg-muted/20">
              <h3 className="font-semibold text-foreground mb-2">Why vertical agents?</h3>
              <p className="text-sm text-muted-foreground">
                Context specialization and narrower action spaces raise reliability - the near-term path to production wins.
              </p>
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
