// 서비스 이용약관 페이지
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

const RulePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className="rule-text">
          <h2>서비스 이용약관</h2>
          <p>제 1장: 총칙</p>
          <p>제 1조 (목적)</p>
          <p>
            이 약관은 anafine(이하 "회사"라 함)이 제공하는 온라인 서비스 및 기타
            관련 서비스(이하 "서비스"라 함)의 이용조건과 기타 필요한 사항을
            규정함을 목적으로 합니다.
          </p>
          <p>제 2조 (약관의 효력 및 변경)</p>
          <p>
            본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을
            발생하며, 이용자는 본 약관에 동의함으로써 서비스를 이용할 수
            있습니다. 회사는 약관의 변경이 필요한 경우, 이를 사전 고지 및 서비스
            내 공지하여야 하며, 변경된 약관은 사전 고지 후 7일 이내에 효력을
            발생합니다. 이용자는 변경된 약관에 동의하지 않을 경우, 서비스 이용을
            중단하고 이용계약을 해지할 수 있습니다.
          </p>
          <p>제 3조 (이용자의 의무)</p>
          <p>
            이용자는 서비스를 이용함에 있어 다음 각 호의 행위를 하여서는
            안됩니다. 타인의 개인정보를 수집, 저장, 공개, 유포, 배포, 처리하는
            행위 회사의 서비스 운영에 지장을 주는 행위 불법적인 목적으로
            서비스를 이용하는 행위 이용자는 서비스를 이용함에 있어 관련 법령, 본
            약관, 개별 서비스 약관 및 회사의 공지사항을 준수하여야 합니다.
          </p>
          <p>제 4조 (회사의 의무)</p>
          <p>
            회사는 서비스를 안정적으로 제공하기 위해 노력하여야 합니다. 회사는
            이용자의 개인정보를 보호하기 위해 개인정보 처리방침을 운영하며, 이를
            준수하여야 합니다.
          </p>
          <p>제 2장: 서비스 이용</p>
          <p>제 5조 (서비스의 제공)</p>
          <p>
            회사는 이용자에게 다양한 서비스를 제공합니다. 서비스의 종류 및 세부
            내용은 개별 서비스 약관 및 공지사항을 통해 안내됩니다.
          </p>
          <p>제 6조 (서비스 이용시간)</p>
          <p>
            서비스 이용시간은 연중무휴 24시간을 원칙으로 합니다. 회사는 서비스
            점검 및 기타 불가피한 사유로 인해 서비스를 일시 중지할 경우 사전
            공지할 것입니다.
          </p>
          <p>제 7조 (서비스 이용료)</p>
          <p>서비스의 이용은 무료로 제공됩니다.</p>
        </div>
      </main>
    </div>
  );
};

export default RulePage;
