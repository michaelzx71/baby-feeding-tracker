
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, History, BarChart3, Baby, Droplet } from 'lucide-react';
import { useStore } from '../store/useStore';

const Home: React.FC = () => {
  const { getStats } = useStore();
  const stats = getStats();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full shadow-card mb-4 animate-float">
            <Baby className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            宝宝喝奶记录
          </h1>
          <p className="text-gray-500 mt-2">记录每一次温馨时刻</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-400 to-primary-500 rounded-3xl p-6 text-white shadow-card">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="relative z-10">
              <Droplet className="w-8 h-8 mb-3 opacity-90" />
              <div className="text-4xl font-bold mb-1">{stats.todayTotal}</div>
              <div className="text-sm opacity-90">今日总喝奶量 (ml)</div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-3xl p-6 text-white shadow-card">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="relative z-10">
              <PlusCircle className="w-8 h-8 mb-3 opacity-90" />
              <div className="text-4xl font-bold mb-1">{stats.todayCount}</div>
              <div className="text-sm opacity-90">今日喝奶次数</div>
            </div>
          </div>
        </div>

        {/* Today's Records */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
            今日记录
          </h2>
          {stats.records.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-soft">
              <div className="text-5xl mb-4">🍼</div>
              <p className="text-gray-500">今天还没有喝奶记录</p>
              <p className="text-gray-400 text-sm mt-1">点击下方按钮开始记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.records.slice(0, 5).map((record, index) => (
                <div
                  key={record.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🍼</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-lg">{record.amount} ml</div>
                        <div className="text-sm text-gray-500">{formatTime(record.timestamp)}</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <Link
            to="/add"
            className="group relative overflow-hidden bg-gradient-to-br from-green-400 to-green-500 rounded-3xl p-6 text-white text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlusCircle className="w-7 h-7" />
              </div>
              <div className="font-semibold">添加记录</div>
            </div>
          </Link>
          <Link
            to="/history"
            className="group relative overflow-hidden bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl p-6 text-white text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <History className="w-7 h-7" />
              </div>
              <div className="font-semibold">历史记录</div>
            </div>
          </Link>
          <Link
            to="/stats"
            className="group relative overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-6 text-white text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7" />
              </div>
              <div className="font-semibold">统计数据</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
