import React, { useState, useMemo, useEffect, useRef, ReactNode } from 'react';

// --- Types ---
type Page = 'home' | 'events' | 'about' | 'team' | 'contact' | 'services' | 'terms' | 'privacy';
interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    imageUrl: string;
    description: string;
    checkoutUrl?: string;
}

// --- Centralized Data Source ---
const servicesData: Product[] = [
    { id: 1, name: "Gold High Voltage Trade Ideas", price: 59.00, category: 'Trade Ideas', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Harness the power of the precious metals market. Receive high-probability trade setups for Gold (XAU/USD), meticulously analyzed by our experts. Perfect for traders looking to capitalize on Gold's volatility and make informed decisions.", checkoutUrl: "https://whop.com/checkout/plan_ctZTpakqloK39?d2c=true" },
    { id: 2, name: "Platinum Trade Ideas (Monthly)", price: 106.00, category: 'Trade Ideas', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Gain consistent, exclusive access to our premium trade ideas with a monthly subscription. This package includes regular market analysis, entry/exit points, and risk management strategies across various currency pairs and commodities.", checkoutUrl: "https://whop.com/checkout/plan_j9dTqYMI4Ez1e?d2c=true" },
    { id: 3, name: "Diamond Trade Ideas (Monthly)", price: 172.00, category: 'Trade Ideas', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Our elite subscription for serious traders. Diamond members receive all Platinum benefits plus access to exclusive inner-circle trade signals, advanced market commentary, and priority support from our top analysts.", checkoutUrl: "https://whop.com/checkout/plan_7xl4XRVNSiQ9t?d2c=true" },
    { id: 4, name: "Private Wealth VIP_Black Ideas (Monthly)", price: 1060.00, category: 'Trade Ideas', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "The ultimate trading experience. VIP Black is a bespoke service for high-net-worth individuals, offering personalized trade strategies, direct access to our head traders, and portfolio management insights. By application only.", checkoutUrl: "https://whop.com/checkout/plan_t6cWYP0riNwZc?d2c=true" },
    { id: 5, name: "Beginners Course", price: 206.00, category: 'Courses', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "New to Forex? This is your starting point. Our comprehensive Beginners Course covers everything from the absolute basics of currency pairs to setting up your trading platform and executing your first trades with confidence.", checkoutUrl: "https://whop.com/checkout/plan_FLNIgd01exxwN?d2c=true" },
    { id: 6, name: "Intermediate Course", price: 307.00, category: 'Courses', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Ready to move beyond the basics? This course dives into technical analysis, chart patterns, risk management, and trading psychology. Develop the skills needed to build a consistently profitable trading strategy.", checkoutUrl: "https://whop.com/checkout/plan_mdhlnuqZn2k9O?d2c=true" },
    { id: 7, name: "Advanced Course", price: 439.00, category: 'Courses', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "For the experienced trader looking for an edge. Explore advanced institutional strategies, market structure, smart money concepts, and complex indicators to refine your approach and elevate your trading to an expert level.", checkoutUrl: "https://whop.com/checkout/plan_6exMgeEDvYPXZ?d2c=true" },
    { id: 8, name: "Full Course", price: 879.00, category: 'Courses', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "The ultimate trading education package. This all-in-one course combines our Beginner, Intermediate, and Advanced modules. Master everything from fundamental principles to complex institutional strategies and become a well-rounded, profitable trader.", checkoutUrl: "https://whop.com/checkout/plan_91pPZHbkPYU9q?d2c=true" },
    { id: 9, name: "Beginner Mentorship", price: 27.00, category: 'Mentorship', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Accelerate your learning curve with personalized guidance. Our Beginner Mentorship pairs you with an experienced trader to review your trades, answer your questions, and help you build a solid trading foundation and mindset.", checkoutUrl: "https://whop.com/checkout/plan_0l3JSa0u7ie7J?d2c=true" },
    { id: 10, name: "Intermediate Mentorship", price: 53.00, category: 'Mentorship', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Refine your strategy with expert feedback. This mentorship program is designed for traders who have a strategy but need help with consistency, discipline, and navigating live market conditions with a professional.", checkoutUrl: "https://whop.com/checkout/plan_3yLCP9PECWJNW?d2c=true" },
    { id: 11, name: "Advanced Mentorship", price: 106.00, category: 'Mentorship', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Collaborate with the best. Our Advanced Mentorship provides high-level strategic discussion, performance analysis, and psychological coaching to help you break through performance plateaus and reach your peak potential.", checkoutUrl: "https://whop.com/checkout/plan_6WOfsWPi4NT2I?d2c=true" },
    { id: 12, name: "Currencies Strategy", price: 429.00, category: 'Strategy', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Purchase our proprietary, back-tested currency trading strategy. This is a complete, rule-based system that provides clear entry, exit, and stop-loss parameters, taking the guesswork out of your trading.", checkoutUrl: "https://whop.com/checkout/plan_9SrCavVpvpVfh?d2c=true" },
    { id: 13, name: "Advanced Indicators Pack", price: 150.00, category: 'Strategy', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Gain a technical edge with our proprietary set of advanced indicators for TradingView or MT4/5. These tools are designed to help you identify key market levels, trends, and momentum shifts with greater accuracy." },
    { id: 14, name: "NFP Event Access", price: 16.00, category: 'Events', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Join us for a live trading session during the Non-Farm Payroll (NFP) announcement. Learn how to navigate one of the market's most volatile events with expert guidance, pre-release analysis, and real-time trade execution." },
    { id: 15, name: "Branded Merchandise", price: 45.00, category: 'Uncategorized', imageUrl: 'https://i.ibb.co/BK7gWpRY/forex-trading.jpg', description: "Represent the Mr$1 community with our exclusive branded merchandise. High-quality apparel and accessories for the trader who refuses to be average. Show off your commitment to staying blue and taking profit." },
];

const testimonialsData = [
    {
        quote: "High Voltage is something else... We woke up in deep profits!",
        author: "Lungelo C.",
        role: "Gold Member",
    },
    {
        quote: "Tebza made R5000 early in the morning while driving. When I see profits I get motivated to send more trade ideas!",
        author: "Mr. $1 Team",
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
                            <img src="https://mr1dollar.co.za/wp-content/uploads/2025/03/cropped-MR1Dollar_mERCHWhite-7.png" alt="Mr One Dollar International Logo" className="h-12 w-auto" />
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <a key={link.name} href="#" onClick={(e) => handleNavClick(e, link.page)} 
                                   className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${currentPage === link.page ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}`}>
                                    {link.name}
                                     {currentPage === link.page && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_theme(colors.amber.400)]"></span>}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                             <a key={link.name} href="#" onClick={(e) => handleNavClick(e, link.page)} 
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === link.page ? 'bg-amber-400 text-black' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                                 {link.name}
                             </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

interface HeroProps {
    setCurrentPage: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => (
    <section className="py-24 sm:py-32 text-center hero-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fadeInUp">
            <h2 className="text-amber-400 text-3xl font-bold uppercase tracking-widest" style={{'--delay': '0.1s'} as React.CSSProperties}>Mr One Dollar International</h2>
            <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white" style={{'--delay': '0.2s'} as React.CSSProperties}>
                The Blueprint to the 1% – <br /> Trade Smarter, Profit Bigger!!!
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400" style={{'--delay': '0.3s'} as React.CSSProperties}>
                “Designed for traders who refuse to be average. Learn the strategies that put us in the 1%, Stay Blue & Take Profit.”
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{'--delay': '0.4s'} as React.CSSProperties}>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); }} className="w-full sm:w-auto inline-block bg-amber-400 text-black font-bold py-3 px-8 rounded-md hover:bg-amber-300 transition-all duration-300 ease-in-out transform hover:scale-105 btn-primary">
                    Get Started
                </a>
                <a href="https://primexbt.com/id/sign-up?cxd=41494_583667&pid=41494&promo=[afp7]&type=IB&skip_app=1" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-amber-400 text-amber-400 font-bold py-3 px-8 rounded-md hover:bg-amber-400 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 btn-secondary">
                    <img src="https://i.ibb.co/YGPkfR7/Prime-XBT-Logo.png" alt="PrimeXBT" className="h-5 w-auto object-contain" />
                    Register with a Broker
                </a>
            </div>
        </div>
    </section>
);


const PropFirms: React.FC = () => {
    const partners = [
        {
            name: 'PrimeXBT',
            description: 'A leading cryptocurrency and forex trading broker offering leveraged trading with tight spreads',
            logoUrl: 'https://i.ibb.co/YGPkfR7/Prime-XBT-Logo.png',
            link: 'https://primexbt.com/id/sign-up?cxd=41494_583667&pid=41494&promo=[afp7]&type=IB&skip_app=1'
        },
        {
            name: 'FundedNext',
            description: 'A proprietary trading firm providing funding for forex and crypto traders worldwide',
            logoUrl: 'https://i.ibb.co/BKdbGB2V/Fundednext-Logo.png',
            link: 'https://fundednext.com/?fpr=tinyiko-paul-miyambo55'
        },
        {
            name: 'FTMO',
            description: 'A global prop trading firm offering capital to skilled traders through evaluation programs',
            logoUrl: 'https://i.ibb.co/xQTR80Z/FTMO-logo-removebg-preview.png',
            link: 'https://trader.ftmo.com/?affiliates=UAWWsYFWImbrlfINiOLH'
        }
    ];
    
    return (
        <section className="py-20 bg-slate-900 animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Trusted Partners</h2>
                <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                    Sign up with one of our trusted partners to get funded and start trading with the best brokers and prop-firms in the industry.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {partners.map((partner, i) => (
                        <div key={partner.name} className="flex flex-col items-center">
                            <a 
                                href={partner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-6 rounded-lg flex justify-center items-center group transform hover:-translate-y-2 transition-all duration-300 hover:border-amber-400/50 w-full"
                            >
                                <img 
                                    src={partner.logoUrl} 
                                    alt={`${partner.name} logo`} 
                                    className="max-h-12 sm:max-h-16 w-auto transition-transform duration-300 group-hover:scale-110" 
                                />
                            </a>
                            <div className="mt-3 text-center">
                                <h3 className={`font-semibold ${
                                    partner.name === 'PrimeXBT' ? 'text-amber-500' : 
                                    partner.name === 'FundedNext' ? 'text-blue-500' : 
                                    'text-green-500'
                                }`}>
                                    {partner.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-300">
                                    {partner.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PromoSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <section className="py-12 bg-gradient-to-br from-blue-900 to-black text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-between"
                    >
                        <span className="text-lg sm:text-xl">🔥 GET FREE PLATINUM TRADE IDEAS FOR A MONTH 🔥</span>
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
                                Follow These Simple Steps:
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4">1</div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Register Your Trading Account</h4>
                                        <a 
                                            href="https://primexbt.com/id/sign-up?cxd=41494_583667&pid=41494&promo=[afp7]&type=IB&skip_app=1" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.5 12.5h-9v-1h9v1z"/>
                                            </svg>
                                            Register on PrimeXBT
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4">2</div>
                                    <div>
                                        <h4 className="font-semibold">Complete Registration</h4>
                                        <p className="text-gray-300 text-sm">Enter your details and complete KYC verification</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4">3</div>
                                    <div>
                                        <h4 className="font-semibold">Fund Your Account</h4>
                                        <p className="text-gray-300 text-sm">Deposit minimum $50 (R800) into your wallet</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4">4</div>
                                    <div>
                                        <h4 className="font-semibold">Claim Your Free Month</h4>
                                        <a 
                                            href="https://wa.me/27626898567?text=Hi%20Nomii,%20I've%20completed%20my%20PrimeXBT%20registration%20and%20funding.%20Here's%20my%20proof%20of%20funding:" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300"
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
    
    // Get all testimonial image files from the public directory
    const testimonialImages = [
        'WhatsApp Image 2025-11-03 at 14.53.22_1344b584.jpg',
        'WhatsApp Image 2025-11-03 at 17.16.03_119b503d.jpg',
        'WhatsApp Image 2025-11-03 at 17.17.11_57705a92.jpg',
        'WhatsApp Image 2025-11-03 at 17.18.03_07fdb6eb.jpg',
        'WhatsApp Image 2025-11-03 at 17.21.00_2b64be7d.jpg',
        'WhatsApp Image 2025-11-03 at 17.34.02_20e3bebb.jpg',
        'WhatsApp Image 2025-11-04 at 08.57.18_eb106dae.jpg',
        'WhatsApp Image 2025-11-04 at 17.24.42_6c99cf04.jpg',
        'WhatsApp Image 2025-11-06 at 21.37.54_3fe0f787.jpg',
        'WhatsApp Image 2025-11-07 at 21.18.22_6d830380.jpg',
        'WhatsApp Image 2025-11-07 at 21.19.45_9c8b041e.jpg',
        'WhatsApp Image 2025-11-11 at 14.26.31_b730de11.jpg',
        'WhatsApp Image 2025-11-11 at 14.26.32_f23f739c.jpg',
        'WhatsApp Image 2025-11-11 at 14.44.38_a5e0cc99.jpg',
        'WhatsApp Image 2025-11-11 at 15.39.25_0be34331.jpg',
        'WhatsApp Image 2025-11-11 at 15.48.45_14350078.jpg'
    ];
    
    return (
        <section className="py-20 bg-black animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">What Our Traders Say</h2>
                <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                    Real results from real members of the Mr$1 community.
                </p>
                
                <div className="mt-12">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-300 flex items-center mx-auto"
                    >
                        {isOpen ? 'Hide Testimonials' : 'View All Testimonials'}
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
                                            src={`/mr$1 testimonials/${image}`}
                                            alt={`Testimonial ${index + 1}`}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
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
                            <div className="relative">
                                <img 
                                    src={`/mr$1 testimonials/${selectedImage}`}
                                    alt="Full size testimonial"
                                    className="max-h-[80vh] max-w-full mx-auto rounded-lg shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-1 rounded-full text-sm mx-auto w-24">
                                    {testimonialImages.indexOf(selectedImage) + 1} / {testimonialImages.length}
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
                    <h3 className="text-xl font-bold text-white">MR <span className="text-amber-400">ONE</span> DOLLAR</h3>
                    <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                        At Mr. One Dollar International, our purpose goes beyond just trading. We believe in empowering individuals with the skills and knowledge to achieve financial independence. Our mission is to create a community where traders can thrive, learn, and grow together.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Contact Us</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li className="flex items-start text-slate-400">
                           <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-amber-400 flex-shrink-0"/>
                           <a href="https://www.google.com/maps/place/8+Karen+St,+Lyme+Park,+Sandton,+2060/@-26.08077,28.0181538,3a,75y,95.22h,90t/data=!4m6!3m5!1s0x1e957482756d30af:0x89934465d22d0388!8m2!3d-26.0808!4d28.01852!16s%2Fg%2F11c5pnqdkl?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                                8 Karen St, Lyme Park, Sandton, 2060
                           </a>
                        </li>
                        <li className="flex items-start text-slate-400">
                            <PhoneIcon className="w-5 h-5 mr-3 mt-1 text-amber-400 flex-shrink-0"/>
                            <div>
                                <a href="https://wa.me/27626898567" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">+27 62 689 8567</a> / 
                                <a href="https://wa.me/27614267355" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors"> +27 61 426 7355</a>
                            </div>
                        </li>
                        <li className="flex items-start text-slate-400">
                             <EnvelopeIcon className="w-5 h-5 mr-3 mt-1 text-amber-400 flex-shrink-0"/>
                             <a href="mailto:info@mr1dollar.co.za" className="hover:text-amber-400 transition-colors">info@mr1dollar.co.za</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Follow Us</h3>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://www.youtube.com/@mr1dollar572" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300">
                            <YouTubeIcon className="w-7 h-7" />
                        </a>
                        <a href="https://www.instagram.com/mr1dollarforextrading/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300">
                            <InstagramIcon className="w-7 h-7" />
                        </a>
                        <a href="https://chat.whatsapp.com/EEGdXmPHokd0qzbQqd28SS?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1E1EL7FO3iZ_uz1G7rvT7i5utLGbx_QiodZH3Cz6oUTzpCjXkA-cqGgzZBs_aem_B7K4X-tf1bLXw6stzB3f4A" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transform hover:scale-110 transition-all duration-300">
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.5 3.5a10 10 0 1 0-15.6 11.7L2 22l6.8-2.9a10 10 0 0 0 4.8 1.2 10 10 0 0 0 6.9-16.8zm-8.5 16.3a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.9.9-3.1-.2-.3a8.4 8.4 0 1 1 15.5-4.4 8.4 8.4 0 0 1-8.4 8.3z"/>
                                <path d="M17.5 14.3c-.2-.1-1.5-.7-1.7-.8-.2-.1-.3-.1-.4.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2-1.1-1.2-1-2-2.2-2.5-3.6-.1-.2 0-.3.1-.4.2-.2.5-.6.6-.8.1-.2.1-.3.1-.4 0-.2-.1-.3-.2-.4l-.5-.6c-.2-.2-.4-.3-.6-.3h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.2 0 1.3 1 2.6 1.1 2.8.1.2 1.8 2.7 4.4 3.7.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.5.2-1 0-1.4-.1-.2-.5-.4-.7-.5z"/>
                            </svg>
                        </a>
                    </div>
                     <p className="mt-4 text-slate-400 text-sm">Join our WhatsApp Community!</p>
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


const WhatsAppWidget: React.FC = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href="https://api.whatsapp.com/send?phone=27626898567"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
        aria-label="Chat with us on WhatsApp"
      >
        <img 
          src="https://i.ibb.co/k62LSRsn/Whats-App-Logo.png" 
          alt="WhatsApp" 
          className="w-8 h-8 object-contain"
        />
        <span className="absolute right-16 bg-white text-gray-800 text-sm font-medium px-3 py-1.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Chat with us
        </span>
      </a>
    </div>
);


// --- Page Components ---

interface HomePageProps {
    setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => (
    <>
        <Hero setCurrentPage={setCurrentPage} />
        <PromoSection />
        <PropFirms />
        <Testimonials />
        <AboutPage />
    </>
);

const EventsPage: React.FC = () => {
    const products = [
        { name: "Gold High Voltage Trade Ideas", price: "$59.00" },
        { name: "Learn how to trade NFP Event with Mr One Dollar Forex Trading", price: "$16.00" },
        { name: "Full Course", price: "$879.00" },
    ];

    return (
        <div className="bg-black py-16 sm:py-24 animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="glass-card p-6 sm:p-8 rounded-lg">
                           <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                               Learn how to trade NFP Event with Mr One Dollar Forex Trading
                           </h1>
                           <p className="text-3xl font-bold text-amber-400 mb-6">$16.00</p>
                           <a href="#" className="inline-block bg-amber-400 text-black font-bold py-3 px-8 rounded-md hover:bg-amber-300 transition-all duration-300 ease-in-out transform hover:scale-105 btn-primary">
                                Buy product
                           </a>
                        </div>
                        <div className="mt-8 glass-card p-6 sm:p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-3 mb-4">Description</h2>
                            <div className="text-slate-400 space-y-4">
                               <p className="text-lg font-semibold text-white">NON FARM PAYROLL 🚀</p>
                               <p>Join us Live on the 7th of March for NFP Trading Mastery! Get ready to elevate your trading skills as we teach you how to effectively trade the Non-Farm Payroll (NFP) data release before it hits the market.</p>
                               <p>Discover strategies, tips, and insights to make the most of this critical economic event. Don’t miss out on this opportunity to learn and profit! 💰</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 space-y-8">
                         <div className="glass-card p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Cart</h3>
                            <p className="text-slate-400">No products in the cart.</p>
                        </div>
                         <div className="glass-card p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Products</h3>
                            <ul className="space-y-4">
                                {products.map((product, index) => (
                                    <li key={index} className="border-b border-slate-700 pb-4 last:border-b-0 last:pb-0">
                                        <a href="#" className="group">
                                            <p className="text-slate-300 group-hover:text-amber-400 transition-colors">{product.name}</p>
                                            <p className="font-semibold text-amber-400">{product.price}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string}> = ({icon, title}) => (
    <div className="glass-card p-8 rounded-lg flex flex-col items-center text-center transform hover:scale-105 hover:border-amber-400/30 transition-all duration-300">
        {icon}
        <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
    </div>
);

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqData = [
        {
            question: "What is Mr$1 International?",
            answer: "Mr$1 International is a premier Forex education and trade idea provider. Our mission is to empower traders of all levels with the knowledge, strategies, and community support needed to achieve financial independence and join the top 1% of successful traders."
        },
        {
            question: "Who are your courses designed for?",
            answer: "Our courses cater to everyone, from absolute beginners with no prior knowledge to experienced traders looking to refine their strategies. We offer a structured learning path, including beginner, intermediate, and advanced courses, as well as specialized mentorship programs."
        },
        {
            question: "What makes your trade ideas different?",
            answer: "Our trade ideas are the result of rigorous analysis by our team of expert traders. We don't just provide signals; we offer insights into the market's direction, helping you make informed decisions. Our focus is on high-probability setups that align with our core 'Stay Blue & Take Profit' philosophy."
        },
        {
            question: "Do I need any prior experience to start?",
            answer: "Not at all! Our beginner's course is specifically designed to build a strong foundation from the ground up. We cover all the basics, from understanding Forex terminology to setting up your charts and executing your first trade in a supportive learning environment."
        },
        {
            question: "How do I get started with Mr$1 International?",
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


const AboutPage: React.FC = () => (
    <div className="bg-black animate-fadeIn">
        {/* Page Header */}
        <section className="py-24 bg-slate-900">
            <div className="container mx-auto px-4 text-center animate-fadeInUp">
                <h1 className="text-5xl font-extrabold text-white">About Our Company</h1>
                <p className="mt-4 text-amber-400 text-lg uppercase tracking-widest">Our Story</p>
                <div className="mt-4 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
            </div>
        </section>

        {/* Story Content */}
        <section className="py-20 animate-fadeInUp">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <p className="text-xl text-slate-300 leading-relaxed">
                    At Mr. One Dollar Forex Trading, our purpose goes beyond just trading. We believe in empowering individuals with the skills and knowledge to achieve financial independence. Our mission is to create a community where traders can Thrive, learn and grow together. We are dedicated to providing top-notch training, valuable resources, and a supportive environment that fosters personal and professional development.
                </p>
            </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-slate-900 animate-fadeInUp">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Mission</h2>
                    <div className="mt-3 h-1 w-24 bg-amber-400 mx-auto shadow-[0_0_8px_theme(colors.amber.400)]"></div>
                </div>
                <p className="mt-8 text-lg text-slate-400 max-w-3xl mx-auto text-center">
                    We are helping people to succeed in the Financial Markets. We understand that trading is not just about profit; it’s about building a sustainable future for you and your loved ones. Our goal is to help you unlock your potential, gain confidence, and take control of your financial destiny. Together, we can navigate the markets and turn dreams into reality. Why settle for ordinary when you can be extraordinary? Join us on this journey to success!
                </p>
            </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-black animate-fadeInUp">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard icon={<ShieldCheckIcon className="w-12 h-12 text-amber-400"/>} title="Proven Track Record" />
                    <FeatureCard icon={<UsersIcon className="w-12 h-12 text-amber-400"/>} title="Thriving Community" />
                    <FeatureCard icon={<RocketLaunchIcon className="w-12 h-12 text-amber-400"/>} title="Exclusive Trade-Cations" />
                </div>
            </div>
        </section>

        <FAQ />

        {/* For Beginners CTA */}
        <section className="py-20 animate-fadeInUp">
            <div className="container mx-auto px-4">
                <div className="glass-card rounded-lg p-10 text-center flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-white">Go Beyond the Charts with Mr One Dollar</h2>
                    <p className="mt-4 text-slate-400 max-w-2xl">
                        Join our growing community on YouTube! From exclusive podcast episodes and in-depth trade reviews to beginner's guides and footage from our legendary Trade-Cations, we're pulling back the curtain. Subscribe to get the strategies and insights you won't find anywhere else.
                    </p>
                    <a href="https://www.youtube.com/@mr1dollar572" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-amber-400 text-black font-bold py-3 px-8 rounded-md hover:bg-amber-300 transition-all duration-300 ease-in-out transform hover:scale-105 btn-primary">
                        Watch on YouTube
                    </a>
                </div>
            </div>
        </section>
    </div>
);

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
                                <MapPinIcon className="w-6 h-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Head office</h3>
                                    <p className="text-slate-400">8 Karen St, Lyme Park, Sandton, 2060</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <PhoneIcon className="w-6 h-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Call us</h3>
                                    <p className="text-slate-400">
                                        <a href="https://wa.me/27626898567" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">+27 62 689 8567</a>
                                    </p>
                                    <p className="text-slate-400">
                                        <a href="https://wa.me/27614267355" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">+27 61 426 7355</a>
                                    </p>
                                </div>
                            </li>
                             <li className="flex items-start">
                                <EnvelopeIcon className="w-6 h-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Email us</h3>
                                    <a href="mailto:info@mr1dollar.co.za" className="text-slate-400 hover:text-amber-400">info@mr1dollar.co.za</a>
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
            </div>
        </div>
    );
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; isExpanded: boolean; onToggle: () => void; }> = ({ product, onAddToCart, isExpanded, onToggle }) => (
    <div className="glass-card rounded-lg overflow-hidden flex flex-col group transition-all duration-300 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-500/10 transform hover:-translate-y-1 hover:scale-[1.02]">
        <div className="relative">
             <div className="w-full h-48 bg-slate-800 flex items-center justify-center overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
            <h3 className="text-lg font-semibold text-white flex-grow cursor-pointer" onClick={onToggle}>{product.name}</h3>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen mt-2' : 'max-h-0'}`}>
                <p className="text-slate-400 text-sm">{product.description}</p>
            </div>
            <div className="mt-2">
                {product.originalPrice ? (
                    <p className="text-amber-400 text-xl font-bold">
                        <del className="text-slate-500 text-sm font-normal">${product.originalPrice.toFixed(2)}</del> ${product.price.toFixed(2)}
                    </p>
                ) : (
                    <p className="text-amber-400 text-xl font-bold">${product.price.toFixed(2)}</p>
                )}
            </div>
            {product.checkoutUrl ? (
                <a 
                    href={product.checkoutUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 w-full text-center bg-amber-400 text-black font-bold py-2 px-4 rounded-md hover:bg-amber-300 transition-colors btn-primary"
                >
                    Buy product
                </a>
            ) : (
                <button 
                    onClick={() => onAddToCart(product)} 
                    className="mt-4 w-full text-center bg-amber-400 text-black font-bold py-2 px-4 rounded-md hover:bg-amber-300 transition-colors btn-primary"
                >
                    Add to cart
                </button>
            )}
        </div>
    </div>
);

const ServicesPage: React.FC = () => {
    const [products] = useState<Product[]>(servicesData);
    const [cart, setCart] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState<{ min: number | string, max: number | string }>({ min: '', max: '' });
    const [appliedPriceRange, setAppliedPriceRange] = useState<{ min: number | null, max: number | null }>({ min: null, max: null });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const itemsPerPage = 12;

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
            count: products.filter(p => p.category === cat).length
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
    
    const cartTotal = cart.reduce((total, product) => total + product.price, 0);

    const handleAddToCart = (product: Product) => {
        setCart(prevCart => [...prevCart, product]);
    };
    
    const handleRemoveFromCart = (productId: number, index: number) => {
        setCart(prevCart => prevCart.filter((p, i) => !(p.id === productId && i === index)));
    };

    const handlePriceFilter = () => {
        setCurrentPage(1);
        setAppliedPriceRange({
            min: priceRange.min === '' ? null : Number(priceRange.min),
            max: priceRange.max === '' ? null : Number(priceRange.max),
        });
    };

    const handleCategoryClick = (e: React.MouseEvent, category: string | null) => {
        e.preventDefault();
        setCurrentPage(1);
        setSelectedCategory(category);
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    const renderPagination = () => {
        if (totalPages <= 1) return null;
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
        
        return (
            <nav className="flex justify-center items-center space-x-2 mt-12">
                 {currentPage > 1 && (
                     <button onClick={() => handlePageChange(currentPage - 1)} className="text-slate-300 hover:bg-slate-800 font-bold w-10 h-10 flex items-center justify-center rounded-md transition-colors">←</button>
                 )}
                {pageNumbers.map(number => (
                     <button 
                        key={number} 
                        onClick={() => handlePageChange(number)} 
                        className={`${currentPage === number ? 'bg-amber-400 text-black' : 'text-slate-300 hover:bg-slate-800'} font-bold w-10 h-10 flex items-center justify-center rounded-md transition-colors`}
                    >
                        {number}
                    </button>
                ))}
                {currentPage < totalPages && (
                     <button onClick={() => handlePageChange(currentPage + 1)} className="text-slate-300 hover:bg-slate-800 font-bold w-10 h-10 flex items-center justify-center rounded-md transition-colors">→</button>
                )}
            </nav>
        );
    };

    const sidebarContent = (
        <div className="space-y-8">
             <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Search by products</h3>
                <div className="relative">
                    <input 
                        type="search" 
                        placeholder="Search products…" 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" 
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <SearchIcon className="text-slate-400" />
                    </div>
                </div>
            </div>
            <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Filter by price</h3>
                 <div className="flex items-center space-x-2 mb-4">
                    <input 
                        type="number" 
                        placeholder="Min price" 
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" 
                    />
                    <input 
                        type="number" 
                        placeholder="Max price" 
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" 
                    />
                </div>
                <button onClick={handlePriceFilter} className="w-full bg-amber-400 text-black font-bold py-2 px-4 rounded-md hover:bg-amber-300 transition-colors btn-primary">Filter</button>
            </div>
            <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-2">Cart</h3>
                {cart.length === 0 ? (
                   <p className="text-slate-400">No products in the cart.</p>
                ) : (
                    <>
                        <p className="text-sm text-slate-400 mb-4">Total items: {cart.length}</p>
                        <ul className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                            {cart.map((item, index) => (
                                <li key={`${item.id}-${index}`} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-300 flex-1 pr-2">{item.name}</span>
                                    <div className="flex items-center">
                                        <span className="font-semibold text-amber-400">${item.price.toFixed(2)}</span>
                                        <button 
                                            onClick={() => handleRemoveFromCart(item.id, index)} 
                                            className="ml-4 text-slate-500 hover:text-red-500 transition-colors"
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t border-slate-700 pt-4 flex justify-between font-bold text-white">
                            <span>Total:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </>
                )}
            </div>
            <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Product categories</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="#" onClick={(e) => handleCategoryClick(e, null)} className={`flex justify-between ${selectedCategory === null ? 'text-amber-400' : 'text-slate-400 hover:text-amber-400'}`}>
                            <span>All</span>
                            <span>({products.length})</span>
                        </a>
                    </li>
                    {categories.map(cat => (
                         <li key={cat.name}>
                            <a href="#" onClick={(e) => handleCategoryClick(e, cat.name)} className={`flex justify-between ${selectedCategory === cat.name ? 'text-amber-400' : 'text-slate-400 hover:text-amber-400'}`}>
                                <span>{cat.name}</span>
                                <span>({cat.count})</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <div className="bg-black py-16 sm:py-24 animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 rounded-md px-4 py-3 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                        <FilterIcon />
                        <span>Filter & View Cart</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                     {/* Sidebar (Off-canvas on mobile, static on desktop) */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                            aria-hidden="true"
                        ></div>
                    )}
                    <aside
                        className={`
                            fixed top-0 left-0 h-full w-full max-w-xs bg-slate-900 z-50 
                            transform transition-transform duration-300 ease-in-out
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                            lg:relative lg:translate-x-0 lg:w-1/4 lg:max-w-none lg:bg-transparent lg:z-auto
                            flex flex-col
                        `}
                        aria-labelledby="filters-heading"
                    >
                         <div className="flex-grow overflow-y-auto p-6 lg:p-0">
                            <div className="flex justify-between items-center lg:hidden mb-6">
                                <h2 id="filters-heading" className="text-xl font-bold text-white">Filters & Cart</h2>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 -m-2 text-slate-400 hover:text-white" aria-label="Close filters">
                                    <CloseIcon />
                                </button>
                            </div>
                            {sidebarContent}
                         </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-3/4">
                        <h1 className="text-4xl font-extrabold text-white mb-4">Services</h1>
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-slate-400 gap-4">
                            <p>Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} results</p>
                            <select 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            >
                                <option value="default">Default sorting</option>
                                <option value="price-asc">Sort by price: low to high</option>
                                <option value="price-desc">Sort by price: high to low</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {paginatedProducts.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onAddToCart={handleAddToCart}
                                    isExpanded={expandedProductId === product.id}
                                    onToggle={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)}
                                />
                            ))}
                        </div>

                        {renderPagination()}
                    </main>
                </div>
            </div>
        </div>
    );
};

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
                    <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@mr1dollar.co.za" className="text-amber-400 hover:underline">info@mr1dollar.co.za</a>.</p>
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
                    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@mr1dollar.co.za" className="text-amber-400 hover:underline">info@mr1dollar.co.za</a>.</p>
                </div>
            </div>
        </div>
    </div>
);


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
  }

  return (
    <div className="bg-black">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppWidget />
    </div>
  );
};

export default App;
