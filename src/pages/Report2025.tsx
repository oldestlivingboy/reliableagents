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
      <div className="container mx-auto max-w-6xl px-4 py-6 md:py-12">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <header className="space-y-3 md:space-y-4 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            The Current State of Agentic Web Automation
          </h1>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
            A comprehensive market map of companies and tools enabling AI agents to 
            interact with the web and browsers.
          </p>
        </header>

        <section className="space-y-6 md:space-y-8">
          <div className="prose prose-sm md:prose-base max-w-none">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Market Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The agentic web automation space is rapidly evolving, with solutions spanning 
              from consumer-facing browsers to enterprise infrastructure. This market map 
              categorizes {marketMap.reduce((sum, cat) => sum + cat.companies.length, 0)} 
              companies and tools across {marketMap.length} key categories.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {marketMap.map((category, idx) => (
              <Card 
                key={idx} 
                className="p-4 md:p-6"
                style={{ borderLeft: `4px solid ${category.color}` }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="shrink-0">
                      {category.companies.length} {category.companies.length === 1 ? 'company' : 'companies'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.companies.map((company, companyIdx) => (
                      <div
                        key={companyIdx}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <div 
                            className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                            style={{ backgroundColor: category.color }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm text-foreground truncate">
                              {company.name}
                            </p>
                            {company.oneLiner && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {company.oneLiner}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border">
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © 2025 Reliable Agents Leaderboard. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Report2025;
