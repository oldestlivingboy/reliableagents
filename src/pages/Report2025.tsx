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
  logoPath?: string;
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
      '2. Browser use libraries': BookOpen,
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
      '2. Browser use libraries': 2,
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
      // Add cache busting to force reload
      const response = await fetch(`/market-map.csv?v=${Date.now()}`);
      const csvText = await response.text();
      
      console.log('CSV loaded, first 200 chars:', csvText.substring(0, 200));
      
      // Use Papa Parse for proper CSV parsing
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });
      
      console.log('Parsed data sample:', parsed.data.slice(0, 2));
      console.log('Column headers:', parsed.meta.fields);
      
      const categoriesMap = new Map<string, Company[]>();
      
      parsed.data.forEach((row: any) => {
        const name = row['Company / Tool']?.trim();
        const categoryRaw = row['Categories']?.trim();
        const oneLiner = row['One-liner']?.trim() || '';
        const logoPath = row['Logo Path']?.trim() || '';
        
        if (!name || !categoryRaw) {
          console.log('Skipping row - missing name or category:', row);
          return;
        }
        
        // Skip if logo is "No distinct logo" or "N/A"
        const validLogoPath = (logoPath && logoPath !== 'No distinct logo' && logoPath !== 'N/A') ? logoPath : undefined;
        
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
            oneLiner,
            logoPath: validLogoPath
          });
        });
      });

      console.log('Categories found:', Array.from(categoriesMap.keys()));
      console.log('Total companies processed:', Array.from(categoriesMap.values()).reduce((sum, arr) => sum + arr.length, 0));

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

          {/* Market map with side axis */}
          <div className="relative bg-white dark:bg-gray-950 rounded-2xl p-6 md:p-8 border border-border/20">
            <div className="flex gap-8 items-stretch">
              {/* Vertical axis - clean and minimal */}
              <div className="relative flex flex-col items-center justify-between py-8 w-12 flex-shrink-0 min-h-[700px]">
                {/* Top label */}
                <div className="text-center space-y-2">
                  <div className="text-xs font-medium text-foreground/60">Dev Tools</div>
                  <div className="text-[10px] text-muted-foreground">(bottom of stack)</div>
                </div>
                
                {/* Thin vertical line */}
                <div className="flex-1 relative w-[2px] bg-gradient-to-b from-primary/40 via-primary/30 to-primary/40 my-4" />
                
                {/* Simple arrow */}
                <div className="relative">
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-primary/60" />
                </div>
                
                {/* Bottom label */}
                <div className="text-center space-y-2 mt-2">
                  <div className="text-[10px] text-muted-foreground">(top of stack)</div>
                  <div className="text-xs font-medium text-foreground/60">Consumer Tools</div>
                </div>
              </div>

              {/* Categories - redesigned with better organization */}
              <div className="flex-1 space-y-6">
                {/* Categories 1-3: 3-column grid */}
                <div className="grid grid-cols-3 gap-4">
                  {marketMap.slice(0, 3).map((category, idx) => {
                    const CategoryIcon = getCategoryIcon(category.name);
                    return (
                    <div key={idx} className="space-y-3 p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                  <h3 className="text-xs font-semibold text-foreground">
                    {category.name.replace(/^\d+\.\s*/, '')}
                  </h3>
                  <span className="text-[10px] text-muted-foreground">
                    ({category.companies.length})
                  </span>
                </div>
                      
                      <div className="grid grid-cols-4 gap-1.5">
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
                            className="group flex flex-col items-center gap-1 transition-all duration-200 hover:scale-105 relative"
                            title={`${company.name}${company.oneLiner ? ': ' + company.oneLiner : ''}${isMultiCategory ? ' (appears in ' + categoryCount + ' categories)' : ''}`}
                          >
                            <div className={`w-11 h-11 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-1.5 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
                              <CompanyLogo
                                companyName={company.name}
                                domain={domain}
                                categoryColor={category.color}
                              />
                            </div>
                            {isMultiCategory && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary/90 rounded-full border-2 border-background flex items-center justify-center shadow-sm">
                                <span className="text-[8px] font-bold text-primary-foreground">{categoryCount}</span>
                              </div>
                            )}
                            <span className="text-[9px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-tight w-full px-0.5">
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

              {/* Categories 4-6: 3-column grid */}
              <div className="grid grid-cols-3 gap-4">
                {marketMap.slice(3, 6).map((category, idx) => {
                  const CategoryIcon = getCategoryIcon(category.name);
                  return (
                  <div key={idx} className="space-y-3 p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                      <h3 className="text-xs font-semibold text-foreground">
                        {category.name.replace(/^\d+\.\s*/, '')}
                      </h3>
                      <span className="text-[10px] text-muted-foreground">
                        ({category.companies.length})
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2">
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
                          className="group flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-105 relative"
                          title={`${company.name}${company.oneLiner ? ': ' + company.oneLiner : ''}${isMultiCategory ? ' (appears in ' + categoryCount + ' categories)' : ''}`}
                        >
                          <div className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
                            <CompanyLogo
                              companyName={company.name}
                              domain={domain}
                              categoryColor={category.color}
                            />
                          </div>
                          {isMultiCategory && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary/90 rounded-full border-2 border-background flex items-center justify-center shadow-sm">
                              <span className="text-[8px] font-bold text-primary-foreground">{categoryCount}</span>
                            </div>
                          )}
                          <span className="text-[8px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-tight w-full tracking-tight">
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

            {/* Category 7: Computer use models - separate full width */}
            {marketMap.slice(6, 7).map((category, idx) => {
              const CategoryIcon = getCategoryIcon(category.name);
              return (
              <div key={idx} className="space-y-3 p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                  <h3 className="text-xs font-semibold text-foreground">
                    {category.name.replace(/^\d+\.\s*/, '')}
                  </h3>
                  <span className="text-[10px] text-muted-foreground">
                    ({category.companies.length})
                  </span>
                </div>
                
                <div className="grid grid-cols-12 gap-2">
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
                      className="group flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-105 relative"
                      title={`${company.name}${company.oneLiner ? ': ' + company.oneLiner : ''}${isMultiCategory ? ' (appears in ' + categoryCount + ' categories)' : ''}`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
                        <CompanyLogo
                          companyName={company.name}
                          domain={domain}
                          categoryColor={category.color}
                        />
                      </div>
                      {isMultiCategory && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary/90 rounded-full border-2 border-background flex items-center justify-center shadow-sm">
                          <span className="text-[8px] font-bold text-primary-foreground">{categoryCount}</span>
                        </div>
                      )}
                      <span className="text-[8px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-tight w-full tracking-tight">
                      {company.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
          );
          })}

          {/* Category 8: Enterprise automation - full width */}
          {marketMap.slice(7, 8).map((category, idx) => {
            const CategoryIcon = getCategoryIcon(category.name);
            return (
            <div key={idx} className="space-y-3 p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
              <div className="flex items-center gap-2">
                <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                <h3 className="text-xs font-semibold text-foreground">
                  {category.name.replace(/^\d+\.\s*/, '')}
                </h3>
                <span className="text-[10px] text-muted-foreground">
                  ({category.companies.length})
                </span>
              </div>
              
                <div className="grid grid-cols-12 gap-2">
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
                      className="group flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-105 relative"
                      title={`${company.name}${company.oneLiner ? ': ' + company.oneLiner : ''}${isMultiCategory ? ' (appears in ' + categoryCount + ' categories)' : ''}`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
                        <CompanyLogo
                          companyName={company.name}
                          domain={domain}
                          categoryColor={category.color}
                        />
                      </div>
                      {isMultiCategory && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary/90 rounded-full border-2 border-background flex items-center justify-center shadow-sm">
                          <span className="text-[8px] font-bold text-primary-foreground">{categoryCount}</span>
                        </div>
                      )}
                      <span className="text-[8px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-tight w-full tracking-tight">
                      {company.name}
                    </span>
                  </a>
                );
              })}
            </div>
        </div>
        );
        })}

        {/* Categories 9-10: Consumer automation and browsers - on same line */}
        <div className="grid grid-cols-2 gap-4">
          {marketMap.slice(8, 10).map((category, idx) => {
            const CategoryIcon = getCategoryIcon(category.name);
            return (
            <div key={idx} className="space-y-3 p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
              <div className="flex items-center gap-2">
                <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                <h3 className="text-xs font-semibold text-foreground">
                  {category.name.replace(/^\d+\.\s*/, '')}
                </h3>
                <span className="text-[10px] text-muted-foreground">
                  ({category.companies.length})
                </span>
              </div>
              
              <div className="grid grid-cols-6 gap-2">
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
                    className="group flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-105 relative"
                    title={`${company.name}${company.oneLiner ? ': ' + company.oneLiner : ''}${isMultiCategory ? ' (appears in ' + categoryCount + ' categories)' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
                      <CompanyLogo
                        companyName={company.name}
                        domain={domain}
                        categoryColor={category.color}
                      />
                    </div>
                    {isMultiCategory && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary/90 rounded-full border-2 border-background flex items-center justify-center shadow-sm">
                        <span className="text-[8px] font-bold text-primary-foreground">{categoryCount}</span>
                      </div>
                    )}
                    <span className="text-[8px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-tight w-full tracking-tight">
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
            </div>
          </div>
        </section>

        {/* WHERE TO START Section */}
        <section className="space-y-12 mb-24 max-w-4xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Where to Start</h2>
            <p className="text-base text-foreground/70 leading-relaxed">
              Practical tips for navigating the map and building your stack
            </p>
          </div>

          {/* Building Your Stack */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Building Your Stack</h3>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-base">
              <p>
                The market map shows <strong>10 categories</strong>, but developers should focus on the first <strong>8 categories</strong> (1–8) to build their stack. 
                Categories 9–10 are consumer-facing products. Here's how to think through categories 1–8:
              </p>
            </div>
            <div className="space-y-1 bg-muted/30 rounded-2xl p-8 border border-border/40">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">1</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Browser use frameworks</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Start here: Stagehand, Browser Use, Skyvern, etc. These are your "React" — they decide what action to take next.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">2</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Browser use libraries</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Playwright, Puppeteer, CDP — these send actions to the browser. Most frameworks use these under the hood.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">3</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Specialized browser use</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">LaVague, Cua, SCRAPYBARA for specialized control or desktop OS access when there's no DOM.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">4</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Browsers as a service</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Browserbase, Anchor, Hyperbrowser — your "Vercel". Decide where your framework runs (local or cloud).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">5</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Supporting infrastructure</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Temporal, Inngest, LangGraph for orchestration, retries, state. Anon for secure auth.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">6</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Scraping & crawling APIs</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Firecrawl, Apify, Zyte — use these if you don't need interaction. Cheaper and faster than agents.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">7</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Computer use models</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Claude Computer Use, OpenAI CUA, Gemini 2.5 — foundation models that power your agent's brain.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-sm shrink-0 w-8">8</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Enterprise automation</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Narada, twin, H — full-stack enterprise solutions if you want an all-in-one platform.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-border/50">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <span className="font-semibold">Key insight:</span> Pick your framework first (category 1), then pick where it runs (category 4). 
                  Treat frameworks like your "React" and browser services like your "Vercel".
                </p>
              </div>
            </div>
          </div>

          {/* Decision Flow */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Decision Flow</h3>

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
            <h3 className="text-xl font-semibold text-foreground">Common Problems</h3>
            <p className="text-base text-foreground/70">
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
            <h3 className="text-xl font-semibold text-foreground">FAQ</h3>

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

        {/* FUTURE LEADERBOARDS CTA */}
        <section className="mb-12 max-w-5xl">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-10 border border-primary/20">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Help Shape the Future</h2>
                <p className="text-base text-foreground/70 leading-relaxed">
                  Vote for which leaderboard you'd like to see next
                </p>
              </div>

              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Vote on the Homepage
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-border mt-12">
          <div className="container mx-auto max-w-3xl px-4 py-8 pb-4">
            <div className="flex flex-col items-center gap-6">
              <div className="text-center space-y-1 max-w-2xl mx-auto">
                <p className="text-base font-semibold text-foreground">
                  Reliable Agents
                </p>
                <p className="text-xs text-muted-foreground">
                  Empowering agentic developers worldwide
                </p>
              </div>
              
              <div className="space-y-3 text-xs max-w-2xl mx-auto">
                <p className="text-muted-foreground text-center leading-relaxed">
                  Created by{" "}
                  <a 
                    href="https://www.linkedin.com/in/ednevsky/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                  >
                    🚀 Alex
                  </a>
                  , a repeat AI founder with an exit and creator of{" "}
                  <a 
                    href="https://nocap.so" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                  >
                    No Cap
                  </a>
                  , a viral AI investing agent,{" "}
                  <br className="hidden sm:inline" />
                  and{" "}
                  <a 
                    href="https://www.linkedin.com/in/briansehn/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                  >
                    🌐 Brian
                  </a>
                  , the first DevRel at Google and founder of multiple browser-related companies.
                </p>
              </div>
              
              <p className="text-[10px] text-muted-foreground/50 max-w-2xl mx-auto">
                © 2025 All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Report2025;
