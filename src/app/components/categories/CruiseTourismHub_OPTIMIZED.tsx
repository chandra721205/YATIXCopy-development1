import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, Ship, Calendar, Star, Clock, Users, Youtube, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { cruiseSubCategories, ageFilters, type CruiseSubCategory } from '@/data/cruiseData';
import { InterestTrackerIcon } from '@/app/components/shared/InterestTracker';

interface CruiseTourismHubProps {
  onBack: () => void;
}

type View = 'home' | 'detail';

export default function CruiseTourismHub({ onBack }: CruiseTourismHubProps) {
  const [view, setView] = useState<View>('home');
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [selectedAgeFilters, setSelectedAgeFilters] = useState<string[]>(['all']);

  const toggleAgeFilter = (filterId: string) => {
    if (filterId === 'all') {
      setSelectedAgeFilters(['all']);
    } else {
      const newFilters = selectedAgeFilters.filter(f => f !== 'all');
      if (newFilters.includes(filterId)) {
        const updated = newFilters.filter(f => f !== filterId);
        setSelectedAgeFilters(updated.length > 0 ? updated : ['all']);
      } else {
        setSelectedAgeFilters([...newFilters, filterId]);
      }
    }
  };

  const filteredSubCategories = cruiseSubCategories.filter(subCat => {
    if (selectedAgeFilters.includes('all')) return true;
    return selectedAgeFilters.some(filter => subCat.ageGroups.includes(filter));
  });

  const handleGoogleSearch = () => {
    window.open('https://www.google.com/search?q=cruise+tourism+india+family+fun', '_blank');
  };

  const handleYouTube = () => {
    window.open('https://www.youtube.com/results?search_query=cruise+tourism+india+family+activities', '_blank');
  };

  // DETAIL VIEW
  if (view === 'detail' && selectedSubCategory) {
    const subCat = cruiseSubCategories.find(s => s.id === selectedSubCategory);
    if (!subCat) {
      setView('home');
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className={`bg-gradient-to-r ${subCat.gradient} px-6 pt-12 pb-8 rounded-b-[24px]`}>
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('home')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <InterestTrackerIcon category="cruise" subcategory={subCat.title} />
          </div>

          <div className="text-center text-white">
            <div className="text-6xl mb-4">{subCat.emoji}</div>
            <h1 className="text-3xl font-bold mb-2">{subCat.title}</h1>
            <p className="text-xl opacity-90 mb-4">{subCat.tagline}</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{subCat.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{subCat.ageRange}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <span>{subCat.familyScore}/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Quick Actions */}
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

          {/* Included Activities */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🎯 What's Included
            </h3>
            <div className="space-y-2">
              {subCat.included.activities.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Safety Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🛡️ Safety Measures
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Onboard Safety</h4>
                <div className="space-y-1">
                  {subCat.safety.onboardSafety.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Child Safety</h4>
                <div className="space-y-1">
                  {subCat.safety.childSafety.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Grok Tips */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              💡 Grok Tips
            </h3>
            <div className="space-y-2">
              {subCat.grokTips.map((tip, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  {tip}
                </div>
              ))}
            </div>
          </Card>

          {/* Booking Button */}
          <Button
            onClick={() => toast.success(`${subCat.title} package added to bookings!`)}
            className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-cyan-600"
          >
            Book Now - ₹{subCat.packagePrice.toLocaleString('en-IN')}
          </Button>
        </div>
      </div>
    );
  }

  // HOME VIEW
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 pt-12 pb-8 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <InterestTrackerIcon category="cruise" />
        </div>

        <div className="text-center text-white mb-6">
          <div className="text-6xl mb-4">🚢</div>
          <h1 className="text-3xl font-bold mb-2">Cruise & Family Fun</h1>
          <p className="text-lg opacity-90">Safe Adventures for All Ages</p>
        </div>

        {/* Quick Actions */}
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

      {/* Age Filters */}
      <div className="px-6 py-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Age Group</h3>
        <div className="flex flex-wrap gap-2">
          {ageFilters.map(filter => (
            <Badge
              key={filter.id}
              onClick={() => toggleAgeFilter(filter.id)}
              className={`cursor-pointer px-4 py-2 ${
                selectedAgeFilters.includes(filter.id)
                  ? filter.color
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-6 pb-6 space-y-4">
        {filteredSubCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                setSelectedSubCategory(category.id);
                setView('detail');
              }}
            >
              <div className={`bg-gradient-to-r ${category.gradient} p-4 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-4xl mb-2">{category.emoji}</div>
                    <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{category.tagline}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{category.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />
                        <span>{category.familyScore}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    ₹{category.startingPrice.toLocaleString('en-IN')}+
                  </span>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Footer Note */}
        {filteredSubCategories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Ship className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No activities match the selected age filters.</p>
            <p className="text-sm mt-1">Try selecting different age groups.</p>
          </div>
        )}
      </div>
    </div>
  );
}
