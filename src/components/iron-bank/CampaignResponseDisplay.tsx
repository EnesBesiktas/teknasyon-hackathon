import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  Eye, 
  EyeOff, 
  Code, 
  Database,
  Layers,
  Target,
  MessageCircle,
  Shield,
  BarChart3,
  Shuffle,
  Lightbulb,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Button } from '../ui/Button';

interface CampaignResponseData {
  video_id: number;
  campaigns: Array<{
    country_code: string;
    country_name: string;
    platform: string;
    campaign: {
      platform: string;
      adText: string;
      targeting: {
        ageRange: string;
        interests: string[];
        demographics: string | string[];
        location?: string;
      };
      budget: {
        suggested: number;
        currency: string;
      };
      call_to_action: string;
      creative: {
        aspect_ratio: string;
        headline: string;
        hashtags: string[];
      };
      policy_notes: string[];
      measurement: {
        utm: string;
        experiments: string[];
      };
    };
    variants: Array<{
      adText: string;
      headline: string;
    }>;
  }>;
  compact: Array<{
    country: string;
    platform: string;
    adText: string;
    targeting: {
      ageRange: string;
      interests: string[];
      demographics: string | string[];
      location?: string;
    };
    budget: {
      suggested: number;
      currency: string;
    };
  }>;
}

interface CampaignResponseDisplayProps {
  data: CampaignResponseData;
  className?: string;
}

const CollapsibleSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerColor?: string;
}> = ({ title, icon, children, defaultOpen = false, className = "", headerColor = "border-gray-500/30" }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-black/40 rounded-lg border ${headerColor} ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-black/20 transition-colors rounded-t-lg"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-600/30">
          {children}
        </div>
      )}
    </div>
  );
};

const JsonField: React.FC<{
  fieldName: string;
  value: string | number | string[] | Record<string, unknown> | unknown[];
  fieldType: string;
  description?: string;
  color?: string;
}> = ({ fieldName, value, fieldType, description, color = "gray" }) => {
  const colorClasses = {
    orange: "text-orange-300 bg-orange-600/20 border-orange-500/30",
    green: "text-green-300 bg-green-600/20 border-green-500/30",
    blue: "text-blue-300 bg-blue-600/20 border-blue-500/30",
    purple: "text-purple-300 bg-purple-600/20 border-purple-500/30",
    cyan: "text-cyan-300 bg-cyan-600/20 border-cyan-500/30",
    yellow: "text-yellow-300 bg-yellow-600/20 border-yellow-500/30",
    red: "text-red-300 bg-red-600/20 border-red-500/30",
    gray: "text-gray-300 bg-gray-600/20 border-gray-500/30"
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.gray;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderValue = () => {
    if (Array.isArray(value)) {
      return (
        <div className="space-y-2">
          {value.map((item, index) => (
            <div key={index} className="bg-black/40 rounded p-2 text-sm">
              <span className="text-gray-400">[{index}]</span>{" "}
              <span className="text-white">
                {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
              </span>
            </div>
          ))}
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div className="bg-black/40 rounded p-3">
          <pre className="text-sm text-white whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      );
    } else {
      return (
        <div className="bg-black/40 rounded p-3">
          <span className="text-white">{String(value)}</span>
        </div>
      );
    }
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClass}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          <code className="font-mono text-sm font-semibold">{fieldName}</code>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
            {fieldType}
          </span>
          <Button
            onClick={() => copyToClipboard(typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value))}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {description && (
        <p className="text-xs text-gray-400 mb-3">{description}</p>
      )}
      
      {renderValue()}
    </div>
  );
};

export const CampaignResponseDisplay: React.FC<CampaignResponseDisplayProps> = ({ 
  data, 
  className = "" 
}) => {
  const [showRawJson, setShowRawJson] = useState(false);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-orange-500/50 p-6 hover-flames">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-orange-400" />
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                🔥 Campaign Response Structure
              </h2>
              <p className="text-orange-200 drop-shadow-lg">
                Backend API'dan dönen pazarlama kampanyası verilerinin detaylı yapısı
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowRawJson(!showRawJson)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showRawJson 
                  ? 'bg-orange-600 text-white border-orange-500' 
                  : 'bg-black/30 text-orange-300 border-orange-500/50 hover:bg-orange-600/20'
              }`}
            >
              {showRawJson ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showRawJson ? 'Raw JSON Gizle' : 'Raw JSON Göster'}
            </Button>
          </div>
        </div>

        {/* Response Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/40 rounded-lg p-4 border border-orange-500/30 text-center">
            <div className="text-2xl font-bold text-orange-400">{data.video_id}</div>
            <div className="text-sm text-gray-300">Video ID</div>
          </div>
          <div className="bg-black/40 rounded-lg p-4 border border-orange-500/30 text-center">
            <div className="text-2xl font-bold text-orange-400">{data.campaigns.length}</div>
            <div className="text-sm text-gray-300">Total Campaigns</div>
          </div>
          <div className="bg-black/40 rounded-lg p-4 border border-orange-500/30 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {[...new Set(data.campaigns.map(c => c.country_code))].length}
            </div>
            <div className="text-sm text-gray-300">Countries</div>
          </div>
        </div>
      </div>

      {/* Raw JSON View */}
      {showRawJson && (
        <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-gray-500/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-white">Raw JSON Response</h3>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Response Structure Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-orange-400" />
          📊 API Yanıt Yapısı - Detaylı İnceleme
        </h3>

        {/* Video ID Field */}
        <JsonField
          fieldName="🎬 Video Kimliği (video_id)"
          value={data.video_id}
          fieldType="number"
          description="İşlenen videonun sistemdeki benzersiz kimlik numarası"
          color="orange"
        />

        {/* Campaigns Array */}
        <CollapsibleSection
          title={`🎯 Kampanya Listesi - Tüm Ülke ve Platform Kombinasyonları (${data.campaigns.length} adet)`}
          icon={<Target className="w-6 h-6 text-blue-400" />}
          headerColor="border-blue-500/30"
          defaultOpen={true}
        >
          <div className="space-y-6">
            <p className="text-blue-200 text-sm mb-4">
              Her ülke ve platform kombinasyonu için detaylı kampanya verilerini içeren ana dizi.
            </p>

            {data.campaigns.map((campaign, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4 bg-black/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-blue-600/30 text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">
                    {index}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">
                      campaigns[{index}] - {campaign.country_name} / {campaign.platform}
                    </h4>
                    <p className="text-blue-300 text-sm">
                      {campaign.country_code} pazarı için {campaign.platform} kampanyası
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {/* Basic Campaign Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <JsonField
                      fieldName="🌍 Ülke Kodu (country_code)"
                      value={campaign.country_code}
                      fieldType="string"
                      description="ISO standardı ülke kodu (TR, US, DE vb.)"
                      color="blue"
                    />
                    <JsonField
                      fieldName="🏴 Ülke Adı (country_name)"
                      value={campaign.country_name}
                      fieldType="string"
                      description="Hedef ülkenin tam adı"
                      color="blue"
                    />
                    <JsonField
                      fieldName="📱 Platform (platform)"
                      value={campaign.platform}
                      fieldType="string"
                      description="Hangi reklam platformu (Facebook, Google, TikTok)"
                      color="blue"
                    />
                  </div>

                      {/* Campaign Object */}
                  <CollapsibleSection
                    title="🎯 Kampanya Detayları - Ana Reklam Bilgileri"
                    icon={<MessageCircle className="w-5 h-5 text-green-400" />}
                    headerColor="border-green-500/30"
                    defaultOpen={true}
                  >
                    <div className="space-y-4">
                      {/* Ad Text */}
                      <JsonField
                        fieldName="📝 Reklam Metni (adText)"
                        value={campaign.campaign.adText}
                        fieldType="string"
                        description="Ana reklam metni - kullanıcıların göreceği açıklama"
                        color="green"
                      />

                      {/* Call to Action */}
                      <JsonField
                        fieldName="🔗 Eylem Butonu (call_to_action)"
                        value={campaign.campaign.call_to_action}
                        fieldType="string"
                        description="Kullanıcı tıklayacağı buton metni (Şimdi Al, Daha Fazla Bilgi vb.)"
                        color="green"
                      />

                      {/* Targeting */}
                      <CollapsibleSection
                        title="🎯 Hedef Kitle Ayarları - Kime Göstereceğiz"
                        icon={<Target className="w-5 h-5 text-purple-400" />}
                        headerColor="border-purple-500/30"
                        defaultOpen={true}
                      >
                        <div className="grid gap-3">
                          <JsonField
                            fieldName="👥 Yaş Grubu (ageRange)"
                            value={campaign.campaign.targeting.ageRange}
                            fieldType="string"
                            description="Hedef yaş aralığı (örn: 25-45)"
                            color="purple"
                          />
                          <JsonField
                            fieldName="💡 İlgi Alanları (interests)"
                            value={campaign.campaign.targeting.interests}
                            fieldType={`array[${campaign.campaign.targeting.interests.length}]`}
                            description="Hedef kitlenin ilgilendiği konular ve hobiler"
                            color="purple"
                          />
                          <JsonField
                            fieldName="📊 Demografik Profil (demographics)"
                            value={campaign.campaign.targeting.demographics}
                            fieldType={Array.isArray(campaign.campaign.targeting.demographics) ? "array" : "string"}
                            description="Gelir seviyesi, eğitim durumu, meslek grubu"
                            color="purple"
                          />
                          {campaign.campaign.targeting.location && (
                            <JsonField
                              fieldName="📍 Coğrafi Hedef (location)"
                              value={campaign.campaign.targeting.location}
                              fieldType="string"
                              description="Hangi şehir/bölgede gösterilecek"
                              color="purple"
                            />
                          )}
                        </div>
                      </CollapsibleSection>

                      {/* Budget */}
                      <CollapsibleSection
                        title="💰 Bütçe Planlaması - Ne Kadar Harcayacağız"
                        icon={<DollarSign className="w-5 h-5 text-green-400" />}
                        headerColor="border-green-500/30"
                        defaultOpen={true}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <JsonField
                            fieldName="💰 Önerilen Tutar (suggested)"
                            value={campaign.campaign.budget.suggested}
                            fieldType="number"
                            description="AI'nin önerdiği aylık kampanya bütçesi"
                            color="green"
                          />
                          <JsonField
                            fieldName="💱 Para Birimi (currency)"
                            value={campaign.campaign.budget.currency}
                            fieldType="string"
                            description="Hangi para biriminde (TRY, USD, EUR)"
                            color="green"
                          />
                        </div>
                      </CollapsibleSection>

                      {/* Creative */}
                      <CollapsibleSection
                        title="🎨 Tasarım ve Yaratım - Görsel İçerik Detayları"
                        icon={<Lightbulb className="w-5 h-5 text-purple-400" />}
                        headerColor="border-purple-500/30"
                        defaultOpen={true}
                      >
                        <div className="space-y-3">
                          <JsonField
                            fieldName="📐 Video Formatı (aspect_ratio)"
                            value={campaign.campaign.creative.aspect_ratio}
                            fieldType="string"
                            description="Video/görsel en-boy oranı (1:1=kare, 16:9=yatay, 9:16=dikey)"
                            color="purple"
                          />
                          <JsonField
                            fieldName="📰 Ana Başlık (headline)"
                            value={campaign.campaign.creative.headline}
                            fieldType="string"
                            description="Reklamda büyük puntolarla görünecek çekici başlık"
                            color="purple"
                          />
                          <JsonField
                            fieldName="🏷️ Hashtag'ler (hashtags)"
                            value={campaign.campaign.creative.hashtags}
                            fieldType={`array[${campaign.campaign.creative.hashtags.length}]`}
                            description="Sosyal medyada keşfedilebilirlik için kullanılacak etiketler"
                            color="purple"
                          />
                        </div>
                      </CollapsibleSection>

                      {/* Policy Notes */}
                      <CollapsibleSection
                        title="⚠️ Platform Kuralları - Dikkat Edilmesi Gerekenler"
                        icon={<Shield className="w-5 h-5 text-yellow-400" />}
                        headerColor="border-yellow-500/30"
                        defaultOpen={true}
                      >
                        <div className="space-y-3">
                          <p className="text-yellow-200 text-sm">
                            Platform politikalarına uygunluk için dikkat edilmesi gereken kurallar ve öneriler.
                          </p>
                          <JsonField
                            fieldName="⚠️ Politika Uyarıları (policy_notes)"
                            value={campaign.campaign.policy_notes}
                            fieldType={`array[${campaign.campaign.policy_notes.length}]`}
                            description="Platform kurallarına uyum için dikkat edilecek noktalar"
                            color="yellow"
                          />
                          
                          <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
                            <h5 className="font-medium text-yellow-300 mb-3 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              ⚠️ Politika Kuralları Detayları
                            </h5>
                            <div className="space-y-2">
                              {campaign.campaign.policy_notes.map((note, i) => (
                                <div key={i} className="flex items-start gap-3 bg-yellow-600/5 rounded p-3">
                                  <span className="w-6 h-6 bg-yellow-600/30 text-yellow-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {i + 1}
                                  </span>
                                  <div>
                                    <code className="text-xs bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded">
                                      policy_notes[{i}]
                                    </code>
                                    <p className="text-yellow-100 mt-1 text-sm">{note}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CollapsibleSection>

                      {/* Measurement */}
                      <CollapsibleSection
                        title="📊 Ölçümleme ve Analitik - Kampanya Takibi"
                        icon={<BarChart3 className="w-5 h-5 text-cyan-400" />}
                        headerColor="border-cyan-500/30"
                        defaultOpen={true}
                      >
                        <div className="space-y-3">
                          <JsonField
                            fieldName="📊 İzleme Kodu (utm)"
                            value={campaign.campaign.measurement.utm}
                            fieldType="string"
                            description="Google Analytics'te kampanyayı takip etmek için kullanılacak UTM kodları"
                            color="cyan"
                          />
                          <JsonField
                            fieldName="🧪 Test Önerileri (experiments)"
                            value={campaign.campaign.measurement.experiments}
                            fieldType={`array[${campaign.campaign.measurement.experiments.length}]`}
                            description="Kampanya performansını iyileştirmek için yapılacak A/B testleri"
                            color="cyan"
                          />
                        </div>
                      </CollapsibleSection>
                    </div>
                  </CollapsibleSection>

                  {/* Variants */}
                  <CollapsibleSection
                    title={`🔄 Kampanya Alternatifleri - A/B Test Versiyonları (${campaign.variants.length} adet)`}
                    icon={<Shuffle className="w-5 h-5 text-cyan-400" />}
                    headerColor="border-cyan-500/30"
                    defaultOpen={true}
                  >
                    <div className="space-y-4">
                      <p className="text-cyan-200 text-sm">
                        A/B test için hazırlanmış alternatif kampanya versiyonları.
                      </p>
                      
                      {campaign.variants.map((variant, vIndex) => (
                        <div key={vIndex} className="border border-cyan-500/30 rounded-lg p-4 bg-black/20">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 bg-cyan-600/30 text-cyan-300 rounded-full flex items-center justify-center text-sm font-bold">
                              {String.fromCharCode(65 + vIndex)}
                            </span>
                            <h5 className="font-medium text-cyan-300">
                              variants[{vIndex}] - Variant {String.fromCharCode(65 + vIndex)}
                            </h5>
                          </div>
                          
                            <div className="space-y-3">
                            <JsonField
                              fieldName={`📝 Alternatif Metin ${vIndex+1} (adText)`}
                              value={variant.adText}
                              fieldType="string"
                              description="Bu varyantın reklam metni - ana metinle karşılaştırmalı test için"
                              color="cyan"
                            />
                            <JsonField
                              fieldName={`📰 Alternatif Başlık ${vIndex+1} (headline)`}
                              value={variant.headline}
                              fieldType="string"
                              description="Bu varyantın başlığı - hangi başlığın daha etkili olduğunu test etmek için"
                              color="cyan"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Compact Array */}
        <CollapsibleSection
          title={`📋 Özet Bilgiler - Hızlı Erişim Formatı (${data.compact.length} adet)`}
          icon={<Layers className="w-6 h-6 text-gray-400" />}
          headerColor="border-gray-500/30"
          defaultOpen={false}
        >
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">
              Hızlı erişim için sadeleştirilmiş kampanya verilerini içeren dizi.
            </p>
            <JsonField
              fieldName="📋 Hızlı Erişim Verisi (compact)"
              value={data.compact}
              fieldType={`array[${data.compact.length}]`}
              description="Mobil uygulamalar ve API entegrasyonu için sadeleştirilmiş kampanya verisi"
              color="gray"
            />
          </div>
        </CollapsibleSection>
      </div>

      {/* Implementation Guide */}
      <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-green-500/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-bold text-white">Implementation Guide</h3>
        </div>
        <div className="space-y-3 text-sm text-green-200">
          <p>
            <strong>Frontend Integration:</strong> Bu yapı direkt React state'ine aktarılarak kullanılabilir.
          </p>
          <p>
            <strong>Backend Compatibility:</strong> Response'daki tüm alanlar backend API'dan gelmektedir.
          </p>
          <p>
            <strong>Campaign Management:</strong> Her campaign objesi bağımsız olarak platform API'larına gönderilebilir.
          </p>
          <p>
            <strong>A/B Testing:</strong> Variants array'i kullanılarak farklı versiyonlar test edilebilir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignResponseDisplay;
