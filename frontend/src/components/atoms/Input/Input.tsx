import React, { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface InputProps {
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// Input
const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  className = "input",
  onChange,
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
