// 위치기반 서비스 이용약관 페이지
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

const LocationPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <p>위치기반 서비스 이용약관 페이지 입니다.</p>
      </main>
    </div>
  );
};

export default LocationPage;
