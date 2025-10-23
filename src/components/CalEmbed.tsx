import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export const CalEmbed = () => {
  useEffect(() => {
    // Prevent duplicate script loading
    if (document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
      return;
    }

    // Create and load the Cal.com script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    
    script.onload = () => {
      // Wait a bit for Cal to fully initialize
      setTimeout(() => {
        if (window.Cal) {
          window.Cal("floatingButton", {
            calLink: "ednevsky/quickie-with-alex-from-no-cap",
            buttonText: "🚀 Free Consultation",
            buttonPosition: "bottom-right",
            config: {
              layout: "month_view",
            },
          });
        }
      }, 100);
    };

    document.head.appendChild(script);
  }, []);

  return null;
};
