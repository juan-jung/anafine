import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Header from "components/Organisms/Header";
import { Button } from "components/atoms/Button";

const InfoPage: NextPage = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <motion.div
        className={"progress-bar"}
        style={{ scaleX: scrollYProgress }}
      />
      <main className={styles.main}>
      
      <section className={"infoSection"}>
        <div className={"infoContent"}>
          <div className={"bubble right"}>급여와 비급여가 무었인가요?</div>
          <img src="/infoPic/man.png" alt="남자" />
        </div>
        <div className={"infoContent"}>
          <img src="/infoPic/pic2.png" alt="설명2" />
          <img src="/infoPic/pic3.png" alt="설명3" />
          <img src="/infoPic/pic5.png" alt="설명5" />
        </div>
      </section>
        
      <section className={"infoSection"}>
        <div className={"infoContent"}>
          <img src="/infoPic/man.png" alt="남자" />
          <div class={"bubble right"}>그럼 제가 내야하는 병원비는 어떻게 되나요?</div>
        </div>
        <div className={"infoContent"}>
          <img src="/infoPic/pic6.png" alt="설명6" />
          <img src="/infoPic/pic7.png" alt="설명7" />
        </div>
      </section>

      <section className={"infoSection"}>
        <div className={"infoContent"}>
          <img src="/infoPic/man.png" alt="남자" />
          <div class={"bubble right"}>비급여 항목은 병원마다 가격 차이가 있는데 쉽게 알 수 있는 방법이 없을까요?</div>
        </div>
        <div className={"infoContent"}>
          <img src="/infoPic/advocate.png" alt="여자" />
          <div class={"bubble left"}>"아나파잉" 서비스를 통해 쉽게 비급여에 관한 병원 및 기타 정보를 얻을 수 있어요!</div>
        </div>
        <img src="/infoPic/pic8.png" alt="설명8" />
      </section>  


      </main>
    </div>
  );
};

export default InfoPage;
