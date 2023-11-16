import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "components/atoms/Button";
import Input from "components/atoms/Input";
import TextArea from "components/atoms/TextArea";
import useElasticSearch from "hooks/useElasticSearch";

// SearchBar
const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(""); // 입력된 검색어
  const [searchResults, setSearchResults] = useState<
    { path: string; treatmentId: string }[]
  >([]); // 추천 검색어 리스트
  const [selectIdx, setSelectIdx] = useState<number>(0); // 선택된 추천 검색어 인덱스
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useElasticSearch(searchValue, setSearchResults, setSelectIdx);

  // 검색어 입력
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length !== 0) {
      router.push(
        `/search/?path=${searchResults[selectIdx].path}&id=${searchResults[selectIdx].treatmentId}`
      );
      setSearchValue("");
    }
    setSearchResults([]);
    setSelectIdx(0);
  };

  // 추천 검색어 클릭
  const onClick = (treatmentId: string, path: string) => {
    router.push(`/search/?path=${path}&id=${treatmentId}`);
  };

  // 화살표 위로 이동
  const handleArrowUp = useCallback(() => {
    console.log("handleArrowUp");
    if (selectIdx > 0) {
      setSelectIdx(selectIdx - 1);
    }
  }, [selectIdx]);

  // 화살표 아래로 이동
  const handleArrowDown = useCallback(() => {
    console.log("handleArrowDown");
    if (selectIdx < searchResults.length - 1) {
      setSelectIdx(selectIdx + 1);
    }
  }, [selectIdx, searchResults]);

  // 키보드 키 입력
  const handleKeyDown = (e: KeyboardEvent) => {
    console.log("handleKeyDown");
    if (e.key === "ArrowUp" && inputRef.current === document.activeElement) {
      e.preventDefault();
      handleArrowUp();
    } else if (
      e.key === "ArrowDown" &&
      inputRef.current === document.activeElement
    ) {
      e.preventDefault();
      handleArrowDown();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleArrowUp, handleArrowDown]);

  return (
    <div>
      <form className="search-form" onSubmit={handleFormSubmit}>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="search-input"
          ref={inputRef}
        />
        <Button ver="search" type="submit">
          <Icon icon="ic:baseline-search" width={30} height={30} />
        </Button>
      </form>
      <div className="search-results">
        {searchResults.map((result, index) => (
          <TextArea
            key={index}
            className={`search-result-text ${
              index === selectIdx ? "selected" : ""
            }`}
            onClick={() => onClick(result.treatmentId, result.path)}
          >
            {result.path}
          </TextArea>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
