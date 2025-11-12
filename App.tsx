
import React, { useState, useMemo } from 'react';

// --- Types ---
type Page = 'home' | 'events' | 'download' | 'about' | 'team' | 'contact' | 'shop';
interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    imageUrl: string;
}

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

const ClockIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


const ChartBarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125-1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125-1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);

const ChatBubbleOvalLeftEllipsisIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.455.09-.934.09-1.425v-2.125c0-4.556 4.03-8.25 9-8.25 4.97 0 9 3.694 9 8.25Z" />
    </svg>
);

const SunIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
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
        { name: "Download App", page: 'download' },
        { name: "About Us", page: 'about' },
        { name: "Our Team", page: 'team' },
        { name: "Contact Us", page: 'contact' },
        { name: "Online Shop", page: 'shop' }
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        setCurrentPage(page);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="text-2xl font-bold tracking-wider cursor-pointer">
                            MR <span className="text-amber-400">ONE</span> DOLLAR
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <a key={link.name} href="#" onClick={(e) => handleNavClick(e, link.page)} 
                                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === link.page ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'}`}>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
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
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === link.page ? 'bg-slate-700 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'}`}>
                                 {link.name}
                             </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

const Hero: React.FC = () => (
    <section className="py-24 sm:py-32 text-center bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-amber-400 text-sm font-bold uppercase tracking-widest">Mr One Dollar International</h2>
            <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
                The Blueprint to the 1% – <br /> Trade Smarter, Profit Bigger!!!
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
                “Designed for traders who refuse to be average. Learn the strategies that put us in the 1%, Stay Blue & Take Profit.”
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#" className="w-full sm:w-auto inline-block bg-amber-400 text-black font-bold py-3 px-8 rounded-md hover:bg-amber-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                    Get Started
                </a>
                <a href="#" className="w-full sm:w-auto inline-block bg-transparent border-2 border-amber-400 text-amber-400 font-bold py-3 px-8 rounded-md hover:bg-amber-400 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105">
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
            logoUrl: 'https://i.imgur.com/00tGvAY.png',
            link: 'https://primexbt.com/id/sign-up?cxd=41494_583667&pid=41494&promo=[afp7]&type=IB&skip_app=1'
        },
        {
            name: 'FundedNext',
            logoUrl: 'https://i.imgur.com/qK1gB1x.png',
            link: 'https://fundednext.com/?fpr=tinyiko-paul-miyambo55'
        },
        {
            name: 'FTMO',
            logoUrl: 'https://i.imgur.com/9C2rcyd.png',
            link: 'https://trader.ftmo.com/?affiliates=UAWWsYFWImbrlfINiOLH'
        }
    ];
    
    return (
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Trusted Partners</h2>
                <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                    Sign up with one of our trusted partners to get funded and start trading with the best brokers and prop-firms in the industry.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {partners.map(partner => (
                        <a 
                            key={partner.name}
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black p-6 rounded-lg flex justify-center items-center group transform hover:-translate-y-2 transition-transform duration-300"
                        >
                            <img 
                                src={partner.logoUrl} 
                                alt={`${partner.name} logo`} 
                                className="max-h-12 sm:max-h-16 w-auto transition-transform duration-300 group-hover:scale-110" 
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

const About: React.FC = () => (
    <section id="about-us" className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">About Mr One Dollar International</h2>
                <div className="mt-3 h-1 w-24 bg-amber-400 mx-auto"></div>
            </div>
            <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto text-center">
                At Mr. One Dollar International, our purpose goes beyond just trading. We believe in empowering individuals with the skills and knowledge to achieve financial independence. Our mission is to create a community where traders can thrive, learn, and grow together. We are dedicated to providing top-notch training, valuable resources, and a supportive environment that fosters personal and professional development.
            </p>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="bg-black border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white">Mr One Dollar International</h3>
                    <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                        At Mr. One Dollar International, our purpose goes beyond just trading. We believe in empowering individuals with the skills and knowledge to achieve financial independence. Our mission is to create a community where traders can thrive, learn, and grow together. We are dedicated to providing top-notch training, valuable resources, and a supportive environment that fosters personal and professional development.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Contact Us</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li className="flex items-start text-gray-400">
                           <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-amber-400 flex-shrink-0"/>
                           <a href="https://www.google.com/maps/place/8+Karen+St,+Lyme+Park,+Sandton,+2060/@-26.08077,28.0181538,3a,75y,95.22h,90t/data=!4m6!3m5!1s0x1e957482756d30af:0x89934465d22d0388!8m2!3d-26.0808!4d28.01852!16s%2Fg%2F11c5pnqdkl?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                                8 Karen St, Lyme Park, Sandton, 2060
                           </a>
                        </li>
                        <li className="flex items-start text-gray-400">
                            <PhoneIcon className="w-5 h-5 mr-3 mt-1 text-amber-400 flex-shrink-0"/>
                            <span>+27626898567 / +27614267355</span>
                        </li>
                        <li className="flex items-start text-gray-400">
                             <EnvelopeIcon className="w-5 h-5 mr-3 mt-1 text-amber-400 flex-shrink-0"/>
                             <a href="mailto:info@mr1dollar.co.za" className="hover:text-amber-400">info@mr1dollar.co.za</a>
                        </li>
                    </ul>
                </div>
                <div>
                    {/* Can be used for other links or info later */}
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">Copyright &copy; {new Date().getFullYear()} . All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">Home</a>
                    <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">About Us</a>
                    <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">Shop</a>
                    <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">Terms & Conditions</a>
                </div>
            </div>
        </div>
    </footer>
);


const WhatsAppWidget: React.FC = () => (
    <a 
      href="https://api.whatsapp.com/send?phone=27626898567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8"/>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
        Need Help? Chat with us
      </span>
    </a>
);


// --- Page Components ---

const HomePage: React.FC = () => (
    <>
        <Hero />
        <PropFirms />
        <About />
    </>
);

const EventsPage: React.FC = () => {
    const products = [
        { name: "Gold High Voltage Trade Ideas", price: "$59.00" },
        { name: "Learn how to trade NFP Event with Mr One Dollar Forex Trading", price: "$16.00" },
        { name: "Full Course", price: "$879.00" },
    ];

    return (
        <div className="bg-black py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="bg-slate-900 p-6 sm:p-8 rounded-lg">
                           <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                               Learn how to trade NFP Event with Mr One Dollar Forex Trading
                           </h1>
                           <p className="text-3xl font-bold text-amber-400 mb-6">$16.00</p>
                           <a href="#" className="inline-block bg-amber-400 text-black font-bold py-3 px-8 rounded-md hover:bg-amber-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                                Buy product
                           </a>
                        </div>
                        <div className="mt-8 bg-slate-900 p-6 sm:p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-3 mb-4">Description</h2>
                            <div className="text-gray-400 space-y-4">
                               <p className="text-lg font-semibold text-white">NON FARM PAYROLL 🚀</p>
                               <p>Join us Live on the 7th of March for NFP Trading Mastery! Get ready to elevate your trading skills as we teach you how to effectively trade the Non-Farm Payroll (NFP) data release before it hits the market.</p>
                               <p>Discover strategies, tips, and insights to make the most of this critical economic event. Don’t miss out on this opportunity to learn and profit! 💰</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-slate-900 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">Cart</h3>
                            <p className="text-gray-400">No products in the cart.</p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Products</h3>
                            <ul className="space-y-4">
                                {products.map((product, index) => (
                                    <li key={index} className="border-b border-slate-700 pb-4 last:border-b-0 last:pb-0">
                                        <a href="#" className="group">
                                            <p className="text-gray-300 group-hover:text-amber-400 transition-colors">{product.name}</p>
                                            <p className="font-semibold text-amber-400">{product.price}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string}> = ({icon, title}) => (
    <div className="bg-slate-900 p-8 rounded-lg flex flex-col items-center text-center transform hover:scale-105 hover:bg-slate-800 transition-all duration-300">
        {icon}
        <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
    </div>
);

const AboutPage: React.FC = () => (
    <div className="bg-black">
        {/* Page Header */}
        <section className="py-24 bg-slate-900">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-extrabold text-white">About Our Company</h1>
                <p className="mt-4 text-amber-400 text-lg uppercase tracking-widest">Our Story</p>
                <div className="mt-4 h-1 w-24 bg-amber-400 mx-auto"></div>
            </div>
        </section>

        {/* Story Content */}
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <p className="text-xl text-gray-300 leading-relaxed">
                    At Mr. One Dollar Forex Trading, our purpose goes beyond just trading. We believe in empowering individuals with the skills and knowledge to achieve financial independence. Our mission is to create a community where traders can Thrive, learn and grow together. We are dedicated to providing top-notch training, valuable resources, and a supportive environment that fosters personal and professional development.
                </p>
            </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Mission</h2>
                    <div className="mt-3 h-1 w-24 bg-amber-400 mx-auto"></div>
                </div>
                <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto text-center">
                    We are helping people to succeed in the Financial Markets. We understand that trading is not just about profit; it’s about building a sustainable future for you and your loved ones. Our goal is to help you unlock your potential, gain confidence, and take control of your financial destiny. Together, we can navigate the markets and turn dreams into reality. Why settle for ordinary when you can be extraordinary? Join us on this journey to success!
                </p>
            </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard icon={<ChartBarIcon className="w-12 h-12 text-amber-400"/>} title="Track Record" />
                    <FeatureCard icon={<ChatBubbleOvalLeftEllipsisIcon className="w-12 h-12 text-amber-400"/>} title="Testimonials" />
                    <FeatureCard icon={<SunIcon className="w-12 h-12 text-amber-400"/>} title="Trade-Cations" />
                </div>
            </div>
        </section>

        {/* For Beginners CTA */}
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="bg-slate-900 rounded-lg p-10 text-center flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-white">Watch our Forex guide for beginners</h2>
                    <p className="mt-4 text-gray-400 max-w-2xl">
                        Invest in Forex, Stocks, Bitcoin, Ethereum, USDT, and other cryptocurrencies . The Bitcoin and cryptocurrency markets have experienced a surge in volume recently, making it an exciting time to become a trader. Forex markets have seen an increase in volume in recent weeks, which is a great opportunity for new traders.
                    </p>
                    <a href="#" className="mt-8 inline-block bg-amber-400 text-black font-bold py-3 px-8 rounded-md hover:bg-amber-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    </div>
);

const TeamMemberCard: React.FC<{ name: string, role: string }> = ({ name, role }) => (
    <div className="bg-slate-900 rounded-lg p-6 text-center flex flex-col items-center transform hover:scale-105 hover:bg-slate-800 transition-all duration-300">
        <div className="bg-slate-800 rounded-full p-4 mb-4">
            <UserIcon className="w-20 h-20 text-gray-500"/>
        </div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-amber-400 mt-1">{role}</p>
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
        { name: "Eddie. M", role: "IT Developer" },
        { name: "Yandisa. D", role: "Business Systems" },
    ];

    return (
        <div className="bg-black py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white">Our Team</h1>
                    <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
                        Meet our Forex Trading experts. Our company was founded in 2020. We work daily to become better and we are ready to share best practices.
                    </p>
                    <div className="mt-6 h-1 w-24 bg-amber-400 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
        <div className="bg-black py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white">Get in touch</h1>
                    <div className="mt-6 h-1 w-24 bg-amber-400 mx-auto"></div>
                </div>
                <div className="bg-slate-900 rounded-lg p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold text-white">Contact information</h2>
                        <p className="mt-4 text-gray-400">
                           Our company was founded in 2020. We work daily to become better and we are ready to share best practices.
                        </p>
                        <ul className="mt-8 space-y-6">
                            <li className="flex items-start">
                                <MapPinIcon className="w-6 h-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Head office</h3>
                                    <p className="text-gray-400">13 Fredman Drive<br />Fredman Towers<br />Sandton</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <PhoneIcon className="w-6 h-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Call us</h3>
                                    <p className="text-gray-400">+27626898567 / +27614267355</p>
                                </div>
                            </li>
                             <li className="flex items-start">
                                <EnvelopeIcon className="w-6 h-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Email us</h3>
                                    <a href="mailto:info@mr1dollar.co.za" className="text-gray-400 hover:text-amber-400">info@mr1dollar.co.za</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Opening Hours */}
                    <div>
                        <h2 className="text-3xl font-bold text-white">Opening hours</h2>
                        <ul className="mt-8 space-y-3 text-gray-400">
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

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; }> = ({ product, onAddToCart }) => (
    <div className="bg-slate-900 rounded-lg overflow-hidden flex flex-col">
        <div className="w-full h-48 bg-slate-800 flex items-center justify-center">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-white flex-grow">{product.name}</h3>
            <div className="mt-2">
                {product.originalPrice ? (
                    <p className="text-amber-400 text-xl font-bold">
                        <del className="text-gray-500 text-sm font-normal">${product.originalPrice.toFixed(2)}</del> ${product.price.toFixed(2)}
                    </p>
                ) : (
                    <p className="text-amber-400 text-xl font-bold">${product.price.toFixed(2)}</p>
                )}
            </div>
            <button onClick={() => onAddToCart(product)} className="mt-4 w-full text-center bg-amber-400 text-black font-bold py-2 px-4 rounded-md hover:bg-amber-300 transition-colors">
                Buy product
            </button>
        </div>
    </div>
);

const ShopPage: React.FC = () => {
    const [products] = useState<Product[]>([
        { id: 1, name: "Gold High Voltage Trade Ideas", price: 59.00, category: 'Trade Ideas', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 2, name: "Platinum Trade Ideas (Monthly Subscription)", price: 106.00, category: 'Trade Ideas', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 3, name: "Diamond Trade Ideas (Monthly Subscription)", price: 172.00, originalPrice: 250.00, category: 'Trade Ideas', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 4, name: "Private Wealth VIP_Black Trade Ideas (Monthly Subscription)", price: 1060.00, category: 'Trade Ideas', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 5, name: "Beginners Course", price: 206.00, category: 'Courses', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 6, name: "Intermediate Course", price: 307.00, category: 'Courses', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 7, name: "Advanced Course", price: 439.00, category: 'Courses', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 8, name: "Full Course", price: 879.00, category: 'Courses', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 9, name: "Mr One Dollar Forex Trading Beginner Mentorship", price: 27.00, category: 'Mentorship', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 10, name: "Mr One Dollar Forex Trading Intermediate Mentorship", price: 53.00, category: 'Mentorship', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 11, name: "Mr One Dollar Forex Trading Advanced Mentorship", price: 106.00, category: 'Mentorship', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 12, name: "Currencies Strategy", price: 429.00, originalPrice: 430.00, category: 'Strategy', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 13, name: "Advanced Indicators Pack", price: 150.00, category: 'Strategy', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 14, name: "NFP Event Access", price: 16.00, category: 'Events', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
        { id: 15, name: "Branded Merchandise", price: 45.00, category: 'Uncategorized', imageUrl: 'https://placehold.co/400x300/1e293b/facc15?text=Mr%241' },
    ]);

    const [cart, setCart] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState<{ min: number | string, max: number | string }>({ min: '', max: '' });
    const [appliedPriceRange, setAppliedPriceRange] = useState<{ min: number | null, max: number | null }>({ min: null, max: null });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
        return uniqueCategories.map(cat => ({
            name: cat,
            count: products.filter(p => p.category === cat).length
        }));
    }, [products]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        
        // Price filter
        if (appliedPriceRange.min !== null) {
            filtered = filtered.filter(p => p.price >= appliedPriceRange.min!);
        }
        if (appliedPriceRange.max !== null) {
            filtered = filtered.filter(p => p.price <= appliedPriceRange.max!);
        }

        // Sorting
        switch (sortOption) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            // Add other sorting cases like popularity or latest if data is available
            default:
                break;
        }

        return filtered;
    }, [products, searchTerm, selectedCategory, appliedPriceRange, sortOption]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
    const paginatedProducts = filteredAndSortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    const cartTotal = cart.reduce((total, product) => total + product.price, 0);

    const handleAddToCart = (product: Product) => {
        setCart(prevCart => [...prevCart, product]);
    };
    
    const handleRemoveFromCart = (productId: number) => {
        setCart(prevCart => {
            const productIndex = prevCart.findIndex(p => p.id === productId);
            if (productIndex > -1) {
                const newCart = [...prevCart];
                newCart.splice(productIndex, 1);
                return newCart;
            }
            return prevCart;
        });
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
                     <button onClick={() => handlePageChange(currentPage - 1)} className="text-gray-300 hover:bg-slate-800 font-bold w-10 h-10 flex items-center justify-center rounded-md transition-colors">←</button>
                 )}
                {pageNumbers.map(number => (
                     <button 
                        key={number} 
                        onClick={() => handlePageChange(number)} 
                        className={`${currentPage === number ? 'bg-amber-400 text-black' : 'text-gray-300 hover:bg-slate-800'} font-bold w-10 h-10 flex items-center justify-center rounded-md transition-colors`}
                    >
                        {number}
                    </button>
                ))}
                {currentPage < totalPages && (
                     <button onClick={() => handlePageChange(currentPage + 1)} className="text-gray-300 hover:bg-slate-800 font-bold w-10 h-10 flex items-center justify-center rounded-md transition-colors">→</button>
                )}
            </nav>
        );
    };


    return (
        <div className="bg-black py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <h1 className="text-4xl font-extrabold text-white mb-4">Shop</h1>
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-gray-400 gap-4">
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
                                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                            ))}
                        </div>

                        {renderPagination()}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-8">
                         <div className="bg-slate-900 p-6 rounded-lg">
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
                                    className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-amber-400" 
                                />
                            </div>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-lg">
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
                            <button onClick={handlePriceFilter} className="w-full bg-amber-400 text-black font-bold py-2 px-4 rounded-md hover:bg-amber-300 transition-colors">Filter</button>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Cart</h3>
                            {cart.length === 0 ? (
                               <p className="text-gray-400">No products in the cart.</p>
                            ) : (
                                <>
                                    <ul className="space-y-4 mb-4">
                                        {cart.map((item, index) => (
                                            <li key={`${item.id}-${index}`} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-300 flex-1 pr-2">{item.name}</span>
                                                <span className="font-semibold text-amber-400">${item.price.toFixed(2)}</span>
                                                <button onClick={() => handleRemoveFromCart(item.id)} className="ml-3 text-red-500 hover:text-red-400 text-xs">Remove</button>
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
                        <div className="bg-slate-900 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Product categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" onClick={(e) => handleCategoryClick(e, null)} className={`flex justify-between ${selectedCategory === null ? 'text-amber-400' : 'text-gray-400 hover:text-amber-400'}`}>
                                        <span>All</span>
                                        <span>({products.length})</span>
                                    </a>
                                </li>
                                {categories.map(cat => (
                                     <li key={cat.name}>
                                        <a href="#" onClick={(e) => handleCategoryClick(e, cat.name)} className={`flex justify-between ${selectedCategory === cat.name ? 'text-amber-400' : 'text-gray-400 hover:text-amber-400'}`}>
                                            <span>{cat.name}</span>
                                            <span>({cat.count})</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="bg-slate-900 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Product tags</h3>
                            <div className="flex flex-wrap gap-2">
                                <a href="#" className="bg-slate-800 text-gray-300 text-sm px-3 py-1 rounded-full hover:bg-amber-400 hover:text-black transition-colors">bag</a>
                                <a href="#" className="bg-slate-800 text-gray-300 text-sm px-3 py-1 rounded-full hover:bg-amber-400 hover:text-black transition-colors">clothes</a>
                                <a href="#" className="bg-slate-800 text-gray-300 text-sm px-3 py-1 rounded-full hover:bg-amber-400 hover:text-black transition-colors">colorful</a>
                                <a href="#" className="bg-slate-800 text-gray-300 text-sm px-3 py-1 rounded-full hover:bg-amber-400 hover:text-black transition-colors">stuff</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch(currentPage) {
        case 'home':
            return <HomePage />;
        case 'events':
            return <EventsPage />;
        case 'about':
            return <AboutPage />;
        case 'team':
            return <TeamPage />;
        case 'contact':
            return <ContactPage />;
        case 'shop':
            return <ShopPage />;
        default:
            return <HomePage />;
    }
  }

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
};

export default App;
