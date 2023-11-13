import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-link">
          <Link href="/rule">
            <a>서비스 이용약관</a>
          </Link>
        </div>
        <div className="footer-link">
          <Link href="/location">
            <a>위치기반 서비스 이용약관</a>
          </Link>
        </div>
        <p>
          SSAFY 9기 A403
          <br />
          서울 강남구 테헤란로 212 멀티캠퍼스 1202호
        </p>
        <p>Copyright A403 &copy; Corps. All rights reserved.</p>
      </div>
    </footer>
  );
};

//SSR랜더링을 위한 빈 데이터 객체 반환
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Footer;
