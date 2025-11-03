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
      'massive': 'https://www.joinmassive.com/',
      'jsonify': 'https://jsonify.com/',
      'successors.ai': 'https://www.sentius.ai/',
      'parsera': 'https://parsera.org/',
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
      '2. Low-level/specialized browser use': BookOpen,
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
      '2. Low-level/specialized browser use': 2,
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
          <Button variant="ghost" className="mb-6 md:mb-8 -ml-2 md:-ml-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
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
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Market Map (as of Q4 2025)</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An interactive overview of the agentic browser/computer use landscape - of course, vibe coded, generated & maintained using browser automation 🫡
            </p>
            
            {/* Contact info - prominent */}
            <div className="inline-flex items-center gap-2 text-xs bg-primary/5 hover:bg-primary/10 px-4 py-2.5 rounded-lg border border-primary/20 transition-colors">
              <span className="text-muted-foreground">📧 Corrections or updates?</span>
              <a 
                href="mailto:ednevsky+ra@gmail.com" 
                className="text-foreground hover:text-primary transition-colors font-medium underline decoration-primary/30 hover:decoration-primary underline-offset-2"
              >
                ednevsky+ra@gmail.com
              </a>
            </div>
          </div>

          {/* Market map with side axis */}
          <div className="relative bg-white dark:bg-gray-950 rounded-2xl p-4 md:p-6 lg:p-8 border border-border/20">
            <div className="flex gap-4 md:gap-8 items-stretch">
              {/* Vertical axis - hidden on mobile, visible on desktop */}
              <div className="hidden lg:flex relative flex-col items-center justify-between py-8 w-12 flex-shrink-0 min-h-[700px]">
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
              <div className="flex-1 space-y-4 md:space-y-6">
                {/* Categories 1-2: 2-column grid on desktop, stack on mobile */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 md:gap-4">
                  {marketMap.slice(0, 2).map((category, idx) => {
                    const CategoryIcon = getCategoryIcon(category.name);
                    return (
                    <div key={idx} className="space-y-3 p-3 md:p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                  <h3 className="text-xs md:text-sm font-semibold text-foreground">
                    {category.name.replace(/^\d+\.\s*/, '')}
                  </h3>
                  <span className="text-[10px] text-muted-foreground">
                    ({category.companies.length})
                  </span>
                </div>
                      
                      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-2">
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
                            <div className={`w-14 h-14 sm:w-11 sm:h-11 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2 sm:p-1.5 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
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

              {/* Categories 4-6: 3-column grid on desktop, stack on mobile */}
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 md:gap-4">
                {marketMap.slice(2, 5).map((category, idx) => {
                  const CategoryIcon = getCategoryIcon(category.name);
                  return (
                  <div key={idx} className="space-y-3 p-3 md:p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                      <h3 className="text-xs md:text-sm font-semibold text-foreground">
                        {category.name.replace(/^\d+\.\s*/, '')}
                      </h3>
                      <span className="text-[10px] text-muted-foreground">
                        ({category.companies.length})
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-2">
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
                          <div className={`w-14 h-14 sm:w-12 sm:h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2.5 sm:p-2 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
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
            {marketMap.slice(5, 6).map((category, idx) => {
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
                
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-2">
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
                      <div className={`w-14 h-14 sm:w-12 sm:h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2.5 sm:p-2 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
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
          {marketMap.slice(6, 7).map((category, idx) => {
            const CategoryIcon = getCategoryIcon(category.name);
            return (
            <div key={idx} className="space-y-3 p-3 md:p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
              <div className="flex items-center gap-2">
                <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                <h3 className="text-xs md:text-sm font-semibold text-foreground">
                  {category.name.replace(/^\d+\.\s*/, '')}
                </h3>
                <span className="text-[10px] text-muted-foreground">
                  ({category.companies.length})
                </span>
              </div>
              
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-2">
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
                      <div className={`w-14 h-14 sm:w-12 sm:h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2.5 sm:p-2 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
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

        {/* Categories 9-10: Consumer automation and browsers - 2 columns on desktop, stack on mobile */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 md:gap-4">
          {marketMap.slice(7, 9).map((category, idx) => {
            const CategoryIcon = getCategoryIcon(category.name);
            return (
            <div key={idx} className="space-y-3 p-3 md:p-4 rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted/10 shadow-sm">
              <div className="flex items-center gap-2">
                <CategoryIcon className="w-4 h-4 text-primary" strokeWidth={2} />
                <h3 className="text-xs md:text-sm font-semibold text-foreground">
                  {category.name.replace(/^\d+\.\s*/, '')}
                </h3>
                <span className="text-[10px] text-muted-foreground">
                  ({category.companies.length})
                </span>
              </div>
              
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-2">
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
                    <div className={`w-14 h-14 sm:w-12 sm:h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden p-2.5 sm:p-2 transition-all duration-200 ${isMultiCategory ? 'ring-2 ring-primary/20 shadow-sm' : 'border border-border/20 group-hover:border-primary/30 group-hover:shadow-sm'}`}>
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

        {/* AUTOMATION PLAYBOOK Section */}
        <section className="space-y-12 mb-24 max-w-4xl">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Automation Playbook</h2>
            <p className="text-sm text-muted-foreground">
              Practical tips for navigating the map and building your stack
            </p>
          </div>

          {/* Building Your Stack */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Building Your Stack</h3>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-base">
              <p>
                The market map shows nine categories, but developers should focus on the first seven to build their stack. 
                The last two are consumer-facing products. Here's how to think through the developer categories:
              </p>
            </div>
            <div className="space-y-1 bg-muted/30 rounded-2xl p-8 border border-border/40">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">1. Browser use frameworks</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Browser Use, Skyvern — a convenient abstraction layer for you to work at, like React is for web development</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">2. Low-level/specialized browser use</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Playwright, Puppeteer, LaVague, Stagehand — automation runtimes that issue browser commands and specialized frameworks for OS access or other control when there's no DOM</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">3. Browsers as a service</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Browserbase, Anchor, Hyperbrowser — cloud infrastructure for your browsers, analogous to Vercel for web hosting</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">4. Supporting infrastructure</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Temporal, Inngest, LangGraph, Anon — orchestration, retries, state, and secure authentication. Massive for ethical proxy networks. Extruct.ai for data extraction</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">5. Scraping & crawling APIs</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Firecrawl, Apify, Zyte — mostly "read-only" web extraction that can be more economical than a fully interactive agent</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">6. Computer use models</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Claude Computer Use, OpenAI CUA, Gemini 2.5 — foundation models that serve as your agent's brain</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">7. Enterprise automation</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Narada, twin, H — full-stack enterprise solutions if you want an all-in-one platform.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-border/50">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <span className="font-semibold">Key insight:</span> Choose a framework first (category 1), then choose where to host the framework (category 3). 
                  Think of browser use frameworks like web frameworks (e.g., React) and browsers as a service like hosting platforms (e.g., Vercel).
                </p>
              </div>
            </div>
          </div>

          {/* Decision Flow */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Decision Flow</h3>

            <div className="bg-muted/30 rounded-2xl p-8 border border-border/40 space-y-8">
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-base">Is interaction required? <span className="text-sm text-muted-foreground font-normal">(login, form submission, file upload, pagination)</span></h3>
                <div className="space-y-2 ml-4 text-sm">
                  <p className="text-muted-foreground"><span className="font-semibold text-foreground">No</span> → consider scraping tools (category 5) to fetch content cheaply</p>
                  <p className="text-muted-foreground"><span className="font-semibold text-foreground">Yes</span> → go agentic ↓</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-base">Pick control layer <span className="text-sm text-muted-foreground font-normal">(category 1: Browser use frameworks)</span></h3>
                <ul className="space-y-1.5 ml-4 text-sm text-muted-foreground">
                  <li>• Options include Browser Use, Stagehand, or Skyvern depending on your needs</li>
                  <li>• Consider speed vs. reliability tradeoffs</li>
                  <li>• Vision-based approaches may work better for certain page types</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-base">Pick infrastructure <span className="text-sm text-muted-foreground font-normal">(category 4: Browsers as a service)</span></h3>
                <ul className="space-y-1.5 ml-4 text-sm text-muted-foreground">
                  <li>• Options include Browserbase, Anchor, or Hyperbrowser</li>
                  <li>• Consider needs like replay, observability, session management, and anti-bot capabilities</li>
                  <li>• Some use cases may benefit from local development before moving to cloud</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-base">Pick model <span className="text-sm text-muted-foreground font-normal">(category 7: Computer use models)</span></h3>
                <ul className="space-y-1.5 ml-4 text-sm text-muted-foreground">
                  <li>• Options include Claude Computer Use, OpenAI CUA, or Gemini 2.5</li>
                  <li>• Pixel-based control vs. DOM-based approaches have different strengths</li>
                  <li>• Consider cost, latency, and accuracy tradeoffs for your use case</li>
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
                  <p className="font-semibold text-foreground mb-1">Captchas & bot detection</p>
                  <p className="text-sm text-muted-foreground">Gatekeepers like Cloudflare, Google, and DataDome are increasingly limiting automated access with fingerprinting and behavioral scoring.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Timeouts & race conditions</p>
                  <p className="text-sm text-muted-foreground">Nondeterministic server responsiveness and network latency disrupt any brittle, timing-dependent logic and expectations.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Layout & selector drift</p>
                  <p className="text-sm text-muted-foreground">DOM heuristics that once worked break as sites update normally or randomize their elements on purpose.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Authentication & checkout flows</p>
                  <p className="text-sm text-muted-foreground">Current models can struggle when attempting complex, stateful interactions like submitting login or payment forms.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Cost & scaling constraints</p>
                  <p className="text-sm text-muted-foreground">Browsers have expensive CPU and memory demands, vision or perception loops add cost, and managing many concurrent sessions is nontrivial.</p>
                </div>
              </div>
            </div>

            {/* Static Consultation Widget */}
            <div 
              className="bg-muted/30 rounded-xl p-6 border border-border/40 cursor-pointer hover:border-primary/40 transition-colors"
              data-cal-link="oldestlivingboy/reliableagents"
              data-cal-namespace="reliableagents"
              data-cal-config='{"layout":"month_view"}'
            >
              <h4 className="font-semibold text-foreground mb-3 text-base">
                Running into any of these problems and want to talk through how to solve them?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Grab a free expert consultation — we'll help accelerate your agent development and you'll help us learn more to improve this resource{" "}
                <span className="font-medium text-primary">(slots are limited)</span>.
              </p>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">FAQ</h3>

            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
                <h4 className="font-semibold text-foreground mb-3 text-base">Should you start with a computer-use model or lower-level infrastructure layer or framework?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If your goal is to ship a demo quickly, starting with a managed computer-use model makes sense. As you productionize your agent and need more control, you can move down the stack to an infrastructure layer or framework that exposes fingerprint management, session replay, data residency, and other advanced features.
                </p>
              </div>

              <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
                <h4 className="font-semibold text-foreground mb-3 text-base">Does DOM- or vision-based interaction perform better?</h4>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    DOM automation has historically outperformed vision automation in speed, robustness, and maintenance cost.<a href="https://sepl.dibris.unige.it/publications/2014-leotta-ICWE.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] align-super text-primary hover:underline">1</a> However, hybrid approaches that use the DOM when possible and fall back to vision have been gaining traction<a href="https://aclanthology.org/2025.findings-acl.1158.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] align-super text-primary hover:underline">2</a> and vision-only approaches are also improving rapidly<a href="https://cs231n.stanford.edu/papers/text_file_840592471-CS_231N_Final_Report.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] align-super text-primary hover:underline">3</a>.
                  </p>
                  <div className="pt-3 border-t border-border/30 mt-3 space-y-1.5 text-[11px]">
                    <p>1. <a href="https://sepl.dibris.unige.it/publications/2014-leotta-ICWE.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">Visual vs. DOM-based Web Locators: An Empirical Study</a>, Maurizio Leotta et al.</p>
                    <p>2. <a href="https://aclanthology.org/2025.findings-acl.1158.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">GUI Agents: A Survey</a>, Dang Nguyen et al.</p>
                    <p>3. <a href="https://cs231n.stanford.edu/papers/text_file_840592471-CS_231N_Final_Report.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">WebSight: A Vision-First Architecture for Robust Web Agents</a>, Tanvir Bhathal and Asanshay Gupta</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
                <h4 className="font-semibold text-foreground mb-3 text-base">Why vertical agents?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Context specialization and narrower action spaces raise reliability - the near-term path to production wins.
                </p>
              </div>
            </div>
          </div>

          {/* Things To Come */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Things To Come</h3>
            <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
              <p className="text-sm text-muted-foreground leading-relaxed">
                We're working on a number of benchmarks —{" "}
                <a 
                  href="/#voting" 
                  className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-2"
                >
                  vote for the one you think we should prioritize on the home page
                </a>
                .
              </p>
            </div>
          </div>
        </section>


        {/* Visual separator before footer */}
        <div className="mt-32 mb-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <footer className="pt-8">
          <div className="container mx-auto max-w-3xl px-4 pb-8">
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
                  Made by{" "}
                  <a 
                    href="https://www.linkedin.com/in/ednevsky/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                  >
                    🚀 Alex
                  </a>
                  , repeat founder with an AI exit and creator of{" "}
                  <a 
                    href="https://nocap.so" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                  >
                    No Cap
                  </a>
                , viral AI investing agent,{" "}
                <br className="hidden sm:inline" />
                and{" "}
                <a 
                  href="https://oldestlivingboy.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
                >
                  🌐 Brian
                </a>
                , first devrel engineer at Google and founder of two profitable browser-related companies.
                </p>
              </div>
              
              <p className="text-[10px] text-muted-foreground/50 max-w-2xl mx-auto">
                © 2025 Some rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Report2025;
