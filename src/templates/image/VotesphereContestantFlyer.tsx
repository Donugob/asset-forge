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
      {/* Background Shapes */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
        viewBox="0 0 1080 1080"
        fill="none"
      >
        {/* Large sweeping curves */}
        <path
          d="M1080 0 C 1080 500, 500 1080, 0 1080 L 0 0 Z"
          fill="rgba(255, 255, 255, 0.03)"
        />
        <path
          d="M0 200 C 600 200, 1080 600, 1080 1080 L 0 1080 Z"
          fill="rgba(255, 255, 255, 0.02)"
        />
        {/* Colored overlay shapes */}
        <path
          d="M1080 500 C 800 500, 500 800, 500 1080 L 1080 1080 Z"
          fill={accentColor}
          opacity="0.08"
        />
        
        {/* Tech Grid dots in corner */}
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

      {/* Subtle Glows */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "600px",
          height: "600px",
          backgroundColor: accentColor,
          borderRadius: "50%",
          opacity: 0.15,
          filter: "blur(120px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "800px",
          height: "800px",
          backgroundColor: accentColor,
          borderRadius: "50%",
          opacity: 0.1,
          filter: "blur(120px)",
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
              <span
                style={{
                  color: accentColor,
                  fontSize: 36,
                  fontWeight: 400,
                  letterSpacing: -1,
                }}
              >
                {data.title || "Icon of the Year"}
              </span>
            </div>
          </div>

          {/* Avatar Section (Right) */}
          <div style={{ display: "flex", position: "absolute", right: 0, top: 20, width: 440, height: 560 }}>
            {/* Outline Frame Glow / Drop Shadow */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                width: 440,
                height: 560,
                backgroundColor: accentColor,
                borderRadius: 40,
                borderTopLeftRadius: 150,
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
                borderTopLeftRadius: 150,
                zIndex: 10,
              }}
              alt="Contestant"
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "auto" }}>
          <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "30px", display: "flex" }} />
          <span style={{ color: "#fff", fontSize: 24, fontWeight: 600, letterSpacing: 2, opacity: 0.9 }}>
            Vote now at{" "}
            <span style={{ color: accentColor }}>Votesphere.com.ng</span>
          </span>
        </div>

      </div>
    </div>
  );
};
