import { useEffect, useState } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export const CalEmbed = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show button after 10 seconds
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showButton) return;

    // Load Cal.com script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.Cal) {
        window.Cal("init", "quickie-with-alex-from-no-cap", {
          origin: "https://app.cal.com"
        });

        window.Cal.ns["quickie-with-alex-from-no-cap"]("floatingButton", {
          calLink: "ednevsky/quickie-with-alex-from-no-cap",
          config: { layout: "month_view" },
          buttonText: "Grab a free browser automation reliability consultation - last few slots left"
        });

        window.Cal.ns["quickie-with-alex-from-no-cap"]("ui", {
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      }
    };

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [showButton]);

  return null;
};
