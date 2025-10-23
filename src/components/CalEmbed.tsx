import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export const CalEmbed = () => {
  useEffect(() => {
    // Load Cal.com embed script
    (function (C, A, L) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      (C.Cal as any) =
        (C.Cal as any) ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.q) {
            cal.q = [];
          }
          cal.q.push(ar);
        };
      let t = d.createElement("script");
      t.async = true;
      t.src = "https://app.cal.com/embed/embed.js";
      let s = d.getElementsByTagName("script")[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, "https://app.cal.com");

    // Initialize floating button
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
  }, []);

  return null;
};
