import React, { useState, useMemo, useEffect, useRef, ReactNode } from 'react';

// --- Types ---
type Page = 'home' | 'events' | 'about' | 'team' | 'contact' | 'services' | 'terms' | 'privacy';
interface OfferStep {
    number: number;
    text: string | React.ReactNode;
}

interface BaseProduct {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    imageUrl: string;
    description: string;
    checkoutUrl?: string;
    isSpecialOffer?: boolean;
    offerSteps?: OfferStep[];
    whatsappLink?: string;
}

interface Product extends BaseProduct {
    isPlatinumBenefit?: boolean;
    platinumBenefitDescription?: string;
    // Additional properties specific to Product can be added here
}

// --- Centralized Data Source ---
const servicesData: Product[] = [
    { id: 1, name: "Gold High Voltage Trade Ideas", price: 59.00, category: 'Trade Ideas', imageUrl: 'https://i.postimg.cc/0y0KHZ2B/GOLD-HIGH-VOLTAGE.jpg', description: "Harness the power of the precious metals market. Receive high-probability trade setups for Gold (XAU/USD), meticulously analyzed by our experts. Perfect for traders looking to capitalize on Gold's volatility and make informed decisions.", checkoutUrl: "https://whop.com/checkout/plan_ctZTpakqloK39?d2c=true" },
    { id: 13, name: "Synthetics trade ideas", price: 59.00, category: 'Trade Ideas', imageUrl: 'https://i.postimg.cc/Px46X1yq/SYNTHETICS.jpg', description: "Master synthetic indices trading with our expert analysis. Receive precise trade setups for synthetic instruments, designed for traders seeking consistent profits in this specialized market segment.", checkoutUrl: "https://whop.com/checkout/plan_rumeFlqobZyqj" },
    { 
        id: 2, 
        name: "Platinum Trade Ideas", 
        price: 0, 
        category: 'Trade Ideas', 
        imageUrl: '/images/forex-trading.jpg', 
        description: "🔥 GET FREE PLATINUM TRADE IDEAS FOR A LIFETIME 🔥",
        isSpecialOffer: true,
        offerSteps: [
            { 
                number: 1, 
                text: <span className="flex items-center">
                    <img src="/images/Prime-XBT-Logo.png" alt="PrimeXBT" className="h-4 w-auto object-contain mr-2" />
                    Register on PrimeXBT
                </span> 
            },
            { number: 2, text: "Complete KYC verification" },
            { number: 3, text: "Deposit minimum $50 (R800) into your wallet" },
            { number: 4, text: "WhatsApp Nomii with proof to claim your free month" }
        ],
        whatsappLink: "https://wa.me/27676923876?text=Hi%20Nomii%2C%20I've%20completed%20my%20PrimeXBT%20registration%20and%20funded%20with%20a%20minimum%20of%20%2410.%20Here's%20my%20proof%20of%20funding%3A%20[YOUR_PROOF_HERE]"
    },
    { id: 3, name: "Diamond Trade Ideas", price: 179.00, category: 'Trade Ideas', imageUrl: 'https://i.postimg.cc/Qx6RkZpD/DIAMOND.jpg', description: "Our elite subscription for serious traders. Diamond members receive all Platinum benefits plus access to exclusive inner-circle trade ideas, advanced market commentary, and priority support from our top analysts. Initial payment of $179, then just $89.50/month (50% discount) for continued access.", checkoutUrl: "https://whop.com/checkout/plan_qNrnwywYsgp5M" },
    { id: 4, name: "Private Wealth VIP Black Trade Ideas", price: 1060.00, category: 'Trade Ideas', imageUrl: 'https://i.postimg.cc/YSQnP5mq/PRIVATE-WEALTH-VIP-BLACK.jpg', description: "The ultimate trading experience. VIP Black is a bespoke service for high-net-worth individuals, offering personalized trade strategies, direct access to our head traders, and portfolio management insights. By application only.", checkoutUrl: "https://whop.com/checkout/plan_t6cWYP0riNwZc?d2c=true" },
    { id: 5, name: "Beginners Course", price: 206.00, category: 'Courses', imageUrl: 'https://i.postimg.cc/66VKZPjZ/Beginners-Course.jpg', description: "New to Forex? This is your starting point. Our comprehensive Beginners Course covers everything from the absolute basics of currency pairs to setting up your trading platform and executing your first trades with confidence.", checkoutUrl: "https://whop.com/checkout/plan_FLNIgd01exxwN?d2c=true" },
    { id: 6, name: "Intermediate Course", price: 307.00, category: 'Courses', imageUrl: 'https://i.postimg.cc/0jkBDVjs/Intermediate-Course.jpg', description: "Ready to move beyond the basics? This course dives into technical analysis, chart patterns, risk management, and trading psychology. Develop the skills needed to build a consistently profitable trading strategy.", checkoutUrl: "https://whop.com/checkout/plan_mdhlnuqZn2k9O?d2c=true" },
    { id: 7, name: "Advanced Course", price: 439.00, category: 'Courses', imageUrl: 'https://i.postimg.cc/bNHvzrcd/Advanced-Course.jpg', description: "For the experienced trader looking for an edge. Explore advanced institutional strategies, market structure, smart money concepts, and complex indicators to refine your approach and elevate your trading to an expert level.", checkoutUrl: "https://whop.com/checkout/plan_6exMgeEDvYPXZ?d2c=true" },
    { id: 8, name: "Full Course + Free Tradecation", price: 879.00, category: 'Courses', imageUrl: 'https://i.postimg.cc/YSFZH4T2/Full-Course-Free-Tradecation.jpg', description: "The ultimate trading education package. This all-in-one course combines our Beginner, Intermediate, and Advanced modules. Master everything from fundamental principles to complex institutional strategies and become a well-rounded, profitable trader. Includes a FREE Tradecation (valued at $900) - limited time offer!", checkoutUrl: "https://whop.com/checkout/plan_91pPZHbkPYU9q" },
    { id: 9, name: "Beginner Mentorship", price: 27.00, category: 'Mentorship', imageUrl: 'https://i.postimg.cc/kgYq4tjW/Beginner-Mentorship.jpg', description: "Accelerate your learning curve with personalized guidance. Our Beginner Mentorship pairs you with an experienced trader to review your trades, answer your questions, and help you build a solid trading foundation and mindset.", checkoutUrl: "https://whop.com/checkout/plan_0l3JSa0u7ie7J?d2c=true" },
    { id: 10, name: "Intermediate Mentorship", price: 53.00, category: 'Mentorship', imageUrl: 'https://i.postimg.cc/XqsD89BR/Intermediate-Mentorship.jpg', description: "Refine your strategy with expert feedback. This mentorship program is designed for traders who have a strategy but need help with consistency, discipline, and navigating live market conditions with a professional.", checkoutUrl: "https://whop.com/checkout/plan_3yLCP9PECWJNW?d2c=true" },
    { id: 11, name: "Advanced Mentorship", price: 106.00, category: 'Mentorship', imageUrl: 'https://i.postimg.cc/QCgjx4Pd/Advanced-Mentorship.jpg', description: "Collaborate with the best. Our Advanced Mentorship provides high-level strategic discussion, performance analysis, and psychological coaching to help you break through performance plateaus and reach your peak potential.", checkoutUrl: "https://whop.com/checkout/plan_6WOfsWPi4NT2I?d2c=true" },
    { id: 12, name: "Currencies Strategy", price: 429.00, category: 'Strategy', imageUrl: 'https://i.postimg.cc/Y0MJ8pnh/Currencies-Strategy.jpg', description: "Purchase our proprietary, back-tested currency trading strategy. This is a complete, rule-based system that provides clear entry, exit, and stop-loss parameters, taking the guesswork out of your trading.", checkoutUrl: "https://whop.com/checkout/plan_9SrCavVpvpVfh?d2c=true" },
    { id: 14, name: "NFP Event Access", price: 16.00, category: 'Events', imageUrl: 'https://i.postimg.cc/tCmMntjX/NFP-Event-Access.jpg', description: "Join us for a live trading session during the Non-Farm Payroll (NFP) announcement. Learn how to navigate one of the market's most volatile events with expert guidance, pre-release analysis, and real-time trade execution.", checkoutUrl: "https://whop.com/checkout/plan_EoyvAo4ReKJhi" },
    { id: 15, name: "Branded Merchandise", price: 59.00, category: 'Uncategorized', imageUrl: 'https://i.postimg.cc/y8xCw8Vg/Branded-Merchandise.jpg', description: "Represent the Mr.$1 community with our exclusive branded merchandise. High-quality apparel and accessories for the trader who refuses to be average. Show off your commitment to staying blue and taking profit.", checkoutUrl: "https://whop.com/checkout/plan_4Ge1iEh1RHYGm" },
];

const testimonialsData = [
    {
        quote: "High Voltage is something else... We woke up in deep profits!",
        author: "Lungelo C.",
        role: "Gold Member",
    },
    {
        quote: "Tebza made R5000 early in the morning while driving. When I see profits I get motivated to send more trade ideas!",
        author: "Mr.$1 Team",
        role: "Community Update",
    },
    {
        quote: "We thank you alpha as we were comfortable in our waiting process, because we know when it's time we eat and get full.",
        author: "Prince Mofokeng",
        role: "Platinum Member",
    },
    {
        quote: "No worries at all, we trust this family!",
        author: "Siphelele H.",
        role: "Community Member",
    },
    {
        quote: "I am surviving because I know for as long as you are still alive, I will succeed!",
        author: "Grace Ranyane",
        role: "Gold Member",
    },
];

// --- SVG Icon Components ---

const MenuIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const MapPinIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
    </svg>
);

const EnvelopeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25-2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);

const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M12 21.75c2.435-1.122 4.633-2.618 6.42-4.357C20.142 15.66 21 12.76 21 9.75c0-3.01-0.858-5.91-2.58-7.643a13.363 13.363 0 0 0-6.42-3.643 1.5 1.5 0 0 0-1.018 0 13.363 13.363 0 0 0-6.42 3.643C2.858 3.84 2 6.74 2 9.75c0 3.01 0.858 5.91 2.58 7.643A13.363 13.363 0 0 0 11 21.75a1.5 1.5 0 0 0 1 0Z" />
    </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.57-1.01 1.255-1.883 2.06-2.634.804-.75 1.72-1.34 2.696-1.763M12 3c2.755 0 5 2.245 5 5s-2.245 5-5 5-5-2.245-5-5 2.245-5 5-5Zm-7.268 9.062a8.952 8.952 0 0 0-2.432 2.432 8.952 8.952 0 0 0 2.432 2.432M12 21a9.094 9.094 0 0 0-3.741-.479 3 3 0 0 0-4.682-2.72M3.055 12.312a8.952 8.952 0 0 1 2.432-2.432 8.952 8.952 0 0 1 2.432 2.432" />
    </svg>
);

const RocketLaunchIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a6 6 0 0 1-5.84 7.38v-4.82m0 0a6 6 0 0 1 6-6h-4.82m0 0a6 6 0 0 1 6-6H9.75m0 0a6 6 0 0 1 6-6H9.75m0 0a6 6 0 0 1-6 6h4.82M9.75 9.75A6 6 0 0 1 3.75 3.75M9.75 9.75A6 6 0 0 1 3.75 3.75m0 0a6 6 0 0 1 6 6v-4.82m0 0a6 6 0 0 1 6 6v-4.82" />
    </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const MinusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.8-28.2l-6.7-4-69.8 18.3L72 359.2l-4.5-7c-21.3-33.1-33.6-71.6-33.6-112.5 0-108.8 88.5-197.3 197.3-197.3 53.9 0 104.5 21.1 142.8 59.5 38.2 38.3 59.5 88.9 59.5 142.8 0 108.8-88.5 197.3-197.3 197.3zm88.6-114.8c-3.8-1.9-22.5-11.1-26-12.4-3.5-1.4-6-1.9-8.6 1.9s-9.8 12.4-12 14.9c-2.2 2.5-4.5 2.8-8.3 1s-16-5.9-30.4-18.7c-11.3-10-19-22.3-21.2-26.1-2.2-3.8-0.2-5.9 1.7-7.7 1.7-1.6 3.8-4.2 5.7-6.2 1.9-2.1 2.5-3.8 3.8-6.4 1.2-2.5 0.6-4.7-0.3-6.1-0.9-1.4-8.6-20.8-11.8-28.5-3.1-7.7-6.2-6.6-8.6-6.7-2.2-0.1-4.7-0.1-7.3-0.1s-6.7 1-10.2 4.7c-3.5 3.7-13.4 13.1-13.4 32 0 18.8 13.7 37.1 15.6 39.6 1.9 2.5 26.9 41.2 65.4 58 38.4 16.8 38.4 11.2 45.3 10.5 6.9-0.8 22.5-9.2 25.6-18.1 3.1-8.9 3.1-16.5 2.2-18.1-1-1.6-3.5-2.5-7.3-4.5z"/>
    </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className={className}>
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.1-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.497-41.995 24.947-48.284 48.597-11.412 42.867-11.412 132.325-11.412 132.325s0 89.458 11.412 132.325c6.289 23.65 24.787 41.995 48.284 48.597C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.597 42.002-24.947 48.284-48.597 11.412-42.867-11.412-132.325 11.412-132.325s0-89.458-11.412-132.325zM232.615 354.46V157.54l132.738 98.46-132.738 98.46z"/>
    </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1 9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
    </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

const QuoteIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M13.416 4.834C13.52 4.07 14.155 3.5 14.936 3.5c.895 0 1.584.793 1.584 1.584 0 .43-.168.832-.47 1.133l-1.923 1.916a2.016 2.016 0 00-1.04 1.76v.168c0 .235.19.42.42.42h.335c1.47 0 2.593 1.12 2.593 2.592V15c0 2.302-1.85 4.16-4.16 4.16-2.302 0-4.16-1.85-4.16-4.16 0-2.302 1.85-4.16 4.16-4.16a.42.42 0 01.42.42v3.083c0 .235-.19.42-.42.42-.562 0-1.012.45-1.012 1.011 0 .562.45 1.012 1.011 1.012.562 0 1.012-.45 1.012-1.012V11.5c0-1.218-.84-2.28-1.995-2.528a4.12 4.12 0 01-3.67-3.953C7.5 2.22 9.728 0 12.523 0c.39 0 .762.056 1.108.15a4.156 4.156 0 012.379 2.115l-2.593 2.57z" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 4.8.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

const FilterIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);


// --- Page Section Components ---

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks: { name: string, page: Page }[] = [
        { name: "Home", page: 'home' },
        { name: "Events", page: 'events' },
        { name: "Services", page: 'services' },
        { name: "About Us", page: 'about' },
        { name: "Our Team", page: 'team' },
        { name: "Contact Us", page: 'contact' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        setCurrentPage(page);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-black/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="block cursor-pointer transform hover:scale-105 transition-transform duration-300">
                            <img src="https://i.postimg.cc/J4LgGJnS/Horizontal_Inverse.png" alt="Mr One Dollar International Logo" className="h-12 w-auto" />
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <a 
                                    key={link.name} 
                                    href="#" 
                                    onClick={(e) => handleNavClick(e, link.page)} 
                                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${currentPage === link.page ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}`}
                                >
                                    {link.name}
                                    {currentPage === link.page && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_theme(colors.amber.400)]"></span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="bg-slate-900 inline-flex items-center justify-center p-3 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-400 transition-all duration-200" 
                            aria-controls="mobile-menu" 
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">{isMenuOpen ? 'Close' : 'Open'} main menu</span>
                            {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`} id="mobile-menu">
                    <div className="px-2 pt-2 pb-4 space-y-2 sm:px-4 bg-slate-900/95 backdrop-blur-sm">
                        {navLinks.map(link => (
                            <a 
                                key={link.name} 
                                href="#" 
                                onClick={(e) => {
                                    handleNavClick(e, link.page);
                                    setIsMenuOpen(false);
                                }} 
                                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                    currentPage === link.page 
                                        ? 'bg-amber-400 text-black' 
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                {link.name}
                                {currentPage === link.page && (
                                    <span className="ml-2 text-xs bg-black/20 px-2 py-0.5 rounded-full">
                                        Active
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

interface HeroProps {
    setCurrentPage: (page: Page) => void;
    currentPage: Page;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage, currentPage }) => {
    const [isZoomPanelOpen, setIsZoomPanelOpen] = useState(false);

    const copyZoomDetail = (label: string, value: string) => {
        const textToCopy = `${label}: ${value}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Copied to clipboard: ${textToCopy}`);
        });
    };

    return (
        <section 
            className="py-24 sm:py-32 text-center hero-background relative"
            style={{
                backgroundImage: "url('https://i.pinimg.com/1200x/6b/5a/79/6b5a79c00621b21813c3f9feffb67873.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            } as React.CSSProperties}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fadeInUp">
                <h2 className="text-amber-400 text-3xl font-bold uppercase tracking-widest" style={{'--delay': '0.1s'} as React.CSSProperties}></h2>
                <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white" style={{'--delay': '0.2s'} as React.CSSProperties}>
                    The Blueprint to the 1% – <br /> Consistently Profitable Traders!!!
                </h1>
                <p className="mt-12 max-w-2xl mx-auto text-lg text-slate-400" style={{'--delay': '0.3s'} as React.CSSProperties}>
                    "Designed for traders who refuse to be average. Learn the strategies that put us in the 1%, <span className="text-blue-400">Stay Blue</span> & <span className="text-green-400">Take Profit</span>."
                </p>
                <div className="mt-10 w-full px-4 sm:px-0">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-2xl mx-auto" style={{'--delay': '0.4s'} as React.CSSProperties}>
                            <a 
                                href="#platinum-promo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById('platinum-promo');
                                    if (element) {
                                        const button = element.querySelector('button');
                                        if (button && button.getAttribute('aria-expanded') !== 'true') {
                                            button.click();
                                        }
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="w-full sm:w-auto text-center bg-amber-400 text-black font-bold py-3 px-6 sm:px-8 rounded-md hover:bg-amber-300 transition-all duration-300 ease-in-out transform hover:scale-105 btn-primary"
                            >
                                Free Trade Ideas | Lifetime
                            </a>
                            <a 
                                href="/services" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage('services');
                                    sessionStorage.setItem('expandProductId', '3');
                                }}
                                className="w-full sm:w-auto text-center border-2 border-amber-400 text-amber-400 font-bold py-3 px-6 sm:px-8 rounded-md hover:bg-amber-400 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 btn-secondary flex items-center justify-center gap-2"
                            >
                                <span>💎</span>
                                <span>Diamond Trade Ideas at $179</span>
                            </a>
                        </div>
                        {currentPage === 'home' && (
                            <div className="w-full flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() => setIsZoomPanelOpen((prev) => !prev)}
                                    aria-haspopup="dialog"
                                    aria-expanded={isZoomPanelOpen}
                                    aria-controls="zoom-support-panel"
                                    className="mt-6 sm:mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white font-semibold px-6 py-3 shadow-xl backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 animate-bounce"
                                >
                                    <span className="">
                                        <img
                                            src="https://i.postimg.cc/7YZjFzbK/icons8-zoom-logo-34-1.png"
                                            alt="Zoom Support"
                                            className="h-[34px] w-[34px] object-contain"
                                        />
                                    </span>
                                    <span className="text-sm">Instant Zoom Support</span>
                                </button>
                                {isZoomPanelOpen && (
                                    <div
                                        id="zoom-support-panel"
                                        role="dialog"
                                        aria-label="Instant Zoom Support"
                                        className="mt-4 w-full max-w-lg bg-slate-950/95 border border-blue-500/40 rounded-2xl p-5 text-left shadow-2xl backdrop-blur-sm animate-fadeInUp"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="flex items-center space-x-2">
  <h3 className="text-lg font-semibold text-white">Instant Zoom Support</h3>
  <img 
    src="https://i.postimg.cc/Gh5YKvKT/Badge_White.png" 
    alt="MR1Dollar Badge" 
    className="w-6 h-6 object-contain"
  />
</div>
                                                <p className="mt-1 text-sm text-slate-300">Need help? Join our live support session for immediate assistance.</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setIsZoomPanelOpen(false)}
                                                className="text-slate-400 hover:text-white transition"
                                                aria-label="Close Zoom support details"
                                            >
                                                <CloseIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <a
                                            href="https://us06web.zoom.us/j/81165255532?pwd=ofshvQl8ruaMygqfgxAKaQ8eKbK1i2.1"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 transition"
                                        >
                                            Join Zoom Meeting
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                        <div className="mt-3 space-y-2 text-xs text-slate-200">
                                            <div className="flex items-center justify-between bg-slate-900/60 rounded-lg px-3 py-2">
                                                <div>
                                                    <span className="block text-slate-400 uppercase tracking-wide">Meeting ID</span>
                                                    <p className="text-sm font-semibold text-white">811 6525 5532</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => copyZoomDetail('Meeting ID', '811 6525 5532')}
                                                    className="ml-3 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 rounded-full px-3 py-1 transition-colors"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between bg-slate-900/60 rounded-lg px-3 py-2">
                                                <div>
                                                    <span className="block text-slate-400 uppercase tracking-wide">Passcode</span>
                                                    <p className="text-sm font-semibold text-white">304559</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => copyZoomDetail('Passcode', '304559')}
                                                    className="ml-3 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 rounded-full px-3 py-1 transition-colors"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/* Zoom Support Panel handled inline with the button above */}
            </div>
        </section>
    );
};

// ... (rest of the code remains the same)

const BlackFridayPromo = () => {
    // ... (rest of the code remains the same)
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-8">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-between cursor-pointer"
            >
                <span className="text-lg font-bold">🎁 Open to see a special Black Friday offer!</span>
                <svg 
                    className={`w-6 h-6 ml-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            {isOpen && (
                <div className="mt-4 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-6 shadow-xl animate-fadeIn">
                    <h3 className="text-2xl font-bold text-center text-yellow-400 mb-4">Black Friday x Funded7</h3>
                    <p className="text-center text-gray-200 mb-6">Exclusive Black Friday offer powered by Mr One Dollar & Funded7.</p>
                    
                    <div className="bg-black/50 border border-yellow-500/30 rounded-lg p-4 mb-6">
                        <h4 className="text-lg font-bold text-yellow-400 mb-3 text-center">🔥 BLACK FRIDAY SPECIAL 🔥</h4>
                        <p className="text-gray-200 mb-4">
                            This Black Friday is for the traders who want to level up — FAST. Funded7 just dropped a deal that removes every excuse and puts you directly in position to win BIG.
                        </p>
                        <p className="text-yellow-300 font-medium mb-4">For the first time ever:</p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">🎯</span>
                                <span>Buy 1 Challenge → Get 1 FREE</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">🎯</span>
                                <span>PLUS Free Access to Trade Directly with The Alpha, Tinyiko Miyambo</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">🎯</span>
                                <span>CODE: <span className="font-bold text-yellow-300">DOLLAR</span></span>
                            </li>
                        </ul>
                        <p className="text-gray-200 mb-4">
                            This is how ordinary traders break into the funded world with confidence, support, and a real blueprint that comes from proven results — not guesswork.
                        </p>
                        <p className="font-semibold text-yellow-300 mb-3">Why this matters:</p>
                        <ul className="space-y-2 mb-4">
                            {['Double your chances of passing', 'Double your path to payouts', 'Learn directly from the Alpha you trust', 'Trade smarter, not harder', 'Only available during Black Friday'].map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="text-yellow-400 mr-2">⚡</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-200 italic mb-4">
                            If you've ever said you want to change your financial life — this is the moment the door opens. Take the leap. Get your accounts. Get your access. Let's build a powerful end to the year.
                        </p>
                        <div className="text-center mt-6">
                            <a 
                                href="https://my.funded7.com/en/sign-up?affiliateId=mr1dollar" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                            >
                                Get Your Funded7 Challenge
                                <span className="ml-2 px-2 py-1 bg-black/20 rounded text-sm font-mono">CODE:DOLLAR</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PropFirms: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
    const partners = [
        // Brokers
        {
            name: 'PrimeXBT',
            description: 'A leading cryptocurrency and forex trading broker offering leveraged trading with tight spreads',

            logoUrl: 'https://i.ibb.co/YGPkfR7/Prime-XBT-Logo.png',
            link: 'https://primexbt.com/id/sign-up?cxd=41494_583667&pid=41494&promo=[afp7]&type=IB&skip_app=1',
            category: 'Brokers',
            color: 'amber'
        },

        // Prop Firms
        {
            name: 'Funded7',
            description: 'A proprietary trading firm providing funding for forex and crypto traders with flexible programs',
            logoUrl: 'https://i.ibb.co/WpHFYqx1/Funded7-logo.png',
            link: 'https://my.funded7.com/en/sign-up?affiliateId=mr1dollar',
            category: 'Prop Firms',
            color: 'purple'
        },
        {
            name: 'FundedNext',
            description: 'A proprietary trading firm providing funding for forex and crypto traders worldwide',
            logoUrl: 'https://i.ibb.co/BKdbGB2V/Fundednext-Logo.png',
            link: 'https://fundednext.com/?fpr=tinyiko-paul-miyambo55',
            category: 'Prop Firms',
            color: 'blue'
        },
        {
            name: 'FTMO',
            description: 'A global prop trading firm offering capital to skilled traders through evaluation programs',
            logoUrl: 'https://i.ibb.co/xQTR80Z/FTMO-logo-removebg-preview.png',
            link: 'https://trader.ftmo.com/?affiliates=UAWWsYFWImbrlfINiOLH',
            category: 'Prop Firms',
            color: 'green'
        }
    ];
    
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Trading Competition Card - PrimeXBT Themed
    const CompetitionCard = () => {
        const [isExpanded, setIsExpanded] = useState(false);
        
        return (
        <div className="bg-gradient-to-br from-blue-900/80 to-black border border-blue-700/50 hover:border-blue-500/70 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full min-h-[360px] flex flex-col group">
            <div className="flex items-center mb-2">
                <div className="p-1.5 bg-blue-600/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors">
                    <img 
                        src="https://i.ibb.co/YGPkfR7/Prime-XBT-Logo.png" 
                        alt="PrimeXBT" 
                        className="h-5 w-auto"
                    />
                </div>
                <h3 className="text-lg font-bold text-blue-300 group-hover:text-blue-200 transition-colors">
                    Trading Competition
                </h3>
            </div>
            <div className="flex flex-col flex-grow">
                <p className="text-blue-100 text-xs mb-1 font-medium">
                    Trading Challenge
                </p>
                <p className="text-blue-100/80 text-xs mb-3">
                    Compete & win a full paid Trade-Cation!
                </p>
                <div className="space-y-2 mb-3">
                    <div className="flex items-center bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-800/50">
                        <span className="mr-2">🏆</span>
                        <span className="text-blue-100 text-xs">Win a Trade-Cation</span>
                    </div>
                    <div className="flex items-center bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-800/50">
                        <span className="mr-2">🥇</span>
                        <span className="text-blue-100 text-xs">Top 3 traders with highest volume win !!</span>
                    </div>
                </div>
                <div className="bg-blue-800/40 border border-blue-700/60 rounded-lg p-2 mb-3 text-center group-hover:border-blue-500/70 transition-colors">
                    <span className="text-blue-100 text-xs font-medium">Ends: 17 Feb 2026</span>
                </div>
            </div>
            <div className="mt-3 space-y-2">
                <a 
                    href="https://primexbt.me/competitions/MrOneDollar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium py-1.5 px-4 rounded-lg text-center text-xs transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center"
                >
                    <span>Join Now</span>
                    <svg className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
                <div className="w-full">
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            setIsExpanded(!isExpanded);
                        }}
                        className="w-full bg-transparent border border-blue-500/40 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 font-medium py-1.5 px-4 rounded-lg text-center text-xs transition-all duration-300 group-hover:bg-blue-900/20 flex items-center justify-center"
                    >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                        <svg 
                            className={`w-3 h-3 ml-1 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {isExpanded && (
                        <div className="mt-2 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-100 text-xs">
                            The time has come!!! The one with the highest score in trading volume takes the cup home and joins us at the next Trade-Cation🔥🔥🔥
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    };
    
    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 animate-fadeIn relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-5"></div>
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-amber-500/30 to-transparent animate-spin-slow"></div>
            </div>
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-500/10 text-amber-400 rounded-full mb-4">
                        Our Partners
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Trusted by Leading <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Brokers & Prop Firms</span>
                    </h2>
                    <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                        We partner with the industry's most reliable brokers and prop firms to bring you the best trading opportunities.
                    </p>
                </div>
                
                <div className={`space-y-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Brokers Section */}
                    <div className="relative">
                        <div className="flex justify-between items-center mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.25)]">
                                <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10.5l9-7.5 9 7.5V19.5A1.5 1.5 0 0 1 19.5 21h-15A1.5 1.5 0 0 1 3 19.5V10.5z" />
                                </svg>
                                <span className="text-sm font-semibold tracking-wide text-white uppercase">Broker</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <div className="w-full flex-1 h-full">
                                <div className="h-full">
                                    {partners
                                        .filter(partner => partner.category === 'Brokers')
                                        .map((partner, i) => (
                                            <a 
                                                key={partner.name}
                                                href={partner.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`bg-gradient-to-br from-amber-500/10 to-amber-600/20 border border-amber-500/30 hover:border-amber-400/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg h-full min-h-[360px] flex flex-col group`}
                                                style={{
                                                    animation: isVisible ? `fadeInUp 0.6s ease-out ${i * 0.1}s both` : 'none'
                                                }}
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <img 
                                                        src={partner.logoUrl} 
                                                        alt={`${partner.name} logo`} 
                                                        className="h-8 w-auto"
                                                    />
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700/50 text-slate-300">
                                                        Broker
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-amber-400 mb-2">
                                                    {partner.name}
                                                </h3>
                                                <p className="text-slate-300 text-sm mb-5 line-clamp-3">
                                                    {partner.description}
                                                </p>
                                                <div className="space-y-5 mb-6 text-xs">
                                                    {[
                                                        '1000x Leverage',
                                                        'Instant Withdrawals',
                                                        'Minimal Spreads',
                                                        '24/7 Support'
                                                    ].map((label) => (
                                                        <div key={label} className="flex items-center gap-6">
                                                            <svg className="w-3 h-3 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span className="truncate">{label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-auto flex justify-between items-center">
                                                    <span className="inline-flex items-center text-sm font-medium text-amber-400 group-hover:text-amber-300 transition-colors">
                                                        
                                                        Start Trading
                                                        <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                </div>
                            </div>
                            
                            {/* PrimeXBT Competition Card */}
                            <div className="w-full md:w-[400px] flex-shrink-0 relative mt-6 md:mt-0 h-full">
                                <div className="hidden md:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
                                <div className="w-full h-full flex flex-col">
                                    <CompetitionCard />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prop Firms Section */}
                    <div className="pt-8">
                        <div className="flex justify-between items-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.25)]">
                                <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19h16M5 11h14M7 5h10" />
                                </svg>
                                <span className="text-sm font-semibold tracking-wide text-white uppercase">Prop-firms</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {partners
                                .filter(partner => partner.category === 'Prop Firms')
                                .map((partner, i) => {
                                    const colorMap = {
                                        purple: 'from-purple-500/10 to-purple-600/20 border-purple-500/30 hover:border-purple-400/50',
                                        blue: 'from-blue-500/10 to-blue-600/20 border-blue-500/30 hover:border-blue-400/50',
                                        green: 'from-green-500/10 to-green-600/20 border-green-500/30 hover:border-green-400/50',
                                        amber: 'from-amber-500/10 to-amber-600/20 border-amber-500/30 hover:border-amber-400/50'
                                    };
                                    
                                    const textColorMap = {
                                        purple: 'text-purple-400',
                                        blue: 'text-blue-400',
                                        green: 'text-green-400',
                                        amber: 'text-amber-400'
                                    };
                                    
                                    return (
                                        <div 
                                            key={partner.name}
                                            role="link"
                                            tabIndex={0}
                                            onClick={() => window.open(partner.link, '_blank', 'noopener,noreferrer')}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    window.open(partner.link, '_blank', 'noopener,noreferrer');
                                                }
                                            }}
                                            className={`group bg-gradient-to-br ${colorMap[partner.color as keyof typeof colorMap]} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg h-full flex flex-col cursor-pointer`}
                                            style={{
                                                animation: isVisible ? `fadeInUp 0.6s ease-out ${i * 0.1 + 0.3}s both` : 'none'
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <img 
                                                    src={partner.logoUrl} 
                                                    alt={`${partner.name} logo`} 
                                                    className="h-8 w-auto"
                                                />
                                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700/50 text-slate-300">
                                                    Prop Firm
                                                </span>
                                            </div>
                                            <h3 className={`text-xl font-bold mb-2 ${textColorMap[partner.color as keyof typeof textColorMap]}`}>
                                                {partner.name}
                                            </h3>
                                            <p className="text-slate-300 text-sm mb-2 line-clamp-3">
                                                {partner.description}
                                            </p>
                                            
                                            <div className="mt-auto">
                                                <a 
                                                    href={partner.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center text-sm font-medium ${textColorMap[partner.color as keyof typeof textColorMap]} group-hover:underline"
                                                >
                                                    Get Funded
                                                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface PromoSectionProps {
    id?: string;
}

const PromoSection: React.FC<PromoSectionProps> = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [activeStep, setActiveStep] = useState<number>(1); // highest visually unlocked step
    const [whatsAppBounce, setWhatsAppBounce] = useState<boolean>(false);
    const step2Ref = useRef<HTMLDivElement>(null);

    // Check for return_to parameter on component mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('return_to');
        
        if (returnTo === 'step2') {
            // Open the section and scroll to it
            setIsOpen(true);
            // Mark step 1 as completed
            setCompletedSteps(prev => (prev.includes(1) ? prev : [...prev, 1]));
            setActiveStep(2);
            
            // Scroll to step 2 after a short delay to allow the section to open
            setTimeout(() => {
                step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const hasStep = (step: number) => completedSteps.includes(step);

    const markStepCompleted = (step: number) => {
        setCompletedSteps(prev => (prev.includes(step) ? prev : [...prev, step]));
    };

    const unlockUpTo = (step: number) => {
        setActiveStep(prev => (step > prev ? step : prev));
    };

    const canUseStep2 = hasStep(1);
    const canUseStep3 = hasStep(2);
    const canUseStep4 = hasStep(3);
    const canUseWhatsApp = hasStep(4);

    const handleKYCYes = () => {
        if (!canUseStep3) return;
        // Mark step 3 as completed and visually unlock steps 4 and 5
        markStepCompleted(3);
        unlockUpTo(5);
        setWhatsAppBounce(true);
    };

    const progressPercentage = (completedSteps.length / 5) * 100; // 5 total steps
    const cardBase = 'p-4 rounded-lg transition-all duration-300';
    const cardActive = 'bg-gray-800/50';
    const cardInactive = 'opacity-50';

    return (
        <section id={id} className="py-12 bg-black text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full bg-black border-2 border-amber-500 hover:border-amber-400 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-between cursor-pointer"
                    >
                        <span className="text-lg sm:text-xl">GET FREE PLATINUM TRADE IDEAS FOR A LIFETIME 🥈</span>
                        <svg 
                            className={`w-6 h-6 ml-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    {isOpen && (
                        <div className="mt-6 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20 shadow-xl animate-fadeIn">
                            <h3 className="text-xl font-bold text-amber-400 mb-6 text-center">
                                Follow These Simple Steps to Get Your Free Platinum Trade Ideas:
                            </h3>
                            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6">
                                <div 
                                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" 
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <div className="text-right text-xs text-gray-400 mb-2">
                                {completedSteps.length} of 5 steps completed
                            </div>
                            <div className="text-center text-xs text-amber-300/80 mb-4 px-4 py-2 bg-amber-500/10 rounded-lg border border-amber-400/20">
                                <svg className="w-4 h-4 inline-block mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Important: You must complete all 5 steps to receive your free Platinum Trade Ideas. Incomplete steps will result in no access.
                            </div>

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="space-y-6 flex-1">
                                    {/* Step 1 */}
                                    <div className={`${cardBase} ${activeStep >= 1 ? cardActive : cardInactive}`}>
                                        <div className="flex items-start">
                                            <div className={`${activeStep >= 1 ? 'bg-amber-500' : 'bg-gray-600'} text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4`}>1</div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">Fill Out Contact Details</h4>
                                                <p className="text-gray-300 text-sm mb-2">Complete the form to get started with your free Platinum Trade Ideas</p>
                                                <a 
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        markStepCompleted(1);
                                                        unlockUpTo(2);
                                                        window.location.href = `https://forms.fillout.com/t/69dxiDrK4kus?MrOneDollar_International_Contact_form=xxxxx&id=${Date.now()}&returnTo=${encodeURIComponent('https://mr-1-international.vercel.app/?return_to=step2')}`;
                                                    }}
                                                    className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                                                >
                                                    Fill Out Contact Form
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div ref={step2Ref} className={`${cardBase} ${activeStep >= 2 ? cardActive : cardInactive}`}>
                                        <div className="flex items-start">
                                            <div className={`${activeStep >= 2 ? 'bg-amber-500' : 'bg-gray-600'} text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4`}>2</div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold mb-3">Register Your Trading Account</h4>
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex flex-col sm:flex-row gap-3">
                                                        <a 
                                                            href="https://primexbt.com/id/sign-up?cxd=41494_583667&pid=41494&promo=[afp7]&type=IB&skip_app=1" 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => {
                                                                if (!canUseStep2) {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    return;
                                                                }
                                                                markStepCompleted(2);
                                                                unlockUpTo(3);
                                                            }}
                                                            className={`inline-flex items-center justify-center gap-2 ${canUseStep2 ? 'bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black' : 'bg-gray-600 border-2 border-gray-600 text-gray-400 cursor-not-allowed'} font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm`}
                                                        >
                                                            <img src="https://i.ibb.co/YGPkfR7/Prime-XBT-Logo.png" alt="PrimeXBT" className="h-5 w-auto object-contain" />
                                                            Register on PrimeXBT
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className={`${cardBase} ${activeStep >= 3 ? cardActive : cardInactive}`}>
                                        <div className="flex items-start">
                                            <div className={`${activeStep >= 3 ? 'bg-amber-500' : 'bg-gray-600'} text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4`}>3</div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">Complete KYC Verification</h4>
                                                <p className="text-gray-300 text-sm mb-2">Have you completed the broker's KYC verification?</p>
                                                <div className="flex gap-3">
                                                    <button 
                                                        onClick={handleKYCYes}
                                                        className={`px-4 py-2 rounded-md font-medium ${canUseStep3 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'} text-white`}
                                                        disabled={!canUseStep3}
                                                    >
                                                        Yes, I've completed KYC
                                                    </button>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (!canUseStep3) return;
                                                            window.open('https://youtu.be/xaTeSbbXn9g', '_blank');
                                                        }}
                                                        className={`px-4 py-2 rounded-md font-medium ${
                                                            canUseStep3 
                                                                ? 'bg-red-600 hover:bg-red-700' 
                                                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                        } text-white`}
                                                        disabled={!canUseStep3}
                                                    >
                                                        No, show me how
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Videos Section */}
                                <div className="space-y-4 w-full md:w-1/3">
                                    <h4 className="font-semibold text-amber-400">Helpful Videos</h4>
                                    <div className="space-y-4">
                                        <a 
                                            href="https://youtu.be/xaTeSbbXn9g" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <div className="bg-red-600 p-1 rounded">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                                </svg>
                                            </div>
                                            <span className="text-sm">How to Register on PrimeXBT</span>
                                        </a>
                                        <a 
                                            href="https://youtube.com/shorts/zNg7CH8sZl0" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <div className="bg-blue-600 p-1 rounded">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                                </svg>
                                            </div>
                                            <span className="text-sm">How to Transfer Funds</span>
                                        </a>
                                        <a 
                                            href="https://youtu.be/zXvOnW12mhY" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <div className="bg-green-600 p-1 rounded">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                                </svg>
                                            </div>
                                            <span className="text-sm">MetaTrader Setup Guide</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className={`${cardBase} ${activeStep >= 4 ? cardActive : cardInactive} mt-6`}>
                                <div className="flex items-start">
                                    <div className={`${activeStep >= 4 ? 'bg-amber-500' : 'bg-gray-600'} text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4`}>4</div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">Fund Your Account</h4>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-gray-300 text-sm">Deposit minimum $10 (R179) into your wallet</span>
                                                                                    </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className={`${cardBase} ${activeStep >= 5 ? cardActive : cardInactive} mt-4`}>
                                <div className="flex items-start">
                                    <div className={`${activeStep >= 5 ? 'bg-amber-500' : 'bg-gray-600'} text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4`}>5</div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">Claim Your Free Month</h4>
                                        <a 
                                            href="https://wa.me/27676923876?text=Hi%20Nomii,%20I've%20completed%20my%20PrimeXBT%20registration%20and%20funded%20with%20a%20minimum%20of%20$10.%20Here's%20my%20proof%20of%20funding:" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                if (!canUseWhatsApp) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    return;
                                                }
                                                setWhatsAppBounce(false);
                                                markStepCompleted(5);
                                            }}
                                            className={`inline-flex items-center justify-center gap-2 ${activeStep >= 5 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out ${whatsAppBounce ? 'animate-bounce' : ''}`}
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.498 14.382l-.002-.001-1.22-1.11c-.5-.4-1.12-.65-1.79-.65h-.01c-1.95 0-3.73 1.17-5.12 3.02-.38.5-.97.8-1.62.8h-.01c-1.23 0-2.23-1.01-2.23-2.24v-8.5c0-1.23 1-2.24 2.24-2.24h11.52c1.23 0 2.24 1.01 2.24 2.24v6.7c0 .86-.49 1.65-1.27 2.04z"/>
                                                <path d="M12 12.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
                                            </svg>
                                            WhatsApp Nomii with Proof
                                        </a>
                                        <p className="text-xs text-gray-400 mt-1">Click to open WhatsApp with pre-filled message</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const Testimonials: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    // Minimum swipe distance to trigger navigation (in pixels)
    const minSwipeDistance = 50;
    
    // Testimonial images from provided URLs
    const testimonialImages = [
        'https://i.postimg.cc/mg5Kpz8t/1.jpg',
        'https://i.postimg.cc/1tCFDS9P/2.jpg',
        'https://i.postimg.cc/zGZgC01r/3.jpg',
        'https://i.postimg.cc/Sss2SPc2/4.jpg',
        'https://i.postimg.cc/mhxtS2JV/5.jpg',
        'https://i.postimg.cc/X7F86Zj4/6.jpg',
        'https://i.postimg.cc/vm8Ln3Wc/7.jpg',
        'https://i.postimg.cc/T1brxSXC/8.jpg',
        'https://i.postimg.cc/YCM1cbDn/9.jpg',
        'https://i.postimg.cc/G28DPN93/10.jpg',
        'https://i.postimg.cc/nVm7C66d/11.jpg',
        'https://i.postimg.cc/W15qBjJx/12.jpg',
        'https://i.postimg.cc/nrKC0tJS/13.jpg',
        'https://i.postimg.cc/QdYV6b2W/14.jpg',
        'https://i.postimg.cc/T1xPyHbR/15.jpg',
        'https://i.postimg.cc/JhB7pW3P/16.jpg'
    ];
    
    return (
        <section className="py-20 bg-black animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">What Our Traders Say</h2>
                <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                    Real results from real members of the Mr.$1 community.
                </p>
                
                <div className="mt-12">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-300 flex items-center mx-auto"
                    >
                        {isOpen ? 'Hide Testimonials' : 'View Mr.$1 Premium Members Testimonials'}
                        <svg 
                            className={`w-5 h-5 ml-2 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    {isOpen && (
                        <div className="mt-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {testimonialImages.map((image, index) => (
                                    <div 
                                        key={index} 
                                        className="relative group cursor-pointer overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <img 
                                            src={image}
                                            alt={`Testimonial ${index + 1}`}
                                            className="w-full h-48 object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 text-center">
                                <a 
                                    href="https://www.instagram.com/stories/highlights/18022507268519783/" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                    View More Testimonials on Instagram
                                </a>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                        <div className="relative max-w-4xl w-full mx-auto">
                            {/* Close button */}
                            <button 
                                className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            {/* Left navigation arrow */}
                            <button 
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = testimonialImages.indexOf(selectedImage);
                                    const prevIndex = (currentIndex - 1 + testimonialImages.length) % testimonialImages.length;
                                    setSelectedImage(testimonialImages[prevIndex]);
                                }}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            
                            {/* Main image */}
                            <div 
                                className="relative"
                                onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
                                onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
                                onTouchEnd={() => {
                                    if (!touchStart || !touchEnd) return;
                                    const distance = touchStart - touchEnd;
                                    const isLeftSwipe = distance > minSwipeDistance;
                                    const isRightSwipe = distance < -minSwipeDistance;
                                    
                                    if (isLeftSwipe) {
                                        const currentIndex = testimonialImages.indexOf(selectedImage!);
                                        const nextIndex = (currentIndex + 1) % testimonialImages.length;
                                        setSelectedImage(testimonialImages[nextIndex]);
                                    } else if (isRightSwipe) {
                                        const currentIndex = testimonialImages.indexOf(selectedImage!);
                                        const prevIndex = (currentIndex - 1 + testimonialImages.length) % testimonialImages.length;
                                        setSelectedImage(testimonialImages[prevIndex]);
                                    }
                                    
                                    setTouchStart(null);
                                    setTouchEnd(null);
                                }}
                            >
                                <img 
                                    src={selectedImage}
                                    alt="Full size testimonial"
                                    className="max-h-[80vh] max-w-full mx-auto rounded-lg shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                    loading="lazy"
                                />
                                <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-1 rounded-full text-sm mx-auto w-24">
                                    {testimonialImages.indexOf(selectedImage) + 1} / {testimonialImages.length}
                                </div>
                                <div className="absolute top-1/2 left-4 right-4 flex justify-between pointer-events-none">
                                    <div className="bg-black/50 text-white p-2 rounded-full">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                    <div className="bg-black/50 text-white p-2 rounded-full">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right navigation arrow */}
                            <button 
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = testimonialImages.indexOf(selectedImage);
                                    const nextIndex = (currentIndex + 1) % testimonialImages.length;
                                    setSelectedImage(testimonialImages[nextIndex]);
                                }}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

interface FooterProps {
    setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => (
    <footer className="bg-black border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <div className="flex items-center space-x-2">
  <img 
    src="https://i.postimg.cc/T3mHV2x0/Favicon_Color.png" 
    alt="MR ONE DOLLAR Logo" 
    className="w-8 h-8 object-contain"
  />
  <h3 className="text-xl font-bold text-white">MR <span className="text-amber-400">ONE</span> DOLLAR</h3>
</div>
                    <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                        At Mr. One Dollar International, our purpose goes beyond just trading. We believe in empowering individuals with the skills and knowledge to achieve financial independence. Our mission is to create a community where traders can thrive, learn, and grow together.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Contact Us</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li className="flex items-start">
                            <img 
                                src="https://img.icons8.com/ios-filled/20/ffb74d/marker.png" 
                                alt="Location" 
                                className="w-5 h-5 mr-3 mt-1 flex-shrink-0"
                            />
                            <div>
                                <h3 className="text-slate-300 font-medium">Head office</h3>
                                <a 
                                    href="https://www.google.com/maps/place/4+karen+street+bryanston+sandton/@-26.0810327,28.0180825,3a,75y,88.36h,90t/data=!3m4!1e1!3m2!1shBSh9g8WXe8onBpO2VkAOw!2e0!4m2!3m1!1s0x1e9574827132b75f:0x494501de697be44e?sa=X&ved=1t:3780&ictx=111"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-amber-400 transition-colors"
                                >
                                    4 Karen Street, Bryanston, Sandton, 2060
                                </a>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <img 
                                src="https://img.icons8.com/ios-filled/20/ffb74d/phone.png" 
                                alt="Phone" 
                                className="w-5 h-5 mr-3 mt-1 flex-shrink-0"
                            />
                            <div>
                                <h3 className="text-slate-300 font-medium">Whatsapp/Call us</h3>
                                <p className="text-slate-400">
                                    <a href="https://wa.me/27676923876" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">+27 67 692 3876</a>
                                </p>
                                <p className="text-slate-400">
                                    <a href="https://wa.me/27614267355" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">+27 61 426 7355</a>
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <img 
                                src="https://img.icons8.com/ios-filled/20/ffb74d/mail.png" 
                                alt="Email" 
                                className="w-5 h-5 mr-3 mt-1 flex-shrink-0"
                            />
                            <div>
                                <h3 className="text-slate-300 font-medium">Email us</h3>
                                <a href="mailto:info@mr1dollar.com" className="text-slate-400 hover:text-amber-400 transition-colors">info@mr1dollar.com</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Follow Us</h3>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://www.youtube.com/@mr1dollar572" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300">
                            <img 
                                src="https://i.ibb.co/Rkr61Kyn/youtube-icon.png" 
                                alt="YouTube Channel" 
                                className="w-7 h-7 object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIiBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik0yMjQuxIDMwLjgxYz0xMjEuNzIgMC0yMjQuMSA5OS4zLTIyNC4xIDIyMS43IDAgMTIyLjQgMTAyLjQgIDIyMS43IDIyNC4xIDIyMS43IDEyMS43IDAgMjI0LjEtOTkuMyAyMjQuMS0yMjEuN0M0NDguMSAxMzAuMSAzNDUuOCAzMC44MSAyMjQuMSAzMC44MXptMCAzNzMuNmMtODMuOSAwLTE1MS45LTY4LjgtMTUxLjktMTUxLjkgMC04My45IDY4LTE1MS45IDE1MS45LTE1MS45czE1MS45IDY4IDE1MS45IDE1MS45YzAgODMuMS02OCAxNTEuOS0xNTEuOSAxNTEuOXptMTI5LjctMzQ4LjJjLTE0LjkgMC0yNy4xLTEyLjItMjcuMS0yNy4xczEyLjItMjcuMSAyNy4xLTI3LjEgMjcuMSAxMi4yIDI3LjEgMjcuMWMwIDE0LjktMTIuMiAyNy4xLTI3LjEgMjcuMXptLTgxLjIgMTIuOGMtMjkuMyAwLTUzLjEgMjMuOS01My4xIDUzLjFzMjMuOSA1My4xIDUzLjEgNTMuMSA1My4xLTIzLjkgNTMuMS01My4xLTIzLjgtNTMuMS01My4xLTUzLjF6bTgxLjIgMTQzYy00OS45IDAtOTAuNS00MC41LTkwLjUtOTAuNXM0MC45LTkwLjUgOTAuNS05MC41IDkwLjUgNDAuNSA5MC41IDkwLjUtNDAuNSA5MC41LTkwLjUgOTAuNXptMC0xNjMuOWMtNDAuNSAwLTczLjQgMzIuOS03My40IDczLjRzMzIuOSA3My40IDczLjQgNzMuNCA3My40LTMyLjkgNzMuNC03My40LTMzLTczLjQtNzMuNC03My40eiIvPjwvc3ZnPg==';
                                }}
                            />
                        </a>
                        <a href="https://www.instagram.com/mr1dollarinternational/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300">
                            <img 
                                src="https://i.ibb.co/dwHV57BN/instagram-icon.png" 
                                alt="Instagram Profile" 
                                className="w-7 h-7 object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIiBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik0yMjQsMTI4YzUyLjkzLDAsNTkuMjcsMC4yNyw3OS44MywxLjQ5YzE1Ljg2LDAuOTUsMjQuNDU0LDQuMiwzMy41NzQsOC41NmM5LjYzLDQuNjUsMTcuNTM0LDEwLjg5LDI1LjE0NCwxOC45N2M3LjYxLDguMDgsMTQuMzIxLDE3LjgxLDE4Ljk3LDI1LjE0YzQuMzYsOS4xMyw3LjYxLDE3LjcxLDguNTYsMzMuNTdjMS4yNiwyMC41NiwxLjQ5LDI2LjksMS40OSw3OS44M3MtMC4yNyw1OS4yNy0xLjQ5LDc5LjgzYy0wLjk1LDE1Ljg2LTQuMiwyNC40NTQtOC41NiwzMy41NzRjLTQuNjUsOS42My0xMC44OSwxNy41MzQtMTguOTcsMjUuMTRjLTguMDgsNy42MS0xNy44MSwxNC4zMjEtMjUuMTQsMTguOTdjLTkuMTMsNC4zNi0xNy43MSw3LjYxLTMzLjU3LDguNTZjLTIwLjU2LDEuMjYtMjYuOSwxLjQ5LTc5LjgzLDEuNDlzLTU5LjI3LTAuMjctNzkuODMtMS40OWMtMTUuODYtMC45NS0yNC40NTQtNC4yLTMzLjU3NC04LjU2Yy01LjktMTIuNy0xMC44OS0yNS4xLTEwLjktNDQuMWMwLTE2LjEzLDEzLjExLTI5LjI0LDI5LjI0LTI5LjI0aC00MGMtMTYuMTMsMC0yOS4yNCwxMy4xMS0yOS4yNCwyOS4yNGgtMTZjMC00My4yMiwzNC45OC03OC4yLDc4LjItNzguMnM3OC4yLDM0Ljk4LDc4LjIsNzguMnMtMzQuOTgsNzguMi03OC4yLDc4LjJjLTE2LjEzLDAtMjkuMjQsMTMuMTEtMjkuMjQsMjkuMjR2MTZjMCwxNi4xMywxMy4xMSwyOS4yNCwyOS4yNCwyOS4yNGM3Mi4wNywwLDEzMC42LTU4LjUzLDEzMC42LTEzMC42UzI5Ni4wNywyMDguMiwyMjQsMjA4LjJ6IE0zODQuMSwxMThjMCwxNi43Ny0xMy42LDMwLjM3LTMwLjM3LDMwLjM3Yy0xNi43NywwLTMwLjM3LTEzLjYtMzAuMzctMzAuMzdjMC0xNi43NywxMy42LTMwLjM3LDMwLjM3LTMwLjM3QzM3MC41LDg3LjYzLDM4NC4xLDEwMS4yMywzODQuMSwxMTh6Ii8+PC9zdmc+';
                                }}
                            />
                        </a>
                        <a href="https://t.me/mr1dollarinternational" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300">
                            <img 
                                src="https://i.ibb.co/6cxvssxN/telegram-icon.png" 
                                alt="Telegram Channel" 
                                className="w-7 h-7 object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgNTEyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMTE5LjcgMzA4LjljLTMuMiA3LjItNy44IDkuMS0xNS44IDUuN2wtNDMuNS0zMy4yLTIwLjcgMjAuMiA3LjQgNjguMWMxLjIgNy4yLTIsMTAuMS05LjEgNi4zbC0xMjAtNzUuNi01MS43IDQ5LjVjLTEuNyAxLjctMy4yIDMuMi02LjQgMy4ybC0uOS0xMy40IDUxLjMtNDYuNC0xMDUuNi05MyA0LjctMTMuOSA4My4yIDc4LjMgMTE3LjQtMzQuNGMxMC4yLTIuOSAxMC4yLTEwLjIgMi4yLTExLjlsLxYwgezAgMHoiLz48L3N2Zz4=';
                                }}
                            />
                        </a>
                        <a href="https://chat.whatsapp.com/LYKIJlJWNEyGnhQ8vfAaBW" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300">
                            <img 
                                src="https://i.ibb.co/NnLKXtY5/whatsapp-icon.png" 
                                alt="WhatsApp Community" 
                                className="w-7 h-7 object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIiBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik0zODAuOSw5Ny4xQzMzOSw1NS40LDI4My42LDMyLDIyNCwzMkMxMDQuMywzMiw4LDcxLjYsOCwxNjBjMCwyNi4zLDYuNiw1Mi4zLDE5Ljc1LDc1TDE2LDQzOGwxMDcuNy0yOC41YzI0LjIsMTMuNCw1Mi4yLDEzLjUsNzYuMSwxLjVjMC4xLDAsMC4yLDAsMC4zLDBjMjQuMSwwLDQ2LjgtMTAuMSw2My45LTI4LjRjMTcuMS0xOC4zLDI2LjUtNDIuOSwyNi41LTY5LjNDMjMyLjgsMTQxLjEsMzExLjgsMTEwLjEsMzgwLjksOTcuMXpNMjI0LDQwMGMtMjYuNCwwLTUxLjUtMTEuMS02OS4yLTMwLjVjLTExLjUtMTIuNy0xNy44LTI5LjMtMTcuOC00Ny40YzAtMzguMSwzMS02OS4xLDY5LTY5LjFjMTguMSwwLDM0LjgsNi45LDQ3LjQsMTguM2MxMi42LDExLjQsMTkuNSwyNy4xLDE5LjUsNDQuMUMyODEuOCwzNjksMjUwLjgsNDAwLDIyNCw0MDB6IE0zNDguMiwzNDkuMWMtMTYuNCwxOC0zOS43LDI4LjEtNjQuMiwyOC4xYy0xMy44LDAtMjcuMS00LjEtMzguNC0xMS43bC0zLjktMi4zbC00MC4yLDEwLjVsMTAuNy0zOS4xbC0yLjQtMy45Yy03LjgtMTEuNy0xMi0yNS4xLTEyLTM4LjdjMC0xMy43LDQuMi0yNy4xLDEyLTM4LjdjNy44LTExLjcsMTkuMS0yMC43LDMyLjUtMjUuNmwzLjItMS4xbDEuNSwzLjVjNC42LDEwLjcsNy4xLDIyLDcuNSwzMy41YzAuMywxMS40LTEuOCwyMi44LTYuNCwzMy4yYy0wLjEsMC4yLTAuMSwwLjQtMC4yLDAuNmwtMS43LDMuNGwzLjIsMS45YzExLjgsNy4xLDI1LjIsMTAuOCwzOC44LDEwLjhjMTMuNywwLDI3LjEtMy44LDM4LjctMTEuNGwzLjItMS45bDMuNCwxLjdDMzMzLjMsMzMzLjIsMzQxLjIsMzQxLjIsMzQ4LjIsMzQ5LjF6Ii8+PC9zdmc+';
                                }}
                            />
                        </a>
                    </div>
                     <p className="mt-4 text-slate-400 text-sm">Join our communities on WhatsApp and Telegram!</p>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
                 <div className="text-center md:text-left">
                    <p className="text-slate-400 text-sm">Copyright &copy; {new Date().getFullYear()} . All rights reserved.</p>
                    <p className="text-slate-500 text-xs mt-1">Trading Involves Risk, Past Performances does not guarantee Future Result</p>
                </div>
                <div className="flex flex-wrap justify-center space-x-4 mt-4 md:mt-0">
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Home</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">About Us</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); }} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Services</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('terms'); }} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Terms</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('privacy'); }} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Privacy Policy</a>
                </div>
            </div>
        </div>
    </footer>
);


const WhatsAppWidget: React.FC = () => {
  return (
    <div className="fixed right-5 bottom-5 z-50 transition-all duration-300 transform hover:translate-y-[-2px]">
      <a 
        href="https://wa.me/27676923876?text=Hi%20Nomii,%20I%20have%20a%20question%20about%20your%20trading%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center group relative"
        aria-label="Chat with Nomii on WhatsApp"
      >
        <img 
          src="https://i.postimg.cc/85bCvgVM/icons8-whatsapp-40.png" 
          alt="WhatsApp" 
          className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
        />
        <span className="absolute right-14 bg-white text-gray-800 text-xs font-medium px-2.5 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          Chat with Nomii
        </span>
      </a>
    </div>
  );
};

// --- Page Components ---

interface HomePageProps {
    setCurrentPage: (page: Page) => void;
}

// Image carousel component
const ImageCarousel = ({ images, interval = 3000 }: { images: { url: string }[], interval?: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Auto-advance the carousel
        timerRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        // Clear interval on component unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [images.length, interval]);

    return (
        <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-lg bg-black">
            {images.map((image, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img 
                        src={image.url} 
                        alt={`Tradecation ${index + 1}`}
                        className="w-full h-full object-cover md:object-contain lg:object-contain"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://i.postimg.cc/2SnNJPxH/5.png';
                        }}
                    />
                </div>
            ))}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-amber-400 w-6' : 'bg-white/50 w-2'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
    const [perksOpen, setPerksOpen] = useState(true);

    return (
        <>
            <Hero setCurrentPage={setCurrentPage} currentPage="home" />
            <PromoSection id="platinum-promo" />
            
            {/* Our Trusted Partners */}
            <PropFirms setCurrentPage={setCurrentPage} />
            
            {/* Features Section with Expanded Cards */}
            <section className="py-20 bg-black animate-fadeInUp">
                <div className="container mx-auto px-4">
                    <div className="space-y-12">
                        {/* Proven Track Record */}
                        <div className="glass-card p-8 rounded-lg">
                            <div className="flex items-center mb-6">
                                <svg className="w-12 h-12 text-amber-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <h2 className="text-3xl font-bold text-white">Proven Track Record</h2>
                            </div>
                            <p className="text-slate-300 mb-6">
                                Our premium trading community consistently delivers exceptional weekly performance, with win rates ranging between 70% to 100% across all trading sessions. Here's a glimpse of our recent trading statistics:
                            </p>
                            
                            {/* YouTube Videos Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                                {[
                                    { id: 'vfX0Y106iK0', title: 'Video 1' },
                                    { id: 'CVLyno-oktw', title: 'Video 2' },
                                    { id: 'Zg1VAV2xzSQ', title: 'Video 3' },
                                    { id: 'L_9QwGiHKrw', title: 'Video 4' },
                                    { id: '71Ez4STWkkE', title: 'Video 5' },
                                    { id: 'xxc5MLIwSSE', title: 'Video 6' },
                                    { id: 'EXhbQfl6uVw', title: 'Video 7' },
                                    { id: '5koztpAhFmg', title: 'Video 8' }
                                ].map((video) => (
                                    <a
                                        key={video.id}
                                        href={`https://www.youtube.com/watch?v=${video.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative rounded-lg overflow-hidden aspect-video bg-slate-800/50 border border-slate-700/50 hover:border-amber-400/50 transition-all duration-300"
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                            <p className="text-xs text-white font-medium line-clamp-2">{video.title}</p>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-10 h-10 bg-red-500/90 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                                                <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                                <h3 className="text-xl font-semibold text-amber-400 mb-3">More Trading Content</h3>
                                <p className="text-slate-300 mb-4">
                                    Subscribe to our YouTube channel for the latest trade ideas, market analysis, and educational content.
                                </p>
                                <a 
                                    href="https://www.youtube.com/@mr1dollar572" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors group"
                                >
                                    <span className="border-b border-transparent group-hover:border-amber-300">Visit Our YouTube Channel</span>
                                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Exclusive Trade-Cations */}
                        <div className="glass-card p-4 md:p-8 rounded-lg overflow-hidden">
                            <div className="flex items-center mb-6">
                                <svg className="w-12 h-12 text-amber-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-3xl font-bold text-white">Exclusive Trade-Cations</h2>
                            </div>
                            <p className="text-slate-300 mb-6">
                                Combine your passion for trading with the joy of travel. Our exclusive Trade-Cations provide immersive trading experiences in beautiful locations.
                            </p>
                            <div className="space-y-6 overflow-visible">
                                <div className="relative overflow-visible rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                                    {/* Image Carousel */}
                                    <ImageCarousel 
                                        images={[
                                            { url: 'https://i.postimg.cc/zGGTPrNs/1.png' },
                                            { url: 'https://i.postimg.cc/4NNKXQMk/2.png' },
                                            { url: 'https://i.postimg.cc/d3SJsrkc/3.png' },
                                            { url: 'https://i.postimg.cc/cHxWfXw5/4.png' },
                                            { url: 'https://i.postimg.cc/2SnNJPxH/5.png' },
                                            { url: 'https://i.postimg.cc/xTbwJWBJ/6.png' },
                                            { url: 'https://i.postimg.cc/W1Vs2NzW/7.png' },
                                            { url: 'https://i.postimg.cc/QNWD19T8/8.png' },
                                            { url: 'https://i.postimg.cc/0NQRQbv2/9.png' }
                                        ]} 
                                        interval={3000}
                                    />
                                    
                                    <div className="relative z-10 p-4 md:p-8 flex-1 flex flex-col overflow-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                                        {/* Header with Icon */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="inline-flex items-center bg-slate-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30 mb-6">
                                                <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium">Drakensburg, South Africa</span>
                                                    <span className="text-amber-300 text-sm font-medium">Upcoming Tradecation (Feb 23-27, 2026)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 grid-cols-1 md:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] mb-8 overflow-visible">
                                            {/* Upcoming Tradecation Details */}
                                            <div>
                                                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                    What's Included
                                                </h4>
                                                <div className="bg-slate-900/70 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg shadow-amber-500/10">
                                                    <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-200">
                                                        <p>
                                                            At <span className="text-amber-400 font-semibold">Mr One Dollar International</span>, the Full Course is engineered to transform you into a calm, confident and profitable trader—whether you are starting from zero or ready to master the markets at an elite level.
                                                        </p>
                                                        <p>
                                                            This isn’t another video bundle. It’s an immersive experience that blends education, mentorship and lifestyle optimisation so you can live like a professional trader while you learn to think like one.
                                                        </p>
                                                    </div>

                                                    <div className="bg-black/30 border border-amber-500/20 rounded-xl overflow-hidden">
                                                        <button
                                                            type="button"
                                                            onClick={() => setPerksOpen(prev => !prev)}
                                                            className="w-full flex items-center justify-between gap-3 px-5 sm:px-6 py-4 text-left text-white font-semibold"
                                                            aria-expanded={perksOpen}
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                <span className="text-amber-400 text-xl">✨</span>
                                                                When you enrol, you unlock:
                                                            </span>
                                                            <svg
                                                                className={`w-5 h-5 text-amber-300 transition-transform ${perksOpen ? 'rotate-180' : ''}`}
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={1.5}
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        </button>
                                                        {perksOpen && (
                                                            <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">
                                                                <div className="grid gap-4 sm:grid-cols-2">
                                                                    {[{
                                                                        icon: '🎓',
                                                                        title: 'Complete Training Journey',
                                                                        description: 'Beginner, Intermediate & Advanced modules that build true mastery.'
                                                                    }, {
                                                                        icon: '💡',
                                                                        title: '3 Months of Diamond💎 Trade Ideas',
                                                                        description: 'Learn and earn simultaneously with guided institutional-grade insights.'
                                                                    }, {
                                                                        icon: '💼',
                                                                        title: 'Funding Pathway',
                                                                        description: '$5,000 prop firm account setup or a $50 funded account with our recommended broker.'
                                                                    }, {
                                                                        icon: '🏨',
                                                                        title: 'Luxury Tradecation Residency',
                                                                        description: 'Private accommodation (Mon–Fri) designed for deep focus and execution.'
                                                                    }, {
                                                                        icon: '🍽️',
                                                                        title: 'Lifestyle Support',
                                                                        description: 'Daily breakfast, lunch, dinner & snacks prepared by our private chef.'
                                                                    }, {
                                                                        icon: '🧠',
                                                                        title: 'Mind & Body Optimisation',
                                                                        description: '5 AM fitness with a health coach plus 30-minute mindset coaching every day.'
                                                                    }].map((item, index) => (
                                                                        <div key={index} className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex flex-col gap-2 hover:border-amber-400/60 transition-colors">
                                                                            <div className="flex items-center gap-2 text-amber-300 font-semibold">
                                                                                <span className="text-xl">{item.icon}</span>
                                                                                <span>{item.title}</span>
                                                                            </div>
                                                                            <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-200">
                                                        <p>
                                                            It’s more than education—it’s the <span className="text-amber-400 font-semibold">Blueprint to the 1%</span>, engineered to reshape you mentally, emotionally and technically into a funded trader with institutional discipline.
                                                        </p>
                                                    </div>

                                                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-amber-300 text-2xl">💡</span>
                                                            <h5 className="text-lg font-semibold text-white">You’ll learn how to:</h5>
                                                        </div>
                                                        <ul className="grid gap-2 sm:grid-cols-2 text-slate-300 text-sm leading-relaxed">
                                                            {[
                                                                'Decode how the forex market truly moves',
                                                                'Master charting, Deep chart secrets and Our powerful strategies',
                                                                'Apply elite risk management and cultivate consistent psychology',
                                                                'Develop and stress-test your own winning strategy',
                                                                'Trade like a funded professional and pass prop firm challenges'
                                                            ].map((item, index) => (
                                                                <li key={index} className="flex items-start gap-2">
                                                                    <span className="text-amber-400 mt-0.5">▹</span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <p className="text-slate-200 text-sm sm:text-base leading-relaxed pt-1">
                                                            When you complete the Full Course, you won’t just understand forex—you’ll think, operate, and execute like a seasoned professional. 🔥
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Previous Tradecation Highlight */}
                                            <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/80 border border-amber-500/20 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/20 space-y-4">
                                                <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em]">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                                                    Previous Tradecation
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="text-2xl font-bold text-white">Trade-Cation Pine Lake Resort</h4>
                                                    <p className="text-slate-300 text-sm leading-relaxed">
                                                        Experience luxury and learning in the heart of Drakensburg's breathtaking landscapes. Get a glimpse of how we blend lifestyle, discipline, and trader performance.
                                                    </p>
                                                </div>
                                                <ul className="space-y-2 text-sm text-slate-300">
                                                    {[
                                                        {
                                                            icon: '🏞️',
                                                            text: 'Immersive live-in mentorship for traders at every level'
                                                        },
                                                        {
                                                            icon: '🍳',
                                                            text: 'Private chef-curated meals tailored for peak performance'
                                                        },
                                                        {
                                                            icon: '🤝',
                                                            text: 'Powerful networking with high-performing traders'
                                                        }
                                                    ].map((item, index) => (
                                                        <li key={index} className="flex items-start gap-3">
                                                            <span className="text-lg leading-none">{item.icon}</span>
                                                            <span>{item.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <a 
                                                    href="https://www.youtube.com/watch?v=AdtFWr97JmQ" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 w-full rounded-lg border border-amber-500/30 text-amber-300 font-semibold bg-amber-500/10 hover:bg-amber-500/20 hover:text-amber-200 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                                    </svg>
                                                    Watch Previous Tradecation
                                                </a>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <a 
                                                href="#" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    setCurrentPage('events'); 
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                                            >
                                                <span>Reserve Your Spot</span>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Support & Community Section */}
                        <SupportSection />
                        
                    </div>
                </div>
            </section>

            <Testimonials />
            <FAQ />
        </>
    );
};

const EventsPage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [tradecationPerksOpen, setTradecationPerksOpen] = useState(false);

    const tradecationPerks = [
        {
            icon: '🎓',
            title: 'Complete Training Journey',
            description: 'Beginner, Intermediate & Advanced modules that build true mastery.'
        },
        {
            icon: '💡',
            title: '3 Months of Diamond💎 Trade Ideas',
            description: 'Learn and earn simultaneously with guided institutional-grade insights.'
        },
        {
            icon: '💼',
            title: 'Funding Pathway',
            description: '$5,000 prop firm account setup or a $50 funded account with our recommended broker.'
        },
        {
            icon: '🏨',
            title: 'Luxury Tradecation Residency',
            description: 'Private accommodation (Mon–Fri) designed for deep focus and execution.'
        },
        {
            icon: '🍽️',
            title: 'Lifestyle Support',
            description: 'Daily breakfast, lunch, dinner & snacks prepared by our private chef.'
        },
        {
            icon: '🧠',
            title: 'Mind & Body Optimisation',
            description: '5 AM fitness with a health coach plus 30-minute mindset coaching every day.'
        }
    ];

    const tradecationLearningPoints = [
     'Decode how the forex market truly moves',
     'Master charting, Deep chart secrets and Our powerful strategies',
     'Apply elite risk management and cultivate consistent psychology',
     'Develop and stress-test your own winning strategy',
     'Trade like a funded professional and pass prop firm challenges'
    ];

    // Event data
    const events = [
        {
            id: 1,
            title: "🚀 Exclusive Tradecation Experience",
            description: "A 5-day luxury residency engineered to transform you into a calm, confident and profitable trader with institutional discipline.",
            details: [
                {
                    title: "🔥 What's Included",
                    items: [
                        "🏆 Complete Trading Education (Beginner to Advanced)",
                        "💡 3 Months of Diamond 💎 Trade Ideas",
                        "💼 $5,000 Prop Firm Account Setup (or $50 funded account)",
                        "🏨 Luxury Accommodation (Private Residency, Mon-Fri)",
                        "🍽️ All Meals Included (Breakfast, Lunch, Dinner + Snacks)",
                        "💪 Morning Fitness Sessions with Certified Coach (5 AM)",
                        "🧠 Daily Mindset Coaching (30 min 1-on-1 sessions)",
                        "👨‍🍳 Private Chef for Optimal Nutrition & Performance"
                    ]
                },
                {
                    title: "📈 Trading Education",
                    items: [
                        "🔍 Market Structure & Price Action Mastery",
                        "📊 Advanced Chart Patterns & Technical Analysis",
                        "💵 Risk Management Strategies (1-2% Rule)",
                        "🧠 Trading Psychology & Discipline",
                        "📱 Live Trading Sessions & Q&A"
                    ]
                },
                {
                    title: "💰 What You'll Achieve",
                    items: [
                        "✅ Develop a Profitable Trading Strategy",
                        "✅ Learn to Analyze Markets Like a Pro",
                        "✅ Build Unshakable Trading Discipline",
                        "✅ Join Our Exclusive Trader Community",
                        "✅ Leave with a Clear Path to Financial Freedom"
                    ]
                }
            ],
            price: "R15,354.99 (≈ $879.99)",
            date: "February 23-27, 2026",
            time: "5-Day Immersive Residency",
            location: "Cayley Resort • Drakensburg, South Africa",
            image: "https://i.postimg.cc/1Xs6Qhxx/trade-cation-poster.jpg",
            whatsappMessage: "Hi, I'm interested in the Tradecation experience. Please send me more details.",
            whatsappLink: "https://wa.me/27676923876?text=Hi%2C%20I'm%20interested%20in%20the%20Tradecation%20experience.%20Please%20send%20me%20more%20details."
        },
        {
            id: 2,
            title: "🎯 NFP Trading Masterclass",
            description: "Master the most volatile trading day of the month with our expert-led NFP trading session. Learn to profit from the biggest market-moving economic report.",
            price: "R279 (≈ $15.99)",
            date: "First Friday of every month",
            time: "14:30 PM - 15:30 PM (SAST)",
            location: "Physical or Online",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png",
            whatsappMessage: "Hi, I'd like to register for the NFP Trading Masterclass.",
            whatsappLink: "https://wa.me/27676923876?text=Hi%2C%20I'd%20like%20to%20register%20for%20the%20NFP%20Trading%20Masterclass."
        }
    ];

    // Events gallery images with tags
    const eventImages = [
        // NFP Images
        { url: 'https://i.postimg.cc/MH9h0wqq/nfp2.png', tag: '#NFP' },
        { url: 'https://i.postimg.cc/rmQh39bf/nfp3.png', tag: '#NFP' },
        { url: 'https://i.postimg.cc/KzvfPMzp/nfp4.png', tag: '#NFP' },
        { url: 'https://i.postimg.cc/Hn8Qz4CN/nfp5.png', tag: '#NFP' },
        { url: 'https://i.postimg.cc/wMNwMd3x/nfp6.png', tag: '#NFP' },
        // Tradecation Images
        { url: 'https://i.postimg.cc/zGGTPrNs/1.png', tag: '#Tradecation' },
        { url: 'https://i.postimg.cc/4NNKXQMk/2.png', tag: '#Tradecation' },
        { url: 'https://i.postimg.cc/d3SJsrkc/3.png', tag: '#Tradecation' },
        { url: 'https://i.postimg.cc/cHxWfXw5/4.png', tag: '#Tradecation' },
        { url: 'https://i.postimg.cc/2SnNJPxH/5.png', tag: '#Tradecation' },
        { url: 'https://i.postimg.cc/xTbwJWBJ/6.png', tag: '#Tradecation' },
        { url: 'https://i.postimg.cc/W1Vs2NzW/7.png', tag: '#Tradecation' },
        { url: 'https://i.postimg.cc/QNWD19T8/8.png', tag: '#Tradecation' },
        { url: 'https://i.postimg.cc/0NQRQbv2/9.png', tag: '#Tradecation' },
        // Traders Fair Images
        { url: 'https://i.postimg.cc/66Dvfvbk/tradesfair-2024-speakers.png', tag: '#Tradersfair' },
        { url: 'https://i.postimg.cc/kG8DpTYj/tradesfair-2024-tk.png', tag: '#Tradersfair' },
        { url: 'https://i.postimg.cc/j2zdXLLV/tradesfair-2024.png', tag: '#Tradersfair' },
        { url: 'https://i.postimg.cc/CKXhpjqH/tradesfair-2025.png', tag: '#Tradersfair' },
    ];

    return (
        <div className="bg-black py-16 sm:py-24 animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="lg:w-2/3 space-y-8">
                        {events.map((event) => (
                            <div key={event.id} className="glass-card p-6 sm:p-8 rounded-lg">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="md:w-1/3">
                                        <div className="aspect-w-16 aspect-h-9 bg-slate-800 rounded-lg overflow-hidden">
                                            <div className="w-full h-full cursor-pointer group" onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImage(event.image);
                                            }}>
                                                <img 
                                                    src={event.image} 
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = 'https://via.placeholder.com/400x225?text=Event+Image';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-2/3">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{event.title}</h2>
                                        <p className="text-slate-300 mb-4">{event.description}</p>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-slate-400">Date</p>
                                                <p className="text-white font-medium">{event.date}</p>
                                            </div>
                                            {event.time && (
                                                <div>
                                                    <p className="text-sm text-slate-400">Time</p>
                                                    <p className="text-white font-medium">{event.time}</p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm text-slate-400">Location</p>
                                                <p className="text-white font-medium">
                                                    {event.location}
                                                    {event.id === 1 && (
                                                        <span className="block text-xs text-amber-400 mt-1 ml-2">• Upcoming Tradecation</span>
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-400">Price</p>
                                                <p className="text-2xl font-bold text-amber-400">{event.price}</p>
                                            </div>
                                        </div>
                                        
                                        {event.id === 1 && (
                                            <div className="space-y-5 mt-4">
                                                <div className="space-y-3 text-sm leading-relaxed text-slate-200">
                                                    <p>
                                                        At <span className="text-amber-400 font-semibold">Mr One Dollar International</span>, the Full Course Tradecation blends education, mentorship, and lifestyle optimisation so you can live and execute like a professional trader while you learn to think like one.
                                                    </p>
                                                    <p>
                                                        Immerse yourself in a results-driven environment designed for elite focus—complete with private accommodation, curated meals, and daily performance coaching to ensure every session compounds your mastery.
                                                    </p>
                                                </div>

                                                <div className="bg-black/30 border border-amber-500/20 rounded-xl overflow-hidden">
                                                    <button
                                                        type="button"
                                                        onClick={() => setTradecationPerksOpen((prev) => !prev)}
                                                        className="w-full flex items-center justify-between gap-3 px-5 sm:px-6 py-4 text-left text-white font-semibold"
                                                        aria-expanded={tradecationPerksOpen}
                                                        aria-controls="tradecation-perks"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <span className="text-amber-400 text-xl">✨</span>
                                                            What You'll Get
                                                        </span>
                                                        <svg
                                                            className={`w-5 h-5 text-amber-300 transition-transform ${tradecationPerksOpen ? 'rotate-180' : ''}`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={1.5}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    </button>
                                                    {tradecationPerksOpen && (
                                                        <div id="tradecation-perks" className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">
                                                            <div className="grid gap-4 sm:grid-cols-2">
                                                                {tradecationPerks.map((item) => (
                                                                    <div key={item.title} className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex flex-col gap-2 hover:border-amber-400/60 transition-colors">
                                                                        <div className="flex items-center gap-2 text-amber-300 font-semibold">
                                                                            <span className="text-xl">{item.icon}</span>
                                                                            <span>{item.title}</span>
                                                                        </div>
                                                                        <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-6">
                                                    <h4 className="text-lg font-semibold text-white mb-3">What You'll Learn:</h4>
                                                    <ul className="space-y-2 text-slate-300">
                                                        {tradecationLearningPoints.map((point) => (
                                                            <li key={point} className="flex items-start">
                                                                <span className="text-amber-400 mr-2">•</span>
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        {event.id === 2 && (
                                            <div className="space-y-5 mt-4">
                                                <div className="space-y-3 text-sm leading-relaxed text-slate-200">
                                                    <p>
                                                        Join our expert traders as we navigate the most volatile trading day of the month. Learn to profit from the Non-Farm Payroll report with our proven strategies.
                                                    </p>
                                                </div>

                                                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-amber-400">
                                                    <h3 className="text-lg font-semibold text-amber-400 mb-2">NEXT NFP TRADING SESSION</h3>
                                                    <p className="text-slate-300 mb-3">Master the most volatile trading day of the month with our expert-led NFP trading session.</p>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-slate-400">When</p>
                                                            <p className="text-white font-medium">Next NFP Release</p>
                                                            <p className="text-slate-400 text-xs">(First Friday of each month)</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-400">Time</p>
                                                            <p className="text-white font-medium">1:30 PM - 3:30 PM (SAST)</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-400">Where</p>
                                                            <p className="text-white font-medium">Physical or Online</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-400">Price</p>
                                                            <p className="text-amber-400 font-bold">$15.99 (≈ R279)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="text-lg font-semibold text-white mb-3">What You'll Learn:</h4>
                                                    <ul className="space-y-2 text-slate-300">
                                                        <li className="flex items-start">
                                                            <span className="text-amber-400 mr-2">•</span>
                                                            <span>Pre-news analysis and market preparation</span>
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="text-amber-400 mr-2">•</span>
                                                            <span>Optimal entry and exit strategies</span>
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="text-amber-400 mr-2">•</span>
                                                            <span>Risk management techniques for high volatility</span>
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="text-amber-400 mr-2">•</span>
                                                            <span>Live trading demonstration</span>
                                                        </li>
                                                        <li className="flex items-start">
                                                            <span className="text-amber-400 mr-2">•</span>
                                                            <span>Q&A with professional traders</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                
                                                <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20">
                                                    <h4 className="text-lg font-semibold text-amber-400 mb-2">Special Bonus</h4>
                                                    <p className="text-slate-300 text-sm">All participants will receive a NFP Trading Guide. Nicely prepared food and drinks will be provided for those attending physically.</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                            <a 
                                                href={event.id === 1 
                                                    ? "https://whop.com/checkout/plan_91pPZHbkPYU9q" 
                                                    : "https://whop.com/checkout/plan_EoyvAo4ReKJhi"
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 flex-1 text-center"
                                            >
                                                Buy Now
                                            </a>
                                            <a 
                                                href={event.whatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                                            >
                                                Enquire
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                        {/* Events Gallery */}
                        <div className="glass-card p-6 sm:p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-3 mb-6">Events Gallery</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {eventImages.map((image, index) => (
                                    <div 
                                        key={index} 
                                        className="relative overflow-hidden rounded-lg aspect-square"
                                        onClick={() => setSelectedImage(image.url)}
                                    >
                                        <div 
                                            className="w-full h-full cursor-pointer group"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImage(image.url);
                                            }}
                                        >
                                            <img 
                                                src={image.url} 
                                                alt={`Event ${index + 1}`} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://i.postimg.cc/8CqkWhwH/1.png';
                                                }}
                                            />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                            <span className="text-amber-400 text-sm font-semibold">{image.tag}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Event Description */}
                        <div className="glass-card p-6 sm:p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-3 mb-4">📅 Event Details</h2>
                            <div className="space-y-6">
                                <div className="space-y-3 text-slate-300">
                                    <p>
                                        Our events are designed to provide you with the knowledge and skills to succeed in the financial markets. Whether you're a beginner or an experienced trader, our expert-led sessions will help you take your trading to the next level.
                                    </p>
                                    <p>
                                        Check out our upcoming events above for more details on what each session offers and how you can participate.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 space-y-8">
                        <div className="glass-card p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
                            <p className="text-slate-400">Check out our exclusive Trade-Cation and NFP Trading Masterclass events.</p>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full">
                        <button 
                            className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Full size event" 
                            className="max-h-[80vh] w-auto mx-auto rounded-lg object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, onClick?: () => void}> = ({icon, title, onClick}) => (
    <div 
        className="glass-card p-8 rounded-lg flex flex-col items-center text-center transform hover:scale-105 hover:border-amber-400/30 transition-all duration-300 cursor-pointer"
        onClick={onClick}
    >
        {icon}
        <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
    </div>
);

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqData = [
        {
            question: "What is Mr.$1 International?",
            answer: "Mr.$1 International is a premier Forex education and trade ideas provider. Our mission is to empower traders of all levels with the knowledge, strategies, and community support needed to achieve financial independence and join the top 1% of successful traders."
        },
        {
            question: "Who are your courses designed for?",
            answer: "Our courses cater to everyone, from absolute beginners with no prior knowledge to experienced traders looking to refine their strategies. We offer a structured learning path, including beginner, intermediate, and advanced courses, as well as specialized mentorship programs."
        },
        {
            question: "What makes your trade ideas different?",
            answer: "Our trade ideas are the result of rigorous analysis by our team of expert traders. We offer insights into the market's direction, helping you make informed decisions. Our focus is on high-probability setups that align with our core 'Stay Blue & Take Profit' philosophy."
        },
        {
            question: "Do I need any prior experience to start?",
            answer: "Not at all! Our beginner's course is specifically designed to build a strong foundation from the ground up. We cover all the basics, from understanding Forex terminology to setting up your charts and executing your first trade in a supportive learning environment."
        },
        {
            question: "How do I get started with Mr.$1 International?",
            answer: "Getting started is simple. You can explore our courses on the 'Services' page and choose the one that best fits your experience level. We also recommend registering with one of our trusted partner brokers through the links on our homepage to start your trading journey."
        }
    ];

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-black animate-fadeInUp">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                    <div className="mt-3 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
                </div>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="glass-card rounded-lg overflow-hidden border border-transparent hover:border-amber-400/20 transition-colors">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center text-left p-5 focus:outline-none"
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                                <div className="p-5 pt-0 text-slate-400">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutPage: React.FC = () => {
    return (
        <div className="bg-black animate-fadeIn">
            {/* Simple About header */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-4 text-center animate-fadeInUp">
                    <h1 className="text-5xl font-extrabold text-white">About Our Company</h1>
                    <p className="mt-4 text-amber-400 text-lg uppercase tracking-widest">Our Story</p>
                    <div className="mt-4 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="pt-8 pb-20 bg-slate-900 animate-fadeInUp">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <p className="text-xl text-slate-300 leading-relaxed">
                        At Mr One Dollar International, our purpose goes beyond just trading. We believe in empowering individuals with the skills and knowledge to achieve financial independence. Our mission is to create a community where traders can thrive, learn and grow together.
                    </p>
                </div>
            </section>

            <FAQ />

            {/* YouTube Channel Section */}
            <section className="py-20 animate-fadeInUp">
                <div className="container mx-auto px-4">
                    <div className="glass-card rounded-lg p-8 md:p-10 text-center">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            {/* YouTube Profile Picture */}
                            <div className="flex-shrink-0">
                                <a 
                                    href="https://www.youtube.com/@mr1dollar572" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div className="relative">
                                        <img 
                                            src="https://i.postimg.cc/QNYm7P8L/Emblem_Inverse.png" 
                                            alt="Mr One Dollar YouTube Channel" 
                                            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-amber-400/30 hover:border-amber-400/70 transition-all duration-300 transform group-hover:scale-105 object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200/1a1a2e/ffffff?text=Mr$1';
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-red-600 rounded-full p-3 transform group-hover:scale-110 transition-transform">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            {/* Channel Info */}
                            <div className="max-w-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Go Beyond the Charts with Mr One Dollar</h2>
                                <p className="text-slate-300 mb-6">
                                    Join our growing community on YouTube! From exclusive podcast episodes and in-depth trade reviews to beginner's guides and footage from our legendary Trade-Cations, we're pulling back the curtain. Subscribe to get the strategies and insights you won't find anywhere else.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <a 
                                        href="https://www.youtube.com/@mr1dollar572" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                        </svg>
                                        Subscribe on YouTube
                                    </a>
                                    <a 
                                        href="https://www.youtube.com/@mr1dollar572/videos" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        View Videos
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const TeamMemberCard: React.FC<{ name: string, role: string }> = ({ name, role }) => (
    <div className="glass-card rounded-lg p-6 text-center flex flex-col items-center transform hover:scale-105 hover:border-amber-400/30 transition-all duration-300">
        <div className="bg-slate-800 rounded-full p-2 mb-4 ring-2 ring-slate-700">
             <UserIcon className="w-20 h-20 text-slate-500"/>
        </div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-amber-400 mt-1 text-sm">{role}</p>
    </div>
);

const TeamPage: React.FC = () => {
    const teamMembers = [
        { name: "Tinyiko. M", role: "Founder & C.E.O" },
        { name: "Mangalani. M", role: "Co-Founder and Research Specialist" },
        { name: "Nomphiwo. C", role: "Master Female Trader" },
        { name: "Goldie. L", role: "Beginners Conductor" },
        { name: "Nathaniel. P", role: "Intermediate Conductor" },
        { name: "Mohau. C", role: "Media Specialist" },
        { name: "Paul. H", role: "Regulatory & Compliance" },
        { name: "Edward. M", role: "Senior developer" },
        { name: "Nkosi. K", role: "Senior developer" },
        { name: "Tshego. R", role: "Sales & Marketing Director" },
        { name: "Jason. N", role: "Senior developer" },
        { name: "Lungelo. N", role: "IT Developer" },
        { name: "Yandisa. D", role: "Business Systems" },
        { name: "Kenny. M", role: "Technical Analyst" },
        { name: "Tebogo. M", role: "Technical Support" },
        { name: "Mojalefa. P", role: "Technical Support" },
        { name: "Bruce. M", role: "Technical Analyst" },
    ];

    return (
        <div className="bg-black py-16 sm:py-24 animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fadeInUp">
                    <h1 className="text-5xl font-extrabold text-white">Our Team</h1>
                    <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto">
                        Meet our Forex Trading experts. Our company was founded in 2020. We work daily to become better and we are ready to share best practices.
                    </p>
                    <div className="mt-6 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeInUp">
                    {teamMembers.map(member => (
                        <TeamMemberCard key={member.name} name={member.name} role={member.role} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const openingHours = [
        { day: "Monday", time: "8:00 – 17:00" },
        { day: "Tuesday", time: "8:00 – 17:00" },
        { day: "Wednesday", time: "8:00 – 17:00" },
        { day: "Thursday", time: "8:00 – 17:00" },
        { day: "Friday", time: "8:00 – 17:00" },
        { day: "Saturday", time: "10:00 – 16:00" },
        { day: "Sunday", time: "CLOSED" },
    ];

    return (
        <div className="bg-black py-16 sm:py-24 animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fadeInUp">
                    <h1 className="text-5xl font-extrabold text-white">Get in touch</h1>
                    <div className="mt-6 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
                </div>
                <div className="glass-card rounded-lg p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fadeInUp">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold text-white">Contact information</h2>
                        <p className="mt-4 text-slate-400">
                           Our company was founded in 2020. We work daily to become better and we are ready to share best practices.
                        </p>
                        <ul className="mt-8 space-y-6">
                            <li className="flex items-start">
                                <img 
                                    src="https://img.icons8.com/ios-filled/20/ffb74d/marker.png" 
                                    alt="Location" 
                                    className="w-6 h-6 mr-4 mt-1 flex-shrink-0"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Head office</h3>
                                    <a 
                                        href="https://www.google.com/maps/place/4+karen+street+bryanston+sandton/@-26.0810327,28.0180825,3a,75y,88.36h,90t/data=!3m4!1e1!3m2!1shBSh9g8WXe8onBpO2VkAOw!2e0!4m2!3m1!1s0x1e9574827132b75f:0x494501de697be44e?sa=X&ved=1t:3780&ictx=111"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-amber-400 transition-colors"
                                    >
                                        4 karen street bryanston sandton
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <img 
                                    src="https://img.icons8.com/ios-filled/20/ffb74d/phone.png" 
                                    alt="Phone" 
                                    className="w-6 h-6 mr-4 mt-1 flex-shrink-0"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Whatsapp/Call us</h3>
                                    <p className="text-slate-400">
                                        <a href="https://wa.me/27676923876" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">+27 67 692 3876</a>
                                    </p>
                                    <p className="text-slate-400">
                                        <a href="https://wa.me/27614267355" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">+27 61 426 7355</a>
                                    </p>
                                </div>
                            </li>
                             <li className="flex items-start">
                                <img 
                                    src="https://img.icons8.com/ios-filled/20/ffb74d/mail.png" 
                                    alt="Email" 
                                    className="w-6 h-6 mr-4 mt-1 flex-shrink-0"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Email us</h3>
                                    <a href="mailto:info@mr1dollar.com" className="text-slate-400 hover:text-amber-400">info@mr1dollar.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Opening Hours */}
                    <div>
                        <h2 className="text-3xl font-bold text-white">Opening hours</h2>
                        <ul className="mt-8 space-y-3 text-slate-400">
                           {openingHours.map(item => (
                                <li key={item.day} className="flex justify-between border-b border-slate-700 pb-3 last:border-b-0">
                                    <span>{item.day}</span>
                                    <span className={item.time === "CLOSED" ? "text-red-500 font-semibold" : "text-amber-400 font-semibold"}>{item.time}</span>
                                </li>
                           ))}
                        </ul>
                    </div>
                </div>
                <SupportSection />
            </div>
        </div>
    );
};

// Support Section Component
const SupportSection: React.FC = () => {
    const zoomDetails = {
        meetingLink: "https://us06web.zoom.us/j/81165255532?pwd=ofshvQl8ruaMygqfgxAKaQ8eKbK1i2.1",
        meetingId: "811 6525 5532",
        passcode: "304559"
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`Copied to clipboard: ${text}`);
        });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-white">Support & Community</h2>
                <div className="mt-4 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Telegram Community */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                            <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.242-1.865-.442-.749-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Join Our Community</h3>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">Connect with fellow traders, share insights, and stay updated with the latest market trends.</p>
                    <a 
                        href="https://t.me/mr1dollarinternational" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.242-1.865-.442-.749-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        Join Telegram Group
                    </a>
                </div>

                {/* Zoom Support */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                            <img 
                                src="https://i.ibb.co/Qvx1Vr53/zoom-icon.png" 
                                alt="Zoom" 
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjIgNS41YTQuNSA0LjUgMCAwIDAtNC41LTQuNUg0LjVBNC41IDQuNSAwIDAgMCAwIDUuNXYxM2E0LjUgNC41IDAgMCAwIDQuNSA0LjVoMTNhNC41IDQuNSAwIDAgMCA0LjUtNC41di0xM3pNMTcuNSAyYy44IDAgMS41LjcgMS41IDEuNVY2aC0zVjJoMS41ek0yMSA5aC01VjRoLTF2NWgtNXYxaDV2NWgxdi01aDVWOXptLTguNSA2LjV2M2gtMXYtM2gtM3YtMWgzdjNoMXYtM2gzdjFoLTN6Ii8+PC9zdmc+';
                                }}
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Instant Zoom Support</h3>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">Need help? Join our live support session for immediate assistance.</p>
                    <div className="space-y-3">
                        <a 
                            href={zoomDetails.meetingLink}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors"
                        >
                            Join Zoom Meeting
                        </a>
                        <div className="flex items-center justify-between bg-slate-700/50 hover:bg-slate-700/70 rounded-lg px-3 py-2 transition-colors">
                            <div>
                                <span className="text-slate-400 text-xs block uppercase tracking-wide">Meeting ID</span>
                                <p className="text-white text-sm font-semibold">{zoomDetails.meetingId}</p>
                            </div>
                            <button 
                                onClick={() => copyToClipboard(`Meeting ID: ${zoomDetails.meetingId}`)}
                                className="ml-3 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 rounded-full px-3 py-1 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                        <div className="flex items-center justify-between bg-slate-700/50 hover:bg-slate-700/70 rounded-lg px-3 py-2 transition-colors">
                            <div>
                                <span className="text-slate-400 text-xs block uppercase tracking-wide">Passcode</span>
                                <p className="text-white text-sm font-semibold">{zoomDetails.passcode}</p>
                            </div>
                            <button 
                                onClick={() => copyToClipboard(`Passcode: ${zoomDetails.passcode}`)}
                                className="ml-3 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 rounded-full px-3 py-1 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>

                {/* Technical Analyst Community */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50 hover:border-green-400/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                        <div className="bg-green-500/10 p-3 rounded-lg mr-4">
                            <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.15-1.758-.867-2.03-.966-.273-.1-.473-.15-.673.15-.197.295-.771.962-.944 1.163-.174.195-.347.21-.644.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.137-.135.3-.345.45-.532.146-.195.194-.338.29-.563.1-.21.049-.394-.025-.54-.075-.15-.674-1.62-.922-2.207-.24-.585-.487-.506-.672-.51-.173-.008-.371-.01-.571-.01-.2 0-.525.06-.8.3-.27.24-1.04 1.005-1.04 2.455s1.07 2.85 1.22 3.045c.15.196 2.1 3.195 5.08 4.485.714.3 1.27.48 1.705.63.714.225 1.37.195 1.89.12.574-.09 1.767-.72 2.015-1.425.255-.705.255-1.29.18-1.41-.075-.135-.27-.21-.57-.36m-5.45 7.443h-.015c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.45 9.45 0 0 1-1.44-5.04c0-5.25 4.29-9.51 9.554-9.51 2.55 0 4.95.99 6.75 2.79 1.8 1.8 2.79 4.2 2.79 6.75-.004 5.26-4.304 9.51-9.555 9.505"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Join Our Community</h3>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">Connect with fellow traders, share insights, and stay updated with the latest market trends.</p>
                    <a 
                        href="https://chat.whatsapp.com/LYKIJlJWNEyGnhQ8vfAaBW" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.15-1.758-.867-2.03-.966-.273-.1-.473-.15-.673.15-.197.295-.771.962-.944 1.163-.174.195-.347.21-.644.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.137-.135.3-.345.45-.532.146-.195.194-.338.29-.563.1-.21.049-.394-.025-.54-.075-.15-.674-1.62-.922-2.207-.24-.585-.487-.506-.672-.51-.173-.008-.371-.01-.571-.01-.2 0-.525.06-.8.3-.27.24-1.04 1.005-1.04 2.455s1.07 2.85 1.22 3.045c.15.196 2.1 3.195 5.08 4.485.714.3 1.27.48 1.705.63.714.225 1.37.195 1.89.12.574-.09 1.767-.72 2.015-1.425.255-.705.255-1.29.18-1.41-.075-.135-.27-.21-.57-.36m-5.45 7.443h-.015c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.45 9.45 0 0 1-1.44-5.04c0-5.25 4.29-9.51 9.554-9.51 2.55 0 4.95.99 6.75 2.79 1.8 1.8 2.79 4.2 2.79 6.75-.004 5.26-4.304 9.51-9.555 9.505"/>
                        </svg>
                        Join WhatsApp Community
                    </a>
                </div>
            </div>
        </div>
    );
};

interface PlatinumProduct extends BaseProduct {
    isPlatinumBenefit: true;
    platinumBenefitDescription: string;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; isExpanded: boolean; onToggle: () => void; }> = ({ product, onAddToCart, isExpanded, onToggle }) => {
    const [imageError, setImageError] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState(product.imageUrl.startsWith('http') ? product.imageUrl : `/${product.imageUrl}`);
    
    const handleImageError = () => {
        if (!imageError) {
            setImageError(true);
            // Fallback to an inline SVG if the image fails to load
            setCurrentImageUrl('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNDUwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWEyOTQyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+TXIgJDEgSW50ZXJuYXRpb25hbDwvdGV4dD48L3N2Zz4=');
        }
    };
    // Check if the product is a mentorship package
    const isMentorship = product.category === 'Mentorship';
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    
    // Handle click on image to open modal
    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsImageModalOpen(true);
    };
    
    // Close modal when clicking outside the image
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsImageModalOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isImageModalOpen) {
                setIsImageModalOpen(false);
            }
        };
        
        if (isImageModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isImageModalOpen]);

    // Handle add to cart with proper event handling
    const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        onAddToCart(product);
    };
    
    const isFullCourse = product.name.includes("Full Course + Free Tradecation");
    
    return (
    <>
        <div 
            id={`product-${product.id}`}
            className={`glass-card rounded-lg overflow-hidden flex flex-col group transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] relative ${
                isExpanded ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-500/20' : ''
            } ${
                isFullCourse 
                    ? 'bg-gradient-to-br from-black via-gray-900 to-black border-2 border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:border-amber-300/80 relative overflow-hidden' 
                    : 'bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-700 hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all duration-300'
            }`}
        >
            {isFullCourse && (
                <>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/20 via-amber-200/10 to-amber-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/10 via-amber-200/5 to-amber-400/10 rounded-lg animate-pulse pointer-events-none"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/5 via-amber-200/2 to-amber-400/5 rounded-lg animate-pulse pointer-events-none" style={{animationDelay: '0.5s'}}></div>
                </>
            )}
            {isMentorship && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold py-1 px-3 text-center">
                    For Course Graduates Only
// ... (rest of the code remains the same)
                </div>
            )}
            <div className="relative">
                 <div 
                    className="w-full h-48 bg-slate-800 flex items-center justify-center overflow-hidden cursor-pointer"
                    onClick={handleImageClick}
                    aria-label="Click to view full size"
                 >
                    <img 
                        src={currentImageUrl} 
                        alt={product.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                        </svg>
                    </div>
                </div>
                <button 
                    onClick={onToggle}
                    className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-amber-400 rounded-full p-2 hover:bg-black/70 transition-colors"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                    {isExpanded ? <MinusIcon /> : <PlusIcon />}
                </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-3">
                    <h3 
                        className="text-lg font-semibold text-white cursor-pointer"
                        onClick={onToggle}
                    >
                        {product.name}
                    </h3>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                        className={`text-amber-300 hover:text-amber-200 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-label={isExpanded ? 'Collapse product details' : 'Expand product details'}
                        aria-expanded={isExpanded}
                    >
                        <svg className="w-6 h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen mt-2' : 'max-h-0'}`}>
                    <p className="text-slate-400 text-sm mb-3">{product.description}</p>
                    {product.isSpecialOffer && product.offerSteps && (
                        <div className="space-y-3 mt-3">
                            <h4 className="text-amber-400 font-semibold">Follow These Simple Steps:</h4>
                            <div className="space-y-2">
                                {product.offerSteps.map((step, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 bg-amber-400 text-black font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2 mt-0.5">
                                            {step.number}
                                        </div>
                                        {step.number === 1 && product.id === 2 ? (
                                            <a 
                                                href="https://primexbt.com/sign-up?ref=MR1DOLLAR" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-amber-400 hover:underline text-sm"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {step.text} <span className="text-xs text-slate-400">(Press here to register)</span>
                                            </a>
                                        ) : (
                                            <span className="text-slate-300 text-sm">{step.text}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-2">
                    {product.isPlatinumBenefit ? (
                        <div>
                            <p className="text-amber-400 text-xl font-bold">Free for Platinum+</p>
                            <p className="text-green-400 text-sm mt-1">Included with Platinum Plan</p>
                            <div className="mt-4 space-y-2">
                                <a 
                                    href="#plans" 
                                    className="block w-full text-center bg-amber-400 text-black font-bold py-2 px-4 rounded-md hover:bg-amber-300 transition-colors"
                                >
                                    Get Platinum Plan
                                </a>
                                <button 
                                    onClick={() => {
                                        alert(product.platinumBenefitDescription || "Please contact support for access to this Platinum benefit.");
                                    }}
                                    className="w-full text-center text-amber-400 text-sm hover:underline"
                                >
                                    Already a Platinum member? Click here
                                </button>
                            </div>
                        </div>
                    ) : product.id === 3 ? (
                        <div>
                            <p className="text-amber-400 text-xl font-bold flex items-center gap-2">
                                ${product.price.toFixed(2)}
                                <span className="bg-amber-500/20 text-amber-300 text-xs font-medium px-2 py-1 rounded-full border border-amber-500/30">
                                    50% OFF
                                </span>
                            </p>
                            <p className="text-blue-400 text-sm mt-1">
                                Initial fee, then ${(product.price * 0.5).toFixed(2)}/month
                            </p>
                        </div>
                    ) : product.originalPrice ? (
                        <p className="text-amber-400 text-xl font-bold flex items-center gap-2">
                            <del className="text-slate-500 text-sm font-normal">${product.originalPrice.toFixed(2)}</del> ${product.price.toFixed(2)}
                            {product.category === 'Trade Ideas' && product.price > 0 && (
                                <span className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2 py-1 rounded-full border border-blue-500/30">
                                    monthly
                                </span>
                            )}
                        </p>
                    ) : (
                        <p className="text-amber-400 text-xl font-bold flex items-center gap-2">
                            ${product.price.toFixed(2)}
                            {product.category === 'Trade Ideas' && product.price > 0 && (
                                <span className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2 py-1 rounded-full border border-blue-500/30">
                                    {product.id === 3 ? 'Initial fee' : 'monthly'}
                                </span>
                            )}
                        </p>
                    )}
                </div>
                {product.isSpecialOffer ? (
                    <a 
                        href={product.whatsappLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center space-x-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
                            <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm7.994 24.362c-.2.57-1.156 1.1-1.894 1.125-.5.019-.994-.006-1.5-.131-1.256-.3-2.569-.863-3.8-1.5-3.4-1.75-6.2-5.4-6.9-9.1-.2-1.1-.2-2.1 0-3.1.2-1 .8-1.9 1.6-2.4.4-.3.9-.4 1.3-.2.3.1.6.4.8.8.2.4.5 1.1.6 1.5.1.4.1.8 0 1.2-.1.4-.3.7-.5 1.1-.2.3-.4.6-.4 1 0 .4.1.8.4 1.1.3.3.6.7.9 1 .3.3.7.7 1 1.1.4.4.8.7 1.2 1.1.4.3.8.5 1.3.7.4.2.8.2 1.2 0 .4-.1.7-.3 1.1-.5.3-.2.8-.1 1.1.2.4.3.8.7 1.2 1.1.4.4.8.8 1.2 1.1.2.2.3.5.3.8 0 .3-.1.7-.2 1.1z"></path>
                        </svg>
                        <span>Claim Your Free Month on WhatsApp</span>
                    </a>
                ) : product.isPlatinumBenefit ? (
                    <div className="mt-4 space-y-2">
                        <a 
                            href="#plans" 
                            className="block w-full text-center bg-amber-400 text-black font-bold py-2 px-4 rounded-md hover:bg-amber-300 transition-colors"
                        >
                            Get Platinum Plan
                        </a>
                        <button 
                            onClick={() => {
                                alert(product.platinumBenefitDescription || "Please contact support for access to this Platinum benefit.");
                            }}
                            className="w-full text-center text-amber-400 text-sm hover:underline"
                        >
                            Already a Platinum member? Click here
                        </button>
                    </div>
                ) : product.checkoutUrl ? (
                    <div className="space-y-2">
                        {isMentorship && (
                            <div className="bg-blue-600/20 border border-blue-500/50 text-blue-100 text-xs p-2 rounded-md text-center">
                                Only available to students who have completed our course
                            </div>
                        )}
                        <a 
                            href={product.checkoutUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`mt-2 w-full text-center ${isMentorship ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-400 hover:bg-amber-300 text-black'} font-bold py-2 px-4 rounded-md transition-colors block`}
                        >
                            {isMentorship ? 'Enroll Now' : 'Buy product'}
                        </a>
                    </div>
                ) : (
                    <button 
                        onClick={(e) => handleAddToCartClick(e, product)}
                        className="mt-4 w-full text-center bg-amber-400 hover:bg-amber-300 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Add to cart
                    </button>
                )}
            </div>
        </div>
        {isImageModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
                <div 
                    ref={modalRef}
                    className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-lg overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-4 z-10">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsImageModalOpen(false);
                            }}
                            className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-full p-2 transition-all"
                            aria-label="Close"
                        >
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="h-full flex items-center justify-center p-4">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="max-w-full max-h-[80vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white text-center text-sm md:text-base">
                            {product.name} - Click outside or press ESC to close
                        </p>
                    </div>
                </div>
            </div>
        )}
    </>
);
}

const ServicesPage: React.FC = () => {
    const [products] = useState<Product[]>(servicesData);
    const [cart, setCart] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState<{ min: number | string, max: number | string }>({ min: '', max: '' });
    const [appliedPriceRange, setAppliedPriceRange] = useState<{ min: number | null, max: number | null }>({ min: null, max: null });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState('default');
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedProductId, setExpandedProductId] = useState<number | null>(2);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check if we need to expand a specific product when component mounts
    useEffect(() => {
        const expandProductId = sessionStorage.getItem('expandProductId');
        if (expandProductId) {
            const productId = Number(expandProductId);
            setExpandedProductId(productId);
            // Clear the stored ID so it doesn't affect future visits
            sessionStorage.removeItem('expandProductId');
            
            // Scroll to the product section after a short delay to allow rendering
            setTimeout(() => {
                const element = document.getElementById(`product-${productId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }, []);
    const itemsPerPage = 12;
    
    // Get Platinum package (ID: 2)
    const platinumPackage = products.find(p => p.id === 2);
    
    // Categorize products
    
    // Update Platinum package with new WhatsApp link and broker link
const updatedPlatinumPackage = platinumPackage ? {
        ...platinumPackage,
        offerSteps: [
            { 
                number: 1, 
                text: <span className="flex items-center">
                    <img src="https://i.ibb.co/YGPkfR7/Prime-XBT-Logo.png" alt="PrimeXBT" className="h-4 w-auto object-contain mr-2" />
                    <a href="https://primexbt.com/?signup=1&r=7JY4G1" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Register on PrimeXBT
                    </a>
                </span> 
            },
            ...(platinumPackage.offerSteps?.slice(1, -1) || []),
            { 
                number: 5, 
                text: <a 
                    href="https://wa.me/27676923876?text=I've%20registered%20on%20PrimeXBT%20and%20deposited%20R800.%20Here's%20my%20proof%20for%20free%20Platinum%20Trade%20Ideas%3A%20[YOUR_PROOF_HERE]" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors"
                >
                    WhatsApp us with your proof
                </a> 
            }
        ]
    } : null;

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSidebarOpen]);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
        return uniqueCategories.map(cat => ({
            name: cat,
            count: products.filter(p => p.category === cat && p.id !== 2).length
        }));
    }, [products]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        
        if (appliedPriceRange.min !== null) {
            filtered = filtered.filter(p => p.price >= appliedPriceRange.min!);
        }
        if (appliedPriceRange.max !== null) {
            filtered = filtered.filter(p => p.price <= appliedPriceRange.max!);
        }

        const sorted = [...filtered];
        switch (sortOption) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return sorted;
    }, [products, searchTerm, selectedCategory, appliedPriceRange, sortOption]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
    const paginatedProducts = filteredAndSortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    // Filter products based on selected category
    const filteredProducts = selectedCategory 
        ? paginatedProducts.filter(p => p.category === selectedCategory)
        : paginatedProducts;

    // Categorize products
    const tradeIdeas = selectedCategory === 'Trade Ideas' || !selectedCategory 
        ? filteredProducts.filter(p => p.category === 'Trade Ideas' && p.id !== 2) 
        : [];
        
    const mentorship = selectedCategory === 'Mentorship' || !selectedCategory 
        ? filteredProducts.filter(p => p.category === 'Mentorship') 
        : [];
        
    const courses = selectedCategory === 'Courses' || !selectedCategory 
        ? filteredProducts.filter(p => p.category === 'Courses') 
        : [];

    const strategies = selectedCategory === 'Strategy' || !selectedCategory
        ? filteredProducts.filter(p => p.category === 'Strategy')
        : [];

    const events = selectedCategory === 'Events' || !selectedCategory
        ? filteredProducts.filter(p => p.category === 'Events')
        : [];
        
    const otherProducts = !['Trade Ideas', 'Mentorship', 'Courses', 'Strategy', 'Events'].includes(selectedCategory || '') 
        ? filteredProducts.filter(p => 
            !['Trade Ideas', 'Courses', 'Mentorship', 'Strategy', 'Events'].includes(p.category) &&
            p.id !== 2
        ) 
        : [];
    
    const cartTotal = cart.reduce((total, product) => total + product.price, 0);

    const handleAddToCart = (product: Product) => {
        setCart(prevCart => [...prevCart, product]);
    };
    
    const handleRemoveFromCart = (productId: number, index: number) => {
        setCart(prevCart => prevCart.filter((p, i) => !(p.id === productId && i === index)));
    };

    const handlePriceFilter = async () => {
        setIsLoading(true);
        setCurrentPage(1);
        
        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const min = priceRange.min === '' ? null : Number(priceRange.min);
        const max = priceRange.max === '' ? null : Number(priceRange.max);
        
        // Validate min and max values
        if (min !== null && max !== null && min > max) {
            // Swap values if min is greater than max
            setPriceRange({ min: max, max: min });
            setAppliedPriceRange({ min: max, max: min });
        } else {
            setAppliedPriceRange({ min, max });
        }
        
        setIsFilterApplied(true);
        setIsLoading(false);
        
        // Close mobile sidebar if open
        setIsSidebarOpen(false);
    };
    
    // Clear all filters and reset to default state
    const clearAllFilters = () => {
        setSearchTerm('');
        setPriceRange({ min: '', max: '' });
        setAppliedPriceRange({ min: null, max: null });
        setSelectedCategory(null);
        setSortOption('default');
        setCurrentPage(1);
        setIsFilterApplied(false);
    };

    const renderFilterSection = () => (
        <div className="mb-8 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 pr-8 w-full bg-slate-800 border border-slate-700 rounded-xl text-white p-3 focus:ring-2 focus:ring-amber-500/70 focus:border-transparent transition-all duration-300 hover:border-amber-500/30"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setCurrentPage(1);
                                }}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                                aria-label="Clear search"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-700 transition-colors"
                    >
                        <FilterIcon className="w-5 h-5" />
                        <span>Filters</span>
                    </button>
                </div>
                
                {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === null
                                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80'
                        }`}
                    >
                        All Categories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => {
                                setSelectedCategory(selectedCategory === cat.name ? null : cat.name);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                selectedCategory === cat.name
                                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80'
                            }`}
                        >
                            {cat.name} ({cat.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Min Price ($)</label>
                    <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg text-white p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Max Price ($)</label>
                    <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg text-white p-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePriceFilter}
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 ${
                            isLoading ? 'bg-amber-600' : 'bg-amber-500 hover:bg-amber-600'
                        } text-black font-medium py-2.5 px-4 rounded-lg transition-all`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Applying...
                            </>
                        ) : (
                            'Apply Price Filter'
                        )}
                    </button>
                    {isFilterApplied && (
                        <button
                            onClick={clearAllFilters}
                            className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    const renderProductGrid = (products: Product[]) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isExpanded={expandedProductId === product.id}
                    onToggle={() => {
                        setExpandedProductId(expandedProductId === product.id ? null : product.id);
                        // Scroll to the product when expanded
                        if (expandedProductId !== product.id) {
                            setTimeout(() => {
                                const element = document.getElementById(`product-${product.id}`);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            }, 100);
                        }
                    }}
                    onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );

    const renderPagination = () => (
        totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-slate-700 rounded-lg text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800"
                >
                    Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(
                        currentPage - 2,
                        totalPages - 4
                    )) + i;
                    if (pageNum > totalPages) return null;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg ${
                                currentPage === pageNum
                                    ? 'bg-amber-500 text-black font-bold'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-slate-700 rounded-lg text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800"
                >
                    Next
                </button>
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            {/* Mobile Filter Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                    <div className="absolute inset-y-0 right-0 max-w-full flex">
                        <div className="relative w-screen max-w-md bg-slate-900 border-l border-slate-800 overflow-y-auto">
                            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Filters</h3>
                                <button 
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <CloseIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-4 space-y-6">
                                <div>
                                    <h4 className="font-medium mb-2">Categories</h4>
                                    <div className="space-y-2">
                                        {categories.map((cat) => (
                                            <label key={cat.name} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={selectedCategory === cat.name}
                                                    onChange={() => {
                                                        setSelectedCategory(
                                                            selectedCategory === cat.name ? null : cat.name
                                                        );
                                                        setCurrentPage(1);
                                                    }}
                                                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-slate-700"
                                                />
                                                <span className="ml-2 text-slate-300">
                                                    {cat.name} ({cat.count})
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Price Range</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Min ($)</label>
                                            <input
                                                type="number"
                                                value={priceRange.min}
                                                onChange={(e) => setPriceRange({
                                                    ...priceRange,
                                                    min: e.target.value
                                                })}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                                                placeholder="Min"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Max ($)</label>
                                            <input
                                                type="number"
                                                value={priceRange.max}
                                                onChange={(e) => setPriceRange({
                                                    ...priceRange,
                                                    max: e.target.value
                                                })}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                                                placeholder="Max"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handlePriceFilter();
                                            setIsSidebarOpen(false);
                                        }}
                                        className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Filter Section */}
                        {renderFilterSection()}

                        {/* Products Grid */}
                        {filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <svg
                                    className="mx-auto h-16 w-16 text-slate-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-white">No products found</h3>
                                <p className="mt-1 text-slate-400">
                                    Try adjusting your search or filter to find what you're looking for.
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Trade Ideas Section */}
                                {(selectedCategory === 'Trade Ideas' || !selectedCategory) && tradeIdeas.length > 0 && (
                                    <div className="mb-12">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            Trade Ideas
                                        </h2>
                                        {renderProductGrid(tradeIdeas)}
                                    </div>
                                )}

                                {/* Courses Section */}
                                {courses.length > 0 && (
                                    <div className="mb-12">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                            <svg className="w-6 h-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            Trading Courses
                                        </h2>
                                        {renderProductGrid(courses)}
                                    </div>
                                )}

                                {/* Mentorship Section */}
                                {mentorship.length > 0 && (
                                    <div className="mb-12">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                            <svg className="w-6 h-6 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Mentorship Programs
                                        </h2>
                                        {renderProductGrid(mentorship)}
                                    </div>
                                )}

                                {/* Strategies Section */}
                                {strategies.length > 0 && (
                                    <div className="mb-12">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                            <svg className="w-6 h-6 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            Trading Strategies
                                        </h2>
                                        {renderProductGrid(strategies)}
                                    </div>
                                )}

                                {/* Events Section */}
                                {events.length > 0 && (
                                    <div className="mb-12">
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                            <svg className="w-6 h-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Trading Events
                                        </h2>
                                        {renderProductGrid(events)}
                                    </div>
                                )}

                                {/* Other Products */}
                                {otherProducts.length > 0 && (
                                    <div className="mb-12">
                                        <h2 className="text-2xl font-bold text-white mb-6">Other Services</h2>
                                        {renderProductGrid(otherProducts)}
                                    </div>
                                )}

                                {/* Pagination */}
                                {renderPagination()}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

const TermsPage: React.FC = () => (
    <div className="bg-black py-16 sm:py-24 animate-fadeIn">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-white">Terms and Conditions</h1>
                <div className="mt-6 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
                <p className="mt-4 text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="glass-card rounded-lg p-8 lg:p-12 text-slate-300 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
                    <p>Welcome to Mr One Dollar International. These Terms and Conditions govern your use of our website and services. By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. No Refunds Policy</h2>
                    <p className="font-bold text-amber-400">All purchases of digital products, including but not limited to courses, trade ideas, mentorship programs, and strategies, are final. We do not offer refunds, exchanges, or credits for any purchases. Once a product is purchased and accessed, we cannot revoke access, and therefore, no refunds will be provided under any circumstances.</p>
                    <p>Please ensure you have carefully reviewed your order before completing your purchase.</p>
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Use of Our Services</h2>
                    <p>You agree to use our services for lawful purposes only. You are prohibited from sharing, distributing, reselling, or reproducing any of our course materials, trade ideas, or other proprietary content without our express written consent. Your account is for your personal use only and may not be shared with others.</p>
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Risk Disclaimer</h2>
                    <p>Trading in financial markets, including Forex, involves substantial risk and is not suitable for every investor. An investor could potentially lose all or more than the initial investment. Risk capital is money that can be lost without jeopardizing one's financial security or lifestyle. Only risk capital should be used for trading, and only those with sufficient risk capital should consider trading. Past performance is not indicative of future results.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Intellectual Property</h2>
                    <p>All content included on this site, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of Mr One Dollar International or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights.</p>
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">6. Limitation of Liability</h2>
                    <p>Mr One Dollar International provides educational and informational content. We are not financial advisors. The information provided is not intended as investment advice. We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or for the cost of procurement of substitute services.</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">7. Changes to Terms</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.</p>
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">8. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@mr1dollar.com" className="text-amber-400 hover:underline">info@mr1dollar.com</a>.</p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">9. Data Protection &amp; Third-Party Platforms</h2>
                    <p>
                        We use reputable third-party platforms (such as payment providers, form tools and communication platforms) to securely store and process certain contact and account details. These service providers act as data processors on our behalf and are required to protect your information, use it only for the purposes we specify, and handle it in line with applicable data-protection principles.
                    </p>
                    <p>
                        Information you voluntarily submit through our forms—including your name, email address, and contact preferences—is used to maintain the Mr $1 International communications database, such as our newsletter mailing list. We only send marketing or service updates to individuals who have provided their details for that purpose, and every message includes a clear option to update preferences or opt out.
                    </p>
                    <p>
                        We do not sell, harvest, or otherwise misappropriate your personal information. We only share it with third parties where it is necessary to provide our services, to comply with legal or regulatory obligations, or where you have given us clear consent. By using our services, you consent to this use of third-party platforms as described here and in our Privacy Policy.
                    </p>
                    <p>
                        To the maximum extent permitted by applicable law, we are not liable for any loss arising from unauthorised access, use or disclosure of your information by such third parties, provided we have taken reasonable steps to select and monitor those providers and to safeguard your information.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">10. Legal Compliance</h2>
                    <p>
                        Nothing in these Terms is intended to exclude or limit any rights you may have under applicable law. Where any part of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect. You are responsible for ensuring that your use of our services complies with the laws of your country or jurisdiction, including any tax, reporting or regulatory requirements.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">11. Newsletter &amp; Communications</h2>
                    <p>
                        By providing your details through our website forms you authorise us to store that information securely and to use it for service updates, community announcements, promotional offers, and educational content relating to Mr $1 International. You may unsubscribe at any time by following the instructions in our communications or by contacting us directly at <a href="mailto:info@mr1dollar.com" className="text-amber-400 hover:underline">info@mr1dollar.com</a>.
                    </p>
                    <p>
                        We do not collect personal information through covert means. All data is supplied by users or their authorised representatives, and it is processed only for legitimate business purposes aligned with the expectations set out in these Terms and our Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const PrivacyPolicyPage: React.FC = () => (
    <div className="bg-black py-16 sm:py-24 animate-fadeIn">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-white">Privacy Policy</h1>
                <div className="mt-6 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
                <p className="mt-4 text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="glass-card rounded-lg p-8 lg:p-12 text-slate-300 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                    <p>We may collect personally identifiable information, such as your name, email address, and phone number, when you register for our services, purchase products, or contact us. We may also collect non-personal information, such as browser type and IP address, to improve our services.</p>
                </div>
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide and improve our services, process transactions, communicate with you, and for marketing purposes. We will not sell or rent your personal information to third parties without your consent, except as required by law.</p>
                </div>
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Cookies</h2>
                    <p>Our website may use "cookies" to enhance your experience. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the site may not function properly.</p>
                </div>
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Third-Party Links</h2>
                    <p>Our website may contain links to third-party websites, such as our trusted brokers. We are not responsible for the privacy practices or the content of these third-party sites. We encourage you to read their privacy policies.</p>
                </div>
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Security</h2>
                    <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
                </div>
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">6. Your Rights</h2>
                    <p>You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at the email address provided below.</p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">7. Changes to This Policy</h2>
                    <p>We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">8. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@mr1dollar.com" className="text-amber-400 hover:underline">info@mr1dollar.com</a>.</p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">9. Data Storage &amp; Third-Party Service Providers</h2>
                    <p>
                        We securely store contact details and other personal information using trusted third-party platforms, including form providers, payment processors and communication tools. These providers act as data processors and are contracted to keep your information confidential, implement appropriate security measures and process data only on our documented instructions.
                    </p>
                    <p>
                        While we take reasonable steps to vet and monitor these providers, their handling of information is also governed by their own privacy policies and terms. We encourage you to review those policies when interacting with their services through our website.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">10. Data Retention &amp; Legal Protection</h2>
                    <p>
                        We retain personal information only for as long as necessary to provide our services, meet our legal, accounting or reporting obligations, or resolve disputes. When information is no longer required, we take reasonable steps to delete or anonymise it.
                    </p>
                    <p>
                        To the fullest extent permitted by law, Mr One Dollar International disclaims liability for any indirect or consequential loss arising from unauthorised access to or misuse of your data, provided we have complied with our legal obligations and taken reasonable security measures as described in this Policy.
                    </p>
                </div>
            </div>
        </div>
    </div>
);


const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400/55 via-amber-500/55 to-amber-400/55 text-black/55 font-semibold px-4 py-2 shadow-[0_12px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_16px_40px_rgba(251,191,36,0.25)] transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300/55 backdrop-blur-sm"
            aria-label="Scroll back to top"
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-black">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
            </span>
            <span className="hidden sm:inline text-sm tracking-wide uppercase">Back to top</span>
        </button>
    );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Add animation styles to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInRight {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .animate-fadeInRight {
        animation: fadeInRight 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Smooth scroll to top on page change and add performance optimizations
  useEffect(() => {
    // Smooth scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Add passive event listeners for better scroll performance
    const addPassiveScroll = () => {
      try {
        const options = Object.defineProperty({}, 'passive', {
          get: () => {
            passiveSupported = true;
          }
        });
        window.addEventListener('test', () => {}, options);
        window.removeEventListener('test', () => {}, options as any);
      } catch (err) {}
    };
    
    let passiveSupported = false;
    addPassiveScroll();
    
    // Apply passive event listeners to all scrollable elements
    const scrollableElements = document.querySelectorAll('*');
    scrollableElements.forEach(element => {
      const style = window.getComputedStyle(element);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        element.addEventListener('scroll', () => {}, passiveSupported ? { passive: true } : false);
      }
    });
    
    // Cleanup function
    return () => {
      scrollableElements.forEach(element => {
        element.removeEventListener('scroll', () => {});
      });
    };
  }, [currentPage]);
  
  // Add global styles for better performance
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      * {
        scrollbar-width: thin;
        scrollbar-color: #f59e0b rgba(0, 0, 0, 0.1);
      }
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
      }
      ::-webkit-scrollbar-thumb {
        background: #f59e0b;
        border-radius: 4px;
      }
      /* Optimize animations */
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'events':
        return <EventsPage />;
      case 'about':
        return <AboutPage />;
      case 'team':
        return <TeamPage />;
      case 'contact':
        return <ContactPage />;
      case 'services':
        return <ServicesPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-black">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppWidget />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
