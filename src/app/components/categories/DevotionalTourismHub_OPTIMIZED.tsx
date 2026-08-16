import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, ChevronRight, Youtube, Globe, MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { InterestTrackerIcon } from '@/app/components/shared/InterestTracker';

interface DevotionalTourismHubProps {
  onBack: () => void;
}

type View = 'home' | 'detail';

const religiousCategories = [
  {
    id: 'hindu',
    emoji: '🕉️',
    name: 'Hindu Pilgrims',
    description: 'Char Dham, Jyotirlingas, Divya Desams',
    tag: '108+ SACRED CIRCUITS',
    gradient: 'from-orange-400 to-red-500',
    sites: ['Admin-Added Temple 1', 'Admin-Added Shrine 2', 'Admin-Added Sacred Site 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['7-Day Pilgrimage - ₹15,000', '14-Day Circuit - ₹28,000'],
  },
  {
    id: 'sikh',
    emoji: '☬',
    name: 'Sikh Devotees',
    description: 'Golden Temple, Hemkund Sahib, 5 Takhts',
    tag: '20+ HISTORIC GURDWARAS',
    gradient: 'from-yellow-500 to-amber-600',
    sites: ['Admin-Added Gurdwara 1', 'Admin-Added Gurdwara 2', 'Admin-Added Gurdwara 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['5-Day Pilgrimage - ₹12,000', '10-Day Circuit - ₹22,000'],
  },
  {
    id: 'christian',
    emoji: '✝️',
    name: 'Christian Pilgrims',
    description: 'Velankanni, Old Goa, St. Thomas shrines',
    tag: '30+ SACRED CHURCHES',
    gradient: 'from-blue-500 to-indigo-600',
    sites: ['Admin-Added Church 1', 'Admin-Added Basilica 2', 'Admin-Added Shrine 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['6-Day Pilgrimage - ₹14,000', '12-Day Circuit - ₹25,000'],
  },
  {
    id: 'muslim',
    emoji: '☪️',
    name: 'Muslim Travelers',
    description: 'Ajmer Sharif, Haji Ali, Sufi dargahs',
    tag: '40+ HERITAGE MOSQUES',
    gradient: 'from-green-500 to-emerald-600',
    sites: ['Admin-Added Dargah 1', 'Admin-Added Mosque 2', 'Admin-Added Shrine 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['5-Day Pilgrimage - ₹11,000', '10-Day Circuit - ₹20,000'],
  },
  {
    id: 'buddhist',
    emoji: '☸️',
    name: 'Buddhist Followers',
    description: 'Bodh Gaya, Sarnath, Sanchi, Tawang',
    tag: '25+ ENLIGHTENMENT SITES',
    gradient: 'from-purple-500 to-pink-600',
    sites: ['Admin-Added Monastery 1', 'Admin-Added Stupa 2', 'Admin-Added Site 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['8-Day Pilgrimage - ₹16,000', '15-Day Circuit - ₹30,000'],
  },
  {
    id: 'jain',
    emoji: '卐',
    name: 'Jain Pilgrims',
    description: 'Palitana, Ranakpur, Shravanabelagola',
    tag: '15+ TIRTHA SITES',
    gradient: 'from-teal-500 to-cyan-600',
    sites: ['Admin-Added Temple 1', 'Admin-Added Tirtha 2', 'Admin-Added Site 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['6-Day Pilgrimage - ₹13,000', '12-Day Circuit - ₹24,000'],
  },
  {
    id: 'jewish',
    emoji: '✡',
    name: 'Jewish Heritage Travelers',
    description: 'Synagogues, heritage quarters, pilgrimage sites',
    tag: '8+ SITES OF FAITH & HERITAGE',
    gradient: 'from-indigo-500 to-blue-600',
    sites: ['Admin-Added Synagogue 1', 'Admin-Added Site 2', 'Admin-Added Quarter 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['5-Day Heritage Tour - ₹18,000', '10-Day Circuit - ₹32,000'],
  },
  {
    id: 'bahai',
    emoji: '★',
    name: "Bahá'í Visitors",
    description: "Lotus Temple (Delhi), global Bahá'í houses",
    tag: 'SYMBOLIC UNITY & GLOBAL FAITH',
    gradient: 'from-rose-500 to-pink-600',
    sites: ['Admin-Added Temple 1', 'Admin-Added House 2', 'Admin-Added Site 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['3-Day Visit - ₹8,000', '7-Day Tour - ₹15,000'],
  },
  {
    id: 'indigenous',
    emoji: '🌿',
    name: 'Indigenous & Tribal Traditions',
    description: 'Local shrines, sacred groves, tribal festivals',
    tag: 'COMMUNITY & HERITAGE JOURNEYS',
    gradient: 'from-lime-500 to-green-600',
    sites: ['Admin-Added Grove 1', 'Admin-Added Shrine 2', 'Admin-Added Site 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['5-Day Experience - ₹12,000', '10-Day Journey - ₹22,000'],
  },
  {
    id: 'parsi',
    emoji: '🔥',
    name: 'Parsi Heritage Travelers',
    description: 'Fire Temples (Agiyaris), Towers of Silence',
    tag: 'ANCIENT FAITH & LIVING TRADITIONS',
    gradient: 'from-orange-400 to-red-500',
    sites: ['Admin-Added Fire Temple 1', 'Admin-Added Site 2', 'Admin-Added Heritage 3'],
    festivals: ['Admin-Added Festival 1', 'Admin-Added Festival 2'],
    packages: ['4-Day Heritage Tour - ₹10,000', '8-Day Circuit - ₹18,000'],
  },
];

export default function DevotionalTourismHub({ onBack }: DevotionalTourismHubProps) {
  const [view, setView] = useState<View>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleGoogleSearch = () => {
    window.open('https://www.google.com/search?q=devotional+tourism+india+pilgrimage', '_blank');
  };

  const handleYouTube = () => {
    window.open('https://www.youtube.com/results?search_query=devotional+tourism+india+pilgrimage', '_blank');
  };

  const selectedCategory = religiousCategories.find(c => c.id === selectedCategoryId);

  // DETAIL VIEW
  if (view === 'detail' && selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
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
            <InterestTrackerIcon category="devotional" subcategory={selectedCategory.name} />
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

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Sacred Sites
            </h3>
            <div className="space-y-2">
              {selectedCategory.sites.map((site, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="flex-1 bg-gray-200 text-gray-600 px-2 py-1 rounded">{site}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Major Festivals
            </h3>
            <div className="space-y-2">
              {selectedCategory.festivals.map((festival, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="flex-1 bg-gray-200 text-gray-600 px-2 py-1 rounded">{festival}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h3 className="text-lg font-semibold mb-4">Pilgrimage Packages</h3>
            <div className="space-y-3">
              {selectedCategory.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">{pkg}</span>
                  <Button size="sm" variant="outline">Book</Button>
                </div>
              ))}
            </div>
          </Card>

          <Button
            onClick={() => setView('home')}
            className={`w-full h-14 text-lg bg-gradient-to-r ${selectedCategory.gradient} text-white`}
          >
            Submit Inquiry
          </Button>
        </div>
      </div>
    );
  }

  // HOME VIEW
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="bg-purple-600 text-white px-4 py-2 text-center text-xs font-semibold">
        🔧 Admin Editable Content - All text below can be updated
      </div>
      
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 pt-12 pb-8 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <InterestTrackerIcon category="devotional" />
        </div>

        <div className="text-center text-white mb-6">
          <div className="text-6xl mb-4">🕉️</div>
          <h1 className="text-3xl font-bold mb-2">Devotional Tourism</h1>
          <p className="text-lg opacity-90">Sacred Journeys & Spiritual Experiences</p>
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
        <h2 className="text-xl font-bold text-gray-900">Choose Your Faith Path</h2>

        {religiousCategories.map((category, index) => (
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
          <p>🙏 Respectful tourism for all faiths</p>
          <p className="mt-1">All destinations are admin-managed placeholders</p>
        </div>
      </div>
    </div>
  );
}
