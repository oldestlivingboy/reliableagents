const CreatedBy = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
        Created By
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-border rounded-xl p-6 bg-card">
          <h3 className="text-lg font-bold text-foreground mb-3">
            Alex
          </h3>
          <div className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
            <p>
              A 3x founder with an AI exit (<strong className="text-foreground font-semibold">WANNA</strong>), where they built the 
              technology for virtual try-on of fashion, later selling to Farfetch.
            </p>
            <p>
              He also created <strong className="text-foreground font-semibold">No Cap</strong>, world's first AI agent that invested 
              in a company. No Cap coached 10k+ founders, helping them build their companies.
            </p>
            <p>
              Currently running <strong className="text-foreground font-semibold">nc/acc</strong> - an accelerator for solopreneurs.
            </p>
          </div>
        </div>

        <div className="border border-border rounded-xl p-6 bg-card">
          <h3 className="text-lg font-bold text-foreground mb-3">
            Brian
          </h3>
          <div className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
            <p>
              Ex-Googler who worked on the company's first mobile ad server and started 
              their DevRel team.
            </p>
            <p>
              He co-founded <strong className="text-foreground font-semibold">Disconnect</strong>, which makes privacy software that 
              now ships with most modern browsers and has helped protect the data of 
              750,000,000+ users.
            </p>
            <p>
              Also co-founded <strong className="text-foreground font-semibold">Massive</strong>, which is developing an alternative 
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
