"use client";

import { useTradeMonitorStore } from "@/lib/tradeMonitorStore";

export function SignalFeed() {
  const signals = useTradeMonitorStore((s) => s.signals);

  return (
    <section className="panel-shell h-full">
      <header className="panel-header">
        <h2>Live Signal Feed</h2>
        <span>Real-time anomaly channel</span>
      </header>
      <div className="mt-2 flex h-[calc(100%-2.25rem)] gap-2 overflow-x-auto pb-1">
        {signals.slice(0, 12).map((signal) => {
          const tone = signal.confidence > 75 ? "signal-strong" : signal.confidence > 45 ? "signal-medium" : "signal-weak";
          return (
            <article
              key={signal.id}
              className={`min-w-64 animate-slide-left rounded-md border p-2.5 font-mono text-xs ${tone}`}
            >
              <div className="flex items-center justify-between">
                <span>{signal.symbol}</span>
                <span className="text-white/60">{signal.timestamp}</span>
              </div>
              <p className="mt-1 text-white/90">{signal.text}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/60">{signal.confidence}% confidence</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
