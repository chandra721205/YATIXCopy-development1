import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, ChevronRight, Youtube, Globe, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { InterestTrackerIcon } from '@/app/components/shared/InterestTracker';

interface EducationalTourismHubProps {
  onBack: () => void;
}

type View = 'home' | 'detail';

const educationalCategories = [
  {
    id: 'school-k12',
    emoji: '🎒',
    name: 'School Groups (K-12)',
    description: 'Educational tours for primary & secondary students',
    tag: 'SUPERVISED LEARNING TRIPS',
    gradient: 'from-blue-500 to-indigo-600',
    features: ['Field Trips', 'Science Labs', 'Historical Sites', 'Cultural Programs'],
    packages: ['3-Day School Trip - ₹8,000/student', '5-Day Educational Tour - ₹15,000/student'],
    highlights: ['Teacher-led programs', 'Age-appropriate content', 'Safety protocols', 'Educational worksheets'],
  },
  {
    id: 'college-university',
    emoji: '🎓',
    name: 'College & University Groups',
    description: 'Academic tours for higher education students',
    tag: 'ADVANCED LEARNING JOURNEYS',
    gradient: 'from-purple-500 to-pink-600',
    features: ['Industry Visits', 'Research Labs', 'Conferences', 'Workshops'],
    packages: ['5-Day Campus Tour - ₹12,000/student', '7-Day Industry Immersion - ₹20,000/student'],
    highlights: ['University partnerships', 'Career networking', 'Skill development', 'Certificate programs'],
  },
  {
    id: 'research-groups',
    emoji: '🔬',
    name: 'Research Groups',
    description: 'Field research & data collection expeditions',
    tag: 'SCIENTIFIC EXPLORATION',
    gradient: 'from-teal-500 to-cyan-600',
    features: ['Field Research', 'Lab Access', 'Data Collection', 'Expert Guidance'],
    packages: ['7-Day Research Expedition - ₹25,000/person', '14-Day Field Study - ₹45,000/person'],
    highlights: ['Expert mentorship', 'Research facilities', 'Data support', 'Publication assistance'],
  },
  {
    id: 'individual-learners',
    emoji: '📚',
    name: 'Individual Researchers',
    description: 'Solo scholars & lifelong learners',
    tag: 'INDEPENDENT STUDY',
    gradient: 'from-orange-500 to-red-600',
    features: ['Library Access', 'Archive Visits', 'Expert Consultations', 'Workshops'],
    packages: ['5-Day Scholar Program - ₹18,000', '10-Day Research Visit - ₹32,000'],
    highlights: ['Flexible schedules', 'Custom itineraries', 'Resource access', 'Networking events'],
  },
  {
    id: 'stem-programs',
    emoji: '🧪',
    name: 'STEM Learning Programs',
    description: 'Science, Technology, Engineering, Math focus',
    tag: 'HANDS-ON SCIENCE',
    gradient: 'from-green-500 to-emerald-600',
    features: ['Science Centers', 'Tech Hubs', 'Engineering Sites', 'Math Workshops'],
    packages: ['4-Day STEM Camp - ₹10,000/student', '7-Day Innovation Tour - ₹18,000/student'],
    highlights: ['Interactive exhibits', 'Coding workshops', 'Robotics labs', 'Innovation centers'],
  },
  {
    id: 'arts-culture',
    emoji: '🎨',
    name: 'Arts & Culture Studies',
    description: 'Museums, galleries, performing arts centers',
    tag: 'CREATIVE LEARNING',
    gradient: 'from-pink-500 to-rose-600',
    features: ['Museums', 'Art Galleries', 'Theater Visits', 'Cultural Workshops'],
    packages: ['4-Day Arts Tour - ₹9,000/student', '6-Day Cultural Immersion - ₹16,000/student'],
    highlights: ['Artist interactions', 'Workshop sessions', 'Exhibition visits', 'Performance attendance'],
  },
  {
    id: 'history-heritage',
    emoji: '🏛️',
    name: 'History & Heritage',
    description: 'Historical sites, monuments, archaeological digs',
    tag: 'LIVING HISTORY',
    gradient: 'from-amber-500 to-yellow-600',
    features: ['Heritage Sites', 'Museums', 'Archaeological Sites', 'Historical Archives'],
    packages: ['5-Day Heritage Tour - ₹11,000/student', '8-Day Historical Journey - ₹19,000/student'],
    highlights: ['Expert historians', 'Primary sources', 'Archaeological access', 'Documentation training'],
  },
  {
    id: 'language-immersion',
    emoji: '🗣️',
    name: 'Language Immersion',
    description: 'Regional language learning through travel',
    tag: 'LINGUISTIC EXPLORATION',
    gradient: 'from-indigo-500 to-purple-600',
    features: ['Language Classes', 'Cultural Exchange', 'Local Homestays', 'Practice Sessions'],
    packages: ['7-Day Language Camp - ₹14,000/student', '14-Day Immersion - ₹26,000/student'],
    highlights: ['Native speakers', 'Cultural context', 'Daily practice', 'Certification options'],
  },
  {
    id: 'environmental',
    emoji: '🌍',
    name: 'Environmental Studies',
    description: 'Ecology, conservation, sustainability focus',
    tag: 'ECO-LEARNING',
    gradient: 'from-lime-500 to-green-600',
    features: ['Nature Reserves', 'Conservation Projects', 'Field Studies', 'Wildlife Observation'],
    packages: ['6-Day Eco Tour - ₹13,000/student', '10-Day Conservation Program - ₹22,000/student'],
    highlights: ['Field research', 'Conservation work', 'Wildlife experts', 'Sustainability projects'],
  },
  {
    id: 'vocational',
    emoji: '⚙️',
    name: 'Vocational Training Tours',
    description: 'Skill-based learning in trades & crafts',
    tag: 'PRACTICAL SKILLS',
    gradient: 'from-gray-500 to-slate-600',
    features: ['Workshop Visits', 'Apprenticeships', 'Industry Tours', 'Skill Training'],
    packages: ['5-Day Skills Tour - ₹10,000/student', '10-Day Training Program - ₹18,000/student'],
    highlights: ['Hands-on training', 'Industry mentors', 'Certification', 'Job placement support'],
  },
];

export default function EducationalTourismHub({ onBack }: EducationalTourismHubProps) {
  const [view, setView] = useState<View>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleGoogleSearch = () => {
    window.open('https://www.google.com/search?q=educational+tourism+india+learning+trips', '_blank');
  };

  const handleYouTube = () => {
    window.open('https://www.youtube.com/results?search_query=educational+tourism+india+school+trips', '_blank');
  };

  const selectedCategory = educationalCategories.find(c => c.id === selectedCategoryId);

  // DETAIL VIEW
  if (view === 'detail' && selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
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
            <InterestTrackerIcon category="educational" subcategory={selectedCategory.name} />
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
              <BookOpen className="h-5 w-5 text-blue-600" />
              Program Features
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedCategory.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="flex-1 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Program Highlights</h3>
            <div className="space-y-2">
              {selectedCategory.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="flex-1">{highlight}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-lg font-semibold mb-4">Educational Packages</h3>
            <div className="space-y-3">
              {selectedCategory.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded flex-1 mr-2">{pkg}</span>
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="bg-purple-600 text-white px-4 py-2 text-center text-xs font-semibold">
        🔧 Admin Editable Content - All text below can be updated
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-12 pb-8 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <InterestTrackerIcon category="educational" />
        </div>

        <div className="text-center text-white mb-6">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold mb-2">Educational Tourism</h1>
          <p className="text-lg opacity-90">Learning Through Travel & Discovery</p>
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
        <h2 className="text-xl font-bold text-gray-900">Choose Your Learning Path</h2>

        {educationalCategories.map((category, index) => (
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
          <p>📚 Educational tourism for all age groups</p>
          <p className="mt-1">All destinations are admin-managed placeholders</p>
        </div>
      </div>
    </div>
  );
}
