"use client";

import { useSyncExternalStore } from "react";

export type AssetClass = "Equity" | "FX" | "Commodity" | "Crypto" | "Bond";

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  sector: AssetClass;
  price: number;
  changePct: number;
  volume: number;
  confidence: number;
  sentiment: -1 | 0 | 1;
  correlation: number;
  history: number[];
};

export type Signal = {
  id: string;
  symbol: string;
  text: string;
  confidence: number;
  timestamp: string;
};

type TradeMonitorState = {
  assets: Asset[];
  selectedAssetId: string;
  signals: Signal[];
  pulse: number;
};

type Store = {
  getState: () => TradeMonitorState;
  subscribe: (listener: () => void) => () => void;
  tick: () => void;
  selectAsset: (id: string) => void;
};

const seedAssets: Asset[] = [
  ["SPX", "S&P 500 Futures", "Equity"],
  ["NQ", "Nasdaq Futures", "Equity"],
  ["DXY", "US Dollar Index", "FX"],
  ["CL", "Crude Oil", "Commodity"],
  ["XAU", "Gold Spot", "Commodity"],
  ["BTC", "Bitcoin", "Crypto"],
  ["ETH", "Ethereum", "Crypto"],
  ["US10Y", "US 10Y Yield", "Bond"],
  ["EURUSD", "Euro / Dollar", "FX"],
  ["JPYUSD", "Yen / Dollar", "FX"],
].map(([symbol, name, sector], index) => ({
  id: symbol,
  symbol,
  name,
  sector: sector as AssetClass,
  price: 80 + Math.random() * 900 + index * 12,
  changePct: Math.random() * 2 - 1,
  volume: 120_000 + Math.floor(Math.random() * 1_500_000),
  confidence: 40 + Math.round(Math.random() * 55),
  sentiment: [-1, 0, 1][Math.floor(Math.random() * 3)] as -1 | 0 | 1,
  correlation: Math.round((Math.random() * 2 - 1) * 100) / 100,
  history: Array.from({ length: 24 }, () => 80 + Math.random() * 100),
}));

const signalTemplates = [
  "Momentum acceleration detected",
  "Cross-asset divergence widened",
  "Liquidity sweep through local highs",
  "Macro headline volatility spike",
  "Sentiment regime shifted bullish",
  "Mean-reversion probability rising",
];

function pushSignal(state: TradeMonitorState, symbol: string, confidence: number): Signal[] {
  const template = signalTemplates[Math.floor(Math.random() * signalTemplates.length)];
  const signal: Signal = {
    id: `${Date.now()}-${Math.random()}`,
    symbol,
    text: template,
    confidence,
    timestamp: new Date().toLocaleTimeString(),
  };
  return [signal, ...state.signals].slice(0, 20);
}

function createStore(): Store {
  let state: TradeMonitorState = {
    assets: seedAssets,
    selectedAssetId: seedAssets[0].id,
    signals: [],
    pulse: 0,
  };

  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());

  return {
    getState: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    selectAsset: (id) => {
      state = { ...state, selectedAssetId: id };
      emit();
    },
    tick: () => {
      const shuffled = [...state.assets].sort(() => Math.random() - 0.5);
      const leader = shuffled[0];

      const nextAssets = state.assets.map((asset) => {
        const drift = (Math.random() - 0.5) * 0.9;
        const nextPrice = Math.max(1, asset.price * (1 + drift / 100));
        const nextChange = Math.max(-4.5, Math.min(4.5, asset.changePct + drift * 0.65));

        return {
          ...asset,
          price: nextPrice,
          changePct: nextChange,
          confidence: Math.max(15, Math.min(99, asset.confidence + Math.round((Math.random() - 0.5) * 8))),
          sentiment: nextChange > 0.8 ? 1 : nextChange < -0.8 ? -1 : 0,
          volume: Math.max(10000, asset.volume + Math.round((Math.random() - 0.45) * 120000)),
          correlation: Math.max(-1, Math.min(1, asset.correlation + (Math.random() - 0.5) * 0.08)),
          history: [...asset.history.slice(-23), nextPrice],
        };
      });

      state = {
        ...state,
        assets: nextAssets.sort((a, b) => b.confidence - a.confidence),
        pulse: state.pulse + 1,
        signals: leader ? pushSignal(state, leader.symbol, leader.confidence) : state.signals,
      };

      emit();
    },
  };
}

const tradeMonitorStore = createStore();

export function useTradeMonitorStore<T>(selector: (state: TradeMonitorState) => T): T {
  return useSyncExternalStore(
    tradeMonitorStore.subscribe,
    () => selector(tradeMonitorStore.getState()),
    () => selector(tradeMonitorStore.getState()),
  );
}

export const tradeMonitorActions = {
  tick: tradeMonitorStore.tick,
  selectAsset: tradeMonitorStore.selectAsset,
};
