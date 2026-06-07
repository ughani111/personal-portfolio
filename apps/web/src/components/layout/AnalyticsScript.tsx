import Script from "next/script";

import { getAnalyticsConfig } from "@/lib/analytics";

export function AnalyticsScript() {
  const analytics = getAnalyticsConfig();

  if (!analytics) {
    return null;
  }

  if (analytics.provider === "plausible") {
    return (
      <Script
        data-domain={analytics.id}
        defer
        src="https://plausible.io/js/script.js"
      />
    );
  }

  if (analytics.provider === "umami") {
    return (
      <Script
        async
        data-website-id={analytics.id}
        src="https://cloud.umami.is/script.js"
      />
    );
  }

  return null;
}
