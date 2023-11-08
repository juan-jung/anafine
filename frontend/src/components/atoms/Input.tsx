import React, { ChangeEvent, forwardRef, Ref } from "react";

interface InputProps {
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef(
  (
    { value, placeholder, className = "input", onChange, ...props }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
