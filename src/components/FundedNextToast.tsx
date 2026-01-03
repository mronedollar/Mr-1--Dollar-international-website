import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export const FundedNextToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  
  const promos = [
    
    {
      id: 'funded7',
      logo: 'https://i.ibb.co/WpHFYqx1/Funded7-logo.png',
      title: 'Enjoy 27% OFF!!🏆 ',
      description: '27% Off on all Challenges',
      code: 'FIRST',
      link: 'https://my.funded7.com/en/sign-up?affiliateId=mr1dollar',
      bgGradient: 'from-purple-900/40 to-blue-900/40'
    },
    {
      id: 'ftmo',
      logo: 'https://i.postimg.cc/sfSsnbs0/FTMO-modified.png',
      title: '🎉 Anniversary Special',
      description: '19% Off for a $100k account',
      code: 'LOGIN REQUIRED',
      link: 'https://trader.ftmo.com/?affiliates=UAWWsYFWImbrlfINiOLH',
      bgGradient: 'from-blue-900/40 to-gray-900/40',
      noCopy: true
    }
  ];

  // Auto-rotate promos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }, 5000);

    // Show toast after 3 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [promos.length]);

  const currentPromo = promos[currentPromoIndex];

  const handleCopyCode = () => {
    if (currentPromo.noCopy) {
      window.open(currentPromo.link, '_blank');
      return;
    }
    navigator.clipboard.writeText(currentPromo.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRedirect = () => {
    window.open(currentPromo.link, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80" style={{ backgroundColor: '#1a1a1a' }}>
      <div 
        className={`relative bg-gradient-to-br ${currentPromo.bgGradient} backdrop-blur-lg rounded-xl p-3 border border-white/10 shadow-xl overflow-hidden transition-all duration-500`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-1.5 right-1.5 text-white/50 hover:text-white transition-colors p-1"
          aria-label="Close notification"
        >
          <XMarkIcon className="h-3.5 w-3.5" />
        </button>

        <div className="flex gap-3">
          {/* Logo and Navigation Dots Container */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-20 h-20 overflow-hidden rounded-lg border border-white/10 bg-white p-1">
              <img 
                src={currentPromo.logo} 
                alt={currentPromo.id}
                className="w-full h-full object-contain"
              />
            </div>
            {/* Navigation Dots - Below the logo */}
            <div className="flex justify-center space-x-1.5 mt-1">
              {promos.map((_, index) => (
                <button 
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPromoIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${index === currentPromoIndex ? 'bg-white w-4' : 'bg-white/40 w-1.5'}`}
                  aria-label={`Go to promo ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content Container */}
          <div className="flex-1 min-w-0">
            
            {/* Title */}
            <h3 className="text-white font-bold text-sm">{currentPromo.title}</h3>
            <p className="text-white/80 text-xs mt-0.5 mb-2">{currentPromo.description}</p>
            
            <div className="mb-2">
              <div className="flex items-center bg-black/30 rounded-md overflow-hidden border border-white/5">
                <code className="flex-1 px-2 py-1.5 text-xs font-mono text-amber-400 font-medium truncate">
                  {currentPromo.noCopy ? (
                    <span className="text-yellow-300">Login to claim offer</span>
                  ) : (
                    currentPromo.code
                  )}
                </code>
                <button 
                  onClick={handleCopyCode}
                  className={`px-2 py-1.5 ${currentPromo.noCopy ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'} transition-colors text-xs flex items-center gap-1`}
                >
                  {currentPromo.noCopy ? (
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  ) : isCopied ? (
                    '✓'
                  ) : (
                    <DocumentDuplicateIcon className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleRedirect}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-medium py-1.5 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 group"
            >
              Claim Offer
              <ArrowTopRightOnSquareIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-green-500 to-red-500 ${isHovered ? 'animate-pulse' : ''}`}></div>
      </div>
    </div>
  );
};

export default FundedNextToast;
