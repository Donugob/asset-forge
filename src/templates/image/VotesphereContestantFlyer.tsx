import { formatContestantName } from '@/lib/typography';

export const VotesphereContestantFlyer = ({
  data,
  branding,
}: {
  data: any;
  branding?: any;
}) => {
  const accentColor = branding?.primary_color || "#2563eb";
  const bgColor = branding?.background_color || "#050505";
  const avatarUrl = data.avatar_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop";
  const logoUrl = data.logo_url || "https://www.votesphere.com.ng/logo.png";
  const brandName = data.brand_name || "Votesphere";

  const nameLines = formatContestantName(data.recipient_name || "Amina Bello");
  const longestLine = Math.max(...nameLines.map(l => l.length));
  
  // Responsive cohesive font sizing based on the widest line
  const maxWidth = 480; 
  const avgCharWidthRatio = 0.85; // Much more conservative estimation for bold Inter to guarantee fit
  const calculatedSize = maxWidth / (Math.max(1, longestLine) * avgCharWidthRatio);
  const fontSize = Math.min(105, Math.floor(calculatedSize));

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
      {/* Background Shapes */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
        viewBox="0 0 1080 1080"
        fill="none"
      >
        <path d="M1080 0 C 1080 500, 500 1080, 0 1080 L 0 0 Z" fill="rgba(255, 255, 255, 0.03)" />
        <path d="M0 200 C 600 200, 1080 600, 1080 1080 L 0 1080 Z" fill="rgba(255, 255, 255, 0.02)" />
        <path d="M1080 500 C 800 500, 500 800, 500 1080 L 1080 1080 Z" fill={accentColor} opacity="0.08" />
        
        <g opacity="0.2" fill={accentColor}>
          <circle cx="950" cy="150" r="3" />
          <circle cx="980" cy="150" r="3" />
          <circle cx="1010" cy="150" r="3" />
          <circle cx="950" cy="180" r="3" />
          <circle cx="980" cy="180" r="3" />
          <circle cx="1010" cy="180" r="3" />
          <circle cx="950" cy="210" r="3" />
          <circle cx="980" cy="210" r="3" />
          <circle cx="1010" cy="210" r="3" />
        </g>
      </svg>

      <div style={{ position: "absolute", top: "-150px", left: "-150px", width: "600px", height: "600px", backgroundColor: accentColor, borderRadius: "50%", opacity: 0.15, filter: "blur(120px)", display: "flex" }} />
      <div style={{ position: "absolute", bottom: "-50px", right: "-50px", width: "800px", height: "800px", backgroundColor: accentColor, borderRadius: "50%", opacity: 0.1, filter: "blur(120px)", display: "flex" }} />

      {/* Main Container */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "60px", zIndex: 10 }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} style={{ width: 60, height: 60, objectFit: "contain" }} alt="Logo" />
            </div>
            <div style={{ display: "flex", color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>
              {brandName}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", maxWidth: "50%" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 24, fontWeight: 600, letterSpacing: -0.5, textAlign: "right" }}>
              {data.event_name || "LAWSAN SE MERIT AWARDS"}
            </span>
          </div>
        </div>

        {/* Middle Body */}
        <div style={{ display: "flex", flex: 1, marginTop: "80px", position: "relative" }}>
          
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "50%", zIndex: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: 24 }}>
              {nameLines.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    color: "#ffffff",
                    fontSize: fontSize,
                    fontWeight: 900,
                    letterSpacing: -2,
                    lineHeight: 1,
                    whiteSpace: "nowrap", // Strictly forbid text from breaking
                    marginBottom: idx === nameLines.length - 1 ? 0 : (nameLines.length > 1 ? 5 : 20),
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
            
            <div style={{ display: "flex" }}>
              <span style={{ color: accentColor, fontSize: 36, fontWeight: 400, letterSpacing: -1 }}>
                {data.title || "Icon of the Year"}
              </span>
            </div>
          </div>

          {/* Avatar Section (Right) */}
          <div style={{ display: "flex", position: "absolute", right: 20, top: 40, width: 480, height: 480 }}>
            {/* Outline Frame Glow / Drop Shadow */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                width: 480,
                height: 480,
                backgroundColor: accentColor,
                borderRadius: 40,
                borderTopRightRadius: 150,
                opacity: 0.3,
                filter: "blur(20px)",
                display: "flex"
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
                zIndex: 10,
              }}
              alt="Contestant"
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "auto" }}>
          <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "30px", display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#fff", fontSize: 24, fontWeight: 600, letterSpacing: 2, opacity: 0.9 }}>
              Vote now at
            </span>
            <span style={{ color: accentColor, fontSize: 24, fontWeight: 600, letterSpacing: 2, opacity: 0.9 }}>
              Votesphere.com.ng
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
