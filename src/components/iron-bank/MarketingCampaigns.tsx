import React, { useState, useEffect, useCallback } from 'react';
import { Megaphone, Facebook, Target, Zap, Copy, Download, Eye, DollarSign, Users, Clock, Hash, AlertCircle, BarChart3, ExternalLink, Lightbulb, Shuffle, Database, Code } from 'lucide-react';
import type { Country, CampaignData } from '../../types/iron-bank';
import { Button } from '../ui/Button';
import { createCampaignService } from '../../services/api/campaign';
import { useLocalStorageService } from '../../hooks/use-service';
import CampaignResponseDisplay from './CampaignResponseDisplay';

interface MarketingCampaignsProps {
  targetCountries: Country[];
  campaignData: CampaignData[];
  onUpdateCampaigns: (campaigns: CampaignData[]) => void;
  videoId?: number;
}

export const MarketingCampaigns: React.FC<MarketingCampaignsProps> = ({
  targetCountries,
  campaignData,
  onUpdateCampaigns,
  videoId
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'facebook' | 'google' | 'tiktok'>('all');
  const [error, setError] = useState<string | null>(null);
  const [showResponseStructure, setShowResponseStructure] = useState(false);
  const [fullResponseData, setFullResponseData] = useState<unknown>(null);
  
  // Get service dependencies
  const localStorageService = useLocalStorageService();
  const campaignService = createCampaignService(localStorageService);

  const generateMockCampaigns = useCallback(() => {
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
  }, [targetCountries, onUpdateCampaigns]);

  const generateCampaigns = useCallback(async () => {
    if (!videoId) {
      setError('Video ID bulunamadı. Lütfen önce video yükleyin.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await campaignService.generateCampaigns({
        video_id: videoId,
        country_codes: targetCountries.map(country => country.code),
        platforms: ['facebook', 'google', 'tiktok'],
        objective: 'conversions',
        max_variants: 2
      });

      // Store full response data for detailed view
      setFullResponseData(response);

      // Transform backend data to enhanced frontend format
      const enhancedCampaigns = campaignService.transformToFrontendFormat(response);
      // Convert to CampaignData format for compatibility
      const frontendCampaigns: CampaignData[] = enhancedCampaigns.map(campaign => ({
        country: campaign.country,
        countryName: campaign.countryName,
        platform: campaign.platform,
        adText: campaign.adText,
        targeting: campaign.targeting,
        budget: campaign.budget,
        callToAction: campaign.callToAction,
        creative: campaign.creative,
        policyNotes: campaign.policyNotes,
        measurement: campaign.measurement,
        variants: campaign.variants
      }));
      onUpdateCampaigns(frontendCampaigns);
    } catch (error) {
      console.error('Campaign generation failed:', error);
      setError('Kampanya üretimi başarısız oldu. Lütfen tekrar deneyin.');
      
      // Fallback to mock data on error
      generateMockCampaigns();
    } finally {
      setIsGenerating(false);
    }
  }, [videoId, targetCountries, campaignService, onUpdateCampaigns, generateMockCampaigns]);

  // Generate campaigns on component mount
  useEffect(() => {
    if (campaignData.length === 0 && videoId && targetCountries.length > 0) {
      generateCampaigns();
    }
  }, [videoId, targetCountries, campaignData.length, generateCampaigns]);

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

  // Error state
  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-red-400 mb-6">
            <Megaphone className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            ⚠️ Kampanya Üretimi Başarısız
          </h2>
          <p className="text-red-200 mb-6 drop-shadow-lg">
            {error}
          </p>
          <Button 
            onClick={() => {
              setError(null);
              generateCampaigns();
            }}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Tekrar Dene
          </Button>
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

        {/* Platform Filter & Controls */}
        <div className="flex items-center justify-between mb-8">
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
                  onClick={() => setSelectedPlatform(platform.id as 'all' | 'facebook' | 'google' | 'tiktok')}
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

          {/* Response Structure Toggle */}
          {fullResponseData && (
            <Button
              onClick={() => setShowResponseStructure(!showResponseStructure)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showResponseStructure 
                  ? 'bg-blue-600 text-white border-blue-500' 
                  : 'bg-black/50 text-blue-300 border-blue-500/50 hover:bg-blue-600/20'
              }`}
            >
              {showResponseStructure ? <Code className="w-4 h-4" /> : <Database className="w-4 h-4" />}
              {showResponseStructure ? 'Yapı Görünümünü Gizle' : 'Response Yapısını Göster'}
            </Button>
          )}
        </div>

        {/* Response Structure Display */}
        {showResponseStructure && fullResponseData && (
          <div className="mb-8">
            <CampaignResponseDisplay data={fullResponseData as any} />
          </div>
        )}

        {/* Campaigns by Country */}
        <div className="space-y-8">
          {groupedCampaigns.map(({ country, campaigns }) => (
            <div key={country.code} className="bg-black/50 backdrop-blur-sm border border-orange-500/50 rounded-lg p-6 hover-flames">
              {/* Country Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                      {campaigns.length > 0 && campaigns[0].countryName ? campaigns[0].countryName : country.name}
                    </h3>
                    <p className="text-sm text-orange-200">{campaigns.length} platform için kampanya hazır</p>
                    <p className="text-xs text-gray-400">
                      Toplam bütçe: {campaigns.reduce((total, c) => total + c.budget.suggested, 0).toLocaleString()} 
                      {campaigns[0]?.budget.currency || 'EUR'}
                    </p>
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
              <div className="grid gap-6">
                {campaigns.map((campaign, index) => (
                  <div key={index} className="border border-gray-600/30 rounded-lg p-6 bg-black/30">
                    {/* Campaign Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getPlatformIcon(campaign.platform)}
                          <div>
                            <span className="font-bold text-white text-xl capitalize">
                              {campaign.platform === 'google' ? 'Google Ads' : campaign.platform}
                            </span>
                            <p className="text-orange-300 text-sm">Kampanya İçeriği</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                            Detaylı Kampanya
                          </span>
                        </div>
                      </div>
                      
                      {/* Response Structure Overview */}
                      <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 mb-4">
                        <h5 className="font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Kampanya İçerik Özeti
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <div className="bg-black/40 rounded p-2 text-center">
                            <div className="text-orange-300 font-semibold">Ana Reklam Metni</div>
                            <div className="text-gray-400">Asıl kampanya içeriği</div>
                          </div>
                          <div className="bg-black/40 rounded p-2 text-center">
                            <div className="text-green-300 font-semibold">Eylem Çağrısı</div>
                            <div className="text-gray-400">CTA butonu</div>
                          </div>
                          <div className="bg-black/40 rounded p-2 text-center">
                            <div className="text-purple-300 font-semibold">Kreatif Detaylar</div>
                            <div className="text-gray-400">Tasarım ve format</div>
                          </div>
                          <div className="bg-black/40 rounded p-2 text-center">
                            <div className="text-cyan-300 font-semibold">Alternatif Versiyonlar</div>
                            <div className="text-gray-400">A/B test varyantları</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Content Section */}
                    <div className="space-y-4 mb-4">
                      {/* Main Ad Text */}
                      <div className="bg-black/40 rounded-lg p-4 border border-orange-500/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Megaphone className="w-5 h-5 text-orange-400" />
                            <h4 className="font-semibold text-white text-lg">📝 Ana Reklam Metni</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-orange-600/20 text-orange-300 px-2 py-1 rounded">string</code>
                            <Button
                              onClick={() => copyToClipboard(campaign.adText)}
                              className="p-1 hover:bg-orange-600/20 rounded text-orange-300 hover:text-orange-200"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="bg-black/60 rounded-lg p-4 border border-orange-500/30">
                          <p className="text-gray-100 leading-relaxed text-base">{campaign.adText}</p>
                        </div>
                        <div className="mt-2 text-xs text-orange-200">
                          Backend field: <code className="bg-black/40 px-1 rounded">campaigns[].campaign.adText</code>
                        </div>
                      </div>

                      {/* Call to Action */}
                      {campaign.callToAction && (
                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <ExternalLink className="w-5 h-5 text-green-400" />
                              <h4 className="font-semibold text-white text-lg">🎯 Eylem Çağrısı</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded">string</code>
                              <Button
                                onClick={() => copyToClipboard(campaign.callToAction || '')}
                                className="p-1 hover:bg-green-600/20 rounded text-green-300 hover:text-green-200"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-300 rounded-lg border border-green-500/30 font-medium">
                              <ExternalLink className="w-4 h-4" />
                              {campaign.callToAction}
                            </span>
                            <span className="text-gray-400 text-sm">Kullanıcı tıklayacağı buton metni</span>
                          </div>
                          <div className="mt-2 text-xs text-green-200">
                            Backend field: <code className="bg-black/40 px-1 rounded">campaigns[].campaign.call_to_action</code>
                          </div>
                        </div>
                      )}

                      {/* Creative Details - Enhanced */}
                      {campaign.creative && (
                        <div className="bg-black/40 rounded-lg p-4 border border-purple-500/30">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Lightbulb className="w-5 h-5 text-purple-400" />
                              <h4 className="font-semibold text-white text-lg">🎨 Kreatif Detaylar</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">object</code>
                            </div>
                          </div>
                          
                          <div className="mb-3 text-xs text-purple-200">
                            Backend field: <code className="bg-black/40 px-1 rounded">campaigns[].campaign.creative</code>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Creative Headline */}
                            <div className="bg-black/60 rounded-lg p-4 border border-purple-500/30">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-purple-300 flex items-center gap-2">
                                  <Hash className="w-4 h-4" />
                                  Ana Başlık
                                </h5>
                                <code className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">string</code>
                              </div>
                              <p className="text-white font-medium text-lg">{campaign.creative.headline}</p>
                              <p className="text-gray-400 text-xs mt-2">Reklamda görünecek ana başlık</p>
                            </div>

                            {/* Aspect Ratio */}
                            <div className="bg-black/60 rounded-lg p-4 border border-purple-500/30">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-purple-300 flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  Video Formatı
                                </h5>
                                <code className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">string</code>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-purple-600/20 text-purple-200 rounded font-mono text-lg">
                                  {campaign.creative.aspectRatio}
                                </span>
                                <span className="text-gray-400 text-sm">
                                  {campaign.creative.aspectRatio === '1:1' ? 'Kare (Instagram Post)' :
                                   campaign.creative.aspectRatio === '16:9' ? 'Yatay (YouTube/Web)' :
                                   campaign.creative.aspectRatio === '9:16' ? 'Dikey (TikTok/Stories)' :
                                   campaign.creative.aspectRatio === '4:5' ? 'Portre (Instagram)' : 'Özel Format'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Hashtags */}
                          <div className="mt-4 bg-black/60 rounded-lg p-4 border border-purple-500/30">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-purple-300 flex items-center gap-2">
                                <Hash className="w-4 h-4" />
                                Hashtag'ler
                              </h5>
                              <code className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">array[{campaign.creative.hashtags.length}]</code>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {campaign.creative.hashtags.map((tag, i) => (
                                <span key={i} className="inline-flex items-center gap-1 px-3 py-2 bg-purple-600/20 text-purple-200 rounded-lg border border-purple-500/30 hover:bg-purple-600/30 transition-colors">
                                  <Hash className="w-3 h-3" />
                                  <span className="font-medium">{tag.replace('#', '')}</span>
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-400 text-xs mt-2">
                              {campaign.platform === 'tiktok' ? 'TikTok keşfet sayfasında görünürlük için' :
                               campaign.platform === 'facebook' ? 'Facebook organik erişim için' :
                               'Google Ads anahtar kelime optimizasyonu için'} kullanılacak etiketler
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Campaign Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                      {/* Targeting - Enhanced */}
                      <div className="bg-black/40 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="w-5 h-5 text-blue-400" />
                          <h4 className="font-semibold text-white text-lg">Hedef Kitle Analizi</h4>
                        </div>
                        
                        <div className="space-y-4">
                          {/* Age Range */}
                          <div className="bg-black/60 rounded-lg p-3 border border-blue-500/30">
                            <h5 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Yaş Aralığı
                            </h5>
                            <div className="flex items-center gap-3">
                              <span className="px-3 py-1 bg-blue-600/20 text-blue-200 rounded font-medium text-lg">
                                {campaign.targeting.ageRange}
                              </span>
                              <span className="text-gray-400 text-sm">yaş arası</span>
                            </div>
                          </div>

                          {/* Demographics */}
                          <div className="bg-black/60 rounded-lg p-3 border border-blue-500/30">
                            <h5 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Demografik Profil
                            </h5>
                            <p className="text-blue-100">{campaign.targeting.demographics}</p>
                          </div>

                          {/* Location */}
                          {campaign.targeting.location && (
                            <div className="bg-black/60 rounded-lg p-3 border border-blue-500/30">
                              <h5 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Hedef Lokasyon
                              </h5>
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">📍</span>
                                <span className="text-blue-100 font-medium">{campaign.targeting.location}</span>
                              </div>
                            </div>
                          )}

                          {/* Interests */}
                          <div className="bg-black/60 rounded-lg p-3 border border-blue-500/30">
                            <h5 className="font-medium text-blue-300 mb-3 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              İlgi Alanları ({campaign.targeting.interests.length})
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {campaign.targeting.interests.map((interest, i) => (
                                <span key={i} className="px-3 py-2 bg-blue-600/20 text-blue-200 rounded-lg border border-blue-500/30 text-sm font-medium hover:bg-blue-600/30 transition-colors">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Budget - Enhanced */}
                      <div className="bg-black/40 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center gap-2 mb-4">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <h4 className="font-semibold text-white text-lg">Bütçe Planlaması</h4>
                        </div>

                        <div className="space-y-4">
                          {/* Main Budget */}
                          <div className="bg-black/60 rounded-lg p-4 border border-green-500/30 text-center">
                            <div className="text-3xl font-bold text-green-400 mb-1">
                              {campaign.budget.suggested.toLocaleString()} {campaign.budget.currency}
                            </div>
                            <p className="text-green-300 font-medium">Önerilen Aylık Bütçe</p>
                          </div>

                          {/* Budget Breakdown */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-black/60 rounded-lg p-3 border border-green-500/20 text-center">
                              <div className="text-lg font-semibold text-green-300">
                                ~{Math.round(campaign.budget.suggested / 30).toLocaleString()}
                              </div>
                              <p className="text-gray-400 text-xs">Günlük Ortalama</p>
                            </div>
                            <div className="bg-black/60 rounded-lg p-3 border border-green-500/20 text-center">
                              <div className="text-lg font-semibold text-green-300">
                                ~{Math.round(campaign.budget.suggested / 4).toLocaleString()}
                              </div>
                              <p className="text-gray-400 text-xs">Haftalık Ortalama</p>
                            </div>
                          </div>

                          {/* Budget Recommendations */}
                          <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-3">
                            <h5 className="font-medium text-green-300 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              Bütçe Önerileri
                            </h5>
                            <ul className="space-y-1 text-sm text-green-200">
                              <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                <span>İlk hafta test için %50 bütçe kullanın</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                <span>CTR %2'nin altındaysa kreatifi değiştirin</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                <span>İyi performans gösteren campaignları ölçeklendirin</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Variants - Enhanced */}
                    {campaign.variants && campaign.variants.length > 0 && (
                      <div className="bg-black/40 rounded-lg p-4 mb-4 border border-cyan-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Shuffle className="w-5 h-5 text-cyan-400" />
                            <h4 className="font-semibold text-white text-lg">🔄 Alternatif Kampanya Versiyonları</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded">array[{campaign.variants.length}]</code>
                            <span className="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-sm font-medium">
                              {campaign.variants.length} alternatif
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3 text-xs text-cyan-200">
                          A/B Test için hazırlanmış alternatif kampanya metinleri
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-gray-300 text-sm">
                            A/B test için hazırlanmış alternatif kampanya versiyonları. Her biri farklı başlık ve metin kombinasyonu içerir.
                          </p>
                        </div>

                        <div className="grid gap-4">
                          {campaign.variants.map((variant, i) => (
                            <div key={i} className="border border-cyan-500/30 rounded-lg p-4 bg-black/60 hover:bg-black/40 transition-colors">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 bg-cyan-600/30 text-cyan-300 rounded-full flex items-center justify-center text-sm font-bold">
                                    {String.fromCharCode(65 + i)}
                                  </span>
                                  <h5 className="font-medium text-cyan-300">Varyant {String.fromCharCode(65 + i)}</h5>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    onClick={() => copyToClipboard(variant.adText)}
                                    className="p-2 hover:bg-cyan-600/20 rounded text-cyan-300 hover:text-cyan-200 transition-colors"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Variant Headline */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between mb-1">
                                  <h6 className="text-cyan-200 font-medium flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    Alternatif Başlık
                                  </h6>
                                  <code className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded">string</code>
                                </div>
                                <div className="bg-black/40 rounded p-3 border border-cyan-500/20">
                                  <p className="text-white font-medium">{variant.headline}</p>
                                </div>
                              </div>

                              {/* Variant Ad Text */}
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <h6 className="text-cyan-200 font-medium flex items-center gap-2">
                                    <Megaphone className="w-4 h-4" />
                                    Alternatif Reklam Metni
                                  </h6>
                                  <code className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded">string</code>
                                </div>
                                <div className="bg-black/40 rounded p-3 border border-cyan-500/20">
                                  <p className="text-gray-200 leading-relaxed">{variant.adText}</p>
                                </div>
                              </div>

                              {/* Variant Stats Preview */}
                              <div className="mt-3 pt-3 border-t border-cyan-500/20">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-400">
                                    Karakter sayısı: {variant.adText.length}
                                  </span>
                                  <span className="text-gray-400">
                                    {campaign.platform === 'facebook' ? variant.adText.length <= 2200 ? '✓ Facebook uyumlu' : '⚠ Çok uzun' :
                                     campaign.platform === 'google' ? variant.adText.length <= 90 ? '✓ Google uyumlu' : '⚠ Çok uzun' :
                                     campaign.platform === 'tiktok' ? variant.adText.length <= 2200 ? '✓ TikTok uyumlu' : '⚠ Çok uzun' :
                                     '✓ Platform uyumlu'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* A/B Testing Recommendation */}
                        <div className="mt-4 p-3 bg-cyan-600/10 border border-cyan-600/30 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-cyan-400" />
                            <span className="font-medium text-cyan-300">A/B Test Önerisi</span>
                          </div>
                          <p className="text-cyan-200 text-sm">
                            Bu varyantları eşit bütçe ile test ederek en iyi performans gösteren versiyonu belirleyebilirsiniz. 
                            Önerilen test süresi: 7-14 gün.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Policy Notes - Enhanced */}
                    {campaign.policyNotes && campaign.policyNotes.length > 0 && (
                      <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-400" />
                            <h4 className="font-semibold text-white text-lg">⚠️ Platform Kuralları & Uyarılar</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded">array[{campaign.policyNotes.length}]</code>
                            <span className="px-3 py-1 bg-yellow-600/20 text-yellow-300 rounded-full text-sm font-medium">
                              {campaign.policyNotes.length} uyarı
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3 text-xs text-yellow-200">
                          Reklam platformunun kurallarına uygunluk için dikkat edilecek noktalar
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-yellow-200 text-sm">
                            {campaign.platform === 'facebook' ? 'Facebook Reklam Politikaları' :
                             campaign.platform === 'google' ? 'Google Ads Politikaları' :
                             campaign.platform === 'tiktok' ? 'TikTok Reklam Politikaları' : 'Platform Politikaları'} 
                            uyarınca dikkat edilmesi gereken kurallar:
                          </p>
                        </div>

                        <div className="space-y-3">
                          {campaign.policyNotes.map((note, i) => (
                            <div key={i} className="bg-yellow-600/5 border border-yellow-600/20 rounded-lg p-3">
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-yellow-600/30 text-yellow-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                                  {i + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="mb-1">
                                    <span className="text-xs bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded">Kural #{i + 1}</span>
                                  </div>
                                  <p className="text-yellow-100 leading-relaxed">{note}</p>
                                  <div className="mt-2 flex items-center gap-4 text-xs">
                                    <span className="text-yellow-300">
                                      ⚠️ Önemli: Bu kurala uyulmadığı takdirde reklam reddedilebilir
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Policy Action Buttons */}
                        <div className="mt-4 pt-3 border-t border-yellow-600/30">
                          <div className="flex items-center gap-3">
                            <Button className="flex items-center gap-2 px-3 py-2 bg-yellow-600/20 text-yellow-300 rounded-lg hover:bg-yellow-600/30 text-sm">
                              <ExternalLink className="w-4 h-4" />
                              {campaign.platform === 'facebook' ? 'Facebook Politikaları' :
                               campaign.platform === 'google' ? 'Google Ads Politikaları' :
                               campaign.platform === 'tiktok' ? 'TikTok Politikaları' : 'Platform Politikaları'}
                            </Button>
                            <span className="text-yellow-400 text-xs">Detaylı bilgi için platformun resmi politika sayfasını ziyaret edin</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Measurement & Analytics - Enhanced */}
                    {campaign.measurement && (
                      <div className="bg-black/40 rounded-lg p-4 mb-4 border border-indigo-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-indigo-400" />
                            <h4 className="font-semibold text-white text-lg">📊 Performans İzleme & Analitik</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded">object</code>
                            <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full text-sm font-medium">
                              Tracking Ready
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3 text-xs text-indigo-200">
                          Kampanya performansını ölçmek için gerekli izleme kodları ve deneyim önerileri
                        </div>

                        {/* UTM Tracking */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-indigo-300 flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              İzleme Kodu (UTM)
                            </h5>
                            <code className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded">string</code>
                          </div>
                          <div className="bg-black/60 rounded-lg p-3 border border-indigo-500/30">
                            <div className="flex items-center justify-between">
                              <code className="text-indigo-200 text-sm font-mono break-all">{campaign.measurement.utm}</code>
                              <Button
                                onClick={() => copyToClipboard(campaign.measurement?.utm || '')}
                                className="ml-3 p-2 hover:bg-indigo-600/20 rounded text-indigo-300 hover:text-indigo-200 flex-shrink-0"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            Bu UTM kodu sayesinde kampanya trafiği Google Analytics'te izlenebilir
                          </p>
                        </div>

                        {/* UTM Parameters Breakdown */}
                        <div className="mb-4">
                          <h5 className="font-medium text-indigo-300 mb-2">📊 UTM İzleme Parametreleri</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {campaign.measurement.utm.split('&').map((param, i) => {
                              const [key, value] = param.split('=');
                              const paramName = key.replace('utm_', '');
                              return (
                                <div key={i} className="bg-black/60 rounded p-3 border border-indigo-500/20">
                                  <div className="flex items-center justify-between">
                                    <span className="text-indigo-300 font-medium text-sm capitalize">{paramName}:</span>
                                    <span className="text-white text-sm">{value}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* A/B Testing Experiments */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-indigo-300 flex items-center gap-2">
                              <Shuffle className="w-4 h-4" />
                              A/B Test Önerileri
                            </h5>
                            <code className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded">array[{campaign.measurement.experiments.length}]</code>
                          </div>
                          <div className="space-y-3">
                            {campaign.measurement.experiments.map((exp, i) => (
                              <div key={i} className="bg-indigo-600/10 border border-indigo-600/30 rounded-lg p-3">
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-indigo-600/30 text-indigo-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {i + 1}
                                  </div>
                                  <div className="flex-1">
                                    <div className="mb-1">
                                      <span className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded">Test #{i + 1}</span>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">{exp}</p>
                                    <div className="mt-2 flex items-center gap-4 text-xs">
                                      <span className="px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded">
                                        Test Önerisi
                                      </span>
                                      <span className="text-gray-400">
                                        Minimum 100 tık sonrası değerlendirilebilir
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Performance Metrics Preview */}
                        <div className="bg-indigo-600/10 border border-indigo-600/30 rounded-lg p-4">
                          <h5 className="font-medium text-indigo-300 mb-3 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            İzlenecek Performans Metrikleri
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div className="text-center">
                              <div className="text-indigo-200 font-medium">CTR</div>
                              <div className="text-gray-400 text-xs">Tıklama Oranı</div>
                            </div>
                            <div className="text-center">
                              <div className="text-indigo-200 font-medium">CPC</div>
                              <div className="text-gray-400 text-xs">Tık Başına Maliyet</div>
                            </div>
                            <div className="text-center">
                              <div className="text-indigo-200 font-medium">CPM</div>
                              <div className="text-gray-400 text-xs">1000 Gösterim Maliyeti</div>
                            </div>
                            <div className="text-center">
                              <div className="text-indigo-200 font-medium">ROAS</div>
                              <div className="text-gray-400 text-xs">Reklam Harcama Getirisi</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-600/30">
                      <Button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        <Eye className="w-4 h-4" />
                        Önizle
                      </Button>
                      <Button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Target className="w-4 h-4" />
                        Kampanyayı Başlat
                      </Button>
                      <Button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-300 rounded-lg hover:bg-gray-700">
                        <Download className="w-4 h-4" />
                        Detayları İndir
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