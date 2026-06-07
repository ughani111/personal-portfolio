import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#f4f0e8",
    description:
      "Portfolio of Usman Ghani, a Germany-based IT administrator, field support engineer, and frontend developer.",
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/icon",
        type: "image/png"
      },
      {
        sizes: "180x180",
        src: "/apple-icon",
        type: "image/png"
      }
    ],
    lang: "en",
    name: "Usman Ghani Portfolio",
    short_name: "Usman Ghani",
    start_url: "/",
    theme_color: "#0d0d0d"
  };
}
