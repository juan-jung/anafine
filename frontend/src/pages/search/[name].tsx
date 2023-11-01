import { useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import SearchBar from "components/Organisms/SearchBar/SearchBar";
import Header from "components/Organisms/Header/Header";
import axiosInstance from "pages/axios";

type SearchPageProps = {
  name: string;
  initialData: any;
};

const myLatitude = 37.50130213612427;
const myLongitude = 127.03945482599437;

const SearchPage: NextPage<SearchPageProps> = ({ name, initialData }) => {
  const [mapCenter, setMapCenter] = useState({
    latitude: myLatitude,
    longitude: myLongitude,
  });

  // 함수를 사용하여 중심 좌표를 업데이트
  const updateMapCenter = (newLatitude: number, newLongitude: number) => {
    setMapCenter({ latitude: newLatitude, longitude: newLongitude });
  };

  // CSR로 렌더링할 Map와 SearchCell 컴포넌트를 동적으로 불러오기
  const DynamicMap = dynamic(() => import("components/Organisms/Map/Map"));
  const DynamicSearchCell = dynamic(
    () => import("components/Organisms/SearchCell/SearchCell")
  );

  console.log(initialData);
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
            <DynamicMap
              latitude={mapCenter.latitude}
              longitude={mapCenter.longitude}
            />
          </div>
          <div className="search-result">
            <DynamicSearchCell data={initialData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const { name } = context.params as { name: string };

  try {
    console.log("sortByPriceInfo API 요청");
    const { data } = await axiosInstance.get("/map/sortByPriceInfo", {
      params: {
        treatmentId: "ABZ010001",
        disLimit: 20000000,
        userLatitude: myLatitude,
        userLongitude: myLongitude,
      },
    });

    return {
      props: {
        name,
        initialData: data,
      },
    };
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return {
      props: {
        name,
        initialData: { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      },
    };
  }
};

export default SearchPage;
