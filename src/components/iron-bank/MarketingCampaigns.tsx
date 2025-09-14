import React, { useState, useEffect } from 'react';
import { Megaphone, Facebook, Target, Copy, Download, Edit, Eye, DollarSign, Users, Clock } from 'lucide-react';
import type { Country, CampaignData } from '../../types/iron-bank';
import { Button } from '../ui/Button';
import { IPhone15ProFrame } from '../mobile/devices/IPhone15ProFrame';
import { FacebookInterface } from '../mobile/platforms/FacebookInterface';
import { InstagramInterface } from '../mobile/platforms/InstagramInterface';
import { TwitterInterface } from '../mobile/platforms/TwitterInterface';

interface MarketingCampaignsProps {
  targetCountries: Country[];
  campaignData: CampaignData[];
  onUpdateCampaigns: (campaigns: CampaignData[]) => void;
}

interface PreviewData {
  campaign: CampaignData;
  country: Country;
}

export const MarketingCampaigns: React.FC<MarketingCampaignsProps> = ({
  targetCountries,
  campaignData,
  onUpdateCampaigns
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'facebook' | 'google' | 'tiktok'>('all');
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Generate campaigns on component mount
  useEffect(() => {
    if (campaignData.length === 0) {
      generateCampaigns();
    }
  }, []);

  const generateCampaigns = async () => {
    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockCampaigns: CampaignData[] = [];

    targetCountries.forEach(country => {
      const platforms: ('facebook' | 'google' | 'tiktok')[] = ['facebook', 'google', 'tiktok'];

      platforms.forEach(platform => {
        const campaignTexts = {
          facebook: {
            US: "🚀 Discover the future of technology! Revolutionary product that changes everything. Limited time offer - Join thousands of satisfied customers. #Innovation #TechRevolution",
            TR: "🚀 Teknolojinin geleceğini keşfedin! Her şeyi değiştiren devrimci ürün. Sınırlı süre fırsatı - Binlerce memnun müşteriye katılın. #İnovasyon #TeknolojiDevrimi",
            DE: "🚀 Entdecken Sie die Zukunft der Technologie! Revolutionäres Produkt, das alles verändert. Zeitlich begrenztes Angebot - Schließen Sie sich Tausenden zufriedenen Kunden an. #Innovation #TechRevolution",
            FR: "🚀 Découvrez l'avenir de la technologie ! Produit révolutionnaire qui change tout. Offre limitée - Rejoignez des milliers de clients satisfaits. #Innovation #RévolutionTech",
            ES: "🚀 ¡Descubre el futuro de la tecnología! Producto revolucionario que lo cambia todo. Oferta por tiempo limitado - Únete a miles de clientes satisfechos. #Innovación #RevoluciónTech",
          },
          google: {
            US: "Revolutionary Tech Product | Transform Your Life Today | Limited Time 30% OFF | Free Shipping Worldwide | 5-Star Reviews",
            TR: "Devrimci Teknoloji Ürünü | Hayatınızı Bugün Dönüştürün | Sınırlı Süre %30 İNDİRİM | Dünya Çapında Ücretsiz Kargo | 5 Yıldızlı Yorumlar",
            DE: "Revolutionäres Tech-Produkt | Verwandeln Sie Ihr Leben heute | Zeitlich begrenzt 30% RABATT | Weltweiter kostenloser Versand | 5-Sterne-Bewertungen",
            FR: "Produit Tech Révolutionnaire | Transformez votre vie aujourd'hui | Durée limitée 30% DE RÉDUCTION | Livraison gratuite mondiale | Avis 5 étoiles",
            ES: "Producto Tech Revolucionario | Transforma tu vida hoy | Tiempo limitado 30% DESCUENTO | Envío gratuito mundial | Reseñas de 5 estrellas",
          },
          tiktok: {
            US: "POV: You found the tech product that actually works ✨ 1M+ happy customers can't be wrong! Swipe up for exclusive deal 🔥 #TechTok #LifeHack",
            TR: "POV: Gerçekten işe yarayan teknoloji ürününü buldun ✨ 1M+ mutlu müşteri yanılamaz! Özel fırsat için yukarı kaydır 🔥 #TechTok #HayatHileleri",
            DE: "POV: Du hast das Tech-Produkt gefunden, das wirklich funktioniert ✨ 1M+ glückliche Kunden können nicht falsch liegen! Swipe für exklusiven Deal 🔥 #TechTok #LifeHack",
            FR: "POV: Tu as trouvé le produit tech qui marche vraiment ✨ 1M+ clients satisfaits ne peuvent pas se tromper ! Swipe pour une offre exclusive 🔥 #TechTok #LifeHack",
            ES: "POV: Encontraste el producto tech que realmente funciona ✨ ¡1M+ clientes felices no pueden estar equivocados! Swipe para oferta exclusiva 🔥 #TechTok #LifeHack",
          }
        };

        const targeting = {
          US: { ageRange: '25-45', interests: ['Technology', 'Innovation', 'Gadgets'], demographics: 'Tech-savvy professionals' },
          TR: { ageRange: '25-45', interests: ['Teknoloji', 'İnovasyon', 'Gadgets'], demographics: 'Teknoloji meraklısı profesyoneller' },
          DE: { ageRange: '25-45', interests: ['Technologie', 'Innovation', 'Gadgets'], demographics: 'Technikaffine Berufstätige' },
          FR: { ageRange: '25-45', interests: ['Technologie', 'Innovation', 'Gadgets'], demographics: 'Professionnels technophiles' },
          ES: { ageRange: '25-45', interests: ['Tecnología', 'Innovación', 'Gadgets'], demographics: 'Profesionales amantes de la tecnología' },
        };

        const budgets = {
          US: { suggested: 2500, currency: 'USD' },
          TR: { suggested: 15000, currency: 'TRY' },
          DE: { suggested: 2200, currency: 'EUR' },
          FR: { suggested: 2200, currency: 'EUR' },
          ES: { suggested: 2000, currency: 'EUR' },
        };

        mockCampaigns.push({
          country: country.code,
          platform,
          adText: campaignTexts[platform][country.code as keyof typeof campaignTexts.facebook] || campaignTexts[platform].US,
          targeting: targeting[country.code as keyof typeof targeting] || targeting.US,
          budget: budgets[country.code as keyof typeof budgets] || budgets.US
        });
      });
    });

    onUpdateCampaigns(mockCampaigns);
    setIsGenerating(false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'google':
        return (
          <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        );
      case 'tiktok':
        return (
          <div className="w-5 h-5 rounded-lg bg-black flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </div>
        );
      default:
        return <Megaphone className="w-5 h-5" />;
    }
  };


  const filteredCampaigns = selectedPlatform === 'all'
    ? campaignData
    : campaignData.filter(campaign => campaign.platform === selectedPlatform);

  const groupedCampaigns = targetCountries.map(country => ({
    country,
    campaigns: filteredCampaigns.filter(campaign => campaign.country === country.code)
  }));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handlePreview = (campaign: CampaignData, country: Country, cardId: string) => {
    if (expandedCard === cardId) {
      // Aynı karta tıklanırsa kapat
      setExpandedCard(null);
      setPreviewData(null);
    } else {
      // Yeni kart aç
      setExpandedCard(cardId);
      setPreviewData({ campaign, country });
    }
  };

  // Mock data oluşturma fonksiyonları kart içinde oluşturulacak

  if (isGenerating) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <Megaphone className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            ⚔️ AI Kampanyalar Oluşturuluyor...
          </h2>
          <p className="text-orange-200 mb-6 drop-shadow-lg">
            Her ülke ve platform için özel kampanya içerikleri hazırlanıyor.
          </p>
          <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-600 to-orange-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Megaphone className="w-8 h-8 text-orange-400" />
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              ⚔️ Anında Pazarlama Kampanyaları
            </h2>
          </div>
          <p className="text-orange-200 text-lg drop-shadow-lg">
            Her ülke için özel olarak hazırlanmış, platformlara optimize edilmiş kampanya içerikleri
          </p>
        </div>

        {/* Platform Filter */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex bg-black/50 backdrop-blur-sm border border-orange-500/50 rounded-lg p-1 hover-flames">
            {[
              { id: 'all', label: 'Tüm Platformlar', icon: Megaphone },
              { id: 'facebook', label: 'Facebook', icon: Facebook },
              {
                id: 'google',
                label: 'Instagram',
                icon: () => (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                )
              },
              {
                id: 'tiktok',
                label: 'X',
                icon: () => (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                )
              }
            ].map(platform => {
              const Icon = platform.icon;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id as any)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${selectedPlatform === platform.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-black/30 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {platform.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Campaigns by Country */}
        <div className="space-y-8">
          {groupedCampaigns.map(({ country, campaigns }) => (
            <div key={country.code} className="bg-black/50 backdrop-blur-sm border border-orange-500/50 rounded-lg p-6 hover-flames">
              {/* Country Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white drop-shadow-lg">{country.name}</h3>
                    <p className="text-sm text-orange-200">{campaigns.length} kampanya hazır</p>
                  </div>
                </div>
                <Button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white border border-green-500 rounded-lg hover:bg-green-700">
                  <Download className="w-4 h-4" />
                  Tümünü İndir
                </Button>
              </div>

              {/* Platform Campaigns */}
              <div className="grid gap-4">
                {campaigns.map((campaign, index) => {
                  const cardId = `${country.code}-${campaign.platform}-${index}`;
                  const isExpanded = expandedCard === cardId;

                  return (
                    <div key={index} className={`border border-gray-600/30 rounded-lg bg-black/30 transition-all duration-300 ${isExpanded ? 'p-6' : 'p-4'
                      }`}>
                      <div className={`grid gap-6 ${isExpanded ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
                        }`}>
                        {/* Sol taraf - Kampanya detayları */}
                        <div className="space-y-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(campaign.platform)}
                              <span className="font-semibold text-white capitalize">
                                {campaign.platform === 'google' ? 'Instagram' : campaign.platform === 'tiktok' ? 'X' : campaign.platform}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => copyToClipboard(campaign.adText)}
                                className="p-1 hover:bg-white/20 rounded text-gray-300 hover:text-white"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button className="p-1 hover:bg-white/20 rounded text-gray-300 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="bg-black/40 rounded-lg p-4 mb-4 border border-gray-600/30">
                            <h4 className="font-medium text-white mb-2">Reklam Metni:</h4>
                            <p className="text-gray-200 text-sm leading-relaxed">{campaign.adText}</p>
                          </div>

                          <div className={`grid gap-4 text-sm ${isExpanded ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                            }`}>
                            {/* Targeting */}
                            <div className="bg-black/40 rounded-lg p-3 border border-gray-600/30">
                              <div className="flex items-center gap-1 mb-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                <h5 className="font-medium text-white">Hedefleme</h5>
                              </div>
                              <p className="text-gray-300 mb-1">Yaş: {campaign.targeting.ageRange}</p>
                              <p className="text-gray-300 mb-1">İlgi Alanları: {campaign.targeting.interests.join(', ')}</p>
                              <p className="text-gray-400 text-xs">{campaign.targeting.demographics}</p>
                            </div>

                            {/* Budget */}
                            <div className="bg-black/40 rounded-lg p-3 border border-gray-600/30">
                              <div className="flex items-center gap-1 mb-2">
                                <DollarSign className="w-4 h-4 text-green-400" />
                                <h5 className="font-medium text-white">Önerilen Bütçe</h5>
                              </div>
                              <p className="text-lg font-semibold text-green-400">
                                {campaign.budget.suggested.toLocaleString()} {campaign.budget.currency}
                              </p>
                              <p className="text-gray-400 text-xs">Aylık tahmini</p>
                            </div>

                            {/* Performance Estimate */}
                            <div className="bg-black/40 rounded-lg p-3 border border-gray-600/30">
                              <div className="flex items-center gap-1 mb-2">
                                <Eye className="w-4 h-4 text-purple-400" />
                                <h5 className="font-medium text-white">Tahmini Erişim</h5>
                              </div>
                              <p className="text-lg font-semibold text-purple-400">
                                {Math.round(Math.random() * 50 + 20)}K - {Math.round(Math.random() * 100 + 80)}K
                              </p>
                              <p className="text-gray-400 text-xs">Potansiyel görüntülenme</p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-600/30">
                            <Button
                              onClick={() => handlePreview(campaign, country, cardId)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isExpanded
                                ? 'bg-orange-600 text-white hover:bg-orange-700'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                                }`}
                            >
                              <Eye className="w-4 h-4" />
                              {isExpanded ? 'Kapat' : 'Önizle'}
                            </Button>
                            <Button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                              <Target className="w-4 h-4" />
                              Kampanyayı Başlat
                            </Button>
                            <Button className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                              <Download className="w-4 h-4" />
                              İndir
                            </Button>
                          </div>
                        </div>

                        {/* Sağ taraf - Mobil Önizleme */}
                        {isExpanded && previewData && expandedCard === cardId && (
                          <div className="flex flex-col items-center justify-center bg-black/20 rounded-lg p-6">
                            {/* Ülke ve Platform Bilgisi */}
                            <div className="text-center mb-4">
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-2xl">{country.flag}</span>
                                <span className="font-medium text-white">{country.name}</span>
                              </div>
                              <span className="text-sm text-gray-400 capitalize">{campaign.platform === 'tiktok' ? 'X' : campaign.platform === 'google' ? 'Instagram' : campaign.platform}</span>
                            </div>

                            {/* iPhone Mockup */}
                            <div className="transform scale-75 origin-center">
                              <IPhone15ProFrame>
                                {(() => {
                                  // Platform'a göre mock data oluştur
                                  const baseVideoData = {
                                    id: 'royal-campaign-1',
                                    title: 'Royal Campaign',
                                    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
                                    duration: '0:30',
                                    views: '2,543',
                                    sources: [{
                                      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
                                      type: 'video/mp4'
                                    }]
                                  };

                                  const facebookPost = {
                                    id: 'fb-royal-1',
                                    user: {
                                      name: 'Teknasyon',
                                      avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhQTBxQWFRUXGBobGBYWGRkdHhwbGhcdGiAXGRogICggHx8xIB4ZITElJzUtMC8uGyE1ODMvNyktOi0BCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABgcIAwQFAgH/xABJEAACAQIDAwcGCQoEBwAAAAAAAQIDBAUGEQchMRIiQVFhcYETQnKRobEUJDJSgpKiwcIIIyVDYmOTstHSM1Nz4RUXNIOjs/D/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4eYs14HlunrjFaMHpqoLfN90Fv8AHgVjju3TRtYBbd067/BH+4C6gZdxPajnDEG9bl0182lGMNPFLle0j1zmDGrt/GrmvP0qs372BsMGMvh14n/iT+tI7lrmPHLR/Fbq4h6NWovvA2CDMOF7Vs4Ye1rXVVfNqwjL7S0l7Sd4DtztqjUcft3DrqUXyl9SW9etgXGDysCzFhGYbfl4PWhVXSk+cvSi+cvFHqgAAAAAAAAAAAAAAAAADxs0Zjw7K+FSr4nLRLdGK+VOXRGK6X7gO9iWI2eFWUquI1I06cVvlJ6L/d9iKPzvtlvb6UqWV06NPg6zX5yXorhBe3uITnXOeJ5vxDl3z5NOLfk6MXzYL75dcvdwI2ByV69W5rOdxJylJ6uUm22+ttnGAAAAAAAAABz2V5c2FyqljOVOcd6lBtNeKLfyPtmqRlGjm1argriC3r/UguPfH1MpkAbPtLqhe20alpKM4SWsZReqa60zmMtZAz9iOT7vRa1LeT59Fv7UPmy9j6ezSuB4xY49hkK+FzU6cuD6U+mMl0NdQHoAAAAAAAAAAAAAOjjOKWmC4XUr4hLk06a1b9yS6W3uS7TLWd82XubsZda71UFqqVPXdCP9X0v/AGJZttzi8Yxj4HYy/M0HztPPq8H4R4d/KKxAAAAAAAAAAAAAAAAAEv2cZ2ucn4trLWVvNpVaf44/tL28O6IADZ1ndUL60jUtJKUJpSjJcGnwaOcozYRnF0bj/h9/Lmy1lQb6JcZU+58V269ZeYAAAAAAAAAj+eMTvMLy5UlhUJ1K8+ZRjCLk+XLztF1LWXgSAAZ3wTYvmPEedis4W6fHlPlz7+THd62TjDNiGXbZL4fUrVn074wj6ktfaWgAIhbbMsm2y5lpB+nKcv5pM7TyDlJx/wCiofUJKAIZd7Lcm3S32qi+uE6kfdLQjGLbDMIrJvCrirSfVNRqR/C/ay2gBmXMOyjNGCpypU1cQXnUXq9O2D53qTINOEqc2ppprc0+hm0yNZqyPgWaab/4lSSqabqsObNePnd0tQMngnGedmeMZVbqU15e3/zYLfFfvI+b38CDgAAAAAAAAc1pc1rO6hUtm4zhJSjJdDT1TNbZQxylmPLtG5pbuXHnJdE1ulH6yfhoZFjFzklBat7kl1mjdieB43geXqkcZjyI1JqdOm/lR1jpJyXm66R3ceOoFjAAAAAAAAAFJ7YtoGNYbjc7LCJ+SjGMXKcfltyjytFLzVo1w39oFn5hzdgOXI/pevCEuiC5039COr8eBXGM7dbaDawS2lLqnWko/Yjr70UjUqTq1HKq223q23q2+ts+ALEvds2briX5l0aXZCnr/O5HQ/5r525Wvwr/AMVH+whQAsWx2z5st38YdGr6dPT+RxJlge3LD68lHHLedL9um+XHvcXo14alEADYWB4/hOP2/LwetCqunkvevSi98fFHpmM8Pv7zDLtVMPqSpzjwlBtMuvZ5telf3NO2zLH85OUYQrQW6UpPRKpHo39K3di4gXA0pLeVznDZFgmOSdTC/itV7+atacn2w6Po6dzLHAGWMxbN80YBJuvQdWC/WUdZx062lzo+KREmmnvNqHl4nl7BcWf6St6NR9c4Rb+tpqBj4Goq2y3JVaWsrRL0alaPsU9D6t9l+S7eWsLSL9KdWXslNoDLtOE6s0qabb3JJatk3yzsrzNjkk61P4PTfn1tU9OyHyn46LtNGYbguFYSv0ZQpUv9OEYvxaWp6AEMyZs4wPKuk6UfLV/86olqvQjwh7+0mYPzXR7wP0AAAAAAAAy/tkbe0i61/df+imagMzbbqDo7RKzfnxpSX8OMfwgQMAAAAAAAA9bKVOVbNVpGHF3FFL+JE8ksDYjgk8VzrCpJcy3TqSf7XyYLv1ev0WBpUAAcNK4oVqklSlGTi9JJNNp9T6jmMjZkxmtdZtubiynKLnWm4yhJp8nlPk712aHo4ftJzhYR0pXc5L94o1PbNNgaoBnCltozbTXP8hLtdP8ApJCrtozbUXM8hHtVP+smBo86WJ4rh+E0OXidWnSj1zko+rXiZjxDaTnC/TVW7nFdVNRp+2CTIxc3Ne6quV1OU5PjKTbb8WBfOaNteFWaccvQdefz56xprw+VL2d5D8gZrxrMu1G1ni9Vz31dILdCP5ip8mK3ePErEnmxKg6u0Sg15kasn/DlH7wNMgAAAAAAAFC/lEYe6WOW1dLdOlKHjTnr7p+wvor3bhgzxPJMqlJayt5Kp9H5MvDR8r6IGbAAAAAAA72D4Tf43fxo4XTlUqS4KK6Otvgl2sDr2lrXvbqNO0i5zm1GMUt7b4JGo9m+UoZQy9GnPR1p8+tJfO+auxcPW+k8zZts4tcpUvK3ulS6kt8vNpp8Y0/vl09hPwBFtpePRy9k6vUi9Jyj5On6c92q7lrL6JKTNm2TN8cx4/5GxlrQoaxi1wnPzp927Rd2vSBXoAAAAAAABbX5O9g6uPXNdrdTpKHjUnr7oMqU0jsNwZ4bkpVaq0lcTdT6K5sfc5fSAsQAAAAAAAA4bu3pXdrOncLlQnFxkn0xktGvUcwAyBmrBK2XcwVra411pyaTfnRe+MvGOh5JoHbllB4rhavbGOtWgtKiXGVLjr9F6vub6jPwAA7OG2Nxid/To2a5U6klGK7W9APZyTlHEM34r5Ky5sI6OpVa3Qj97fQun1mmMrZXwvK2HqlhUNOHKm98pvrlL7uCPjJuWrTKmBQoWmja31J9M5vjJ+5diR7wAHFWrUrei5V5KMYrWUpPRJdbbKW2jbXfKwlb5Tk0nqp3HB9qpdXperrA7+2HaNCyozscDnrVlrGtUi/kLppxfzn09Xfwok/W3J6yPwAAAAAAAAD1Ms4NXzDj1G2tuNSSTfVHjKXhHVmurO2o2VpCnbLSEIqMV1KK0S9RV+wvKEsMw13t9HSpWWlJPzaXHlfSe/uS62WuAAAAAAAAAAAHzKKlHSRm/a1kKeWMRdfDov4LUe7T9XJ+Y+z5vq6N+kjrYhY22JWU6V9BTpzWkoy4NAYzLY/J+wON3jla7rLVUIqMPTqa6td0U/rnh7SNnN5lO4dWzTqWre6fTDXzKnuUuDLS2DWcbfIvLXGpWqS9WkPwgWOcdWpClTcqrSSTbb4JLe2zkIBttxaeF5FnGi9JV5xparqespeuMWvECpdp20G6zVfSpWUnG0g+bFbvKNefP7l0d5AwAAAAAAAAABYGyfIdTNOJKtiEWrWm+d+8kv1a7PnerpOLZxs6vc2XCqXetO1i+dPpnp5lP+7gvYaQw6xtcMso0bCChTgtIxjwS/8AunpA54RjCKUVoluSR9gAAAAAAAAAAAAAAHHWpU69JxrJSjJNOLWqafFNHUwfCrLBbFUcNhyKacmorXRcqTk9OzVs74AFT/lERk8tW7XBV9H3unLT3Mtgi20bK9TN2Wnb28owmpxnCUtdNY6rfpv4NgZTBNsU2VZww9vS38ql51KUZfZ3S9hHLnLuN2j+NWteHpUpr3oDzAdj4Dea/wCHP6sjuWuXccu38Vta8/RpTf3AeWCb4XspzhiLWtBUo/OqyjH7O+XsJ3gGwy1pNSx+4c/3dFcleM5b36kBS1hY3eJXSp2FOVScuEYJt+pFyZF2NKnKNbNujfFW8Xu/7klx9GPr6C1MDy/hOAW/IwejCkunkre/Sk98vFnqAcdGjTt6SjQioxikkktEkuCS6jkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==',
                                      isPage: true
                                    },
                                    content: {
                                      text: campaign.adText,
                                      media: {
                                        type: 'video' as const,
                                        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
                                        videoData: baseVideoData
                                      }
                                    },
                                    engagement: {
                                      likes: '2,543',
                                      comments: '189',
                                      shares: '67',
                                    },
                                    timeAgo: '2h',
                                    isAd: true
                                  };

                                  const instagramPost = {
                                    id: 'ig-royal-1',
                                    user: {
                                      username: 'teknasyon',
                                      displayName: 'Teknasyon',
                                      avatar: 'data:image/jpeg;base64,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',
                                    },
                                    media: {
                                      type: 'video' as const,
                                      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
                                      videoData: baseVideoData
                                    },
                                    caption: campaign.adText,
                                    likes: '2,543',
                                    comments: '189',
                                    timeAgo: '2h',
                                    isAd: true
                                  };

                                  const tweet = {
                                    id: 'tw-royal-1',
                                    user: {
                                      name: 'Teknasyon',
                                      username: 'teknasyon',
                                      avatar: 'data:image/jpeg;base64,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',
                                    },
                                    content: {
                                      text: campaign.adText,
                                      media: {
                                        type: 'video' as const,
                                        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
                                        videoData: baseVideoData
                                      }
                                    },
                                    engagement: {
                                      replies: '189',
                                      retweets: '67',
                                      likes: '2,543',
                                      views: '25K'
                                    },
                                    timeAgo: '2h',
                                    isAd: true
                                  };

                                  switch (campaign.platform) {
                                    case 'facebook':
                                      return (
                                        <FacebookInterface
                                          posts={[
                                            facebookPost,
                                            {
                                              id: 'fb-org-1',
                                              user: {
                                                name: 'Tech User',
                                                avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQyKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDIiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZGRiIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iIzAwRkZGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMEZGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjMDBGRkZGIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
                                              },
                                              content: {
                                                text: '🤖 Tech updates from the community!',
                                                media: {
                                                  type: 'image' as const,
                                                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQoq8awIKhXX2akqkC96LHTeRKXEzmqhb0GQ&s'
                                                }
                                              },
                                              engagement: {
                                                likes: '1,234',
                                                comments: '56',
                                                shares: '23',
                                              },
                                              timeAgo: '4h',
                                            },
                                            {
                                              ...facebookPost,
                                              id: 'fb-german-1',
                                              content: {
                                                text: '👑 Erreichen Sie Ihre Zielgruppe mit königlichen Anzeigen! #RoyalAds #VideoMarketing #Deutschland',
                                                media: facebookPost.content.media
                                              },
                                              adType: 'german' as const
                                            }
                                          ]}
                                        />
                                      );
                                    case 'tiktok':
                                      return (
                                        <TwitterInterface
                                          tweets={[
                                            tweet,
                                            {
                                              id: 'tw-org-1',
                                              user: {
                                                name: 'Tech User',
                                                username: 'tech_user',
                                                avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQyKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDIiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZGRiIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iIzAwRkZGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMEZGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjMDBGRkZGIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
                                              },
                                              content: {
                                                text: 'Some tech news and updates 🚀 #tech #innovation',
                                                media: {
                                                  type: 'image' as const,
                                                  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQoq8awIKhXX2akqkC96LHTeRKXEzmqhb0GQ&s'
                                                }
                                              },
                                              engagement: {
                                                replies: '56',
                                                retweets: '23',
                                                likes: '1,234',
                                                views: '5K'
                                              },
                                              timeAgo: '4h',
                                            },
                                            {
                                              ...tweet,
                                              id: 'tw-german-1',
                                              content: {
                                                text: '👑 Entdecken Sie die Zukunft der Technologie! #RoyalAds #TechRevolution #Deutschland',
                                                media: tweet.content.media
                                              },
                                              adType: 'german' as const
                                            }
                                          ]}
                                        />
                                      );
                                    default:
                                      return (
                                        <InstagramInterface
                                          posts={[
                                            instagramPost,
                                            {
                                              id: 'ig-org-1',
                                              user: {
                                                username: 'sunset_photographer',
                                                displayName: 'Sunset Photographer',
                                                avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQzKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDMiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGMDBGQyIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0ZGMDBGQyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjAwRkMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjRkYwMEZDIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
                                              },
                                              media: {
                                                type: 'image' as const,
                                                url: 'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?fm=jpg&q=60&w=400&h=400&fit=crop&crop=center'
                                              },
                                              caption: '🌅 Beautiful sunset today! #sunset #photography',
                                              likes: '4,523',
                                              comments: '287',
                                              timeAgo: '1h',
                                            },
                                            {
                                              ...instagramPost,
                                              id: 'ig-german-1',
                                              caption: '👑 Entdecken Sie die Zukunft der Technologie! Revolutionäres Produkt für Ihren Erfolg. #RoyalAds #Innovation #Deutschland',
                                              adType: 'german' as const
                                            }
                                          ]}
                                        />
                                      );
                                  }
                                })()}
                              </IPhone15ProFrame>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              🎉 Tebrikler! Iron Bank Süreci Tamamlandı
            </h3>
            <p className="text-purple-700 mb-4">
              {targetCountries.length} ülke için toplam {campaignData.length} kampanya hazırlandı.
              Artık reklamlarınızı tüm dünyaya yayabilirsiniz!
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-purple-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Süreç süresi: ~15 dk</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>Hedef pazar: {targetCountries.length} ülke</span>
              </div>
              <div className="flex items-center gap-1">
                <Megaphone className="w-4 h-4" />
                <span>Hazır kampanya: {campaignData.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};