import { useEffect, useState } from "react";
import { X } from "lucide-react";

const ConsultationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Load Cal.com script
    const script = document.createElement('script');
    script.innerHTML = `
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "reliableagents", {origin:"https://app.cal.com"});
      Cal.ns.reliableagents("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(script);

    return () => {
      clearTimeout(timer);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-scale-in">
      <div className="group relative bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl border border-border/40 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden max-w-[340px]">
        {/* Clickable overlay for cal.com */}
        <div
          data-cal-link="oldestlivingboy/reliableagents"
          data-cal-namespace="reliableagents"
          data-cal-config='{"layout":"month_view"}'
          className="absolute inset-0 cursor-pointer z-0"
        />
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted/60 hover:bg-muted backdrop-blur-sm transition-all duration-200 flex items-center justify-center z-20 group/close"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground group-hover/close:text-foreground transition-colors" />
        </button>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-60" />
        
        {/* Content */}
        <div className="relative px-7 py-6 space-y-5 z-10">
          {/* Main content */}
          <div className="space-y-2.5 pr-4">
            <h3 className="text-lg font-semibold text-foreground leading-tight tracking-tight">
              How reliable is your browser automation?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Grab a free consultation & share your use-case{" "}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25">
                <span className="text-[10px] font-semibold tracking-wide text-amber-600 dark:text-amber-500 uppercase">Limited Slots</span>
              </span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2.5 pt-2">
            <span className="text-sm font-semibold text-primary">Book your slot</span>
            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
              <svg 
                className="w-2.5 h-2.5 text-primary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ConsultationPopup;
