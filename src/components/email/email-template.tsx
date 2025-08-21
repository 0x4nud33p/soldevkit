import * as React from "react";

interface EmailTemplateProps {
  firstName?: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>
        Welcome{firstName ? `, ${firstName}` : ""}!
      </h1>

      <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "15px" }}>
        Thank you for joining SolDevKit! You&apos;ll be the first to know about:
      </p>

      <ul style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
        <li>New development tools and components</li>
        <li>Solana ecosystem updates</li>
        <li>Best practices and tutorials</li>
        <li>Community highlights</li>
      </ul>

      <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
        Stay tuned for exciting updates!
      </p>

      <div
        style={{
          borderTop: "1px solid #eee",
          paddingTop: "20px",
          marginTop: "30px",
        }}
      >
        <p style={{ color: "#999", fontSize: "14px", margin: "0" }}>
          Best regards,
          <br />
          The SolDevKit Team
        </p>
        <p style={{ color: "#999", fontSize: "12px", marginTop: "10px" }}>
          You&apos;re receiving this email because you subscribed to updates at
          soldevkit.com
        </p>
      </div>
    </div>
  );
}
