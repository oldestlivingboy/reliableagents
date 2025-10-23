import { useEffect, useState } from "react";

const CalEmbed = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Load Cal.com script
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.Cal) {
          window.Cal("init", "quickie-with-alex-from-no-cap", {origin:"https://app.cal.com"});
          window.Cal.ns["quickie-with-alex-from-no-cap"]("floatingButton", {
            "calLink":"ednevsky/quickie-with-alex-from-no-cap",
            "config":{"layout":"month_view"},
            "buttonText": "Grab a free browser automation reliability consultation - last few slots left"
          });
          window.Cal.ns["quickie-with-alex-from-no-cap"]("ui", {
            "hideEventTypeDetails":false,
            "layout":"month_view"
          });
        }
      };

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [isVisible]);

  return null;
};

export default CalEmbed;

// Type declarations for Cal.com
declare global {
  interface Window {
    Cal: any;
  }
}