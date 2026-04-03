"use client";

import { useMemo } from "react";
import { useTradeMonitorStore } from "@/lib/tradeMonitorStore";

function colorByChange(change: number) {
  if (change >= 1.5) return "bg-emerald-400/70";
  if (change >= 0.4) return "bg-emerald-500/45";
  if (change <= -1.5) return "bg-rose-500/80";
  if (change <= -0.4) return "bg-rose-500/55";
  return "bg-yellow-300/45";
}

export function MarketHeatmap() {
  const assets = useTradeMonitorStore((s) => s.assets);
  const pulse = useTradeMonitorStore((s) => s.pulse);

  const scaled = useMemo(() => {
    const totalVol = assets.reduce((sum, asset) => sum + asset.volume, 0) || 1;
    return assets.map((asset) => ({
      ...asset,
      area: Math.max(1, Math.round((asset.volume / totalVol) * 10)),
    }));
  }, [assets]);

  return (
    <section className="panel-shell h-full">
      <header className="panel-header">
        <h2>Market Heatmap Matrix</h2>
        <span className="font-mono text-cyan-300">tick {pulse.toString().padStart(4, "0")}</span>
      </header>

      <div className="mt-4 grid h-[calc(100%-3rem)] grid-cols-12 gap-2">
        {scaled.map((asset) => (
          <article
            key={asset.id}
            className={`relative overflow-hidden rounded-md border border-white/10 p-3 transition-transform duration-300 hover:scale-[1.02] ${colorByChange(asset.changePct)}`}
            style={{ gridColumn: `span ${Math.min(6, Math.max(3, asset.area))}` }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.2),transparent_40%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-base text-white">{asset.symbol}</p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/70">{asset.sector}</p>
              </div>
              <div>
                <p className="font-mono text-lg text-white">{asset.price.toFixed(2)}</p>
                <p className={`font-mono text-sm ${asset.changePct > 0 ? "text-emerald-100" : "text-rose-100"}`}>
                  {asset.changePct > 0 ? "+" : ""}
                  {asset.changePct.toFixed(2)}%
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
