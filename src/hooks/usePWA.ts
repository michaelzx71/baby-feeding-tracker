
import { useState, useEffect } from 'react';

export const usePWA = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    const handleNeedRefresh = () => {
      setNeedRefresh(true);
    };

    const handleOfflineReady = () => {
      setOfflineReady(true);
    };

    window.addEventListener('vite-pwa:needrefresh', handleNeedRefresh);
    window.addEventListener('vite-pwa:offlineready', handleOfflineReady);

    return () => {
      window.removeEventListener('vite-pwa:needrefresh', handleNeedRefresh);
      window.removeEventListener('vite-pwa:offlineready', handleOfflineReady);
    };
  }, []);

  const updateServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  };

  return {
    needRefresh,
    offlineReady,
    updateServiceWorker,
  };
};
