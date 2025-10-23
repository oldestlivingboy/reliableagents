import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export const CalEmbed = () => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
    
    if (existingScript && window.Cal) {
      // Script already loaded, just initialize
      initializeCal();
      return;
    }

    // Load Cal.com script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.type = "text/javascript";
    
    script.onload = () => {
      initializeCal();
    };

    script.onerror = (error) => {
      console.error('Failed to load Cal.com embed script:', error);
    };

    document.head.appendChild(script);
  }, []);

  const initializeCal = () => {
    if (!window.Cal) {
      console.error('Cal is not available on window');
      return;
    }

    try {
      // Simple floating button call - no namespaces needed
      window.Cal.floatingButton({
        calLink: "ednevsky/quickie-with-alex-from-no-cap",
        buttonText: "🚀 Free Browser Automation Consultation",
        buttonPosition: "bottom-right",
        config: {
          layout: "month_view"
        }
      });
      
      console.log('Cal.com floating button initialized successfully');
    } catch (error) {
      console.error('Error initializing Cal.com floating button:', error);
    }
  };

  return null;
};
