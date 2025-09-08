const Footer = () => {
  const navItems = ["Home", "Event Details", "About Us", "Contact"];

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo & Company */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gold-gradient mb-2">
              MR ONE DOLLAR INTERNATIONAL
            </h3>
            <p className="text-lg text-blue font-semibold">
              Stay Blue & Take Profit.
            </p>
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-muted-foreground hover:text-gold transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>

          {/* Contact Info */}
          <div className="mb-8 space-y-2 text-sm text-muted-foreground">
            <p>13 Fredman Drive, Fredman Towers, Sandton, South Africa</p>
            <p>
              <a href="tel:+27626898567" className="hover:text-gold transition-colors">
                +27 626 898 567
              </a>
              {" | "}
              <a href="tel:+27614267355" className="hover:text-gold transition-colors">
                +27 614 267 355
              </a>
            </p>
            <p>
              <a href="mailto:info@mr1dollar.co.za" className="hover:text-gold transition-colors">
                info@mr1dollar.co.za
              </a>
            </p>
          </div>

          {/* Tagline */}
          <div className="mb-8 p-6 bg-gradient-to-r from-gold/10 to-blue/10 rounded-xl border border-gold/20">
            <p className="text-lg font-semibold text-gold-gradient mb-2">
              The Blueprint to the 1%
            </p>
            <p className="text-foreground/90">
              Trade Smarter, Profit Bigger!!!
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Mr One Dollar International. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Traders Fair South Africa 2025 | September 20, 2025 | Protea by Marriott Hotel Wanderers, Sandton
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;