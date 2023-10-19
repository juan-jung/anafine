// pages/search/[name].tsx

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
        <title>SSAFY A403 FREE PROJECT</title>
        <meta name="description" content="SSAFY A403 FREE PROJECT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>{name} 검색 결과입니다.</p>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const { name } = context.params as { name: string };

  return {
    props: {
      name,
    },
  };
};

export default SearchPage;
