export interface KPIMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  subMetric?: {
    label: string;
    value: string;
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface StatCard {
  icon: string;
  value: string;
  label: string;
  progress?: number;
}

export interface Transaction {
  orderId: string;
  date: string;
  amount: string;
  paymentType: string;
  requestType: string;
  status: string;
  statusCode: string;
}

export interface AdAccount {
  id: string;
  name: string;
  status: 'approved' | 'pending' | 'disabled';
  balance: string;
  currency: string;
}

export interface FilterCondition {
  field: string;
  operator: string;
  value: string;
}

export interface RuleAction {
  type: string;
  value: string;
  maxBudget?: string;
  frequency?: string;
}
