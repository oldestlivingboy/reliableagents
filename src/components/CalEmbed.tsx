import { useEffect, useState } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export const CalEmbed = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
    
    if (existingScript) {
      // Script already loaded, just initialize
      if (window.Cal) {
        initializeCal();
      }
      return;
    }

    // Load Cal.com script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.type = "text/javascript";
    
    script.onload = () => {
      setIsLoaded(true);
      // Wait a bit for Cal to be fully ready
      setTimeout(() => {
        initializeCal();
      }, 100);
    };

    script.onerror = () => {
      console.error('Failed to load Cal.com embed script');
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove script on cleanup to prevent re-loading
    };
  }, []);

  const initializeCal = () => {
    if (!window.Cal) {
      console.error('Cal is not available');
      return;
    }

    try {
      window.Cal("init", "quickie-with-alex-from-no-cap", {
        origin: "https://app.cal.com"
      });

      // Wait for Cal to be initialized before setting up floating button
      setTimeout(() => {
        if (window.Cal?.ns?.["quickie-with-alex-from-no-cap"]) {
          window.Cal.ns["quickie-with-alex-from-no-cap"]("floatingButton", {
            calLink: "ednevsky/quickie-with-alex-from-no-cap",
            config: { 
              layout: "month_view",
              theme: "auto"
            },
            buttonText: "🚀 Free Browser Automation Consultation"
          });

          window.Cal.ns["quickie-with-alex-from-no-cap"]("ui", {
            hideEventTypeDetails: false,
            layout: "month_view"
          });
        }
      }, 500);
    } catch (error) {
      console.error('Error initializing Cal.com:', error);
    }
  };

  return null;
};
