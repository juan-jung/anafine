import React from "react";

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
    backgroundColor: selected ? "#0099ff" : "white",
    color: selected ? "white" : "black",
    fontWeight: selected ? "bold" : "normal",
  };
  return (
    <p style={textStyles} {...props}>
      {children}
    </p>
  );
};

export default TextArea;
