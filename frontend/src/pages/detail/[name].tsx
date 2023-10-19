// pages/detail/[name].tsx

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

type DetailPageProps = {
  name: string;
};

const DetailPage: NextPage<DetailPageProps> = ({ name }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 FREE PROJECT</title>
        <meta name="description" content="SSAFY A403 FREE PROJECT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>{name} 상세 페이지입니다.</p>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<DetailPageProps> = async (
  context
) => {
  const { name } = context.params as { name: string };

  return {
    props: {
      name,
    },
  };
};

export default DetailPage;
