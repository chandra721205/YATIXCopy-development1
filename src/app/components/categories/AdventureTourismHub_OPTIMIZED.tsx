// Adventure Tourism Hub - BULLETPROOF STANDALONE VERSION
// Fixed module loading error by removing external dependencies
// Uses inline data and simple 2-view state management

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, ChevronRight, Youtube, Globe, Mountain, Waves, Wind, Fish, Bike, Tent, Zap, Shield, Users, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { InterestTrackerIcon } from '@/app/components/shared/InterestTracker';

interface AdventureTourismHubProps {
  onBack: () => void;
}

type View = 'home' | 'detail';

// Inline data - no external dependencies
const adventureCategories = [
  {
    id: 'trekking',
    name: '[Admin: Update Activity - Trekking]',
    emoji: '🏔️',
    difficulty: 'moderate',
    duration: '3-7 days',
    description: 'Explore scenic mountain trails with experienced guides',
    tag: 'Mountain Adventure',
    gradient: 'from-orange-600 to-red-600',
    minAge: 12,
    maxGroupSize: 15,
    seasons: ['Oct-May'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]'],
    certification: 'Basic Trekking Certificate'
  },
  {
    id: 'rafting',
    name: '[Admin: Update Activity - River Rafting]',
    emoji: '🌊',
    difficulty: 'moderate',
    duration: '1-2 days',
    description: 'Navigate thrilling river rapids with safety equipment',
    tag: 'Water Adventure',
    gradient: 'from-blue-600 to-cyan-600',
    minAge: 14,
    maxGroupSize: 12,
    seasons: ['Oct-Mar'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]'],
    certification: 'Water Safety Certificate'
  },
  {
    id: 'paragliding',
    name: '[Admin: Update Activity - Paragliding]',
    emoji: '🪂',
    difficulty: 'hard',
    duration: '1 day',
    description: 'Soar through the skies with certified tandem pilots',
    tag: 'Aerial Adventure',
    gradient: 'from-sky-600 to-blue-600',
    minAge: 16,
    maxGroupSize: 8,
    seasons: ['Sep-May'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]'],
    certification: 'Paragliding License'
  },
  {
    id: 'scuba',
    name: '[Admin: Update Activity - Scuba Diving]',
    emoji: '🤿',
    difficulty: 'moderate',
    duration: '2-4 days',
    description: 'Discover underwater marine life with certified instructors',
    tag: 'Underwater Adventure',
    gradient: 'from-teal-600 to-blue-600',
    minAge: 12,
    maxGroupSize: 10,
    seasons: ['Oct-Apr'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]'],
    certification: 'PADI Open Water'
  },
  {
    id: 'mountain-biking',
    name: '[Admin: Update Activity - Mountain Biking]',
    emoji: '🚵',
    difficulty: 'moderate',
    duration: '1-3 days',
    description: 'Ride challenging terrain on quality mountain bikes',
    tag: 'Cycling Adventure',
    gradient: 'from-green-600 to-emerald-600',
    minAge: 14,
    maxGroupSize: 12,
    seasons: ['Sep-May'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]']
  },
  {
    id: 'rock-climbing',
    name: '[Admin: Update Activity - Rock Climbing]',
    emoji: '🧗',
    difficulty: 'hard',
    duration: '1-2 days',
    description: 'Scale natural rock formations with professional belaying',
    tag: 'Climbing Adventure',
    gradient: 'from-amber-600 to-orange-600',
    minAge: 16,
    maxGroupSize: 8,
    seasons: ['Oct-Apr'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]'],
    certification: 'Basic Climbing Course'
  },
  {
    id: 'camping',
    name: '[Admin: Update Activity - Wilderness Camping]',
    emoji: '⛺',
    difficulty: 'easy',
    duration: '2-5 days',
    description: 'Experience nature with organized camping expeditions',
    tag: 'Nature Adventure',
    gradient: 'from-emerald-600 to-green-600',
    minAge: 8,
    maxGroupSize: 20,
    seasons: ['All Year'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]']
  },
  {
    id: 'skiing',
    name: '[Admin: Update Activity - Skiing]',
    emoji: '⛷️',
    difficulty: 'moderate',
    duration: '3-7 days',
    description: 'Ski on pristine slopes with equipment rental included',
    tag: 'Winter Adventure',
    gradient: 'from-blue-600 to-indigo-600',
    minAge: 10,
    maxGroupSize: 15,
    seasons: ['Dec-Mar'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]']
  },
  {
    id: 'bungee',
    name: '[Admin: Update Activity - Bungee Jumping]',
    emoji: '🪢',
    difficulty: 'expert',
    duration: '1 day',
    description: 'Take the ultimate leap with international safety standards',
    tag: 'Extreme Adventure',
    gradient: 'from-red-600 to-pink-600',
    minAge: 18,
    maxGroupSize: 5,
    seasons: ['Sep-May'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]'],
    certification: 'Medical Clearance Required'
  },
  {
    id: 'kayaking',
    name: '[Admin: Update Activity - Kayaking]',
    emoji: '🛶',
    difficulty: 'easy',
    duration: '1-2 days',
    description: 'Paddle through calm waters and scenic landscapes',
    tag: 'Water Adventure',
    gradient: 'from-cyan-600 to-blue-600',
    minAge: 10,
    maxGroupSize: 16,
    seasons: ['Oct-May'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]']
  },
  {
    id: 'zip-lining',
    name: '[Admin: Update Activity - Zip Lining]',
    emoji: '🎢',
    difficulty: 'easy',
    duration: '1 day',
    description: 'Zip through forest canopies with safety harnesses',
    tag: 'Aerial Adventure',
    gradient: 'from-green-600 to-lime-600',
    minAge: 8,
    maxGroupSize: 20,
    seasons: ['All Year'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]']
  },
  {
    id: 'safari',
    name: '[Admin: Update Activity - Wildlife Safari]',
    emoji: '🦁',
    difficulty: 'easy',
    duration: '2-5 days',
    description: 'Spot wildlife in their natural habitat with expert guides',
    tag: 'Nature Adventure',
    gradient: 'from-yellow-600 to-orange-600',
    minAge: 5,
    maxGroupSize: 25,
    seasons: ['Oct-May'],
    locations: ['[Admin: Add Location 1]', '[Admin: Add Location 2]', '[Admin: Add Location 3]'],
    included: ['[Admin: Item 1]', '[Admin: Item 2]', '[Admin: Item 3]', '[Admin: Item 4]']
  }
];

export default function AdventureTourismHub({ onBack }: AdventureTourismHubProps) {
  const [view, setView] = useState<View>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleGoogleSearch = () => {
    window.open('https://www.google.com/search?q=adventure+tourism+india+activities', '_blank');
  };

  const handleYouTube = () => {
    window.open('https://www.youtube.com/results?search_query=adventure+tourism+india+activities', '_blank');
  };

  const selectedCategory = adventureCategories.find(c => c.id === selectedCategoryId);

  // DETAIL VIEW
  if (view === 'detail' && selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
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
            <InterestTrackerIcon category="adventure" subcategory={selectedCategory.name} />
          </div>

          <div className="text-center text-white">
            <div className="text-6xl mb-4">{selectedCategory.emoji}</div>
            <h1 className="text-3xl font-bold mb-2">{selectedCategory.name}</h1>
            <p className="text-lg opacity-90 mb-2">{selectedCategory.description}</p>
            <Badge className="bg-white/20 text-white border-0">{selectedCategory.tag}</Badge>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="flex gap-3">
            <Button onClick={handleGoogleSearch} variant="outline" className="flex-1 gap-2">
              <Globe className="h-4 w-4" />
              Google Search
            </Button>
            <Button onClick={handleYouTube} variant="outline" className="flex-1 gap-2">
              <Youtube className="h-4 w-4" />
              YouTube Browse
            </Button>
          </div>

          {/* Activity Details */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4">
              <div className="text-sm text-gray-600 mb-1">Difficulty</div>
              <div className="font-bold text-lg capitalize">{selectedCategory.difficulty}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600 mb-1">Duration</div>
              <div className="font-bold text-lg">{selectedCategory.duration}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600 mb-1">Min Age</div>
              <div className="font-bold text-lg">{selectedCategory.minAge}+ years</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600 mb-1">Group Size</div>
              <div className="font-bold text-lg">Max {selectedCategory.maxGroupSize}</div>
            </Card>
          </div>

          {selectedCategory.certification && (
            <Card className="p-4 bg-orange-50 border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <div className="font-bold text-orange-900">Required Certification</div>
              </div>
              <div className="text-sm text-orange-800">{selectedCategory.certification}</div>
            </Card>
          )}

          {/* Best Seasons */}
          <Card className="p-4">
            <h3 className="font-bold text-gray-900 mb-3">Best Seasons</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategory.seasons.map((season, idx) => (
                <Badge key={idx} variant="secondary" className="bg-orange-100 text-orange-700">
                  {season}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Popular Locations */}
          <Card className="p-4">
            <h3 className="font-bold text-gray-900 mb-3">Popular Locations</h3>
            <div className="space-y-2">
              {selectedCategory.locations.map((location, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange-600">{idx + 1}</span>
                  </div>
                  <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">{location}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* What's Included */}
          <Card className="p-4">
            <h3 className="font-bold text-gray-900 mb-3">What's Included</h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedCategory.included.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 bg-gray-100 px-2 py-1 rounded">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Safety Banner */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">[Admin: Safety First]</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700">[Admin: Certified Guides]</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700">[Admin: Safety Gear]</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700">[Admin: 24/7 Support]</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // HOME VIEW
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <div className="bg-purple-600 text-white px-4 py-2 text-center text-xs font-semibold">
        🔧 Admin Editable Content - All text below can be updated
      </div>
      
      <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 pt-12 pb-8 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <InterestTrackerIcon category="adventure" />
        </div>

        <div className="text-center text-white mb-6">
          <div className="text-6xl mb-4">🏔️</div>
          <h1 className="text-3xl font-bold mb-2">[Admin: Adventure Tourism]</h1>
          <p className="text-lg opacity-90">[Admin: Explore thrilling adventures across India]</p>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleGoogleSearch} variant="outline" className="flex-1 gap-2 border-white text-white hover:bg-white/20">
            <Globe className="h-4 w-4" />
            Google Search
          </Button>
          <Button onClick={handleYouTube} variant="outline" className="flex-1 gap-2 border-white text-white hover:bg-white/20">
            <Youtube className="h-4 w-4" />
            YouTube Browse
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Choose Your Adventure</h2>

        {adventureCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                setSelectedCategoryId(category.id);
                setView('detail');
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-3xl`}>
                  {category.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {category.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {category.duration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Age {category.minAge}+
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{adventureCategories.length}</div>
            <div className="text-xs text-gray-600">Activities</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {adventureCategories.filter(a => a.difficulty === 'easy').length}
            </div>
            <div className="text-xs text-gray-600">Beginner</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {adventureCategories.filter(a => a.seasons.includes('All Year')).length}
            </div>
            <div className="text-xs text-gray-600">All Season</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
