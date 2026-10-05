"use client";

import { useEffect, useState } from "react";
import type { Deal } from "@/lib/deals";
import { choosePicks } from "@/lib/picks";
import { DealSpotlight } from "./DealSpotlight";

const dayLabel = (now: Date) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "UTC" }).format(now);

/**
 * Deal of the Day and Deal of the Week. The page is prebuilt, so the build-time
 * picks render first; the browser then switches to today's picks from the same
 * pool, so the daily pick changes without rebuilding the site.
 */
export function DealPicks({ pool, builtAt }: { pool: Deal[]; builtAt: string }) {
  const [now, setNow] = useState(() => new Date(builtAt));
  useEffect(() => setNow(new Date()), []);
  const { day, week } = choosePicks(pool, now);
  if (!day && !week) return null;
  return (
    <div className="spotlight-grid">
      {day ? <DealSpotlight deal={day} label="Deal of the Day" note={dayLabel(now)} /> : null}
      {week ? <DealSpotlight deal={week} label="Deal of the Week" note="This week's top pick" /> : null}
    </div>
  );
}
