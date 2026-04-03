"use client";

import { useEffect } from "react";
import { MarketRadar } from "./MarketRadar";
import { MarketHeatmap } from "./MarketHeatmap";
import { IntelligencePanel } from "./IntelligencePanel";
import { SignalFeed } from "./SignalFeed";
import { tradeMonitorActions } from "@/lib/tradeMonitorStore";

export function TradeMonitorScreen() {
  useEffect(() => {
    const interval = setInterval(() => {
      tradeMonitorActions.tick();
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070b] p-3 text-white">
      <div className="grid h-[calc(100vh-1.5rem)] grid-cols-12 grid-rows-[1fr_auto] gap-3">
        <div className="col-span-3 row-span-1 min-h-0">
          <MarketRadar />
        </div>
        <div className="col-span-6 row-span-1 min-h-0">
          <MarketHeatmap />
        </div>
        <div className="col-span-3 row-span-1 min-h-0">
          <IntelligencePanel />
        </div>
        <div className="col-span-12 row-span-1 h-36">
          <SignalFeed />
        </div>
      </div>
    </div>
  );
}
