"use client";

import { useEffect, useState } from "react";

const format = (d: Date) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" }).format(d);

/** Today's date (US Eastern). Prebuilt with the build date, then switched to the visitor's current date. */
export function TodayDate({ builtAt }: { builtAt: string }) {
  const [now, setNow] = useState(() => new Date(builtAt));
  useEffect(() => setNow(new Date()), []);
  return <time dateTime={now.toISOString().slice(0, 10)}>{format(now)}</time>;
}
