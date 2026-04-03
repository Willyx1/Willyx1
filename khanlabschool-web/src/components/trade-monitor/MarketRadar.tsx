"use client";

import { tradeMonitorActions, useTradeMonitorStore } from "@/lib/tradeMonitorStore";

const formatChange = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

export function MarketRadar() {
  const assets = useTradeMonitorStore((s) => s.assets);
  const selectedAssetId = useTradeMonitorStore((s) => s.selectedAssetId);

  return (
    <section className="panel-shell flex h-full flex-col">
      <header className="panel-header">
        <h2>Market Radar</h2>
        <span>Ranked confidence</span>
      </header>
      <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
        {assets.map((asset, idx) => {
          const positive = asset.changePct >= 0;
          const active = selectedAssetId === asset.id;
          return (
            <button
              key={asset.id}
              onClick={() => tradeMonitorActions.selectAsset(asset.id)}
              className={`w-full rounded-md border p-3 text-left transition-all duration-200 ${
                active
                  ? "border-cyan-400/90 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-white/50">
                <span>#{idx + 1}</span>
                <span>{asset.sector}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm text-white">{asset.symbol}</p>
                  <p className="text-xs text-white/60">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-white">{asset.price.toFixed(2)}</p>
                  <p className={`text-xs font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`}>
                    {formatChange(asset.changePct)}
                  </p>
                </div>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${asset.confidence > 70 ? "bg-emerald-400" : asset.confidence > 45 ? "bg-yellow-400" : "bg-rose-400"}`}
                  style={{ width: `${asset.confidence}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
