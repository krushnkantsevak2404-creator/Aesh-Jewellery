import { MetadataRoute } from "next";
import { defaultSiteConfig } from "../lib/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || defaultSiteConfig.siteUrl || "https://sevakcreation.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/checkout/success"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
