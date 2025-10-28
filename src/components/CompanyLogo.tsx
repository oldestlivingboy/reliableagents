import { useState } from 'react';

// Import available logos
import apifyLogo from '@/assets/logos/apify.png';
import brightdataLogo from '@/assets/logos/brightdata.png';
import browserbaseLogo from '@/assets/logos/browserbase.png';
import browserlessLogo from '@/assets/logos/browserless.png';
import browseruseLogo from '@/assets/logos/browseruse.png';
import skyvernLogo from '@/assets/logos/skyvern-new.png';
import exaLogo from '@/assets/logos/exa.png';
import salesforceLogo from '@/assets/logos/salesforce.png';
import pleaseLogo from '@/assets/logos/please.png';
import firecrawlLogo from '@/assets/logos/firecrawl.png';
import hyperbrowserLogo from '@/assets/logos/hyperbrowser.png';
import inngestLogo from '@/assets/logos/inngest.png';
import langgraphLogo from '@/assets/logos/langgraph.png';
import operaLogo from '@/assets/logos/opera.png';
import perplexityLogo from '@/assets/logos/perplexity.png';
import playwrightLogo from '@/assets/logos/playwright-new.svg';
import puppeteerLogo from '@/assets/logos/puppeteer.png';
import stagehandLogo from '@/assets/logos/stagehand.png';
import tavilyLogo from '@/assets/logos/tavily.png';
import temporalLogo from '@/assets/logos/temporal.png';
import triggerdevLogo from '@/assets/logos/triggerdev.png';
import zyteLogo from '@/assets/logos/zyte.png';
import openaiLogo from '@/assets/logos/openai.png';
import anthropicLogo from '@/assets/logos/anthropic.png';
import chromeLogo from '@/assets/logos/chrome.svg';
import googleLogo from '@/assets/logos/google.png';
import microsoftLogo from '@/assets/logos/microsoft-copilot.png';
import amazonLogo from '@/assets/logos/amazon.png';
import atlasLogo from '@/assets/logos/atlas.jpg';
import magnitudeLogo from '@/assets/logos/magnitude.png';
import simularLogo from '@/assets/logos/simular.png';
import steelLogo from '@/assets/logos/steel-new.png';
import morphLogo from '@/assets/logos/morph.png';
import halluminateLogo from '@/assets/logos/halluminate.svg';
import lightpandaLogo from '@/assets/logos/lightpanda.png';
import anonLogo from '@/assets/logos/anon-new.png';
import riveterhqLogo from '@/assets/logos/riveterhq.png';
import kaizenLogo from '@/assets/logos/kaizen.png';
import omniparserLogo from '@/assets/logos/omniparser.png';
import notteLogo from '@/assets/logos/notte-new.png';
import kuraLogo from '@/assets/logos/kura.png';
import emergenceLogo from '@/assets/logos/emergence-new.png';
import twinLogo from '@/assets/logos/twin-new.svg';
import naradaLogo from '@/assets/logos/narada.svg';
import athenaLogo from '@/assets/logos/athena.png';
import copycatLogo from '@/assets/logos/copycat.png';
import hcompanyLogo from '@/assets/logos/h-company.svg';
import basepilotLogo from '@/assets/logos/basepilot.png';
import asteroidLogo from '@/assets/logos/asteroid.webp';
import manusLogo from '@/assets/logos/manus.svg';
import nanobrowserLogo from '@/assets/logos/nanobrowser.png';
import generalagentsLogo from '@/assets/logos/generalagents.svg';
import godmodeLogo from '@/assets/logos/godmode.png';
import convergenceLogo from '@/assets/logos/convergence.png';
import dexLogo from '@/assets/logos/dex.svg';
import scrapybaraLogo from '@/assets/logos/scrapybara.png';
import cuaLogo from '@/assets/logos/cua-new.png';
import opencuaLogo from '@/assets/logos/opencua-new.png';
import lavagueLogo from '@/assets/logos/lavague.png';
import anchorLogo from '@/assets/logos/anchor.svg';
import kernelLogo from '@/assets/logos/kernel.svg';
import jsonifyLogo from '@/assets/logos/jsonify.png';
import sentiusLogo from '@/assets/logos/sentius.png';
import parseraLogo from '@/assets/logos/parsera.png';
import microsoftEdgeCopilotLogo from '@/assets/logos/microsoft-edge-copilot.png';
import cometLogo from '@/assets/logos/comet.png';

const logoMap: { [key: string]: string } = {
  // Frameworks
  'browser use': browseruseLogo,
  'stagehand': stagehandLogo,
  'director': stagehandLogo,
  'director (browserbase)': stagehandLogo,
  'trigger.dev': triggerdevLogo,
  'magnitude.run': magnitudeLogo,
  'simular': simularLogo,
  'skyvern': skyvernLogo,
  
  // Libraries & specialized
  'playwright': playwrightLogo,
  'puppeteer': puppeteerLogo,
  'scrapybara': scrapybaraLogo,
  'cua': cuaLogo,
  'lavague': lavagueLogo,
  'opencua': opencuaLogo,
  
  // Browsers as service
  'browserbase': browserbaseLogo,
  'steel.dev': steelLogo,
  'browserless': browserlessLogo,
  'kernel': kernelLogo,
  'anchor browser': anchorLogo,
  'hyperbrowser': hyperbrowserLogo,
  
  // Infrastructure
  'morph.so': morphLogo,
  'halluminate': halluminateLogo,
  'lightpanda': lightpandaLogo,
  'temporal': temporalLogo,
  'inngest': inngestLogo,
  'langgraph': langgraphLogo,
  'anon': anonLogo,
  
  // Scraping/APIs
  'riveterhq': riveterhqLogo,
  'zyte': zyteLogo,
  'zyte.com': zyteLogo,
  'parsera': parseraLogo,
  'exa.ai': exaLogo,
  'tavily': tavilyLogo,
  'kaizen': kaizenLogo,
  'firecrawl': firecrawlLogo,
  'apify': apifyLogo,
  'bright data': brightdataLogo,
  'browser.ai': brightdataLogo,
  'browser.ai (bright data)': brightdataLogo,
  'omniparser': omniparserLogo,
  'perplexity search api': perplexityLogo,
  
  // Computer use models
  'openai operator': openaiLogo,
  'openai computer-using agent (cua)': openaiLogo,
  'anthropic claude': anthropicLogo,
  'google gemini 2.5 computer use model': googleLogo,
  'google project mariner': googleLogo,
  'amazon nova (acq adept ai)': amazonLogo,
  'axiom-1 by induction labs': openaiLogo,
  
  // Enterprise automation
  'notte.cc': notteLogo,
  'kura ai': kuraLogo,
  'emergence': emergenceLogo,
  'twin': twinLogo,
  'narada': naradaLogo,
  'athena intelligence': athenaLogo,
  'copycat': copycatLogo,
  'h': hcompanyLogo,
  'h (h company)': hcompanyLogo,
  'basepilot': basepilotLogo,
  'asteroid': asteroidLogo,
  'jsonify': jsonifyLogo,
  'sentius ai': sentiusLogo,
  
  // Consumer automation
  'manus': manusLogo,
  'nanobrowser': nanobrowserLogo,
  'general agents': generalagentsLogo,
  'godmode ai': godmodeLogo,
  'dex': dexLogo,
  'dex (thirdlayer)': dexLogo,
  'please': pleaseLogo,
  
  // Enterprise automation
  'salesforce (acq. convergence)': salesforceLogo,
  
  // Browsers
  'google chrome': chromeLogo,
  'microsoft edge copilot': microsoftEdgeCopilotLogo,
  'perplexity comet browser': cometLogo,
  'comet': cometLogo,
  'opera': operaLogo,
  'chatgpt atlas': atlasLogo,
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
