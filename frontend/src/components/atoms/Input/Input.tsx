import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  placeholder?: string;
  id?: string;
  name?: string;
}

// Input
const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  id,
  name,
  ...props
}: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      id={id}
      name={name}
      {...props}
    />
  );
};

export default Input;
