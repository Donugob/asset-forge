import React from 'react';

interface SocialFlyerProps {
  data: Record<string, string>;
  branding?: {
    primary_color?: string;
    background_color?: string;
    font_family?: string;
  };
}

export const SocialFlyer = ({ data, branding }: SocialFlyerProps) => {
  const primaryColor = branding?.primary_color || "#3b82f6";
  const bgColor = branding?.background_color || "#0a0a0a";

  const {
    title = "Nominee",
    recipient_name = "Jane Doe",
    event_name = "Annual Awards 2026",
    logo_url = "",
    avatar_url = "",
  } = data;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1080px",
        height: "1080px",
        backgroundColor: bgColor,
        fontFamily: branding?.font_family || "Inter, sans-serif",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        padding: "60px",
      }}
    >
      {/* Background Accent Graphics */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: "800px",
          height: "800px",
          backgroundColor: primaryColor,
          borderRadius: "50%",
          opacity: 0.15,
          filter: "blur(100px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "600px",
          height: "600px",
          backgroundColor: primaryColor,
          borderRadius: "50%",
          opacity: 0.1,
          filter: "blur(80px)",
          display: "flex",
        }}
      />

      {/* Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", zIndex: 10 }}>
        {logo_url ? (
          <img src={logo_url} alt="Logo" style={{ height: "60px", objectFit: "contain" }} />
        ) : (
          <div style={{ fontSize: "32px", fontWeight: "bold", letterSpacing: "-1px" }}>{event_name}</div>
        )}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "12px 24px",
            borderRadius: "40px",
            fontSize: "24px",
            fontWeight: "bold",
            color: primaryColor,
            textTransform: "uppercase",
            letterSpacing: "2px",
            display: "flex",
          }}
        >
          {title}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", justifyContent: "center", zIndex: 10 }}>
        {/* Avatar Ring */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${primaryColor} 0%, rgba(0,0,0,0) 100%)`,
            padding: "8px",
            marginBottom: "40px",
          }}
        >
          {avatar_url ? (
            <img
              src={avatar_url}
              alt={recipient_name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "8px solid #111111",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#222222",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "8px solid #111111",
              }}
            >
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "84px",
            fontWeight: 900,
            textAlign: "center",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: "20px",
            display: "flex",
          }}
        >
          {recipient_name}
        </div>
        
        {/* Decorative Line */}
        <div style={{ display: "flex", width: "120px", height: "6px", backgroundColor: primaryColor, borderRadius: "3px" }} />
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "auto", zIndex: 10 }}>
        <div style={{ fontSize: "28px", color: "rgba(255,255,255,0.6)", fontWeight: "500", display: "flex" }}>
          Scan to vote or visit our website
        </div>
      </div>
    </div>
  );
};
