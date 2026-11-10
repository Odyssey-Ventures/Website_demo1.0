/**
 * Stock photos from Unsplash (Unsplash License: free for commercial use, no permission needed).
 * Served from images.unsplash.com (allowed in next.config.mjs). Credits are kept here for reference.
 * To use your own photo instead, put the file in /public/images and set `src` to its path, e.g. "/images/hero-sf.jpg".
 */
export interface Photo {
  src: string;
  /** Unsplash photo page, for credit and for checking the license. */
  source?: string;
  credit?: string;
}

function unsplash(raw: string, width = 2400): string {
  return `${raw}?auto=format&fit=crop&w=${width}&q=75`;
}

/** San Francisco backgrounds for the page banners (PageHero). */
export const cityPhotos = {
  /** San Francisco seen from a hilltop, downtown skyline. */
  skylineHill: {
    src: unsplash("https://images.unsplash.com/photo-1691463397696-e3b1e99d3113"),
    source: "https://unsplash.com/photos/jho87gkKXWY",
    credit: "Nils Huenerfuerst",
  },
  /** Downtown San Francisco and the Financial District seen from Coit Tower. */
  coitTowerView: {
    src: unsplash("https://images.unsplash.com/photo-1674816795654-9d5900fea278"),
    source: "https://unsplash.com/photos/90fNIX49qPg",
    credit: "CrowN",
  },
  /** Golden Gate Bridge. */
  goldenGate: {
    src: unsplash("https://images.unsplash.com/photo-1501594907352-04cda38ebc29"),
    source: "https://unsplash.com/photos/gZXx8lKAb7Y",
    credit: "Maarten van den Heuvel",
  },
} satisfies Record<string, Photo>;

export type CityPhoto = keyof typeof cityPhotos;

/** Top image of each Home service card (01–04). */
export const servicePhotos: Record<"academy" | "advisory" | "accelerator" | "consulting", Photo> = {
  academy: {
    src: unsplash("https://images.unsplash.com/photo-1758270705087-76e81a5117bd", 1200),
    source: "https://unsplash.com/photos/1oefhxwrgP4",
    credit: "Vitaly Gariev",
  },
  advisory: {
    src: unsplash("https://images.unsplash.com/photo-1579389083046-e3df9c2b3325", 1200),
    source: "https://unsplash.com/photos/nNMBa7Y1Ymk",
    credit: "Priscilla Du Preez",
  },
  accelerator: {
    src: unsplash("https://images.unsplash.com/photo-1557804506-669a67965ba0", 1200),
    source: "https://unsplash.com/photos/wD1LRb9OeEo",
    credit: "Austin Distel",
  },
  consulting: {
    src: unsplash("https://images.unsplash.com/photo-1517048676732-d65bc937f952", 1200),
    source: "https://unsplash.com/photos/KdeqA3aTnBY",
    credit: "Dylan Gillis",
  },
};
