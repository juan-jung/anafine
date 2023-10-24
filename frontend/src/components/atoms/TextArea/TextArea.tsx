import React, { ChangeEvent, Children } from "react";
import "./TextArea.css";

interface TextProps {
  children: React.ReactNode;
}

// TextArea
const TextArea: React.FC<TextProps> = ({ children, ...props }: TextProps) => {
  return <p {...props}>{children}</p>;
};

export default TextArea;
