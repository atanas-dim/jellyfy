export const site = {
  name: "Jellyfy",
  description: "Soft controls. Pick eight colors. The rest of the set follows.",
  url: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jellyfy.vercel.app",
  ),
};

export const absoluteUrl = (path: string) => new URL(path, site.url).href;
