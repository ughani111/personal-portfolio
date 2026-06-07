import { ImageResponse } from "next/og";

export const alt = "Usman Ghani portfolio preview";
export const contentType = "image/png";
export const size = {
  height: 630,
  width: 1200
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #f4f0e8 0%, #eae2d6 58%, #f9ccb7 100%)",
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
            fontSize: 26,
            letterSpacing: "0.32em",
            padding: "14px 22px",
            textTransform: "uppercase"
          }}
        >
          IT operations x modern web engineering
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760 }}>
            <div
              style={{
                fontSize: 118,
                fontWeight: 700,
                letterSpacing: "-0.09em",
                lineHeight: 0.9,
                textTransform: "uppercase"
              }}
            >
              Usman Ghani
            </div>
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.4,
                maxWidth: 700
              }}
            >
              IT Administrator, Field Support Engineer, and Frontend Developer based in Germany.
            </div>
          </div>
          <div
            style={{
              alignItems: "flex-end",
              display: "flex",
              flex: 1,
              justifyContent: "flex-end"
            }}
          >
            <div
              style={{
                background: "#0d0d0d",
                borderRadius: "32px",
                color: "#f4f0e8",
                display: "flex",
                fontSize: 24,
                letterSpacing: "0.18em",
                padding: "22px 28px",
                textTransform: "uppercase"
              }}
            >
              Enterprise IT + frontend systems
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
