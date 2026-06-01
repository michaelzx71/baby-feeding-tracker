
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, History, BarChart3, Baby } from 'lucide-react';
import { useStore } from '../store/useStore';

const Home: React.FC = () => {
  const { getStats, records } = useStore();
  const stats = getStats();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Baby className="w-12 h-12 text-pink-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">喝奶记录</h1>
          <p className="text-gray-500 mt-2">记录宝宝的每一次喝奶</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-3xl font-bold">{stats.todayTotal}</div>
            <div className="text-sm opacity-90">今日总喝奶量(ml)</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-3xl font-bold">{stats.todayCount}</div>
            <div className="text-sm opacity-90">今日喝奶次数</div>
          </div>
        </div>

        {/* Today's Records */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">今日记录</h2>
          {stats.records.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <p className="text-gray-500">今天还没有喝奶记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.records.slice(0, 5).map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-xl p-4 shadow-md flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold text-gray-800">{record.amount} ml</div>
                    <div className="text-sm text-gray-500">{formatTime(record.timestamp)}</div>
                  </div>
                  <div className="text-2xl">🍼</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <Link
          to="/add"
          className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <PlusCircle className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold">添加记录</div>
        </Link>
        <Link
          to="/history"
          className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <History className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold">历史记录</div>
        </Link>
        <Link
          to="/stats"
          className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <BarChart3 className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold">统计数据</div>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
