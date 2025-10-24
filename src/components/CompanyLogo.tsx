import { useState } from 'react';

// Import available logos
import apifyLogo from '@/assets/logos/apify.png';
import brightdataLogo from '@/assets/logos/brightdata.png';
import browserbaseLogo from '@/assets/logos/browserbase.png';
import browserlessLogo from '@/assets/logos/browserless.png';
import browseruseLogo from '@/assets/logos/browseruse.png';
import firecrawlLogo from '@/assets/logos/firecrawl.png';
import hyperbrowserLogo from '@/assets/logos/hyperbrowser.png';
import inngestLogo from '@/assets/logos/inngest.png';
import langgraphLogo from '@/assets/logos/langgraph.png';
import operaLogo from '@/assets/logos/opera.png';
import perplexityLogo from '@/assets/logos/perplexity.png';
import playwrightLogo from '@/assets/logos/playwright.png';
import puppeteerLogo from '@/assets/logos/puppeteer.png';
import scrapyLogo from '@/assets/logos/scrapy.png';
import stagehandLogo from '@/assets/logos/stagehand.png';
import tavilyLogo from '@/assets/logos/tavily.png';
import temporalLogo from '@/assets/logos/temporal.png';
import triggerdevLogo from '@/assets/logos/triggerdev.png';
import zyteLogo from '@/assets/logos/zyte.png';
import openaiLogo from '@/assets/logos/openai.png';
import anthropicLogo from '@/assets/logos/anthropic.png';
import chromeLogo from '@/assets/logos/chrome.svg';
import googleLogo from '@/assets/logos/google.png';
import microsoftLogo from '@/assets/logos/microsoft.png';
import amazonLogo from '@/assets/logos/amazon.png';
import skyvernLogo from '@/assets/logos/skyvern-new.png';
import steelLogo from '@/assets/logos/steel-new.png';

const logoMap: { [key: string]: string } = {
  // Frameworks
  'browser use': browseruseLogo,
  'stagehand': stagehandLogo,
  'director': stagehandLogo,
  'director (browserbase)': stagehandLogo,
  'trigger.dev': triggerdevLogo,
  'magnitude.run': triggerdevLogo, // placeholder
  'skyvern': skyvernLogo,
  'steel.dev': steelLogo,
  
  // Libraries
  'playwright': playwrightLogo,
  'puppeteer': puppeteerLogo,
  'scrapy': scrapyLogo,
  
  // Browsers as service
  'browserbase': browserbaseLogo,
  'hyperbrowser': hyperbrowserLogo,
  'browserless': browserlessLogo,
  
  // Infrastructure
  'temporal': temporalLogo,
  'inngest': inngestLogo,
  'ingnest': inngestLogo,
  'langgraph': langgraphLogo,
  
  // Scraping/APIs
  'firecrawl': firecrawlLogo,
  'apify': apifyLogo,
  'bright data': brightdataLogo,
  'browser.ai': brightdataLogo,
  'browser.ai (bright data)': brightdataLogo,
  'tavily': tavilyLogo,
  'zyte': zyteLogo,
  'zyte.com': zyteLogo,
  'perplexity search api': perplexityLogo,
  
  // Computer use models
  'openai operator': openaiLogo,
  'openai computer-using agent (cua)': openaiLogo,
  'chatgpt atlas': openaiLogo,
  'anthropic claude': anthropicLogo,
  'google gemini 2.5 computer use model': googleLogo,
  'google project mariner': googleLogo,
  'google chrome': chromeLogo,
  'amazon nova (acq adept ai)': amazonLogo,
  'microsoft edge copilot': microsoftLogo,
  
  // Browsers
  'opera': operaLogo,
  'perplexity comet browser': perplexityLogo,
  'comet': perplexityLogo,
};

interface CompanyLogoProps {
  companyName: string;
  domain: string;
  categoryColor: string;
  className?: string;
  logoPath?: string;
}

export const CompanyLogo = ({ companyName, domain, categoryColor, className = '', logoPath }: CompanyLogoProps) => {
  const [errorCount, setErrorCount] = useState(0);
  const cleanName = companyName.toLowerCase().trim();
  
  // Check if we have a local logo
  const localLogo = logoMap[cleanName];
  
  // Priority: local logo > Clearbit (ignore CSV logoPath as they're not reliable)
  const initialSrc = localLogo || `https://logo.clearbit.com/${domain}`;
  
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
      img.src = `https://img.logo.dev/${domain}?token=pk_X-NykimYQeaw19u1busJ7w&size=200`;
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
      src={initialSrc}
      alt={companyName}
      className={`w-full h-full object-contain ${className}`}
      loading="lazy"
      onError={handleError}
    />
  );
};
