import React, { ChangeEvent, Children } from "react";
import "./TextArea.css";

interface TextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
  selected: boolean;
}

// TextArea
const TextArea: React.FC<TextProps> = ({
  children,
  selected,
  ...props
}: TextProps) => {
  const textStyles: React.CSSProperties = {
    backgroundColor: selected ? "blue" : "white",
    color: selected ? "white" : "black",
  };
  return (
    <p style={textStyles} {...props}>
      {children}
    </p>
  );
};

export default TextArea;
