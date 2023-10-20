// 검색 결과 페이지

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

type SearchPageProps = {
  name: string;
};

const SearchPage: NextPage<SearchPageProps> = ({ name }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <p>{name} 검색 결과입니다.</p>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context,
) => {
  const { name } = context.params as { name: string };

  return {
    props: {
      name,
    },
  };
};

export default SearchPage;
