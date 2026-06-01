
export interface FeedingRecord {
  id: string;
  amount: number; // 喝奶量(ml)
  timestamp: string; // ISO时间字符串
  notes?: string; // 备注
}

export interface Stats {
  todayTotal: number;
  todayCount: number;
  avgAmount: number;
  records: FeedingRecord[];
}
