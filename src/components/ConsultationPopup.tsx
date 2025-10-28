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
    <div className="fixed bottom-4 right-4 left-4 sm:bottom-8 sm:right-8 sm:left-auto z-50 flex justify-center sm:justify-end">
      <div 
        className="group relative bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl border border-border/40 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden w-full sm:max-w-[340px] cursor-pointer"
        data-cal-link="oldestlivingboy/reliableagents"
        data-cal-namespace="reliableagents"
        data-cal-config='{"layout":"month_view"}'
        style={{
          animation: 'scale-in 0.4s ease-out, fade-in 0.4s ease-out, float 4s ease-in-out 0.5s infinite'
        }}
      >
        {/* Halloween emoji background pattern - lots of small emojis */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none select-none overflow-hidden text-sm leading-relaxed">
          <div className="grid grid-cols-6 gap-3 p-3">
            {['🎃', '👻', '🎃', '🦇', '🕸️', '🎃',
              '🦇', '🕸️', '🎃', '👻', '🎃', '🦇',
              '👻', '🎃', '🦇', '🕸️', '🎃', '👻',
              '🕸️', '🎃', '👻', '🎃', '🦇', '🕸️',
              '🎃', '🦇', '🕸️', '🎃', '👻', '🎃',
              '🦇', '🕸️', '🎃', '👻', '🎃', '🦇',
              '👻', '🎃', '🦇', '🕸️', '🎃', '👻',
              '🕸️', '🎃', '👻', '🎃', '🦇', '🕸️'].map((emoji, i) => (
              <span key={i} className="inline-block">{emoji}</span>
            ))}
          </div>
        </div>
        
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
              🎃 How reliable is your browser automation?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Grab a free expert consultation & share your use case with community{" "}
              <span className="font-medium" style={{ color: 'hsl(var(--status-warning))' }}>(limited slots)</span>
            </p>
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
