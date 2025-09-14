import type { ReactNode } from 'react';

export interface IPhone15ProFrameProps {
  children: ReactNode;
  className?: string;
  showStatusBar?: boolean;
  time?: string;
  batteryLevel?: number;
  wifiSignal?: boolean;
  cellularSignal?: boolean;
}

export interface StatusBarProps {
  time: string;
  batteryLevel: number;
  wifiSignal: boolean;
  cellularSignal: boolean;
}