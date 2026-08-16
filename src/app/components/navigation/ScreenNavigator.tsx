import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mountain, Church, GraduationCap, Briefcase, Ship, Heart,
  Trophy, Users, HeartPulse, Car, Leaf, Compass, Globe,
  Calendar, MessageCircle, User, Home, Sparkles, X, ChevronRight
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface ScreenNavigatorProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen: (screen: string) => void;
}

const ALL_SCREENS = [
  // Onboarding Screens
  {
    category: '🎬 Onboarding Flow',
    screens: [
      { id: 'splash', name: 'Splash Screen', icon: Sparkles, color: 'from-blue-600 to-purple-600' },
      { id: 'language', name: 'Language Selection', icon: Globe, color: 'from-purple-600 to-pink-600' },
      { id: 'signup', name: 'Sign Up', icon: User, color: 'from-pink-600 to-red-600' },
      { id: 'otp', name: 'OTP Verification', icon: MessageCircle, color: 'from-red-600 to-orange-600' },
      { id: 'kyc-intro', name: 'KYC Intro', icon: Calendar, color: 'from-orange-600 to-yellow-600' },
      { id: 'kyc-phone', name: 'KYC Phone', icon: MessageCircle, color: 'from-yellow-600 to-green-600' },
      { id: 'kyc-documents', name: 'KYC Documents', icon: Calendar, color: 'from-green-600 to-teal-600' },
      { id: 'welcome-verified', name: 'Welcome Verified', icon: Sparkles, color: 'from-teal-600 to-blue-600' },
      { id: 'onboarding-slides', name: 'Onboarding Slides', icon: ChevronRight, color: 'from-blue-600 to-indigo-600' },
      { id: 'welcome-post', name: 'Welcome Post', icon: Sparkles, color: 'from-indigo-600 to-purple-600' },
      { id: 'get-started', name: 'Get Started', icon: Sparkles, color: 'from-purple-600 to-pink-600' },
    ]
  },
  // Main App Screens
  {
    category: '📱 Main App Screens',
    screens: [
      { id: 'home', name: 'Main Home', icon: Home, color: 'from-blue-500 to-indigo-600', featured: true },
      { id: 'explore', name: 'Explore', icon: Compass, color: 'from-purple-500 to-pink-600' },
      { id: 'bookings', name: 'My Bookings', icon: Calendar, color: 'from-green-500 to-teal-600' },
      { id: 'messages', name: 'Messages', icon: MessageCircle, color: 'from-blue-500 to-cyan-600' },
      { id: 'profile', name: 'Profile', icon: User, color: 'from-orange-500 to-red-600' },
    ]
  },
  // Tourism Hubs
  {
    category: '🏔️ Tourism Category Hubs',
    screens: [
      { id: 'adventure', name: 'Adventure Tourism', icon: Mountain, color: 'from-orange-500 to-red-600', count: '12+ activities' },
      { id: 'devotional', name: 'Devotional Tourism', icon: Church, color: 'from-purple-500 to-pink-600', count: '10 religions' },
      { id: 'educational', name: 'Educational Tourism', icon: GraduationCap, color: 'from-blue-500 to-indigo-600', count: '10 pathways' },
      { id: 'corporate', name: 'Corporate MICE', icon: Briefcase, color: 'from-gray-600 to-slate-700', count: '8 event types' },
      { id: 'cruise', name: 'Cruise Tourism', icon: Ship, color: 'from-cyan-500 to-blue-600', count: '6+ cruises' },
      { id: 'honeymoon', name: 'Honeymoon', icon: Heart, color: 'from-pink-500 to-rose-600', count: 'Romantic packages' },
      { id: 'sports', name: 'Sports Tourism', icon: Trophy, color: 'from-yellow-500 to-orange-600', count: '15+ sports' },
      { id: 'senior', name: 'Senior Wellness', icon: Users, color: 'from-green-500 to-emerald-600', count: '10 options' },
      { id: 'wellness', name: 'Wellness Tourism', icon: HeartPulse, color: 'from-green-500 to-teal-600', count: 'Health focus' },
      { id: 'heritage', name: 'Heritage Tourism', icon: Compass, color: 'from-amber-500 to-orange-600', count: 'Historical sites' },
      { id: 'eco', name: 'Eco Tourism', icon: Leaf, color: 'from-emerald-500 to-green-600', count: 'Nature focus' },
    ]
  },
  // Special Features
  {
    category: '✨ Special Features',
    screens: [
      { id: 'combo-tour', name: 'Combo Tour Planner', icon: Sparkles, color: 'from-purple-600 to-pink-600', featured: true },
      { id: 'essentials', name: 'Travel Essentials', icon: Car, color: 'from-orange-500 to-amber-600' },
      { id: 'self-drive', name: 'Self-Drive Tours', icon: Car, color: 'from-orange-400 to-amber-500', featured: true },
    ]
  },
];

export function ScreenNavigator({ isOpen, onClose, onNavigateToScreen }: ScreenNavigatorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const displayCategories = selectedCategory 
    ? ALL_SCREENS.filter(cat => cat.category === selectedCategory)
    : ALL_SCREENS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">🗺️ All Screens</h2>
            <p className="text-white/90 text-sm">Navigate to any screen in the app</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 border-b">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="font-semibold text-purple-600">
                {ALL_SCREENS.reduce((sum, cat) => sum + cat.screens.length, 0)}
              </span>
              <span className="text-gray-600 ml-1">Total Screens</span>
            </div>
            <div>
              <span className="font-semibold text-pink-600">{ALL_SCREENS.length}</span>
              <span className="text-gray-600 ml-1">Categories</span>
            </div>
            <div>
              <span className="font-semibold text-orange-600">206</span>
              <span className="text-gray-600 ml-1">Total Designs</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {displayCategories.map((category, catIdx) => (
            <div key={category.category}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
                <Badge variant="secondary">{category.screens.length} screens</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.screens.map((screen, idx) => (
                  <motion.button
                    key={screen.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (catIdx * 0.1) + (idx * 0.05) }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onNavigateToScreen(screen.id);
                      onClose();
                    }}
                    className={`bg-gradient-to-br ${screen.color} rounded-2xl p-4 shadow-md hover:shadow-lg transition-all text-left relative overflow-hidden group`}
                  >
                    {screen.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[9px] font-bold px-2 py-1 rounded-full">
                        ⭐ NEW
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                        <screen.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm mb-1 truncate">
                          {screen.name}
                        </p>
                        {screen.count && (
                          <p className="text-white/80 text-xs">{screen.count}</p>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">
              💡 <strong>Tip:</strong> Use the bottom navigation to switch between main tabs
            </p>
            <Button onClick={onClose} size="sm" variant="outline">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
