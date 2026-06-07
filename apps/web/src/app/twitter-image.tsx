import { ImageResponse } from "next/og";

export const alt = "Usman Ghani portfolio preview";
export const contentType = "image/png";
export const size = {
  height: 630,
  width: 1200
};

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(135deg, #f4f0e8 0%, #ece2d5 58%, #f9ccb7 100%)",
          color: "#0d0d0d",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%"
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            border: "1px solid rgba(13,13,13,0.14)",
            borderRadius: "999px",
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.28em",
            padding: "12px 22px",
            textTransform: "uppercase"
          }}
        >
          Germany-based technology portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: "-0.09em",
              lineHeight: 0.9,
              textTransform: "uppercase"
            }}
          >
            Usman Ghani
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.35 }}>
            IT Administrator, Field Support Engineer, and Frontend Developer
          </div>
        </div>
      </div>
    ),
    size
  );
}
