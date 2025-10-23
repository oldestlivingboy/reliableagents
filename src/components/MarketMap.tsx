import { useState, useEffect } from "react";
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

export const MarketMap = () => {
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
      const lines = csvText.split('\n').slice(1);
      
      const categoriesMap = new Map<string, Company[]>();
      
      lines.forEach(line => {
        if (!line.trim()) return;
        
        const parts = line.split(',');
        if (parts.length < 3) return;
        
        const name = parts[0]?.replace(/^﻿/, '').trim();
        const categoryRaw = parts[2]?.trim();
        const oneLiner = parts[4]?.trim() || '';
        
        if (!name || !categoryRaw) return;
        
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
  );
};