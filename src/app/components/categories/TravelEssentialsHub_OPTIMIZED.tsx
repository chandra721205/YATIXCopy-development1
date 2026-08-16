import { useState } from 'react';
import { ArrowLeft, Search, Globe, Youtube, Sparkles, ChevronRight, Building2, Home, Wallet, Plane, Car, Train, Bus, Navigation, Utensils, Coffee, UtensilsCrossed, Users, Languages, Briefcase, ShoppingBag, Heart, Stethoscope, Pill, Accessibility, Activity, Baby, PawPrint, HeartPulse, Smartphone, Shield, Wifi, Map, CreditCard, FileText, Package, Info, ExternalLink } from 'lucide-react';

interface TravelEssentialsHubProps {
  onBack: () => void;
  onNavigateToSelfDrive?: () => void;
}

const categories = [
  {
    id: 'accommodation',
    name: '[Admin: Accommodation]',
    icon: Building2,
    tagline: '[Admin: Places to stay]',
    description: '[Admin: Hotels, resorts, villas]',
    services: [
      { id: 1, name: '[Admin: Hotels & Resorts]', icon: Building2, description: '[Admin: Comfortable stays]' },
      { id: 2, name: '[Admin: Villas & Homes]', icon: Home, description: '[Admin: Private rentals]' },
      { id: 3, name: '[Admin: Budget Stays]', icon: Wallet, description: '[Admin: Affordable options]' }
    ]
  },
  {
    id: 'transportation',
    name: '[Admin: Transportation]',
    icon: Car,
    tagline: '[Admin: Ways to get around]',
    description: '[Admin: Airport transfers, rentals]',
    services: [
      { id: 1, name: '[Admin: Airport Transfers]', icon: Plane, description: '[Admin: Pickup and drop-off]' },
      { id: 2, name: '[Admin: Car Rentals]', icon: Car, description: '[Admin: Self-drive options]' },
      { id: 3, name: '[Admin: Train Booking]', icon: Train, description: '[Admin: Railway reservations]' }
    ]
  },
  {
    id: 'dining',
    name: '[Admin: Dining]',
    icon: UtensilsCrossed,
    tagline: '[Admin: Food experiences]',
    description: '[Admin: Restaurants and tours]',
    services: [
      { id: 1, name: '[Admin: Restaurants]', icon: Utensils, description: '[Admin: Dining experiences]' },
      { id: 2, name: '[Admin: Food Tours]', icon: Coffee, description: '[Admin: Culinary adventures]' }
    ]
  },
  {
    id: 'assistance',
    name: '[Admin: Assistance]',
    icon: Users,
    tagline: '[Admin: Travel help]',
    description: '[Admin: Companions and support]',
    services: [
      { id: 1, name: '[Admin: Travel Companion]', icon: Users, description: '[Admin: Professional buddies]' },
      { id: 2, name: '[Admin: Language Support]', icon: Languages, description: '[Admin: Translation services]' }
    ]
  },
  {
    id: 'digital',
    name: '[Admin: Digital Tools]',
    icon: Smartphone,
    tagline: '[Admin: Travel tech]',
    description: '[Admin: Insurance, guides]',
    services: [
      { id: 1, name: '[Admin: Travel Insurance]', icon: Shield, description: '[Admin: Trip protection]' },
      { id: 2, name: '[Admin: Digital Guides]', icon: Map, description: '[Admin: Travel information]' }
    ]
  }
];

export default function TravelEssentialsHub({ onBack, onNavigateToSelfDrive }: TravelEssentialsHubProps) {
  const [view, setView] = useState<'home' | 'detail'>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoogleSearch = (query?: string) => {
    const q = query || searchQuery || 'travel services india';
    window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
  };

  const handleYouTubeSearch = (query?: string) => {
    const q = query || searchQuery || 'travel essentials india';
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, '_blank');
  };

  const selected = categories.find(c => c.id === selectedId);

  if (view === 'detail' && selected) {
    const Icon = selected.icon;
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-purple-600 text-white px-4 py-2 text-center text-xs font-semibold">
          🔧 Admin Editable Content
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-12 pb-8 rounded-b-[24px]">
          <button onClick={() => setView('home')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">{selected.name}</h1>
              <p className="text-white/80 text-sm">{selected.tagline}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleGoogleSearch(selected.name)} className="flex-1 bg-white text-blue-600 rounded-full h-9 px-4 text-sm font-medium flex items-center justify-center">
              <Globe className="w-4 h-4 mr-2" />Google
            </button>
            <button onClick={() => handleYouTubeSearch(selected.name)} className="flex-1 bg-white text-red-600 rounded-full h-9 px-4 text-sm font-medium flex items-center justify-center">
              <Youtube className="w-4 h-4 mr-2" />YouTube
            </button>
          </div>
        </div>
        <div className="px-6 py-4 space-y-3">
          {selected.services.map(service => {
            const SIcon = service.icon;
            return (
              <div key={service.id} className="p-4 bg-white rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <SIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleGoogleSearch(service.name)} className="flex-1 border border-gray-300 rounded-lg h-8 px-3 text-xs font-medium flex items-center justify-center">
                        <Globe className="w-3 h-3 mr-1" />Find
                      </button>
                      <button onClick={() => handleYouTubeSearch(service.name)} className="flex-1 border border-gray-300 rounded-lg h-8 px-3 text-xs font-medium flex items-center justify-center">
                        <Youtube className="w-3 h-3 mr-1" />Watch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-purple-600 text-white px-4 py-2 text-center text-xs font-semibold">
        🔧 Admin Editable Content
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-12 pb-8 rounded-b-[24px]">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-6">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Package className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">[Admin: Travel Essentials]</h1>
            <p className="text-white/80 text-sm">[Admin: Everything you need]</p>
          </div>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="[Admin: Search...]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 h-12 rounded-full bg-white border-0 shadow-lg" />
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleGoogleSearch()} className="flex-1 bg-white text-blue-600 rounded-full h-9 px-4 text-sm font-medium flex items-center justify-center">
            <Globe className="w-4 h-4 mr-2" />Google
          </button>
          <button onClick={() => handleYouTubeSearch()} className="flex-1 bg-white text-red-600 rounded-full h-9 px-4 text-sm font-medium flex items-center justify-center">
            <Youtube className="w-4 h-4 mr-2" />YouTube
          </button>
        </div>
      </div>
      <div className="px-6 -mt-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">[Admin: Finding services near you]</span>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold mb-4">[Admin: Essential Services]</h2>
        <div className="grid grid-cols-1 gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="p-5 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-all" onClick={() => { setSelectedId(cat.id); setView('detail'); }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{cat.tagline}</p>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{cat.services.length} services</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
