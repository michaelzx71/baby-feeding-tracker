
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
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
          <h1 className="text-2xl font-bold text-gray-800">添加记录</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Amount Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              快速选择
            </label>
            <div className="grid grid-cols-3 gap-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="bg-white rounded-xl py-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all font-semibold text-gray-800"
                >
                  {quickAmount} ml
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              喝奶量 (ml)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="请输入喝奶量"
              className="w-full px-4 py-4 bg-white rounded-xl shadow-md border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none text-lg"
              required
            />
          </div>

          {/* Time Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              喝奶时间
            </label>
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full px-4 py-4 bg-white rounded-xl shadow-md border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none text-lg"
              required
            />
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              备注 (可选)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="添加备注..."
              rows={3}
              className="w-full px-4 py-4 bg-white rounded-xl shadow-md border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!amount}
            className="w-full bg-gradient-to-br from-green-400 to-green-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
