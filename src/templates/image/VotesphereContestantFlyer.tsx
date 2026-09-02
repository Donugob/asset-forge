import React from 'react';

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
      {/* Background Subtle Glows */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-200px",
          width: "600px",
          height: "600px",
          backgroundColor: accentColor,
          borderRadius: "50%",
          opacity: 0.1,
          filter: "blur(120px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "800px",
          height: "800px",
          backgroundColor: accentColor,
          borderRadius: "50%",
          opacity: 0.05,
          filter: "blur(100px)",
          display: "flex",
        }}
      />

      {/* Main Container */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "60px", zIndex: 10 }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
          {/* Logo & Brand */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} style={{ width: 60, height: 60, objectFit: "contain" }} alt="Logo" />
            </div>
            <div style={{ display: "flex", color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>
              {brandName}
            </div>
          </div>

          {/* Event Title */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", maxWidth: "50%" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 24, fontWeight: 600, letterSpacing: -0.5, textAlign: "right" }}>
              {data.event_name || "LAWSAN SE MERIT AWARDS"}
            </span>
          </div>
        </div>

        {/* Middle Body */}
        <div style={{ display: "flex", flex: 1, marginTop: "80px", position: "relative" }}>
          
          {/* Text Section (Left) */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "50%", zIndex: 10 }}>
            {(() => {
              const nameStr = data.recipient_name || "Amina Bello";
              const parts = nameStr.split(" ");
              const first = parts[0];
              const rest = parts.slice(1).join(" ");
              
              const getSize = (text: string) => {
                if (!text) return 110;
                if (text.length > 15) return 56;
                if (text.length > 10) return 72;
                if (text.length > 7) return 90;
                return 110;
              };

              return (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      color: "#ffffff",
                      fontSize: getSize(first),
                      fontWeight: 900,
                      letterSpacing: -4,
                      lineHeight: 1,
                      marginBottom: -10,
                    }}
                  >
                    {first}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      color: "#ffffff",
                      fontSize: getSize(rest),
                      fontWeight: 900,
                      letterSpacing: -4,
                      lineHeight: 1,
                      marginBottom: 24,
                    }}
                  >
                    {rest}
                  </div>
                </div>
              );
            })()}
            
            {/* Category */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgba(37, 99, 235, 0.15)",
                  border: `1px solid ${accentColor}`,
                  color: accentColor,
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: -0.5,
                  padding: "12px 24px",
                  borderRadius: "30px",
                }}
              >
                {data.title || "Icon of the Year"}
              </div>
            </div>
          </div>

          {/* Avatar Section (Right) */}
          <div style={{ display: "flex", position: "absolute", right: 0, top: 20, width: 440, height: 560 }}>
            {/* Outline Frame Glow */}
            <div
              style={{
                position: "absolute",
                top: -10,
                left: -10,
                width: 460,
                height: 580,
                backgroundColor: accentColor,
                borderRadius: 48,
                opacity: 0.3,
                filter: "blur(20px)",
                display: "flex"
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              style={{
                width: 440,
                height: 560,
                objectFit: "cover",
                borderRadius: 40,
                border: "4px solid rgba(255,255,255,0.1)",
              }}
              alt="Contestant"
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "auto" }}>
          <span style={{ color: "#fff", fontSize: 24, fontWeight: 600, letterSpacing: 2, opacity: 0.9 }}>
            Vote now at <span style={{ color: accentColor }}>Votesphere.com.ng</span>
          </span>
        </div>

      </div>
    </div>
  );
};
