import React, { ChangeEvent, FormEvent } from "react";
import "./SearchBar.css";
import Input from "components/atoms/Input/Input";

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
      <Input value={value} placeholder={placeholder}></Input>
    </form>
  );
};

export default SearchBar;
