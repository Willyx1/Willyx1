"use client";

import { useMemo } from "react";
import { useTradeMonitorStore } from "@/lib/tradeMonitorStore";

const sentimentText = {
  "-1": "Risk-off",
  "0": "Neutral",
  "1": "Risk-on",
} as const;

export function IntelligencePanel() {
  const assets = useTradeMonitorStore((s) => s.assets);
  const selectedAssetId = useTradeMonitorStore((s) => s.selectedAssetId);
  const signals = useTradeMonitorStore((s) => s.signals);

  const selected = useMemo(
    () => assets.find((asset) => asset.id === selectedAssetId) ?? assets[0],
    [assets, selectedAssetId],
  );

  return (
    <section className="panel-shell flex h-full flex-col">
      <header className="panel-header">
        <h2>Intelligence Panel</h2>
        <span>Context, sentiment, correlations</span>
      </header>

      {selected && (
        <article className="mt-3 rounded-md border border-cyan-400/40 bg-cyan-500/10 p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-lg text-cyan-200">{selected.symbol}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">active focus</p>
          </div>
          <p className="text-xs text-white/75">{selected.name}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded border border-white/10 bg-black/20 p-2">
              <p className="text-white/60">Sentiment</p>
              <p className="mt-1 font-medium text-white">{sentimentText[selected.sentiment]}</p>
            </div>
            <div className="rounded border border-white/10 bg-black/20 p-2">
              <p className="text-white/60">Correlation</p>
              <p className="mt-1 font-medium text-white">{selected.correlation.toFixed(2)}</p>
            </div>
            <div className="rounded border border-white/10 bg-black/20 p-2">
              <p className="text-white/60">Volume</p>
              <p className="mt-1 font-medium text-white">{selected.volume.toLocaleString()}</p>
            </div>
            <div className="rounded border border-white/10 bg-black/20 p-2">
              <p className="text-white/60">Confidence</p>
              <p className="mt-1 font-medium text-white">{selected.confidence}%</p>
            </div>
          </div>
        </article>
      )}

      <div className="mt-4 space-y-2">
        <h3 className="text-xs uppercase tracking-[0.18em] text-white/50">Macro intelligence stream</h3>
        {signals.slice(0, 4).map((signal) => (
          <article key={signal.id} className="rounded-md border border-white/10 bg-white/[0.03] p-2.5 text-xs">
            <div className="flex items-center justify-between font-mono">
              <span className="text-cyan-300">{signal.symbol}</span>
              <span className="text-white/60">{signal.timestamp}</span>
            </div>
            <p className="mt-1 text-white/80">{signal.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
