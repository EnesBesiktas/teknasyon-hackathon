import React, { useState, useEffect } from 'react';
import { Megaphone, Facebook, Target, Zap, Copy, Download, Edit, Eye, DollarSign, Users, Clock } from 'lucide-react';
import type { Country, CampaignData } from '../../types/iron-bank';
import { Button } from '../ui/Button';

interface MarketingCampaignsProps {
  targetCountries: Country[];
  campaignData: CampaignData[];
  onUpdateCampaigns: (campaigns: CampaignData[]) => void;
}

export const MarketingCampaigns: React.FC<MarketingCampaignsProps> = ({
  targetCountries,
  campaignData,
  onUpdateCampaigns
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'facebook' | 'google' | 'tiktok'>('all');

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
        return <Target className="w-5 h-5 text-red-600" />;
      case 'tiktok':
        return <Zap className="w-5 h-5 text-black" />;
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
              { id: 'google', label: 'Google Ads', icon: Target },
              { id: 'tiktok', label: 'TikTok', icon: Zap }
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
                <Button className="flex items-center gap-2 px-4 py-2 bg-black/60 text-white border border-orange-500/50 rounded-lg hover:bg-orange-500/10 hover:border-orange-400 hover-flames relative overflow-hidden" style={{ color: 'white !important', textShadow: '2px 2px 4px rgba(0,0,0,0.8) !important' }}>
                  <div className="relative z-20 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span className="text-white font-bold drop-shadow-lg">Tümünü İndir</span>
                  </div>
                  
                  {/* Dragon Fire Effects - Behind text */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-lg animate-pulse"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/2 to-red-500/2 rounded-lg animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20 animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20 animate-pulse"></div>
                </Button>
              </div>

              {/* Platform Campaigns */}
              <div className="grid gap-4">
                {campaigns.map((campaign, index) => (
                  <div key={index} className="border border-gray-600/30 rounded-lg p-4 bg-black/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(campaign.platform)}
                        <span className="font-semibold text-white capitalize">
                          {campaign.platform === 'google' ? 'Google Ads' : campaign.platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => copyToClipboard(campaign.adText)}
                          className="p-1 hover:bg-orange-500/10 rounded text-gray-300 hover:text-orange-200 hover-flames relative overflow-hidden"
                          style={{ color: 'inherit !important' }}
                        >
                          <div className="relative z-20">
                            <Copy className="w-4 h-4" />
                          </div>
                          
                          {/* Dragon Fire Effects - Behind icon */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/3 to-red-500/3 rounded animate-pulse"></div>
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        </Button>
                        <Button className="p-1 hover:bg-orange-500/10 rounded text-gray-300 hover:text-orange-200 hover-flames relative overflow-hidden" style={{ color: 'inherit !important' }}>
                          <div className="relative z-20">
                            <Edit className="w-4 h-4" />
                          </div>
                          
                          {/* Dragon Fire Effects - Behind icon */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/3 to-red-500/3 rounded animate-pulse"></div>
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        </Button>
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 mb-4 border border-gray-600/30">
                      <h4 className="font-medium text-white mb-2">Reklam Metni:</h4>
                      <p className="text-gray-200 text-sm leading-relaxed">{campaign.adText}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
                      <Button className="flex items-center gap-2 px-3 py-2 bg-black/60 text-white border border-orange-500/50 rounded-lg hover:bg-orange-500/10 hover:border-orange-400 hover-flames relative overflow-hidden" style={{ color: 'white !important', textShadow: '2px 2px 4px rgba(0,0,0,0.8) !important' }}>
                        <div className="relative z-20 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span className="text-white font-bold drop-shadow-lg">Önizle</span>
                        </div>
                        
                        {/* Dragon Fire Effects - Behind text */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-lg animate-pulse"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/2 to-red-500/2 rounded-lg animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20 animate-pulse"></div>
                      </Button>
                      <Button className="flex items-center gap-2 px-3 py-2 bg-black/60 text-white border border-orange-500/50 rounded-lg hover:bg-orange-500/10 hover:border-orange-400 hover-flames relative overflow-hidden" style={{ color: 'white !important', textShadow: '2px 2px 4px rgba(0,0,0,0.8) !important' }}>
                        <div className="relative z-20 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span className="text-white font-bold drop-shadow-lg">Kampanyayı Başlat</span>
                        </div>
                        
                        {/* Dragon Fire Effects - Behind text */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-lg animate-pulse"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/2 to-red-500/2 rounded-lg animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20 animate-pulse"></div>
                      </Button>
                      <Button className="flex items-center gap-2 px-3 py-2 bg-black/60 text-orange-200 border border-orange-500/50 rounded-lg hover:bg-orange-500/10 hover:border-orange-400 hover-flames relative overflow-hidden" style={{ color: 'rgb(251 146 60) !important', textShadow: '2px 2px 4px rgba(0,0,0,0.8) !important' }}>
                        <div className="relative z-20 flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span className="text-orange-200 font-bold drop-shadow-lg">İndir</span>
                        </div>
                        
                        {/* Dragon Fire Effects - Behind text */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-lg animate-pulse"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/2 to-red-500/2 rounded-lg animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20 animate-pulse"></div>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-8 bg-black/60 backdrop-blur-sm border border-orange-500/50 rounded-lg p-6 hover-flames">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-lg">
              🎉 Tebrikler! Iron Bank Süreci Tamamlandı
            </h3>
            <p className="text-orange-200 mb-4 drop-shadow-lg">
              {targetCountries.length} ülke için toplam {campaignData.length} kampanya hazırlandı.
              Artık reklamlarınızı tüm dünyaya yayabilirsiniz!
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-orange-300">
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