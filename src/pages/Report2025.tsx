import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReportContent from "@/content/report-2025.mdx";

const Report2025 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-16">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 md:mb-8 -ml-3 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none
          prose-headings:scroll-mt-20
          prose-h1:text-3xl prose-h1:md:text-6xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:leading-tight prose-h1:mb-12
          prose-h2:text-xs prose-h2:font-semibold prose-h2:tracking-widest prose-h2:uppercase prose-h2:text-primary prose-h2:mb-6 prose-h2:mt-16
          prose-h3:text-sm prose-h3:font-semibold prose-h3:text-foreground/60 prose-h3:uppercase prose-h3:tracking-wide prose-h3:mb-4
          prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-base prose-p:md:text-lg prose-p:my-4
          prose-strong:text-foreground prose-strong:font-semibold
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-ul:text-muted-foreground prose-ul:text-sm
          prose-li:my-1
          prose-table:text-sm prose-table:my-8
          prose-th:text-left prose-th:py-3 prose-th:px-4 prose-th:font-semibold prose-th:text-foreground/60 prose-th:text-xs prose-th:uppercase prose-th:tracking-wide prose-th:border-b prose-th:border-border/50
          prose-td:py-3 prose-td:px-4 prose-td:text-muted-foreground prose-td:border-b prose-td:border-border/30
          prose-hr:my-16 prose-hr:border-border/30
        ">
          <ReportContent />
        </article>
      </div>
    </div>
  );
};

export default Report2025;