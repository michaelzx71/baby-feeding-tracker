
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FeedingRecord, Stats } from '../types';

interface Store {
  records: FeedingRecord[];
  addRecord: (record: Omit<FeedingRecord, 'id'>) => void;
  deleteRecord: (id: string) => void;
  getStats: () => Stats;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      records: [],
      
      addRecord: (record) => {
        set((state) => ({
          records: [
            {
              ...record,
              id: Date.now().toString(),
            },
            ...state.records,
          ],
        }));
      },
      
      deleteRecord: (id) => {
        set((state) => ({
          records: state.records.filter((r) => r.id !== id),
        }));
      },
      
      getStats: () => {
        const { records } = get();
        const today = new Date().toDateString();
        
        const todayRecords = records.filter(
          (r) => new Date(r.timestamp).toDateString() === today
        );
        
        const todayTotal = todayRecords.reduce((sum, r) => sum + r.amount, 0);
        const avgAmount = records.length > 0 
          ? Math.round(records.reduce((sum, r) => sum + r.amount, 0) / records.length)
          : 0;
        
        return {
          todayTotal,
          todayCount: todayRecords.length,
          avgAmount,
          records: todayRecords,
        };
      },
    }),
    {
      name: 'feeding-storage',
    }
  )
);
