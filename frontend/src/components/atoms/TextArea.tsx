import React from "react";

interface TextProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  tabIndex?: number;
}

// TextArea
const TextArea: React.FC<TextProps> = ({
  children,
  className,
  tabIndex,
  ...props
}: TextProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default TextArea;
