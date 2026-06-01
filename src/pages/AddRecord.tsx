
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Volume2, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const AddRecord: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord } = useStore();
  const [amount, setAmount] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );

  const quickAmounts = [60, 90, 120, 150, 180, 210];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    addRecord({
      amount: parseInt(amount),
      timestamp: new Date(timestamp).toISOString(),
      notes: notes || undefined,
    });

    navigate('/');
  };

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
            <h1 className="text-2xl font-bold text-gray-800">添加记录</h1>
            <p className="text-sm text-gray-500">记录宝宝喝奶</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Amount Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary-500" />
              快速选择
            </label>
            <div className="grid grid-cols-3 gap-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => setAmount(quickAmount.toString())}
                  className={`rounded-2xl py-4 shadow-soft transition-all hover:-translate-y-1 font-semibold ${
                    amount === quickAmount.toString()
                      ? 'bg-gradient-to-br from-primary-400 to-accent-400 text-white shadow-card'
                      : 'bg-white text-gray-800 hover:shadow-card'
                  }`}
                >
                  {quickAmount} ml
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary-500" />
              喝奶量 (ml)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="请输入喝奶量"
              className="w-full px-4 py-4 bg-white rounded-2xl shadow-soft border-2 border-transparent focus:border-primary-400 focus:outline-none text-lg transition-all"
              required
            />
          </div>

          {/* Time Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary-500" />
              喝奶时间
            </label>
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full px-4 py-4 bg-white rounded-2xl shadow-soft border-2 border-transparent focus:border-secondary-400 focus:outline-none text-lg transition-all"
              required
            />
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-accent-500" />
              备注 (可选)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="添加备注..."
              rows={3}
              className="w-full px-4 py-4 bg-white rounded-2xl shadow-soft border-2 border-transparent focus:border-accent-400 focus:outline-none resize-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!amount}
            className="w-full bg-gradient-to-br from-green-400 to-green-500 text-white py-4 rounded-2xl font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            保存记录
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecord;
