import React from 'react';

const AffiliatePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Get Your Affiliate Link</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Join our affiliate program and earn commissions by sharing Mr. One Dollar International products. 
                        Follow the steps below to get your unique referral links.
                    </p>
                </div>

                {/* Commission Structure */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                        <h2 className="text-2xl font-semibold text-white mb-6">Commission Structure</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-6 rounded-lg border border-green-500/30">
                                <h3 className="text-green-400 font-bold text-xl mb-2">Trade Ideas</h3>
                                <p className="text-green-300 text-3xl font-bold mb-2">20%</p>
                                <p className="text-slate-300 text-sm">
                                    Earn 20% commission on all trade ideas products
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-lg border border-blue-500/30">
                                <h3 className="text-blue-400 font-bold text-xl mb-2">Courses</h3>
                                <p className="text-blue-300 text-3xl font-bold mb-2">5%</p>
                                <p className="text-slate-300 text-sm">
                                    Earn 5% commission on all course products
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                        <h2 className="text-2xl font-semibold text-white mb-6">How to Get Your Link</h2>
                        
                        {/* Manual Steps */}
                        <div className="mt-8">
                            <h3 className="text-white font-semibold mb-4">Quick steps: </h3>
                            <div className="bg-slate-800 p-6 rounded-lg border border-slate-600">
                                <ol className="text-slate-300 text-lg space-y-4 list-decimal list-inside">
                                    <li className="flex items-start">
                                        <span className="text-amber-400 font-semibold mr-3">1.</span>
                                        <span>Go to: <a href="https://whop.com/mr1dollar-international/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline font-mono transition-colors">https://whop.com/mr1dollar-international/</a></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 font-semibold mr-3">2.</span>
                                        <span>Select your first product package</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 font-semibold mr-3">3.</span>
                                        <span>Scroll down to find "Become an affiliate" button</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 font-semibold mr-3">4.</span>
                                        <span>Click "Become an affiliate" - link auto-copies to clipboard. Share this link with people to earn money for every purchase they make</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-400 font-semibold mr-3">5.</span>
                                        <span>Access your affiliate dashboard: <a href="https://whop.com/affiliates/dashboard/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline font-mono transition-colors">https://whop.com/affiliates/dashboard/</a></span>
                                    </li>
                                </ol>
                            </div>
                        </div>

                        {/* Quick Access Buttons */}
                        <div className="mt-8">
                            <div>
                                <h3 className="text-white font-semibold mb-4">Your Affiliate Dashboard</h3>
                                <a 
                                    href="https://whop.com/affiliates/dashboard/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg w-full"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Open Dashboard
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliatePage;
