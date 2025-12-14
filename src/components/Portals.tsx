import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { servicesData } from '../../App';
import { 
  BoltIcon, 
  HomeIcon, 
  ArrowRightOnRectangleIcon, 
  RocketLaunchIcon, 
  PlayCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Card: React.FC<{ title: string; icon?: string; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = '' }) => (
  <div className={`bg-slate-900/40 border border-slate-800/60 rounded-xl p-5 sm:p-6 backdrop-blur-sm ${className}`}>
    {title && (
      <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
        {icon && <span aria-hidden="true" className="text-lg">{icon}</span>}
        {title}
      </h2>
    )}
    {children}
  </div>
);

export const AdminPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'users' | 'notifications'>('dashboard');

  const stats = useMemo(
    () => [
      { label: 'Total Users', value: '1,248', icon: '👥', color: 'from-blue-500/20 to-blue-600/20' },
      { label: 'Total Purchases', value: '3,972', icon: '💳', color: 'from-emerald-500/20 to-emerald-600/20' },
      { label: 'Monthly Revenue', value: '$42,900', icon: '💰', color: 'from-amber-500/20 to-amber-600/20' },
      { label: 'Active Subscriptions', value: '612', icon: '📈', color: 'from-purple-500/20 to-purple-600/20' },
    ],
    []
  );

  const sampleUsers = useMemo(
    () => [
      { id: 'u1', name: 'Thabo C.', email: 'Thabo@example.com', spent: 879, purchases: 2 },
      { id: 'u2', name: 'Prince M.', email: 'prince@example.com', spent: 439, purchases: 1 },
      { id: 'u3', name: 'Grace R.', email: 'grace@example.com', spent: 206, purchases: 1 },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">Administration</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-2">
              Control Center <BoltIcon className="h-6 w-6 text-amber-400" />
            </h1>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800 text-sm transition-colors"
            >
              <HomeIcon className="h-4 w-4" /> Home
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} title="" className={`bg-gradient-to-br ${stat.color} border-slate-700/50`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <span className="text-3xl" aria-hidden="true">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-2 mb-6 border-b border-slate-800">
          {(['dashboard', 'services', 'users', 'notifications'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab === 'dashboard' && '📊 Dashboard'}
              {tab === 'services' && '🧾 Services'}
              {tab === 'users' && '👥 Users'}
              {tab === 'notifications' && '🔔 Notifications'}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Quick Actions" icon="⚡" className="lg:col-span-1">
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm hover:bg-slate-800 transition-colors text-left">
                  📈 Bulk update prices
                </button>
                <button className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm hover:bg-slate-800 transition-colors text-left">
                  📢 Send announcement
                </button>
                <button className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm hover:bg-slate-800 transition-colors text-left">
                  💸 Manage discounts
                </button>
              </div>
            </Card>

            <Card title="Recent Activity" icon="📋" className="lg:col-span-2">
              <div className="space-y-3">
                {[
                  { action: 'New purchase', user: 'Thabo C.', time: '2 min ago' },
                  { action: 'Account created', user: 'Sarah M.', time: '15 min ago' },
                  { action: 'Course completed', user: 'Prince M.', time: '1 hour ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div>
                      <p className="text-sm font-medium text-white">{item.action}</p>
                      <p className="text-xs text-slate-400">{item.user}</p>
                    </div>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'services' && (
          <Card title="Service Management" icon="🧾">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Service</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Price</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {servicesData.slice(0, 6).map((svc) => (
                    <tr key={svc.id} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors">
                      <td className="py-3 px-4 text-white">{svc.name}</td>
                      <td className="py-3 px-4 text-slate-400">{svc.category}</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">{svc.price === 0 ? 'Free' : `$${svc.price}`}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-amber-400 hover:text-amber-300 text-xs font-medium">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'users' && (
          <Card title="User Management" icon="👥">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Purchases</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Spent</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleUsers.map((u) => (
                    <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors">
                      <td className="py-3 px-4 text-white font-medium">{u.name}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs">{u.email}</td>
                      <td className="py-3 px-4 text-slate-300">{u.purchases}</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">${u.spent}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-amber-400 hover:text-amber-300 text-xs font-medium">Offer discount</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <Card title="Send Notification" icon="🔔">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
                <select className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm focus:outline-none focus:border-amber-400/50">
                  <option>All users</option>
                  <option>High voltage members</option>
                  <option>Course subscribers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm focus:outline-none focus:border-amber-400/50 resize-none"
                  placeholder="Type your notification message..."
                />
              </div>
              <button className="w-full px-4 py-2.5 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-400 transition-colors">
                Send Notification
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export const CustomerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'guides'>('overview');

  const purchases = useMemo(
    () => [
      { id: 1, name: 'Diamond Trade Ideas', price: 179, date: '2024-12-10', status: 'Active' },
      { id: 2, name: 'Intermediate Mentorship', price: 53, date: '2024-12-05', status: 'Active' },
      { id: 3, name: 'Advanced Course', price: 439, date: '2024-11-28', status: 'Completed' },
    ],
    []
  );

  const notifications = useMemo(
    () => [
      { id: 1, message: 'NFP Live Session starts in 30 minutes', icon: '📺', time: '30m ago' },
      { id: 2, message: 'New Diamond Trade Ideas dropped', icon: '🚀', time: '2h ago' },
      { id: 3, message: 'Your mentorship session is ready', icon: '👤', time: '1d ago' },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">Trader Portal</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-2">
              Welcome back, {user?.fullName || 'Trader'} <RocketLaunchIcon className="h-6 w-6 text-amber-400" />
            </h1>
            <p className="text-sm text-slate-400 mt-2">Manage your education, track purchases, and access exclusive content</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800 text-sm transition-colors"
            >
              <HomeIcon className="h-4 w-4" /> Home
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-slate-800">
          {(['overview', 'services', 'guides'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab === 'overview' && '📊 Overview'}
              {tab === 'services' && '💼 Services'}
              {tab === 'guides' && '📚 Guides'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Your Profile" icon="👤" className="lg:col-span-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.fullName}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm focus:outline-none focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="w-full px-3 py-2 rounded-lg bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Experience Level</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm focus:outline-none focus:border-amber-400/50">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <button className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-400 transition-colors">
                  Save Changes
                </button>
              </div>
            </Card>

            <Card title="Recent Notifications" icon="🔔" className="lg:col-span-2">
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors">
                    <span className="text-lg mt-0.5" aria-hidden="true">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{n.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Your Purchases" icon="💳" className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Service</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Price</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((p) => (
                      <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors">
                        <td className="py-3 px-4 text-white">{p.name}</td>
                        <td className="py-3 px-4 text-emerald-400 font-semibold">${p.price}</td>
                        <td className="py-3 px-4 text-slate-400">{p.date}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            p.status === 'Active' 
                              ? 'bg-emerald-500/20 text-emerald-300' 
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="Quick Stats" icon="📈">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <p className="text-xs text-slate-400 mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-emerald-400">$671</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <p className="text-xs text-slate-400 mb-1">Active Services</p>
                  <p className="text-2xl font-bold text-amber-400">2</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <p className="text-xs text-slate-400 mb-1">Completed Courses</p>
                  <p className="text-2xl font-bold text-blue-400">1</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Video Guides" icon="📺">
              <div className="space-y-4">
                <a 
                  href="https://youtu.be/xaTeSbbXn9g" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors group"
                >
                  <div className="bg-red-600 p-1.5 rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">How to Register on PrimeXBT</span>
                </a>
                
                <a 
                  href="https://youtube.com/shorts/zNg7CH8sZl0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors group"
                >
                  <div className="bg-blue-600 p-1.5 rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">How to Transfer Funds</span>
                </a>
                
                <a 
                  href="https://youtu.be/zXvOnW12mhY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors group"
                >
                  <div className="bg-green-600 p-1.5 rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">MetaTrader Setup Guide</span>
                </a>
              </div>
            </Card>

            <Card title="Live Support" icon="🎧">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src="https://i.postimg.cc/7YZjFzbK/icons8-zoom-logo-34-1.png"
                      alt="Zoom"
                      className="h-6 w-6 object-contain"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">Instant Zoom Support</p>
                      <p className="text-xs text-slate-300 mt-1">Join live Zoom sessions for real-time support from our team</p>
                    </div>
                  </div>
                  <a
                    href="https://us06web.zoom.us/j/81165255532?pwd=ofshvQl8ruaMygqfgxAKaQ8eKbK1i2.1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors"
                  >
                    Join Meeting
                  </a>
                </div>

                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <p className="text-sm font-semibold text-white mb-2">📧 Email Support</p>
                  <p className="text-xs text-slate-300 mb-3">Have questions? Reach out to our support team</p>
                  <a href="mailto:support@mr1dollar.com" className="text-amber-400 hover:text-amber-300 text-sm font-medium">
                    support@mr1dollar.com
                  </a>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
