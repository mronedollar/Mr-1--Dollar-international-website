import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Event", href: "#event" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
          {/* Logo and Tagline */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <h1 className="text-3xl font-bold text-yellow-500">Mr One Dollar International</h1>
            <p className="text-white text-sm md:text-base">
              Designed for traders who refuse to be average. Learn the strategies that put us in the 1%, Stay Blue & Take Profit.
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 mt-4 md:mt-0">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-gold transition-all duration-300 font-semibold relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gold/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-gold/20 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-gold/10 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Tagline Banner */}
      <div className="bg-gradient-to-r from-gold/10 via-blue/10 to-gold/10 py-3 border-b border-border/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-foreground animate-pulse">
            <span className="text-gold font-bold">The Blueprint to the 1%</span> – 
            Trade Smarter, Profit Bigger! 
            <span className="text-blue font-semibold ml-2">Stay Blue & Take Profit.</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;