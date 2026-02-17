import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/endure-up-logo.jpg";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Events", href: "#events" },
  { label: "Highlights", href: "#highlights" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-3">
          <img src={logo} alt="ENDURE UP" className="h-10 w-auto" />
          <span className="font-heading text-xl font-bold tracking-widest text-foreground">
            ENDURE UP
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-condensed text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary-endure-up text-xs px-6 py-3">
            Join Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <div className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-condensed text-lg font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary-endure-up mt-2" onClick={() => setMobileOpen(false)}>
              Join Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
