// pages/info/index.tsx

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

const InfoPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 FREE PROJECT</title>
        <meta name="description" content="SSAFY A403 FREE PROJECT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>비급여 소개 페이지 입니다.</p>
      </main>
    </div>
  );
};

export default InfoPage;
