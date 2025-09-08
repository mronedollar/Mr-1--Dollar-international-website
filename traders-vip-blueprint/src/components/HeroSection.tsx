import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Headline */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-yellow-500">Get 1 Month Free</span> in Our
            <br />
            <span className="text-yellow-500">Trade Ideas Telegram</span> Group!
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Complete these two simple steps for Traders Fair South Africa 2025,
            <br />
            then request your unique Access Code below.
          </p>

          {/* Two-Step Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
            <a 
              href="https://go.primexbt.direct/visit/?bta=43394&brand=primexbt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
            >
              Step 1: Sign Up with Broker
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            
            <a 
              href="https://tradersfair.com/africa/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold border-2 border-yellow-500 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              Step 2: Register for Event
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            After both steps, fill out the form to get your code via email. It's quick and exclusive!
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;