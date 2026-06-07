import { z } from "zod";

const analyticsSchema = z.object({
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_PROVIDER: z
    .enum(["", "plausible", "umami"])
    .catch("")
});

export function getAnalyticsConfig() {
  const parsed = analyticsSchema.parse({
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    NEXT_PUBLIC_ANALYTICS_PROVIDER:
      process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || ""
  });

  if (
    parsed.NEXT_PUBLIC_ANALYTICS_PROVIDER === "" ||
    !parsed.NEXT_PUBLIC_ANALYTICS_ID
  ) {
    return null;
  }

  return {
    id: parsed.NEXT_PUBLIC_ANALYTICS_ID,
    provider: parsed.NEXT_PUBLIC_ANALYTICS_PROVIDER
  };
}
