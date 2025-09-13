# React Clean Architecture

Angular projesinden esinlenerek oluşturulmuş, clean architecture prensiplerine uygun React + TypeScript projesi.

## 🏗️ Mimari Özellikleri

- **Clean Architecture**: Modüler ve sürdürülebilir kod yapısı
- **Dependency Injection**: Inversify ile güçlü DI sistemi
- **TypeScript**: Güçlü tip kontrolü ve geliştirici deneyimi
- **Tailwind CSS**: Modern ve responsive UI tasarımı
- **Vite**: Hızlı geliştirme ve build süreci

## 📁 Klasör Yapısı

```
src/
├── app/                    # Uygulama core modülleri
│   ├── core/              # Core servisler ve konfigürasyonlar
│   │   ├── config/        # DI container ve servis tanımlamaları
│   │   ├── guards/        # Route guard'ları
│   │   ├── interceptors/  # HTTP interceptor'ları
│   │   └── services/      # Core servisler
│   └── shared/            # Paylaşılan modüller
│       ├── components/    # Paylaşılan componentler
│       ├── layouts/       # Layout componentleri
│       └── store/         # State management
├── components/            # UI componentleri
│   └── ui/               # Temel UI elementleri
├── pages/                # Sayfa componentleri
├── services/             # Business servisler
│   ├── api/              # API servisleri
│   └── auth/             # Authentication servisleri
├── store/                # Global state management
├── types/                # TypeScript tip tanımlamaları
├── utils/                # Yardımcı fonksiyonlar
└── hooks/                # Custom React hook'ları
```

## 🚀 Başlangıç

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum

1. Projeyi klonlayın
2. Dependency'leri yükleyin:
   ```bash
   npm install
   ```

3. Environment dosyasını oluşturun:
   ```bash
   cp .env.example .env
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## 📖 Dependency Injection Kullanımı

### Service Tanımlama

```typescript
@injectable()
export class MyService implements IMyService {
  constructor(
    @inject(SERVICE_IDENTIFIERS.ApiService) 
    private apiService: IApiService
  ) {}
  
  async getData(): Promise<any> {
    return this.apiService.get('/data');
  }
}
```

### Component'te Kullanım

```typescript
import { useService } from './hooks/use-service';
import { SERVICE_IDENTIFIERS } from './app/core/config/service-identifiers';

function MyComponent() {
  const myService = useService<IMyService>(SERVICE_IDENTIFIERS.MyService);
  
  const handleClick = async () => {
    const data = await myService.getData();
    // ...
  };
  
  return <button onClick={handleClick}>Get Data</button>;
}
```

## 🔧 Kullanılan Teknolojiler

- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **Tailwind CSS** - CSS framework
- **Inversify** - Dependency injection
- **Reflect Metadata** - Decorator desteği

## 📜 Scripts

- `npm run dev` - Geliştirme sunucusunu başlatır
- `npm run build` - Production build oluşturur
- `npm run preview` - Build'i önizler
- `npm run lint` - ESLint kontrolü yapar

## 🎯 Sonraki Adımlar

- React Router ile routing sistemi
- Zustand/Redux Toolkit ile state management
- React Query ile data fetching
- Testing setup (Jest/Vitest + Testing Library)
- Storybook ile component documentation

## 📝 Lisans

MIT