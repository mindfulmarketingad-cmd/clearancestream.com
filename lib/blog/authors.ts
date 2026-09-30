export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string[];
  focus: string[];
};

export const AUTHORS: Author[] = [
  {
    slug: "jaden-williams",
    name: "Jaden Williams",
    role: "Deals Editor",
    bio: [
      "Jaden Williams writes ClearanceStream's guides to finding and judging gaming PC deals, focusing on separating genuine price drops from inflated list prices, and on showing readers how to value a discounted system by the components inside it.",
      "Jaden Williams reviews the listings ClearanceStream tracks and writes the buying advice that sits alongside them on our brand pages.",
    ],
    focus: ["Gaming PC pricing", "Sale events and clearance cycles", "Deal evaluation"],
  },
  {
    slug: "bryce-dodson",
    name: "Bryce Dodson",
    role: "Hardware Editor",
    bio: [
      "Bryce Dodson covers gaming PC hardware for ClearanceStream, with a focus on prebuilt desktops, writing about how CPU, GPU, memory, storage, and power supply choices affect real-world performance and long-term upgradability.",
      "Bryce Dodson's guides help readers match a system to the resolution they play at and plan an upgrade path before they buy.",
    ],
    focus: ["Prebuilt gaming PCs", "GPU and CPU tiers", "Upgradability"],
  },
];

export function getAuthor(slug: string) {
  return AUTHORS.find((a) => a.slug === slug);
}

export const authorPath = (a: Author) => `/author/${a.slug}`;
