
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Calendar, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

const History: React.FC = () => {
  const navigate = useNavigate();
  const { records, deleteRecord } = useStore();

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Group records by date
  const groupedRecords = records.reduce((acc, record) => {
    const date = new Date(record.timestamp).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {} as Record<string, typeof records>);

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
            <h1 className="text-2xl font-bold text-gray-800">历史记录</h1>
            <p className="text-sm text-gray-500">查看所有喝奶记录</p>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-soft">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500">还没有任何记录</p>
            <p className="text-gray-400 text-sm mt-1">快去添加第一条记录吧</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedRecords).map(([dateStr, dateRecords]) => (
              <div key={dateStr}>
                <h2 className="text-sm font-semibold text-gray-600 mb-3 px-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-500" />
                  {formatDate(dateRecords[0].timestamp)}
                </h2>
                <div className="space-y-3">
                  {dateRecords.map((record) => (
                    <div
                      key={record.id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft hover:shadow-card transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🍼</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-800 text-lg">
                              {record.amount} ml
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(record.timestamp)}
                            </div>
                            {record.notes && (
                              <div className="text-xs text-gray-400 mt-1">
                                {record.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
