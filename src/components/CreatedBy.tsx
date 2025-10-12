const CreatedBy = () => {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
        Created By
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-border rounded-2xl p-8 bg-gradient-to-br from-background to-muted/30">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Alex
          </h3>
          <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
            <p>
              A 3x founder with an AI exit (<strong className="text-foreground">WANNA</strong>), where they built the 
              technology for virtual try-on of fashion, later selling to Farfetch.
            </p>
            <p>
              He also created <strong className="text-foreground">No Cap</strong>, world's first AI agent that invested 
              in a company. No Cap coached 10k+ founders, helping them build their companies.
            </p>
            <p>
              Currently running <strong className="text-foreground">nc/acc</strong> - an accelerator for solopreneurs.
            </p>
          </div>
        </div>

        <div className="border-2 border-border rounded-2xl p-8 bg-gradient-to-br from-background to-muted/30">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Brian
          </h3>
          <div className="space-y-3 text-base text-muted-foreground leading-relaxed">
            <p>
              Ex-Googler who worked on the company's first mobile ad server and started 
              their DevRel team.
            </p>
            <p>
              He co-founded <strong className="text-foreground">Disconnect</strong>, which makes privacy software that 
              now ships with most modern browsers and has helped protect the data of 
              750,000,000+ users.
            </p>
            <p>
              Also co-founded <strong className="text-foreground">Massive</strong>, which is developing an alternative 
              to ads and paywalls for monetizing spare computing resources and was named 
              Proxyway's 2025 "Newcomer of the Year" for its bandwidth monetization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatedBy;
