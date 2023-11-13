// 검색 결과 상세 페이지

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import handlerHospitalDetail from "utils/handlerHospitalDetail";

type DetailPageProps = {
  name: string;
  id: number;
  data?: any;
};

const DetailPage: NextPage<DetailPageProps> = ({ name, id, data }) => {
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <p>
          {name}
          {id}상세 페이지입니다.
        </p>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<DetailPageProps> = async (
  context
) => {
  const { name } = context.params as { name: string };
  const { id } = context.query as { id: string };

  try {
    const data = await handlerHospitalDetail(Number(id));

    return {
      props: {
        name: name,
        id: Number(id),
        data: data,
      },
    };
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return {
      props: {
        name: name,
        id: Number(id),
        data: { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      },
    };
  }
};

export default DetailPage;
