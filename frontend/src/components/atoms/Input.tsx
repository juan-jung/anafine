import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  tabIndex?: number;
}

// Input
const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  className = "input",
  onChange,
  tabIndex,
  ...props
}: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
