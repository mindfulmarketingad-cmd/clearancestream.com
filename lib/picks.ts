import type { Deal } from "./deals";

/**
 * Deal of the Day and Deal of the Week for the homepage. Picks come from
 * in-stock products with a genuine discount, scored by discount and by how
 * well reviewed the product is. The week's pick rotates through the top few
 * candidates by ISO week; the day's pick rotates through a wider pool by date,
 * so both change on schedule even when prices have not.
 */

function score(d: Deal) {
  const reviews = Math.log10((d.reviewCount ?? 0) + 10);
  return (d.savingsPercent ?? 0) * 2 + (d.rating ?? 0) * reviews * 4 + Math.min(d.savings ?? 0, 500) / 25;
}

const eligible = (d: Deal) => d.inStock && (d.savingsPercent ?? 0) >= 10 && !!d.image && (d.rating ?? 0) >= 3.8;

function dayNumber(now: Date) {
  return Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86_400_000);
}

function isoWeek(now: Date) {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  return d.getUTCFullYear() * 100 + Math.ceil(((d.getTime() - yearStart) / 86_400_000 + 1) / 7);
}

/** The candidate pool, computed at build time and shipped to the page. */
export function pickPool(deals: Deal[]) {
  return deals
    .filter(eligible)
    .sort((a, b) => score(b) - score(a))
    .slice(0, 35);
}

/** Choose today's and this week's picks from the pool. Safe to run in the browser. */
export function choosePicks(pool: Deal[], now = new Date()) {
  if (pool.length === 0) return { day: null, week: null };
  const weekPool = pool.slice(0, 5);
  const week = weekPool[isoWeek(now) % weekPool.length];
  const dayPool = pool.filter((d) => d.asin !== week.asin).slice(0, 30);
  const day = dayPool.length ? dayPool[dayNumber(now) % dayPool.length] : null;
  return { day, week };
}
