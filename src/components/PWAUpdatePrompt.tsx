
import React from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export const PWAUpdatePrompt: React.FC = () => {
  const { needRefresh, offlineReady, updateServiceWorker } = usePWA();

  if (needRefresh) {
    return (
      <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-2xl p-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">有新版本可用！</h3>
              <p className="text-xs opacity-90 mt-1">点击更新获取最新功能</p>
            </div>
            <button 
              onClick={updateServiceWorker}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              更新
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (offlineReady) {
    return (
      <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-2xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">应用已就绪！</h3>
              <p className="text-xs opacity-90 mt-1">现在可以离线使用了</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
