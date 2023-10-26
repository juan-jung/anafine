import React from "react";
import Link from "next/link";

//푸터
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
        <div className="footer-link">
          <Link href="/privacy">
            <a>개인정보 처리방침</a>
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

export default Footer;
