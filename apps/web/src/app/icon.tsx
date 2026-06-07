import { ImageResponse } from "next/og";

export const alt = "Usman Ghani icon";
export const contentType = "image/png";
export const size = {
  height: 192,
  width: 192
};

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(145deg, #0d0d0d 0%, #1a1a1a 52%, #f97316 100%)",
          borderRadius: "42px",
          color: "#f4f0e8",
          display: "flex",
          fontSize: 86,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.12em",
          width: "100%"
        }}
      >
        UG
      </div>
    ),
    size
  );
}
