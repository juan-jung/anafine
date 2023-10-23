import React, { ChangeEvent, FormEvent } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

// SearchBar
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  disabled = false,
  id,
  name,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        name={name}
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchBar;
