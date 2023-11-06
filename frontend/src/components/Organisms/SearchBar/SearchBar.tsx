import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "components/atoms/Input/Input";
import { Button } from "components/atoms/Button/Button";
import { Icon } from "@iconify/react";
import useElasticSearch from "hooks/useElasticSearch";

// SearchBar
const SearchBar: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{ path: string }[]>([]);
  const router = useRouter();

  useElasticSearch(value, setSearchResults);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === "") {
    } else {
      router.push(`/search/${value}`);
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleFormSubmit}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="search-input"
        />
        <Button ver="search" type="submit">
          <Icon icon="ic:baseline-search" width={30} height={30} />
        </Button>
      </form>
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>{result.path}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
