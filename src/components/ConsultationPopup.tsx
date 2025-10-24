import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button
        data-cal-link="oldestlivingboy/reliableagents"
        data-cal-namespace="reliableagents"
        data-cal-config='{"layout":"month_view"}'
        onClick={() => {}}
        className="group relative bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-6 h-auto rounded-2xl max-w-sm"
      >
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border shadow-md hover:bg-muted transition-colors flex items-center justify-center"
        >
          <X className="w-3 h-3 text-muted-foreground" />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          
          <div className="text-left space-y-2">
            <p className="font-semibold text-base leading-tight">
              How reliable is your browser automation?
            </p>
            <p className="text-sm opacity-90 leading-snug">
              Grab a free consultation & share your use-case
            </p>
            <p className="text-xs opacity-75 flex items-center gap-1">
              <span>⏰</span>
              <span className="font-medium">Limited spots</span>
            </p>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default ConsultationPopup;
