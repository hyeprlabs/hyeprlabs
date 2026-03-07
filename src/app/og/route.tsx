import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

const SITE_URL = "https://hyeprlabs.com";

async function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer | undefined> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
    const css = await fetch(cssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    }).then((res) => res.text());

    const match = css.match(/src: url\(([^)]+)\) format\('woff2'\)/);
    if (!match?.[1]) return undefined;

    return fetch(match[1]).then((res) => res.arrayBuffer());
  } catch {
    return undefined;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Hyepr Labs";
  const description =
    searchParams.get("description") ?? "Think Fast. Build Fast.";
  const type = searchParams.get("type") ?? "";
  const cta = searchParams.get("cta") ?? "";

  const [interRegular, interBold] = await Promise.all([
    loadGoogleFont("Inter", 400),
    loadGoogleFont("Inter", 700),
  ]);

  type FontEntry = {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  };

  const fonts: FontEntry[] = [];
  if (interRegular)
    fonts.push({
      name: "Inter",
      data: interRegular,
      weight: 400,
      style: "normal",
    });
  if (interBold)
    fonts.push({
      name: "Inter",
      data: interBold,
      weight: 700,
      style: "normal",
    });

  const fontFamily = fonts.length > 0 ? "Inter" : "sans-serif";
  const titleFontSize = title.length > 50 ? 52 : title.length > 30 ? 60 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000000",
          padding: "64px 72px",
          fontFamily,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow at center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left vertical border line */}
        <div
          style={{
            position: "absolute",
            left: "48px",
            top: "0",
            bottom: "0",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Right vertical border line */}
        <div
          style={{
            position: "absolute",
            right: "48px",
            top: "0",
            bottom: "0",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Top row: Wordmark + type badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Logo mark — small square accent */}
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "#ffffff",
                borderRadius: "4px",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Hyepr Labs
            </span>
          </div>

          {/* Page type badge */}
          {type ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 16px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "100px",
                color: "rgba(255,255,255,0.5)",
                fontSize: "13px",
                letterSpacing: "0.08em",
                fontFamily,
                textTransform: "uppercase",
              }}
            >
              {type}
            </div>
          ) : null}
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: `${titleFontSize}px`,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
              maxWidth: "960px",
            }}
          >
            {title}
          </h1>

          {description ? (
            <p
              style={{
                fontSize: "22px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.55,
                margin: 0,
                maxWidth: "700px",
                fontFamily,
                letterSpacing: "0.02em",
                fontWeight: 400,
              }}
            >
              {description}
            </p>
          ) : null}

          {cta ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#ffffff",
                  fontFamily,
                  letterSpacing: "0.02em",
                  padding: "10px 24px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                {cta}
              </span>
            </div>
          ) : null}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "15px",
              fontFamily,
              letterSpacing: "0.06em",
              fontWeight: 400,
            }}
          >
            Think Fast. Build Fast.
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "15px",
              letterSpacing: "0.04em",
              fontWeight: 400,
            }}
          >
            {SITE_URL.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
