import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, ChevronRight, Youtube, Globe, Heart, Shield, Accessibility } from 'lucide-react';
import { motion } from 'motion/react';
import { InterestTrackerIcon } from '@/app/components/shared/InterestTracker';

interface SeniorWellnessHubProps {
  onBack: () => void;
}

type View = 'home' | 'detail';

const seniorCategories = [
  {
    id: 'gentle-wellness',
    emoji: '🧘',
    name: 'Gentle Wellness Tours',
    description: 'Relaxed pacing, health-focused activities',
    tag: 'LOW INTENSITY',
    gradient: 'from-green-500 to-emerald-600',
    features: ['Gentle yoga', 'Nature walks', 'Meditation', 'Spa treatments'],
    packages: ['5-Day Wellness Retreat - ₹25,000/person', '7-Day Health Tour - ₹35,000/person'],
    highlights: ['Medical support', 'Wheelchair accessible', 'Dietary options', '24/7 care available'],
  },
  {
    id: 'pilgrimage-seniors',
    emoji: '🙏',
    name: 'Senior Pilgrimage Tours',
    description: 'Spiritual journeys with full support',
    tag: 'FAITH & DEVOTION',
    gradient: 'from-orange-500 to-red-600',
    features: ['Temple visits', 'Prayer sessions', 'Guided tours', 'Comfortable transport'],
    packages: ['4-Day Pilgrimage - ₹18,000/person', '7-Day Holy Tour - ₹32,000/person'],
    highlights: ['Wheelchair access', 'Medical assistance', 'Special darshan', 'Caretaker support'],
  },
  {
    id: 'cultural-heritage',
    emoji: '🏛️',
    name: 'Cultural Heritage Tours',
    description: 'Museums, monuments, local culture',
    tag: 'EASY PACED',
    gradient: 'from-amber-500 to-yellow-600',
    features: ['Museum visits', 'Heritage sites', 'Cultural shows', 'Local cuisine'],
    packages: ['5-Day Culture Tour - ₹22,000/person', '8-Day Heritage Journey - ₹38,000/person'],
    highlights: ['Senior discounts', 'Rest breaks', 'Accessible venues', 'Guided tours'],
  },
  {
    id: 'nature-gardens',
    emoji: '🌺',
    name: 'Nature & Garden Tours',
    description: 'Botanical gardens, parks, scenic spots',
    tag: 'PEACEFUL EXPLORATION',
    gradient: 'from-pink-500 to-rose-600',
    features: ['Garden walks', 'Bird watching', 'Photography', 'Tea gardens'],
    packages: ['4-Day Garden Tour - ₹20,000/person', '6-Day Nature Retreat - ₹30,000/person'],
    highlights: ['Flat terrain', 'Seating areas', 'Shade available', 'Slow paced'],
  },
  {
    id: 'health-medical',
    emoji: '⚕️',
    name: 'Medical Tourism',
    description: 'Health checkups combined with leisure',
    tag: 'HEALTH FOCUSED',
    gradient: 'from-blue-500 to-indigo-600',
    features: ['Health screenings', 'Consultations', 'Therapy sessions', 'Wellness programs'],
    packages: ['3-Day Health Package - ₹35,000/person', '7-Day Wellness Program - ₹65,000/person'],
    highlights: ['Medical facilities', 'Doctor on call', 'Health monitoring', 'Treatment support'],
  },
  {
    id: 'group-social',
    emoji: '👥',
    name: 'Senior Group Tours',
    description: 'Social travel with peer groups',
    tag: 'COMMUNITY TRAVEL',
    gradient: 'from-purple-500 to-pink-600',
    features: ['Group activities', 'Social events', 'Games', 'Entertainment'],
    packages: ['5-Day Group Tour - ₹20,000/person', '7-Day Social Journey - ₹28,000/person'],
    highlights: ['Make friends', 'Group discounts', 'Fun activities', 'Safe environment'],
  },
  {
    id: 'luxury-comfort',
    emoji: '💎',
    name: 'Luxury Senior Travel',
    description: 'Premium comfort & personalized service',
    tag: 'PREMIUM EXPERIENCE',
    gradient: 'from-yellow-500 to-amber-600',
    features: ['5-star hotels', 'Private transport', 'Butler service', 'Gourmet dining'],
    packages: ['5-Day Luxury Tour - ₹75,000/person', '10-Day Premium Journey - ₹150,000/person'],
    highlights: ['VIP treatment', 'Personal assistance', 'Exclusive access', 'Maximum comfort'],
  },
  {
    id: 'family-seniors',
    emoji: '👨‍👩‍👧‍👦',
    name: 'Multigenerational Tours',
    description: 'Travel with family across generations',
    tag: 'FAMILY BONDING',
    gradient: 'from-teal-500 to-cyan-600',
    features: ['All-age activities', 'Family rooms', 'Flexible itinerary', 'Entertainment'],
    packages: ['6-Day Family Tour - ₹18,000/person', '10-Day Family Journey - ₹32,000/person'],
    highlights: ['Child-friendly', 'Senior-friendly', 'Group activities', 'Memory making'],
  },
  {
    id: 'winter-retreat',
    emoji: '☀️',
    name: 'Winter Retreat Tours',
    description: 'Warm destinations for winter months',
    tag: 'SEASONAL TRAVEL',
    gradient: 'from-orange-500 to-yellow-600',
    features: ['Warm climate', 'Beach resorts', 'Sunshine', 'Outdoor activities'],
    packages: ['30-Day Winter Stay - ₹80,000/person', '60-Day Extended Stay - ₹150,000/person'],
    highlights: ['Long-term stays', 'Comfortable weather', 'Health benefits', 'Social activities'],
  },
  {
    id: 'assisted-care',
    emoji: '🏥',
    name: 'Assisted Care Travel',
    description: 'Full medical & mobility support',
    tag: 'MAXIMUM SUPPORT',
    gradient: 'from-red-500 to-pink-600',
    features: ['Nursing care', 'Medical equipment', 'Wheelchair service', '24/7 assistance'],
    packages: ['5-Day Care Tour - ₹45,000/person', '10-Day Medical Tour - ₹85,000/person'],
    highlights: ['Dedicated nurses', 'Emergency support', 'Specialized care', 'Full accessibility'],
  },
];

export default function SeniorWellnessHub({ onBack }: SeniorWellnessHubProps) {
  const [view, setView] = useState<View>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleGoogleSearch = () => {
    window.open('https://www.google.com/search?q=senior+tourism+india+elderly+travel+packages', '_blank');
  };

  const handleYouTube = () => {
    window.open('https://www.youtube.com/results?search_query=senior+tourism+india+elderly+travel', '_blank');
  };

  const selectedCategory = seniorCategories.find(c => c.id === selectedCategoryId);

  // DETAIL VIEW
  if (view === 'detail' && selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="bg-purple-600 text-white px-4 py-2 text-center text-xs font-semibold">
          🔧 Admin Editable Content - All text below can be updated
        </div>
        
        <div className={`bg-gradient-to-r ${selectedCategory.gradient} px-6 pt-12 pb-8 rounded-b-[24px]`}>
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('home')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <InterestTrackerIcon category="seniors" subcategory={selectedCategory.name} />
          </div>

          <div className="text-center text-white">
            <div className="text-6xl mb-4">{selectedCategory.emoji}</div>
            <h1 className="text-3xl font-bold mb-2">{selectedCategory.name}</h1>
            <p className="text-lg opacity-90 mb-2">{selectedCategory.description}</p>
            <Badge className="bg-white/20 text-white border-0">{selectedCategory.tag}</Badge>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="flex gap-3">
            <Button onClick={handleGoogleSearch} variant="outline" className="flex-1 gap-2">
              <Globe className="h-4 w-4" />
              Google Search
            </Button>
            <Button onClick={handleYouTube} variant="outline" className="flex-1 gap-2 border-red-200 text-red-600 hover:bg-red-50">
              <Youtube className="h-4 w-4" />
              YouTube
            </Button>
          </div>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-green-600" />
              Tour Features
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedCategory.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm p-3 bg-white rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="flex-1 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Senior-Friendly Highlights
            </h3>
            <div className="space-y-2">
              {selectedCategory.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="flex-1">{highlight}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <h3 className="text-lg font-semibold mb-4">Senior Travel Packages</h3>
            <div className="space-y-3">
              {selectedCategory.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded flex-1 mr-2">{pkg}</span>
                  <Button size="sm" variant="outline">Book</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-blue-600" />
              Accessibility Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs p-2 bg-white rounded">♿ Wheelchair Access</div>
              <div className="text-xs p-2 bg-white rounded">🚑 Medical Support</div>
              <div className="text-xs p-2 bg-white rounded">🍽️ Special Meals</div>
              <div className="text-xs p-2 bg-white rounded">🛏️ Comfortable Rooms</div>
              <div className="text-xs p-2 bg-white rounded">🚐 Easy Transport</div>
              <div className="text-xs p-2 bg-white rounded">👨‍⚕️ Care Staff</div>
            </div>
          </Card>

          <Button
            onClick={() => setView('home')}
            className={`w-full h-14 text-lg bg-gradient-to-r ${selectedCategory.gradient} text-white`}
          >
            Request Booking
          </Button>
        </div>
      </div>
    );
  }

  // HOME VIEW
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="bg-purple-600 text-white px-4 py-2 text-center text-xs font-semibold">
        🔧 Admin Editable Content - All text below can be updated
      </div>
      
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 pt-12 pb-8 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <InterestTrackerIcon category="seniors" />
        </div>

        <div className="text-center text-white mb-6">
          <div className="text-6xl mb-4">🧓</div>
          <h1 className="text-3xl font-bold mb-2">Senior Wellness Tourism</h1>
          <p className="text-lg opacity-90">Comfortable Travel for Golden Years</p>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleGoogleSearch} variant="outline" className="flex-1 gap-2 border-white text-white hover:bg-white/20">
            <Globe className="h-4 w-4" />
            Google Search
          </Button>
          <Button onClick={handleYouTube} variant="outline" className="flex-1 gap-2 border-white text-white hover:bg-white/20">
            <Youtube className="h-4 w-4" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-[24px] text-white">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6" />
            <h3 className="font-bold text-lg">Senior-Friendly Travel</h3>
          </div>
          <p className="text-sm opacity-90">All tours include medical support, wheelchair accessibility, and comfortable pacing</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900">Choose Your Travel Style</h2>

        {seniorCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                setSelectedCategoryId(category.id);
                setView('detail');
              }}
            >
              <div className={`bg-gradient-to-r ${category.gradient} p-5 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-4xl mb-2">{category.emoji}</div>
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-2">{category.description}</p>
                    <Badge className="bg-white/20 text-white border-0 text-xs">
                      {category.tag}
                    </Badge>
                  </div>
                  <ChevronRight className="h-6 w-6 ml-2" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        <div className="text-center py-6 text-sm text-gray-500">
          <p>🧓 Safe, comfortable travel designed for seniors</p>
          <p className="mt-1">All destinations are admin-managed placeholders</p>
        </div>
      </div>
    </div>
  );
}
