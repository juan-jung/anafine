// 메인 페이지
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Footer from "components/Organisms/Footer/Footer";
import SearchBar from "components/Organisms/SearchBar/SearchBar";
import Header from "components/Organisms/Header/Header";
import CategoryIconBox from "components/Organisms/CategoryIconBox/CategoryIconBox";

const category = [
  "약물",
  "의료용품",
  "진단검사",
  "도수치료",
  "MRI",
  "약물",
  "의료용품",
  "진단검사",
  "도수치료",
  "MRI",
  "약물",
  "의료용품",
  "진단검사",
  "도수치료",
  "MRI",
  "약물",
  "의료용품",
  "진단검사",
  "도수치료",
  "MRI",
];

const MainPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        <SearchBar />
        <div className="main-category">
          <CategoryIconBox category={category} categoryWidth={700} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
