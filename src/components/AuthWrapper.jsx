import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

const AuthWrapper = ({
  children,
  title,
  linkText,
  url,
  footerText,
  showAboutAndContact
}) => {
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 768px)"
  );

  const formWrapper = {
    maxWidth: "32rem",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "calc(0.5rem - 2px)",
    width: "100%",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    paddingBottom: "0.5rem",
    backgroundColor: "white"
  }

  const formTitleWrapper = {
    backgroundColor: "#f49881",
    paddingTop: "0.5rem", // py-2
    paddingBottom: "0.5rem",
    fontSize: "1.125rem", // text-lg
    lineHeight: "1.75rem",
    color: "white",
    textAlign: "center"
  }

  const linkStyle = {
    color: "#f49881", 
    fontSize: "0.875rem", 
    lineHeight: "1.25rem", 
    textDecoration: "none",
    textAlign: "center",
  }

  const footerTextStyle = {
    fontSize: "0.875rem",
    lineHeight: "1.25rem", 
    textDecoration: "none",
  }

  const footerStyle = {
    width: "100%", 
    paddingBottom: "0.25rem", 
    display: "flex", 
    alignItems: "center",
    flexDirection: isMediumDevice? "row" : "column",
    justifyContent: "center",
  }

  const aboutStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "5rem"
  }

  return (
    <div style={formWrapper}>
      <div style={formTitleWrapper}>
        {title}
      </div>
      {children}
      <div style={footerStyle}>
        <p style={footerTextStyle}>
          {footerText}
        </p>
        <a href={url} style={linkStyle}>
          {linkText}
        </a>
      </div>
      {showAboutAndContact && (
        <div style={aboutStyle}>
          <a href="/about" style={linkStyle}>
            About
          </a>
          <a href="/contact" style={linkStyle}>
            Contact
          </a>
        </div>
      )}
    </div>
  );
}
 
export default AuthWrapper;