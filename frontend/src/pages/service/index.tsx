// 서비스 소개 페이지
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Header from "components/Organisms/Header";
import ShapeImage from "components/atoms/ShapeImage";
import { useRouter } from "next/router";



const ServicePage: NextPage = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        {/* <section className={"service-section"}> */}
          <div className={"service-div1"}>
            <div className={"animation"}>
              <span className={"one_text"}>A.Na.Fine 서비스는</span>
              <span className={"two_text"}>비급여 진료비를 조회, 비교하는 서비스 입니다.</span>
              </div>
            <img className={"service-img1"}
              // shape={"square"}
              src={"/servicePic/serviceImage1.png"}
              alt={"설명5"}
              // width={350}
              // height={300}
              // layout="fill"
              // objectFit="cover"
              // objectPosition="center"
            />
          </div>
        {/* </section> */}
        <section className={"service-section"}>
          <div className={"service-div2"}>
            <img className={"service-img2"}
              // shape={"square"}
              src={"/servicePic/serviceImage2.png"}
              alt={"설명5"}
              // width={350}
              // height={300}
            />
            <div className={"service-textbox2"}><h1>566가지 비급여 진료 정보를 한 번에 비교</h1></div>
          </div>
        </section>
        <section className={"service-section3"}>
          <div className={"service-div3"}>
          <div className={"service-textbox3"}><h1>병원 정보와 위치까지 한 번에</h1></div>
            <img className={"service-img3"}
              // shape={"square"}
              src={"/servicePic/serviceImage3.png"}
              alt={"설명5"}
              // width={350}
              // height={300}
            />
          </div>
        </section>
        <section className={"service-section"}>
          <div className={"service-div4"}>
            <img className={"service-img5"}
              // shape={"square"}
              src={"/servicePic/serviceImage5.png"}
              alt={"설명5"}
              // width={350}
              // height={300}
              // layout="fill"
              // objectFit="cover"
              // objectPosition="center"
            />
            <div className={"text-and-button"}>
            <div className={"service-textbox4"}><h1>A.Na.Fine</h1></div>
            <div className={"start-button"} onClick={onClick}>
              <p className={"start-button-text"}>A.Na.Fine</p>
              <div className={"start-button2"} >  
                <p className={"start-button-text2"}>시작하기!</p>
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicePage;
