import React, { useState, useMemo } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowTopRightOnSquareIcon, LinkIcon, SparklesIcon, ChartBarIcon, UserGroupIcon, CogIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  productId: string;
  commission?: number;
}

const AffiliatePage: React.FC = () => {
  const [affiliateUsername, setAffiliateUsername] = useState('');

  // Handle input validation - only allow lowercase letters, numbers, and special symbols
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow lowercase letters, numbers, and special symbols -!@#$%^&*
    const filteredValue = value.replace(/[^a-z0-9\-!@#$%^&*]/g, '');
    setAffiliateUsername(filteredValue);
  };
  const [generatedLinks, setGeneratedLinks] = useState<{ product: Product; link: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLinks, setCopiedLinks] = useState<Set<string>>(new Set());
  const [showAllCommissions, setShowAllCommissions] = useState(false);

  // Product data matching the main App.tsx
  const products: Product[] = [
    // Courses
    { id: 5, name: "Beginners Course", productId: "prod_27Sg99aDR0rye", commission: 5 },
    { id: 6, name: "Intermediate Course", productId: "prod_Qx2L3p9W8nK0", commission: 5 },
    { id: 7, name: "Advanced Course", productId: "prod_8J4mR2L7fX6t", commission: 5 },
    { id: 8, name: "Full Course + Free Tradecation", productId: "prod_9K2vN4X7qH1", commission: 5 },
    { id: 12, name: "Currencies Strategy", productId: "prod_9SrCavVpvpVfh", commission: 5 }
  ];

  const generateAffiliateLink = (product: Product, username: string) => {
    const baseUrl = 'https://whop.com/mr1dollar-international/';
    return `${baseUrl}?productId=${product.productId}&a=${username}`;
  };

  const generateAllLinks = async () => {
    const username = affiliateUsername.trim();
    if (!username) {
      alert('Please enter an affiliate username');
      return;
    }

    setIsGenerating(true);
    setGeneratedLinks([]);
    setCopiedLinks(new Set());

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate only one affiliate link for Beginners Course
    const singleProduct = products[0]; // Beginners Course
    const link = {
      product: singleProduct,
      link: generateAffiliateLink(singleProduct, username)
    };

    setGeneratedLinks([link]);
    setIsGenerating(false);
  };

  const copyToClipboard = async (link: string, productName: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLinks(prev => new Set(prev).add(link));
      
      // Remove from copied set after 3 seconds
      setTimeout(() => {
        setCopiedLinks(prev => {
          const newSet = new Set(prev);
          newSet.delete(link);
          return newSet;
        });
      }, 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const copyAllLinks = () => {
    const allLinksText = generatedLinks.map(item => `${item.product.name}: ${item.link}`).join('\n');
    navigator.clipboard.writeText(allLinksText);
    alert('All affiliate links copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white font-sans">
      {/* Header */}
      <header className="bg-black border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="https://i.postimg.cc/T3mHV2x0/Favicon_Color.png" 
                alt="MR ONE DOLLAR Logo" 
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-xl font-bold text-white">MR <span className="text-amber-400">ONE</span> DOLLAR - Affiliate Center</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-24 relative">
            {/* Background decoration */}
            
            <div className="relative z-10">
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-orange-500">
                  Partner with Mr. $1
                </span>
                <br />
                <span className="text-white">Affiliate Program</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Create affiliate links for Mr. $1 products and earn commissions on every sale. Start earning with our trusted affiliate network today.
              </p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
                  <ChartBarIcon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">11+</div>
                  <div className="text-slate-400 text-sm">Products Available</div>
                  <div className="mt-3 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Commission:</span>
                      <span className="text-amber-400 font-medium">5-20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Member Rate:</span>
                      <span className="text-green-400 font-medium">5-20%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
                  <CogIcon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-slate-400 text-sm">Live Support</div>
                  <div className="mt-3 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Dashboard:</span>
                      <span className="text-green-400 font-medium">Real-time</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payouts:</span>
                      <span className="text-amber-400 font-medium">Quick</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
                  <ChartBarIcon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-slate-400 text-sm">Tracking</div>
                  <div className="mt-3 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Latency:</span>
                      <span className="text-blue-400 font-medium">Zero to none</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reports:</span>
                      <span className="text-purple-400 font-medium">Detailed</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Affiliate Link Generator */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {/* Input Section */}
            <div className="bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-800">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <ArrowTopRightOnSquareIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-amber-400" />
                Generate Your Links
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Whop Affiliate Username
                  </label>
                  <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-3 space-y-3 sm:space-y-0">
                    <input
                      type="text"
                      value={affiliateUsername}
                      onChange={handleUsernameChange}
                      placeholder="Enter your Whop username"
                      className="flex-1 w-full sm:w-auto px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <button
                      onClick={generateAllLinks}
                      disabled={isGenerating}
                      className={`w-full sm:w-auto px-4 sm:px-6 py-3 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        isGenerating 
                          ? 'bg-slate-600 text-slate-300 cursor-not-allowed' 
                          : 'bg-amber-500 hover:bg-amber-600 text-black'
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm sm:text-base">Generating Links...</span>
                        </>
                      ) : (
                        <span className="text-sm sm:text-base">Generate Links</span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-sm text-slate-400">
                  <p className="mb-2">💡 <strong>Pro Tip:</strong> Use a memorable username that represents your brand!</p>
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 mb-3">
                    <h4 className="font-semibold text-white mb-3">🚀 Quick Steps to get your username:</h4>
                    <ol className="space-y-2 text-slate-300">
                      <li className="flex items-start">
                        <span className="text-amber-400 font-bold mr-2">1.</span>
                        <span>Register/Login on <a href="https://whop.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline transition-colors">Whop.com</a> platform.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-400 font-bold mr-2">2.</span>
                        <span>On your Whop profile get your username as highlighted in the image below and paste it on this field "Enter your Whop username" so you can generate affiliate links that are linked to you.</span>
                      </li>
                    </ol>
                  </div>
                  <div className="">
                    <img 
                      src="https://i.postimg.cc/FRbxCqqw/Whop-username.png" 
                      alt="Whop username example showing where username appears in affiliate link"
                      className="w-full max-w-md mx-auto rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Links Display */}
            <div className="bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                  <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-green-400" />
                  Your Affiliate Link
                </h3>
              </div>

              {isGenerating ? (
                <div className="text-center py-16">
                  <div className="inline-flex flex-col items-center">
                    <div className="relative mb-8">
                      <div className="w-16 h-16 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400/30 border-b-blue-400 rounded-full animate-spin" style={{ animationDelay: '150ms' }}></div>
                      <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/30 border-l-purple-400 rounded-full animate-spin" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Generating Your Links</h3>
                    <p className="text-slate-400 mb-6">Creating custom affiliate links for all products...</p>
                    
                    {/* Loading skeleton cards */}
                    <div className="space-y-3 w-full max-w-md">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="h-4 bg-slate-700 rounded w-32"></div>
                            <div className="h-8 bg-slate-700 rounded w-20"></div>
                          </div>
                          <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
                          <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : generatedLinks.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {generatedLinks.map((item, index) => (
                    <div key={index} className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-2">
                            
                            <h4 className="font-semibold text-white text-base sm:text-lg">Your Mr <span className="text-amber-400">One</span> Dollar Affiliate Link:</h4>
                          </div>
                          
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.link, item.product.name)}
                          className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 flex items-center flex-shrink-0 ${
                            copiedLinks.has(item.link)
                              ? 'bg-green-600 text-white'
                              : 'bg-amber-500 hover:bg-amber-600 text-black'
                          }`}
                        >
                          {copiedLinks.has(item.link) ? (
                            <>
                              <CheckCircleIcon className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <ClipboardDocumentIcon className="w-4 h-4 mr-2" />
                              Copy Link
                            </>
                          )}
                        </button>
                      </div>
                      <div className="mt-3">
                        <div className="bg-slate-900 rounded p-3 border border-slate-500">
                          <p className="text-slate-500 text-sm mb-4"> Share with friends to earn whenever they purchase any services with us😊</p>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              readOnly
                              value={item.link}
                              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-300 text-sm font-mono"
                            />
                            <button
                              onClick={() => copyToClipboard(item.link, item.product.name)}
                              className={`px-3 py-2 text-sm rounded transition-all duration-300 ${
                                copiedLinks.has(item.link)
                                  ? 'bg-green-600 text-white'
                                  : 'bg-slate-700 hover:bg-slate-600 text-white'
                              }`}
                            >
                              {copiedLinks.has(item.link) ? (
                                <CheckCircleIcon className="w-4 h-4" />
                              ) : (
                                <ClipboardDocumentIcon className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Dashboard Access Button */}
                        <div className="mt-4 text-center">
                          <a
                            href="https://whop.com/dashboard/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-4 sm:px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            <span className="text-sm sm:text-base">Access Dashboard</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="relative inline-block">
                    {/* Background decoration */}
                    <div className=""></div>
                    
                    <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700">
                      <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12 shadow-lg">
                          <img 
                            src="https://i.postimg.cc/c4ht4dZt/Paper-Money.png" 
                            alt="Paper Money" 
                            className="w-17 h-17 object-contain transform -rotate-12"
                          />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Ready to Start Earning?</h3>
                        <p className="text-slate-300 text-lg max-w-md mx-auto">
                          Enter your Whop username and click "Generate Links" to create your custom affiliate links for all 15 products
                        </p>
                      </div>
                      
                      {/* Feature highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <LinkIcon className="w-6 h-6 text-amber-400" />
                          </div>
                          <p className="text-slate-400 text-sm">11+ Products</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <ChartBarIcon className="w-6 h-6 text-blue-400" />
                          </div>
                          <p className="text-slate-400 text-sm">Track Sales</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <CheckCircleIcon className="w-6 h-6 text-green-400" />
                          </div>
                          <p className="text-slate-400 text-sm">Get Paid</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                        <p className="text-slate-400 text-sm">
                          <strong className="text-amber-400">Pro Tip:</strong> Use a memorable username that represents your brand for better conversions!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              </div>
          </div>

          {/* Commission Rates Section */}
          <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 mb-24">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-3 text-amber-400" />
              Commission Rates & Statistics
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* High Commission Products */}
              <div>
                <h4 className="text-lg font-semibold text-amber-400 mb-4">🔥 High Commission (5-20%)</h4>
                <div className="space-y-2">
                  <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm">Diamond 7-Days Prepaid</span>
                      <div className="text-right">
                        <span className="text-amber-400 font-bold">20%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm">Gold High Voltage Trade Ideas</span>
                      <div className="text-right">
                        <span className="text-amber-400 font-bold">20%</span>
                      </div>
                    </div>
                  </div>
                  {showAllCommissions && (
                    <>
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm">Synthetics Trade Ideas</span>
                          <div className="text-right">
                            <span className="text-amber-400 font-bold">20%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm">Diamond Trade Ideas</span>
                          <div className="text-right">
                            <span className="text-amber-400 font-bold">20%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm">Private Wealth VIP Black</span>
                          <div className="text-right">
                            <span className="text-amber-400 font-bold">20%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm">NFP Event Access</span>
                          <div className="text-right">
                            <span className="text-amber-400 font-bold">20%</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Standard Commission Products */}
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-4">💎 Standard Commission (5%)</h4>
                <div className="space-y-2">
                  <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm">Beginners Course</span>
                      <div className="text-right">
                        <span className="text-blue-400 font-bold">5%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm">Intermediate Course</span>
                      <div className="text-right">
                        <span className="text-blue-400 font-bold">5%</span>
                      </div>
                    </div>
                  </div>
                  {showAllCommissions && (
                    <>
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm">Advanced Course</span>
                          <div className="text-right">
                            <span className="text-blue-400 font-bold">5%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm">Full Course + Tradecation</span>
                          <div className="text-right">
                            <span className="text-blue-400 font-bold">5%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm">Currencies Strategy</span>
                          <div className="text-right">
                            <span className="text-blue-400 font-bold">5%</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Other Products */}
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-4">🎯 Other Products</h4>
                <div className="space-y-2">
                  <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm">Branded Merchandise</span>
                      <div className="text-right">
                        <span className="text-purple-400 font-bold">20%</span>
                      </div>
                    </div>
                  </div>
                  {!showAllCommissions && (
                    <div className="text-center py-8">
                      <p className="text-slate-400 text-sm">Click below to see more products</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Show More/Less Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllCommissions(!showAllCommissions)}
                className="inline-flex items-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {showAllCommissions ? (
                  <>
                    <ChevronUpIcon className="w-5 h-5 mr-2" />
                    Show Less Products
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="w-5 h-5 mr-2" />
                    Show All Products ({showAllCommissions ? 0 : 10} more)
                  </>
                )}
              </button>
            </div>

            {/* Summary Stats */}
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-400">20%</div>
                  <div className="text-xs text-slate-400">Highest Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">5-20%</div>
                  <div className="text-xs text-slate-400">Standard Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">11+</div>
                  <div className="text-xs text-slate-400">Products</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <LinkIcon className="w-6 h-6 mr-3 text-blue-400" />
              How to Use Your Links
            </h3>
            <div className="space-y-6 text-slate-300">
              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm">1</span>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-white mb-2 text-lg">Share Your Link</h4>
                  <p className="text-sm leading-relaxed">Share your generated affiliate links on social media, YouTube, Instagram, X, or with friends and followers.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-white mb-2 text-lg">Track Performance</h4>
                  <p className="text-sm leading-relaxed">Monitor your clicks and commissions in your Whop affiliate dashboard to see which products are performing best.</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-white mb-2 text-lg">Be Transparent</h4>
                  <p className="text-sm leading-relaxed">Let your audience know you're an affiliate. Disclose your relationship with Mr. $1 International honestly.</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-amber-400">Commission Structure:</strong> Earn competitive commissions on all qualifying sales referred through your custom affiliate links.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-slate-800 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Mr. $1 International. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms and Conditions
              </a>
              <span className="text-slate-600">•</span>
              <a href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
            </div>
            <p className="text-slate-500 text-xs mt-4">
              Trading involves risk. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AffiliatePage;
