import React, { useState } from "react";
import "./SearchBar.css";
import Input from "components/atoms/Input/Input";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

// SearchBar
const SearchBar: React.FC = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${value}`);
  };

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="검색어를 입력해주세요"
        className="input--search"
      />
      <button className="search-button" type="submit">
        <Icon icon="ic:baseline-search" width={30} height={30} />
      </button>
    </form>
  );
};

export default SearchBar;
