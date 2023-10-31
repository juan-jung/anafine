import React from "react";
import Link from "next/link";
import ShapeImage from "components/atoms/ShapeImage/ShapeImage";

const Header: React.FC = () => {
  return (
    <header>
      <div className="header">
        <div className="header-image">
          <Link href="/">
            <a>
              <ShapeImage
                shape={"circle"}
                src={"/favicon.png"}
                alt={"카테고리 아이콘"}
                width={50}
                height={50}
              />
            </a>
          </Link>
        </div>
        <div className="header-link">
          <Link href="/info">
            <a>비급여란?</a>
          </Link>
        </div>
        <div className="header-link">
          <Link href="/service">
            <a>서비스 소개</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

//SSR랜더링을 위한 빈 데이터 객체 반환
export async function getServerSideProps() {
  return {
    props: {},
  };
}
