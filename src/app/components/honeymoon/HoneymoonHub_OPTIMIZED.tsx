// Honeymoon Hub - BULLETPROOF STANDALONE VERSION
// Fixed module loading error by removing external dependencies
// Uses inline data and simple 2-view state management

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { Heart, Star, MapPin, Calendar, ArrowLeft, Globe, Youtube, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { InterestTrackerIcon } from '@/app/components/shared/InterestTracker';

interface HoneymoonHubProps {
  onBack: () => void;
}

type View = 'home' | 'detail';

// Inline data - no external dependencies
const honeymoonCategories = [
  {
    id: 'beach-paradise',
    name: '[Admin: Beach Paradise]',
    emoji: '🏖️',
    description: '[Admin: Tropical beach experiences]',
    gradient: 'from-cyan-500 to-blue-600',
    packages: [
      {
        id: 'beach-1',
        name: '[Admin: Coastal Bliss Package]',
        description: '[Admin: White sand beaches and azure waters]',
        price: '₹35,000',
        duration: '4N/5D',
        rating: 4.8,
        reviews: 234,
        destination: '[Admin: Beach Destination 1]',
        inclusions: [
          { icon: '🏖️', text: '[Admin: Private beach access]' },
          { icon: '🍹', text: '[Admin: Welcome cocktails]' },
          { icon: '🌅', text: '[Admin: Sunset views]' },
          { icon: '🛥️', text: '[Admin: Water activities]' }
        ]
      },
      {
        id: 'beach-2',
        name: '[Admin: Island Romance]',
        description: '[Admin: Secluded island experience]',
        price: '₹45,000',
        duration: '5N/6D',
        rating: 4.9,
        reviews: 187,
        destination: '[Admin: Island Destination]',
        inclusions: [
          { icon: '🏝️', text: '[Admin: Private island]' },
          { icon: '🍾', text: '[Admin: Champagne service]' },
          { icon: '🐠', text: '[Admin: Snorkeling]' },
          { icon: '💑', text: '[Admin: Couple massage]' }
        ]
      }
    ]
  },
  {
    id: 'hill-stations',
    name: '[Admin: Hill Station Retreats]',
    emoji: '🏔️',
    description: '[Admin: Mountain romance & serenity]',
    gradient: 'from-green-500 to-emerald-600',
    packages: [
      {
        id: 'hill-1',
        name: '[Admin: Mountain Retreat]',
        description: '[Admin: Cozy mountain escape]',
        price: '₹28,000',
        duration: '3N/4D',
        rating: 4.8,
        reviews: 156,
        destination: '[Admin: Hill Station 1]',
        inclusions: [
          { icon: '⛰️', text: '[Admin: Mountain views]' },
          { icon: '🔥', text: '[Admin: Fireplace room]' },
          { icon: '🥾', text: '[Admin: Nature walks]' },
          { icon: '☕', text: '[Admin: Tea gardens]' }
        ]
      },
      {
        id: 'hill-2',
        name: '[Admin: Alpine Romance]',
        description: '[Admin: High altitude luxury]',
        price: '₹38,000',
        duration: '4N/5D',
        rating: 4.7,
        reviews: 143,
        destination: '[Admin: Alpine Resort]',
        inclusions: [
          { icon: '🏔️', text: '[Admin: Peak views]' },
          { icon: '🛁', text: '[Admin: Jacuzzi suite]' },
          { icon: '🍷', text: '[Admin: Wine tasting]' },
          { icon: '🌲', text: '[Admin: Forest trails]' }
        ]
      }
    ]
  },
  {
    id: 'heritage-palaces',
    name: '[Admin: Heritage Palaces]',
    emoji: '🏰',
    description: '[Admin: Royal palace stays]',
    gradient: 'from-amber-500 to-orange-600',
    packages: [
      {
        id: 'palace-1',
        name: '[Admin: Royal Palace Experience]',
        description: '[Admin: Live like royalty]',
        price: '₹60,000',
        duration: '3N/4D',
        rating: 4.9,
        reviews: 298,
        destination: '[Admin: Palace Location 1]',
        inclusions: [
          { icon: '👑', text: '[Admin: Royal treatment]' },
          { icon: '🎭', text: '[Admin: Cultural shows]' },
          { icon: '🍽️', text: '[Admin: Royal dining]' },
          { icon: '🐘', text: '[Admin: Elephant ride]' }
        ]
      }
    ]
  },
  {
    id: 'wellness-retreats',
    name: '[Admin: Wellness Retreats]',
    emoji: '🧘',
    description: '[Admin: Spa & wellness focus]',
    gradient: 'from-purple-500 to-pink-600',
    packages: [
      {
        id: 'wellness-1',
        name: '[Admin: Spa & Wellness Package]',
        description: '[Admin: Rejuvenate together]',
        price: '₹42,000',
        duration: '4N/5D',
        rating: 4.8,
        reviews: 212,
        destination: '[Admin: Wellness Resort]',
        inclusions: [
          { icon: '💆', text: '[Admin: Daily spa]' },
          { icon: '🧘', text: '[Admin: Yoga sessions]' },
          { icon: '🥗', text: '[Admin: Healthy meals]' },
          { icon: '🌿', text: '[Admin: Ayurveda]' }
        ]
      }
    ]
  },
  {
    id: 'adventure',
    name: '[Admin: Adventure Romance]',
    emoji: '🎿',
    description: '[Admin: Thrilling experiences]',
    gradient: 'from-red-500 to-orange-600',
    packages: [
      {
        id: 'adventure-1',
        name: '[Admin: Adventure Honeymoon]',
        description: '[Admin: For adventurous couples]',
        price: '₹40,000',
        duration: '5N/6D',
        rating: 4.7,
        reviews: 167,
        destination: '[Admin: Adventure Location]',
        inclusions: [
          { icon: '🪂', text: '[Admin: Paragliding]' },
          { icon: '🚣', text: '[Admin: River rafting]' },
          { icon: '🏕️', text: '[Admin: Camping]' },
          { icon: '🗻', text: '[Admin: Trekking]' }
        ]
      }
    ]
  },
  {
    id: 'backwaters',
    name: '[Admin: Backwater Cruises]',
    emoji: '🛶',
    description: '[Admin: Serene water journeys]',
    gradient: 'from-teal-500 to-cyan-600',
    packages: [
      {
        id: 'backwater-1',
        name: '[Admin: Houseboat Romance]',
        description: '[Admin: Traditional houseboat stay]',
        price: '₹32,000',
        duration: '3N/4D',
        rating: 4.8,
        reviews: 189,
        destination: '[Admin: Backwater Region]',
        inclusions: [
          { icon: '🛶', text: '[Admin: Private houseboat]' },
          { icon: '🦐', text: '[Admin: Fresh seafood]' },
          { icon: '🌴', text: '[Admin: Palm views]' },
          { icon: '🎣', text: '[Admin: Fishing]' }
        ]
      }
    ]
  }
];

// Featured romantic packages
const featuredPackages = [
  {
    id: 'romantic-escape',
    name: '[Admin: Romantic Escape Package]',
    description: '[Admin: Perfect for newlyweds seeking intimacy]',
    price: '₹30,000',
    duration: '3N/4D',
    rating: 4.8,
    reviews: 234,
    destination: '[Admin: Admin-Selected Romantic Destination]',
    inclusions: [
      { icon: '🕯️', text: '[Admin: Candlelight dinner]' },
      { icon: '💆', text: '[Admin: Couple spa session]' },
      { icon: '❤️', text: '[Admin: Romantic room décor]' },
      { icon: '🌹', text: '[Admin: Welcome bouquet]' }
    ]
  },
  {
    id: 'luxury-suite',
    name: '[Admin: Luxury Honeymoon Suite]',
    description: '[Admin: Premium experience with exclusive amenities]',
    price: '₹50,000',
    duration: '5N/6D',
    rating: 4.9,
    reviews: 456,
    destination: '[Admin: Premium Location TBD]',
    inclusions: [
      { icon: '🍾', text: '[Admin: Champagne welcome]' },
      { icon: '🎁', text: '[Admin: Honeymoon gift basket]' },
      { icon: '🌅', text: '[Admin: Sunset dinner cruise]' },
      { icon: '💆', text: '[Admin: Daily couple spa]' }
    ]
  }
];

export default function HoneymoonHub({ onBack }: HoneymoonHubProps) {
  const [view, setView] = useState<View>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [trackedInterests, setTrackedInterests] = useState<Set<string>>(new Set());

  const handleGoogleSearch = (query?: string) => {
    const searchQuery = query || 'romantic honeymoon destinations india';
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const handleYouTubeSearch = (query?: string) => {
    const searchQuery = query || 'honeymoon travel destinations india';
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const toggleInterestTracking = (packageId: string) => {
    setTrackedInterests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(packageId)) {
        newSet.delete(packageId);
      } else {
        newSet.add(packageId);
      }
      return newSet;
    });
  };

  const selectedCategory = honeymoonCategories.find(c => c.id === selectedCategoryId);

  // DETAIL VIEW
  if (view === 'detail' && selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
            <InterestTrackerIcon category="honeymoon" subcategory={selectedCategory.name} />
          </div>

          <div className="text-center text-white mb-4">
            <div className="text-6xl mb-4">{selectedCategory.emoji}</div>
            <h1 className="text-3xl font-bold mb-2">{selectedCategory.name}</h1>
            <p className="text-lg opacity-90">{selectedCategory.description}</p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleGoogleSearch(selectedCategory.name)}
              className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9"
            >
              <Globe className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button
              onClick={() => handleYouTubeSearch(selectedCategory.name)}
              className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9"
            >
              <Youtube className="w-4 h-4 mr-2" />
              YouTube
            </Button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          {selectedCategory.packages.map(pkg => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isTracked={trackedInterests.has(pkg.id)}
              onToggleInterest={() => toggleInterestTracking(pkg.id)}
              onGoogleSearch={() => handleGoogleSearch(pkg.name)}
              onYouTubeSearch={() => handleYouTubeSearch(pkg.name)}
            />
          ))}
        </div>
      </div>
    );
  }

  // HOME VIEW
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-purple-600 text-white px-4 py-2 text-center text-xs font-semibold">
        🔧 Admin Editable Content - All text below can be updated
      </div>

      <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 pt-12 pb-8 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <InterestTrackerIcon category="honeymoon" />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">[Admin: Honeymoon & Romance]</h1>
            <p className="text-white/80 text-sm">[Admin: Create unforgettable memories together]</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => handleGoogleSearch()}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Globe className="w-4 h-4 mr-2" />
            Google Search
          </Button>
          <Button
            onClick={() => handleYouTubeSearch()}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9"
          >
            <Youtube className="w-4 h-4 mr-2" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Featured Packages */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">[Admin: Popular Romantic Packages]</h2>
          <div className="space-y-3">
            {featuredPackages.map(pkg => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                isTracked={trackedInterests.has(pkg.id)}
                onToggleInterest={() => toggleInterestTracking(pkg.id)}
                onGoogleSearch={() => handleGoogleSearch(pkg.name)}
                onYouTubeSearch={() => handleYouTubeSearch(pkg.name)}
              />
            ))}
          </div>
        </div>

        {/* Honeymoon Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">[Admin: Explore Honeymoon Themes]</h2>
          <div className="grid grid-cols-2 gap-4">
            {honeymoonCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setView('detail');
                  }}
                >
                  <div className={`h-24 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-3`}>
                    <span className="text-4xl">{category.emoji}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {category.packages.length} packages
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Package Card Component
interface PackageCardProps {
  package: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    rating: number;
    reviews: number;
    destination: string;
    inclusions: { icon: string; text: string }[];
  };
  isTracked: boolean;
  onToggleInterest: () => void;
  onGoogleSearch: () => void;
  onYouTubeSearch: () => void;
}

function PackageCard({ package: pkg, isTracked, onToggleInterest, onGoogleSearch, onYouTubeSearch }: PackageCardProps) {
  return (
    <Card className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-base mb-1">{pkg.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{pkg.destination}</span>
          </div>
        </div>
        <button
          onClick={onToggleInterest}
          className={`p-2 rounded-full transition-colors ${isTracked ? 'bg-red-100' : 'bg-gray-100'}`}
        >
          <Heart className={`w-5 h-5 ${isTracked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold">{pkg.rating}</span>
          <span className="text-xs text-gray-500">({pkg.reviews})</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{pkg.duration}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex flex-wrap gap-2">
          {pkg.inclusions.slice(0, 4).map((inc, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {inc.icon} {inc.text}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t">
        <Button onClick={onGoogleSearch} variant="outline" size="sm" className="flex-1">
          <Globe className="w-3 h-3 mr-1" />
          Google
        </Button>
        <Button onClick={onYouTubeSearch} variant="outline" size="sm" className="flex-1">
          <Youtube className="w-3 h-3 mr-1" />
          YouTube
        </Button>
        <div className="flex-1 text-right">
          <div className="text-lg font-bold text-pink-600">{pkg.price}</div>
        </div>
      </div>
    </Card>
  );
}
