import { useState } from 'react';
import { MainLayout } from './app/shared/layouts/MainLayout';
import { Button } from './components/ui/Button';
import { useLocalStorageService, useAuthService } from './hooks/use-service';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  
  // Dependency injection kullanımı
  const localStorageService = useLocalStorageService();
  const authService = useAuthService();

  const handleSaveToStorage = () => {
    localStorageService.setItem('counter', count);
    setMessage('Counter saved to localStorage!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLoadFromStorage = () => {
    const savedCount = localStorageService.getItem<number>('counter');
    if (savedCount !== null) {
      setCount(savedCount);
      setMessage('Counter loaded from localStorage!');
    } else {
      setMessage('No saved counter found!');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleTestAuth = async () => {
    const isAuth = authService.isAuthenticated();
    setMessage(`Authentication status: ${isAuth ? 'Authenticated' : 'Not authenticated'}`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          React Clean Architecture Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Counter with Dependency Injection</h2>
          
          <div className="text-6xl font-bold text-blue-600 mb-6">
            {count}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button onClick={() => setCount(count + 1)}>
              Increment
            </Button>
            <Button 
              onClick={() => setCount(count - 1)} 
              variant="secondary"
            >
              Decrement
            </Button>
            <Button onClick={() => setCount(0)} variant="danger">
              Reset
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button onClick={handleSaveToStorage} size="sm">
              Save to Storage
            </Button>
            <Button onClick={handleLoadFromStorage} size="sm" variant="secondary">
              Load from Storage
            </Button>
            <Button onClick={handleTestAuth} size="sm" variant="secondary">
              Test Auth Service
            </Button>
          </div>
          
          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
              {message}
            </div>
          )}
        </div>
        
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Architecture Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>✅ Clean Architecture</div>
            <div>✅ Dependency Injection</div>
            <div>✅ TypeScript</div>
            <div>✅ Tailwind CSS</div>
            <div>✅ React + Vite</div>
            <div>✅ Modular Structure</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App
