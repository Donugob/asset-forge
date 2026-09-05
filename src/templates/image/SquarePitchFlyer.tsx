import { formatContestantName } from '@/lib/typography';

export const SquarePitchFlyer = ({
  data,
  branding,
}: {
  data: any;
  branding?: any;
}) => {
  const accentColor = branding?.primary_color || "#3ef07a";
  const bgColor = branding?.background_color || "#0a0a0a";
  const avatarUrl = data.avatar_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop";

  const nameLines = formatContestantName(data.recipient_name || "Callum Price");
  const longestLine = Math.max(...nameLines.map(l => l.length));
  const maxWidth = 480; 
  const avgCharWidthRatio = 0.55; // Slightly different for this specific design
  const calculatedSize = maxWidth / (Math.max(1, longestLine) * avgCharWidthRatio);
  const fontSize = Math.min(100, Math.floor(calculatedSize));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1080px",
        height: "1080px",
        backgroundColor: bgColor,
        fontFamily: '"Inter", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background SVGs */}
      <svg
        style={{ position: "absolute", top: -200, left: -200, opacity: 0.8 }}
        width="1400"
        height="1400"
        viewBox="0 0 1400 1400"
      >
        <path
          d="M 100 800 C 500 -200, 1100 0, 1400 1000"
          fill="none"
          stroke="#222222"
          strokeWidth="150"
          strokeLinecap="round"
        />
        <path
          d="M -100 900 C 400 -100, 1200 100, 1500 1100"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="200"
          strokeLinecap="round"
        />
      </svg>
      <svg
        style={{ position: "absolute", bottom: -200, right: -400, opacity: 0.8 }}
        width="1200"
        height="800"
        viewBox="0 0 1200 800"
      >
        <path
          d="M 0 500 C 400 0, 800 0, 1200 800"
          fill="none"
          stroke="#222222"
          strokeWidth="120"
          strokeLinecap="round"
        />
      </svg>

      {/* Main Container */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "60px" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: data.logo_url ? "transparent" : accentColor,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 20,
              }}
            >
              {data.logo_url ? (
                <img src={data.logo_url} style={{ width: 80, height: 80, objectFit: "contain" }} alt="Logo" />
              ) : (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#000">
                  <path d="M4 4 L10 12 L4 20 Z" />
                  <path d="M20 4 L14 12 L20 20 Z" />
                </svg>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {(() => {
                const brand = data.brand_name || "INNOVATION HUB";
                const parts = brand.split(" ");
                const first = parts[0];
                const rest = parts.slice(1).join(" ");
                return (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", color: "#fff", fontSize: 24, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>{first}</div>
                    {rest && <div style={{ display: "flex", color: "#fff", fontSize: 24, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>{rest}</div>}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Event Title */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ color: "#fff", fontSize: 32, fontWeight: 400, letterSpacing: -1, lineHeight: 1.1 }}>
              {data.event_name?.split(" ")[0] || "INNOVATION"}
            </span>
            <span style={{ color: "#fff", fontSize: 32, fontWeight: 400, letterSpacing: -1, lineHeight: 1.1 }}>
              {data.event_name?.split(" ").slice(1).join(" ") || "HUB VENTURE NIGHT"}
            </span>
          </div>
        </div>

        {/* Middle Body */}
        <div style={{ display: "flex", flex: 1, marginTop: "60px", position: "relative" }}>
          
          {/* Text Section (Left) */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "45%", zIndex: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", wordBreak: "break-word", marginBottom: 20 }}>
              {nameLines.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    color: "#ffffff",
                    fontSize: fontSize,
                    fontWeight: 700,
                    letterSpacing: -2,
                    lineHeight: 1,
                    marginBottom: idx === nameLines.length - 1 ? 0 : (nameLines.length > 1 ? 5 : 20),
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
            <span
              style={{
                color: accentColor,
                fontSize: 36,
                fontWeight: 400,
                letterSpacing: -1,
              }}
            >
              {data.title || "Pitch Contestant"}
            </span>
          </div>

          {/* Avatar Section (Right) */}
          <div style={{ display: "flex", position: "absolute", right: 20, top: 40, width: 480, height: 480 }}>
            {/* Background Shape */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 480,
                height: 480,
                backgroundColor: accentColor,
                borderRadius: 40,
                borderTopRightRadius: 150,
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              style={{
                width: 480,
                height: 480,
                objectFit: "cover",
                borderRadius: 40,
                borderTopRightRadius: 150,
              }}
              alt="Contestant"
            />
            
            {/* Chevron Pixels overlapping on the right edge */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                right: -60,
                top: 80,
              }}
            >
              <div style={{ width: 60, height: 60, backgroundColor: accentColor, marginLeft: 0 }} />
              <div style={{ width: 60, height: 60, backgroundColor: accentColor, marginLeft: 60 }} />
              <div style={{ width: 60, height: 60, backgroundColor: accentColor, marginLeft: 120 }} />
              <div style={{ width: 60, height: 60, backgroundColor: accentColor, marginLeft: 60 }} />
              <div style={{ width: 60, height: 60, backgroundColor: accentColor, marginLeft: 0 }} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "auto" }}>
          <span style={{ color: "#fff", fontSize: 24, fontWeight: 400, opacity: 0.6 }}>
            {data.signature_1_name || "@reallygreatsite"}
          </span>
          <span style={{ color: "#fff", fontSize: 24, fontWeight: 400, opacity: 0.6 }}>
            {data.signature_2_name || "123-456-789"}
          </span>
        </div>

      </div>
    </div>
  );
};
