export function useLocalStorage() {
  return {
    getItem<T>(key: string): T | null {
      try {
        const val = localStorage.getItem(key);
        return val ? (JSON.parse(val) as T) : null;
      } catch {
        return null;
      }
    },
    setItem<T>(key: string, value: T) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
    },
    removeItem(key: string) {
      try { localStorage.removeItem(key); } catch {}
    },
    clear() { try { localStorage.clear(); } catch {} }
  } as any;
}

