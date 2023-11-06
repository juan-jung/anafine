import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "components/atoms/Input";
import { Button } from "components/atoms/Button";
import { Icon } from "@iconify/react";

// SearchDetailBar
const SearchBarDetail: React.FC = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === "") {
    } else {
      router.push(`/search/${value}`);
    }
  };

  //   const koreanLocations = {
  //     전체:[
  //     강원: ["전체", "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군","양양군","영월군","원주시","인제군","정선군","철원군","춘천시","태백시","평창군","홍천군","화천군","횡성시",],
  //     경기:["전체"],
  //     경남:["전체"],
  //     경북:["전체"],
  //     광주:["전체"],
  //     대구:["전체"],
  //     대전:["전체"],
  //     부산:["전체"],
  //     서울: ["전체","강남구", "강서구", "서대문구", "마포구", "송파구"],
  //     세종시:["전체"],
  //     울산:["전체"],
  //     인천:["전체"],
  //     전남:["전체"],
  //     전북:["전체"],
  //     제주:["전체"],
  //     충남:["전체"],
  //     충북:["전체"]]
  //   };

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <div className="searchBar">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="input--search"
        />
        <Button ver="search" type="submit">
          <Icon icon="ic:baseline-search" width={30} height={30} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBarDetail;
