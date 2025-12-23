import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export const FundedNextToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    'https://i.postimg.cc/NGHNgjZr/short-logo-removebg-preview.png',
    'https://i.postimg.cc/HxssXF88/FN-Christmmas.jpg'
  ];
  
  const imageAlts = [
    'FundedNext Logo',
    'Christmas BOGO Special'
  ];

  // Image slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    
    // Show toast after 3 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [images.length]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('XMASBOGO');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRedirect = () => {
    window.open('https://fundednext.com/?fpr=tinyiko-paul-miyambo55', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80" style={{ backgroundColor: '#1a1a1a' }}>
      <div 
        className="relative bg-gradient-to-br from-red-900/40 to-green-900/40 backdrop-blur-lg rounded-xl p-3 border border-white/10 shadow-xl overflow-hidden"
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
          <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg border border-white/10">
            <img 
              src={images[currentImageIndex]} 
              alt={imageAlts[currentImageIndex]}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isHovered ? 'opacity-90' : 'opacity-100'}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-white font-bold text-sm">🎄 BOGO Special!</h3>
            </div>
            <p className="text-white/80 text-xs mt-0.5 mb-2">Buy 1 Stellar plan Get 1 FREE</p>
            
            <div className="mb-2">
              <div className="flex items-center bg-black/30 rounded-md overflow-hidden border border-white/5">
                <code className="flex-1 px-2 py-1.5 text-xs font-mono text-amber-400 font-medium truncate">XMASBOGO</code>
                <button 
                  onClick={handleCopyCode}
                  className="px-2 py-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors text-xs flex items-center gap-1"
                >
                  {isCopied ? '✓' : <DocumentDuplicateIcon className="h-3 w-3" />}
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
