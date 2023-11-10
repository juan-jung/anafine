// 서비스 소개 페이지
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Header from "components/Organisms/Header";
import ShapeImage from "components/atoms/ShapeImage";

const ServicePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />

      <main className={styles.main}>
        <section className={"info-section1"}>
          <div className={"info-content"}>
            <p>1페이지</p>
            <ShapeImage
              shape={"square"}
              src={"/infoPic/pic5.png"}
              alt={"설명5"}
              width={350}
              height={300}
            />
          </div>
        </section>
        <section className={"info-section1"}>
          <div className={"info-content"}>
            <p>2페이지</p>
            <ShapeImage
              shape={"square"}
              src={"/infoPic/pic5.png"}
              alt={"설명5"}
              width={350}
              height={300}
            />
          </div>
        </section>
        <section className={"info-section1"}>
          <div className={"info-content"}>
            <p>3페이지</p>
            <ShapeImage
              shape={"square"}
              src={"/infoPic/pic5.png"}
              alt={"설명5"}
              width={350}
              height={300}
            />
          </div>
        </section>
        <section className={"info-section1"}>
          <div className={"info-content"}>
            <p>4페이지</p>
            <ShapeImage
              shape={"square"}
              src={"/infoPic/pic5.png"}
              alt={"설명5"}
              width={350}
              height={300}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicePage;
