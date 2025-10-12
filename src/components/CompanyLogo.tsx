import { useState } from 'react';

// Import available logos
import browserbaseLogo from '@/assets/logos/browserbase.png';
import hyperbrowserLogo from '@/assets/logos/hyperbrowser.png';
import playwrightLogo from '@/assets/logos/playwright.png';
import temporalLogo from '@/assets/logos/temporal.png';
import inngestLogo from '@/assets/logos/inngest.png';
import firecrawlLogo from '@/assets/logos/firecrawl.png';
import apifyLogo from '@/assets/logos/apify.png';
import brightdataLogo from '@/assets/logos/brightdata.png';
import browseruseLogo from '@/assets/logos/browseruse.png';
import stagehandLogo from '@/assets/logos/stagehand.png';
import puppeteerLogo from '@/assets/logos/puppeteer.png';
import perplexityLogo from '@/assets/logos/perplexity.png';
import tavilyLogo from '@/assets/logos/tavily.png';
import operaLogo from '@/assets/logos/opera.png';
import zyteLogo from '@/assets/logos/zyte.png';
import scrapyLogo from '@/assets/logos/scrapy.png';
import browserlessLogo from '@/assets/logos/browserless.png';
import triggerdevLogo from '@/assets/logos/triggerdev.png';
import langgraphLogo from '@/assets/logos/langgraph.png';

const logoMap: { [key: string]: string } = {
  'browserbase': browserbaseLogo,
  'hyperbrowser': hyperbrowserLogo,
  'playwright': playwrightLogo,
  'temporal': temporalLogo,
  'inngest': inngestLogo,
  'ingnest': inngestLogo,
  'firecrawl': firecrawlLogo,
  'apify': apifyLogo,
  'bright data': brightdataLogo,
  'browser.ai': brightdataLogo,
  'browser use': browseruseLogo,
  'stagehand': stagehandLogo,
  'director': stagehandLogo,
  'puppeteer': puppeteerLogo,
  'perplexity search api': perplexityLogo,
  'comet': perplexityLogo,
  'tavily': tavilyLogo,
  'opera': operaLogo,
  'zyte.com': zyteLogo,
  'scrapy': scrapyLogo,
  'browserless': browserlessLogo,
  'trigger.dev': triggerdevLogo,
  'langgraph': langgraphLogo,
};

interface CompanyLogoProps {
  companyName: string;
  domain: string;
  categoryColor: string;
  className?: string;
}

export const CompanyLogo = ({ companyName, domain, categoryColor, className = '' }: CompanyLogoProps) => {
  const [errorCount, setErrorCount] = useState(0);
  const cleanName = companyName.toLowerCase().trim();
  
  // Check if we have a local logo
  const localLogo = logoMap[cleanName];
  
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setErrorCount(prev => prev + 1);
    
    if (errorCount === 0 && !localLogo) {
      // Try Clearbit
      img.src = `https://logo.clearbit.com/${domain}`;
    } else if (errorCount === 1) {
      // Try Google favicons
      img.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } else if (errorCount === 2) {
      // Try logo.dev
      img.src = `https://logo.dev/${domain}?token=pk_X-NykimYQeaw19u1busJ7w`;
    } else {
      // Final fallback to letter
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent) {
        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs font-bold" style="color: ${categoryColor}">${companyName.charAt(0)}</div>`;
      }
    }
  };
  
  return (
    <img
      src={localLogo || `https://logo.clearbit.com/${domain}`}
      alt={companyName}
      className={`w-full h-full object-contain ${className}`}
      loading="lazy"
      onError={handleError}
    />
  );
};
