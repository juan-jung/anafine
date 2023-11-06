import { useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import SearchBar from "components/Organisms/SearchBar/SearchBar";
import Header from "components/Organisms/Header/Header";
import handlerSortByPriceInfo from "utils/hanlderSortByPriceInfo";

type SearchPageProps = {
  name: string;
  initialData?: any;
};

const myLatitude = 37.566381;
const myLongitude = 126.9768428;

const SearchPage: NextPage<SearchPageProps> = ({ name, initialData }) => {
  const [mapCenter, setMapCenter] = useState({
    latitude: myLatitude,
    longitude: myLongitude,
  });
  console.log(initialData);

  // 함수를 사용하여 중심 좌표를 업데이트
  const updateMapCenter = (newLatitude: number, newLongitude: number) => {
    setMapCenter({ latitude: newLatitude, longitude: newLongitude });
  };

  // CSR로 렌더링할 Map와 SearchCell 컴포넌트를 동적으로 불러오기
  const DynamicMap = dynamic(() => import("components/Organisms/Map/Map"));
  const DynamicSearchCell = dynamic(
    () => import("components/Organisms/SearchCell/SearchCell")
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="비급여 비용 검색 결과 페이지" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        <SearchBar />
        <div className="search-result-container">
          <div className="search-map">
            <DynamicMap
              latitude={mapCenter.latitude}
              longitude={mapCenter.longitude}
              data={initialData.content}
            />
          </div>
          <div className="search-result">
            <DynamicSearchCell data={initialData.content} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const { name } = context.params as { name: string };
  try {
    const data = await handlerSortByPriceInfo(
      name,
      15000,
      myLatitude,
      myLongitude,
      2,
      9
    );

    return {
      props: {
        name: name,
        initialData: data,
      },
    };
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return {
      props: {
        name: name,
        initialData: { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      },
    };
  }
};
