import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "PromptShot AI";
  const desc =
    searchParams.get("desc") ??
    "Turn Any Image Into Perfect AI Prompts";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ⚡
          </div>
          <span
            style={{ fontSize: "24px", fontWeight: 700, color: "white", opacity: 0.9 }}
          >
            PromptShot AI
          </span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "24px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "700px",
            }}
          >
            {desc}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            marginTop: "48px",
          }}
        >
          {["Midjourney Prompts", "Stable Diffusion", "Ad Copy", "SEO Content"].map((t) => (
            <div
              key={t}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "100px",
                padding: "8px 20px",
                fontSize: "16px",
                color: "white",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
