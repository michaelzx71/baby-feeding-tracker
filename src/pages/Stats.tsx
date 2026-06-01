
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Droplets, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';

const Stats: React.FC = () => {
  const navigate = useNavigate();
  const { records, getStats } = useStore();
  const stats = getStats();

  // Calculate weekly stats
  const getWeeklyStats = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyRecords = records.filter(
      (r) => new Date(r.timestamp) >= weekAgo
    );
    
    const dailyTotals: Record<string, number> = {};
    weeklyRecords.forEach((record) => {
      const date = new Date(record.timestamp).toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric',
      });
      dailyTotals[date] = (dailyTotals[date] || 0) + record.amount;
    });
    
    return dailyTotals;
  };

  const weeklyStats = getWeeklyStats();
  const maxAmount = Math.max(...Object.values(weeklyStats), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">统计数据</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <Droplets className="w-8 h-8 mb-3 opacity-90" />
            <div className="text-3xl font-bold">{stats.todayTotal}</div>
            <div className="text-sm opacity-90">今日总喝奶量(ml)</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
            <Activity className="w-8 h-8 mb-3 opacity-90" />
            <div className="text-3xl font-bold">{stats.todayCount}</div>
            <div className="text-sm opacity-90">今日喝奶次数</div>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-6 text-white shadow-lg">
            <TrendingUp className="w-8 h-8 mb-3 opacity-90" />
            <div className="text-3xl font-bold">{stats.avgAmount}</div>
            <div className="text-sm opacity-90">平均每次(ml)</div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-3xl font-bold">{records.length}</div>
            <div className="text-sm opacity-90">总记录数</div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">近7天喝奶量</h2>
          {Object.keys(weeklyStats).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              暂无数据
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(weeklyStats).map(([date, amount]) => (
                <div key={date} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600">{date}</div>
                  <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-500"
                      style={{ width: `${(amount / maxAmount) * 100}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-semibold text-gray-700">
                    {amount}ml
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
