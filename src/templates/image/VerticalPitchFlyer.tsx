import React from 'react';

export const VerticalPitchFlyer = ({
  data,
  branding,
}: {
  data: any;
  branding?: any;
}) => {
  const accentColor = branding?.primary_color || "#3ef07a"; // Neon green default
  const bgColor = branding?.background_color || "#0a0a0a";
  const avatarUrl = data.avatar_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: bgColor,
        fontFamily: '"Inter", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Swirls (Abstract Shapes) */}
      <svg
        style={{ position: "absolute", top: -100, left: -200, opacity: 0.8 }}
        width="1600"
        height="1200"
        viewBox="0 0 1600 1200"
      >
        <path
          d="M 100 800 C 500 -200, 1100 0, 1600 1000"
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
        width="1600"
        height="1000"
        viewBox="0 0 1600 1000"
      >
        <path
          d="M 0 500 C 400 0, 1000 0, 1600 800"
          fill="none"
          stroke="#222222"
          strokeWidth="180"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          padding: "80px 100px",
          position: "absolute",
          top: 0,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: accentColor,
              borderRadius: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#000">
              <path d="M4 4 L10 12 L4 20 Z" />
              <path d="M20 4 L14 12 L20 20 Z" />
            </svg>
          </div>
          <span style={{ color: "#fff", fontSize: 32, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>INNOVATION</span>
          <span style={{ color: "#fff", fontSize: 32, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1 }}>HUB</span>
        </div>

        {/* Top Right Text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ color: "#fff", fontSize: 56, fontWeight: 400, letterSpacing: -1, lineHeight: 1.1 }}>
            {data.event_name?.split(" ")[0] || "INNOVATION"}
          </span>
          <span style={{ color: "#fff", fontSize: 56, fontWeight: 400, letterSpacing: -1, lineHeight: 1.1 }}>
            {data.event_name?.split(" ").slice(1, -1).join(" ") || "HUB VENTURE"}
          </span>
          <span style={{ color: "#fff", fontSize: 56, fontWeight: 400, letterSpacing: -1, lineHeight: 1.1 }}>
            {data.event_name?.split(" ").pop() || "NIGHT"}
          </span>
        </div>
      </div>

      {/* Center Graphics */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 450,
          left: 100,
          width: "100%",
        }}
      >
        {/* Avatar */}
        <div style={{ display: "flex", position: "relative", width: 620, height: 620 }}>
          {/* Accent Backdrop */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 620,
              height: 620,
              backgroundColor: accentColor,
              borderRadius: 60,
              borderTopRightRadius: 200,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            style={{
              width: 620,
              height: 620,
              objectFit: "cover",
              borderRadius: 60,
              borderTopRightRadius: 200,
            }}
            alt="Contestant"
          />
        </div>

        {/* Pixel Chevron (Right side) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: 180,
            top: 20,
          }}
        >
          <div style={{ width: 85, height: 85, backgroundColor: accentColor, marginLeft: 0 }} />
          <div style={{ width: 85, height: 85, backgroundColor: accentColor, marginLeft: 85 }} />
          <div style={{ width: 85, height: 85, backgroundColor: accentColor, marginLeft: 170 }} />
          <div style={{ width: 85, height: 85, backgroundColor: accentColor, marginLeft: 85 }} />
          <div style={{ width: 85, height: 85, backgroundColor: accentColor, marginLeft: 0 }} />
        </div>
      </div>

      {/* Bottom Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: 1150,
          left: 100,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 140,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
            marginBottom: -10,
          }}
        >
          {data.recipient_name?.split(" ")[0] || "Callum"}
        </span>
        <span
          style={{
            color: "#ffffff",
            fontSize: 140,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
            marginBottom: 30,
          }}
        >
          {data.recipient_name?.split(" ").slice(1).join(" ") || "Price"}
        </span>
        <span
          style={{
            color: "#a3a3a3",
            fontSize: 60,
            fontWeight: 400,
            letterSpacing: -1,
            fontStyle: "italic",
          }}
        >
          {data.title || "Pitch Contestant"}
        </span>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0 100px",
          position: "absolute",
          bottom: 100,
        }}
      >
        <span style={{ color: accentColor, fontSize: 32, fontWeight: 400 }}>
          {data.signature_1_name || "@reallygreatsite"}
        </span>
        <span style={{ color: accentColor, fontSize: 32, fontWeight: 400 }}>
          {data.signature_2_name || "123-456-789"}
        </span>
      </div>
    </div>
  );
};
