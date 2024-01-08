import React from "react";

export const RegisterInput = ({
  label,
  registerName,
  type,
  register,
  errors
}) => {
  const FieldWrapper = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "0.25rem",
    backgroundColor: "white",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }
  
  const errorColor = {
    color: "#ff0000"
  }
  
  const inputStyle = {
    border: "2px solid #b4b4bb",
    borderRadius: "calc(0.5rem - 4px)",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    borderColor: errors[registerName] ? "#ff0000" : "#b4b4bb",
    boxSizing: "border-box",
    width: "100%"
  }

  const inputWrapper = {
    backgroundColor: "white",
  }

  return (
    <div style={FieldWrapper}>
      <label style={{ color: errors[registerName] ? "#ff0000" : "#7f7f7f" }}>
        {label}{" "}
        <span style={errorColor}>*</span>
      </label>
      <div style={inputWrapper}>
        <input
          type={type}
          {...register(registerName)}
          style={inputStyle}
          placeholder={label}
        />
      </div>
      {errors[registerName] && (
        <p style={errorColor}>
          {errors[registerName].message}
        </p>
      )}
    </div>
  )
}