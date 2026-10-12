import type { Deal } from "./deals";

/**
 * Keyboard switch types for /switches/[type]. A keyboard is tagged with a type
 * only when its own listing (title or feature bullets) says so; nothing is
 * inferred from the model name. A board can carry several types (for example
 * Hall effect and rapid trigger, or optical and linear).
 */

export type SwitchType = {
  slug: string;
  name: string;
  /** Short label for chips and tables, e.g. "Linear". */
  short: string;
  /** Page heading, e.g. "Best Linear Switch Keyboards". */
  heading: string;
  summary: string;
  feel: string[];
  bestFor: string[];
  pros: string[];
  cons: string[];
  compare: { feel: string; sound: string; bestFor: string };
  test: (text: string) => boolean;
};

// Feel words must describe the switches, not a dial or a keycap.
const FEEL_WORD = (word: string) =>
  new RegExp(`\\b${word}\\s+(?:[a-z-]+\\s+)?(?:switch|switches|key ?switch(?:es)?|keys?|feel|feedback|bump|actuation|keystrokes?|typing)\\b|\\(${word}(?: optical)?\\)`, "i");
// Membrane keyboards do not have mechanical switch feels (hybrids that say "mechanical" in the listing do).
const MECHANICAL_FEEL = (text: string) => !/\bmembrane\b/i.test(text) || /\bhybrid mechanical|optical-mechanical\b/i.test(text);

export const SWITCH_TYPES: SwitchType[] = [
  {
    slug: "linear",
    heading: "Best Linear Switch Keyboards",
    name: "Linear Switches",
    short: "Linear",
    summary: "Smooth, consistent keystrokes with no bump, the most popular choice for gaming.",
    feel: [
      "Linear switches travel straight down with no bump and no click. Every press feels the same from top to bottom, which makes rapid, repeated keystrokes easy and predictable.",
      "They are usually quiet to moderate in volume. Most of the sound comes from the key bottoming out and springing back, so foam-dampened boards and lubed switches sound noticeably softer. Common linear switches are sold as Red, Silver or Speed, Yellow, and Black, with lighter and heavier spring weights.",
    ],
    bestFor: [
      "Fast-paced games where you press, release, and repeat keys quickly, such as shooters and MOBAs.",
      "Players who share a room or use voice chat and want a quieter board than clicky switches.",
      "Anyone who prefers a smooth, light keystroke over tactile feedback.",
    ],
    pros: ["Smooth, consistent presses for quick double-taps and strafing", "Quieter than clicky switches", "The widest choice of keyboards and spring weights"],
    cons: ["No bump to confirm a keypress, which some typists miss", "Light linears make accidental presses easier", "Bottoming out can be loud on boards without dampening"],
    compare: { feel: "Smooth, no bump", sound: "Quiet to moderate", bestFor: "Fast gaming" },
    test: (t) =>
      MECHANICAL_FEEL(t) &&
      (FEEL_WORD("linear").test(t) || /\b(red|silver|speed|yellow)\s+(linear\s+)?(key)?switch(es)?\b|\b(mx|mlx|hx|cherry mx|kailh|gateron)\s+(red|silver|speed|yellow)\b/i.test(t)),
  },
  {
    slug: "tactile",
    heading: "Best Tactile Switch Keyboards",
    name: "Tactile Switches",
    short: "Tactile",
    summary: "A small bump at the actuation point that confirms each keypress without the click.",
    feel: [
      "Tactile switches have a noticeable bump partway through the keystroke. The bump tells your finger the key has registered, so you can let go without pressing all the way down.",
      "They are quieter than clicky switches and usually a touch louder than linears. Common tactile switches are sold as Brown, Aqua, Orange, or Banana, and the strength of the bump varies a lot between models.",
    ],
    bestFor: [
      "People who type a lot during the day and game in the evening on the same keyboard.",
      "Strategy, MMO, and RPG players who use many keys and like confirmation on each press.",
      "Anyone who finds linear switches too vague but clicky switches too loud.",
    ],
    pros: ["Clear feedback on every keypress", "A good all-rounder for typing and gaming", "Quieter than clicky switches"],
    cons: ["The bump can slow very fast repeated presses", "Bump strength varies widely, so it is hard to judge without trying", "Usually louder than a dampened linear board"],
    compare: { feel: "Bump at actuation", sound: "Moderate", bestFor: "Typing and gaming" },
    test: (t) => MECHANICAL_FEEL(t) && (FEEL_WORD("tactile").test(t) || /\b(brown|aqua|orange|banana)\s+(tactile\s+)?(key)?switch(es)?\b|\b(mx|hx|cherry mx|kailh|gateron)\s+brown\b/i.test(t)),
  },
  {
    slug: "clicky",
    heading: "Best Clicky Switch Keyboards",
    name: "Clicky Switches",
    short: "Clicky",
    summary: "A tactile bump plus an audible click on every press: the most feedback, and the most noise.",
    feel: [
      "Clicky switches combine a tactile bump with a sharp click at the actuation point. You hear and feel every keystroke, which makes typing very satisfying for people who like that feedback.",
      "They are the loudest switch type. The click is easily picked up by microphones on voice chat, calls, and streams. Common clicky switches are sold as Blue, Green, or Box Jade and Box White.",
    ],
    bestFor: [
      "Solo players and typists who love audible feedback and do not share the room.",
      "People who mostly type and game casually.",
    ],
    pros: ["Maximum feedback on every keypress", "Very satisfying for typing", "Easy to tell when a key has registered"],
    cons: ["Loud, and often picked up by microphones", "The reset can feel slower for rapid presses", "Not ideal for shared rooms or late-night play"],
    compare: { feel: "Bump and click", sound: "Loud", bestFor: "Typing, solo play" },
    test: (t) => MECHANICAL_FEEL(t) && (FEEL_WORD("clicky").test(t) || /\b(blue|green|box jade|box white|soft click white)\s+(clicky\s+)?(key)?switch(es)?\b|\b(mx|cherry mx|kailh)\s+blue\b/i.test(t)),
  },
  {
    slug: "optical",
    heading: "Best Optical Switch Keyboards",
    name: "Optical Switches",
    short: "Optical",
    summary: "A beam of light registers the keypress instead of metal contacts, for fast and durable switching.",
    feel: [
      "Optical switches detect a keypress when the stem interrupts a beam of light, rather than when two metal contacts touch. Because there is no physical contact to settle, they register very quickly and avoid the contact wear that can cause chatter on older mechanical switches.",
      "The feel depends on the design: optical switches come in linear and clicky versions, and some, called analog optical switches, can measure how far a key is pressed. The sound is similar to mechanical switches of the same type.",
    ],
    bestFor: [
      "Competitive players who want fast, consistent actuation.",
      "Buyers who want long switch life and resistance to contact wear.",
    ],
    pros: ["Fast actuation with no contact bounce", "Durable, with no metal contacts to wear", "Available in linear and clicky feels"],
    cons: ["Replacement switches are often specific to the brand", "Usually cost more than basic mechanical boards", "Fewer third-party switch options for customizing"],
    compare: { feel: "Linear or clicky", sound: "Depends on type", bestFor: "Fast, durable switching" },
    test: (t) => /\boptical\b/i.test(t),
  },
  {
    slug: "hall-effect",
    heading: "Best Hall Effect Keyboards",
    name: "Hall Effect (Magnetic) Switches",
    short: "Hall effect",
    summary: "Magnetic sensors measure how far each key travels, enabling adjustable actuation.",
    feel: [
      "Hall effect switches use a magnet in the stem and a sensor on the circuit board to measure exactly how far each key is pressed. Because nothing physically touches to register a press, you can set the actuation point in software, from a very light touch to a deep press, often per key.",
      "Most magnetic switches feel linear and smooth. The sound is similar to other linear boards and depends mainly on the case and dampening. Brands use their own names for magnetic switches, such as HyperMagnetic, OmniPoint, MGX, and TMR.",
    ],
    bestFor: [
      "Competitive FPS players who want adjustable actuation and rapid trigger.",
      "Players who want one keyboard that can feel light for gaming and deeper for typing.",
    ],
    pros: ["Adjustable actuation point, often per key", "Usually supports rapid trigger", "No contacts to wear out, so very durable"],
    cons: ["More expensive than standard mechanical boards", "Settings live in software you have to configure", "Switch replacements are usually limited to magnetic models"],
    compare: { feel: "Smooth, adjustable", sound: "Quiet to moderate", bestFor: "Competitive FPS" },
    test: (t) => /\bhall[- ]?effect\b|\bmagnetic\b|\bhypermagnetic\b|\bomnipoint\b|\bmgx\b|\btmr\b|\b\w+\s(?:\d+\s)?HE\b(?=.*keyboard)/i.test(t),
  },
  {
    slug: "rapid-trigger",
    heading: "Best Rapid Trigger Keyboards",
    name: "Rapid Trigger Keyboards",
    short: "Rapid trigger",
    summary: "Keys reset the instant you start lifting, for faster direction changes in competitive games.",
    feel: [
      "Rapid trigger is a feature of analog keyboards, usually magnetic Hall effect boards, rather than a switch design of its own. Instead of resetting at a fixed point, a key resets as soon as you begin to lift it, and activates again as soon as you press down.",
      "In practice this makes counter-strafing and quick taps in shooters feel more responsive, because you do not have to lift a key past a fixed reset point. The feel and sound are those of the underlying switch, which is usually smooth and linear.",
    ],
    bestFor: [
      "Competitive FPS players, especially in games where counter-strafing matters.",
      "Rhythm game players who repeat the same keys very quickly.",
    ],
    pros: ["Faster resets for quick direction changes", "Usually paired with adjustable actuation", "A real edge in some competitive shooters"],
    cons: ["Only available on analog keyboards, which cost more", "Needs tuning in software to suit you", "Little benefit for typing or slower-paced games"],
    compare: { feel: "Instant reset", sound: "Depends on switch", bestFor: "Competitive FPS" },
    test: (t) => /\brapid[- ]?trigger\b|\bsnap[- ]?tap\b/i.test(t),
  },
  {
    slug: "low-profile",
    heading: "Best Low-Profile Keyboards",
    name: "Low-Profile Switches",
    short: "Low-profile",
    summary: "Shorter switches and keycaps for a slim keyboard with shorter key travel.",
    feel: [
      "Low-profile switches are shorter than standard switches, with less key travel. Paired with flatter keycaps, they make a slim keyboard that feels closer to a laptop keyboard while keeping mechanical or membrane switch feel.",
      "They come in linear, tactile, and clicky versions. Shorter travel can make typing feel quick and light, and many players find the lower height more comfortable without a wrist rest.",
    ],
    bestFor: [
      "People who like laptop-style keyboards but want better switches.",
      "Slim desk setups and travel.",
      "Typists who want shorter key travel.",
    ],
    pros: ["Slim, portable, and comfortable without a wrist rest", "Short travel for quick typing", "Available in linear, tactile, and clicky feels"],
    cons: ["Fewer keycap options because of the special profile", "Less travel than some gamers prefer", "Fewer models to choose from"],
    compare: { feel: "Short travel", sound: "Quiet to moderate", bestFor: "Slim setups, typing" },
    test: (t) => /\blow[- ]?profile\s+(keys|switch(es)?|mechanical|keyboard|(red|blue|brown)\s+switch(es)?)\b|\bultra[- ]?slim\b/i.test(t),
  },
  {
    slug: "membrane",
    heading: "Best Membrane Gaming Keyboards",
    name: "Membrane Switches",
    short: "Membrane",
    summary: "Rubber-dome keys that are quiet and affordable, without mechanical switches.",
    feel: [
      "Membrane keyboards register a press when a rubber dome pushes two layers of a membrane together. The keystroke is soft and cushioned, with a gentle bump as the dome collapses.",
      "They are usually the quietest and most affordable gaming keyboards, and many add spill resistance. Hybrid designs, sometimes called mecha-membrane, add a tactile or clicky mechanism on top of the dome for more feedback.",
    ],
    bestFor: [
      "Tight budgets and first gaming keyboards.",
      "Quiet rooms and shared spaces.",
      "Desks where spills are a risk.",
    ],
    pros: ["Affordable", "Quiet", "Often spill resistant"],
    cons: ["Less precise and consistent than mechanical switches", "Mushier feel that can wear over time", "Switches cannot be swapped or replaced"],
    compare: { feel: "Soft, cushioned", sound: "Quietest", bestFor: "Budgets, quiet rooms" },
    test: (t) => /\bmembrane\b/i.test(t),
  },
];

export function getSwitchType(slug: string) {
  return SWITCH_TYPES.find((s) => s.slug === slug);
}

/** Keyboards only: excludes keycaps, switch sets, wrist rests, and plates sold in the keyboard category. */
export function isKeyboard(d: Deal) {
  return d.categorySlug === "keyboards" && /\bkeyboard\b/i.test(d.title) && !/\b(wrist rest|keycaps?|top plate|switch set|pcs\b|key ?switch(es)? set)/i.test(d.title);
}

// Phrases that mention a switch word without describing the switches.
const NOISE = /magnetic[^.]{0,25}(wrist|palm) ?rest|magnetic(ally)?\s+(attach\w*|detach\w*|wrist ?rest|palm ?rest|leatherette)|(wrist|palm) ?rest[^.]{0,40}magnetic|low[- ]?profile\s+(aluminum|body|frame|case|keycaps?)/gi;
const FEEL = new Set(["linear", "tactile", "clicky"]);

/** Switch types a keyboard's listing explicitly states. */
export function switchTypesFor(d: Deal): string[] {
  if (!isKeyboard(d)) return [];
  const title = d.title.replace(NOISE, " ");
  const text = `${d.title} ${d.features.join(" ")}`.replace(NOISE, " ");
  // If the title names the switch feel, trust it over feature bullets, which
  // often list every switch option a model is sold with.
  const titleFeel = SWITCH_TYPES.filter((s) => FEEL.has(s.slug) && s.test(title)).map((s) => s.slug);
  let types = SWITCH_TYPES.filter((s) => s.test(text)).map((s) => s.slug);
  if (titleFeel.length) types = types.filter((t) => !FEEL.has(t) || titleFeel.includes(t));
  // Clicky switches are described as "tactile and clicky"; do not double-count them.
  else if (types.includes("clicky") && types.includes("tactile") && !/\btactile\b(?![^.]{0,20}click)/i.test(text.replace(/\bclicky?\b[^.]{0,20}tactile/gi, ""))) {
    types = types.filter((t) => t !== "tactile");
  }
  return types;
}

/** Keyboards with a given switch type, in the site's usual order (best real discounts first). */
export function keyboardsWithSwitch(deals: Deal[], slug: string) {
  return deals.filter((d) => d.inStock && switchTypesFor(d).includes(slug));
}
