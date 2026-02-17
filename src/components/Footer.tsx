import logo from "@/assets/endure-up-logo.jpg";

const Footer = () => (
  <footer className="border-t border-border px-6 py-12 md:px-12">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="ENDURE" className="h-8 w-auto" />
        <span className="font-heading text-sm tracking-widest text-foreground">ENDURE UP</span>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        © 2026 ENDURE UP Fitness Club. All rights reserved. No excuses.
      </p>
      <div className="flex gap-6">
        {["About", "Programs", "Events", "Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
            {l}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
