import { Card } from "@/components/ui/card";

const CreatedBy = () => {
  return (
    <section className="space-y-3 md:space-y-6 py-8 md:py-12">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
        Created By
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
            Alex
          </h3>
          <div className="space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              A 3x founder with an AI exit (<strong>WANNA</strong>), where they built the 
              technology for virtual try-on of fashion, later selling to Farfetch.
            </p>
            <p>
              He also created <strong>No Cap</strong>, world's first AI agent that invested 
              in a company. No Cap coached 10k+ founders, helping them build their companies.
            </p>
            <p>
              Currently running <strong>nc/acc</strong> - an accelerator for solopreneurs.
            </p>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
            Brian
          </h3>
          <div className="space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              Ex-Googler who worked on the company's first mobile ad server and started 
              their DevRel team.
            </p>
            <p>
              He co-founded <strong>Disconnect</strong>, which makes privacy software that 
              now ships with most modern browsers and has helped protect the data of 
              750,000,000+ users.
            </p>
            <p>
              Also co-founded <strong>Massive</strong>, which is developing an alternative 
              to ads and paywalls for monetizing spare computing resources and was named 
              Proxyway's 2025 "Newcomer of the Year" for its bandwidth monetization.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CreatedBy;
