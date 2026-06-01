
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Droplet, Activity, BarChart2 } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">统计数据</h1>
            <p className="text-sm text-gray-500">分析喝奶趋势</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-400 to-primary-500 rounded-3xl p-6 text-white shadow-card">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="relative z-10">
              <Droplet className="w-8 h-8 mb-3 opacity-90" />
              <div className="text-4xl font-bold">{stats.todayTotal}</div>
              <div className="text-sm opacity-90 mt-1">今日总喝奶量 (ml)</div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-3xl p-6 text-white shadow-card">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="relative z-10">
              <Activity className="w-8 h-8 mb-3 opacity-90" />
              <div className="text-4xl font-bold">{stats.todayCount}</div>
              <div className="text-sm opacity-90 mt-1">今日喝奶次数</div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-accent-400 to-accent-500 rounded-3xl p-6 text-white shadow-card">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="relative z-10">
              <TrendingUp className="w-8 h-8 mb-3 opacity-90" />
              <div className="text-4xl font-bold">{stats.avgAmount}</div>
              <div className="text-sm opacity-90 mt-1">平均每次 (ml)</div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-6 text-white shadow-card">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="relative z-10">
              <BarChart2 className="w-8 h-8 mb-3 opacity-90" />
              <div className="text-4xl font-bold">{records.length}</div>
              <div className="text-sm opacity-90 mt-1">总记录数</div>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary-500" />
            近7天喝奶量
          </h2>
          {Object.keys(weeklyStats).length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">📊</div>
              <p className="text-gray-500">暂无数据</p>
              <p className="text-gray-400 text-sm mt-1">开始记录后这里会显示趋势</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(weeklyStats).map(([date, amount]) => (
                <div key={date} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600 font-medium">{date}</div>
                  <div className="flex-1 h-10 bg-gradient-to-r from-primary-50 to-accent-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-400 to-accent-400 rounded-full transition-all duration-700 shadow-sm"
                      style={{ width: `${(amount / maxAmount) * 100}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-bold text-gray-700">
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
