import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

// Input
const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  id,
  name,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      id={id}
      name={name}
    />
  );
};

export default Input;
