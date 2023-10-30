// 검색 결과 페이지

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Map from "components/Organisms/Map/Map";
import SearchCell from "components/Organisms/SearchCell/SearchCell";
import SearchBar from "components/Organisms/SearchBar/SearchBar";
import Header from "components/Organisms/Header/Header";
import Footer from "components/Organisms/Footer/Footer";

type SearchPageProps = {
  name: string;
};
const myLatitude = 37.566381;
const myLongitude = 126.977717;

const SearchPage: NextPage<SearchPageProps> = ({ name }) => {
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
        <div className="search-result-container">
          <div className="search-map">
            <Map latitude={myLatitude} longitude={myLongitude} />
          </div>
          <div className="search-result">
            <SearchCell />
          </div>
        </div>
      </main>
      <Footer />
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
