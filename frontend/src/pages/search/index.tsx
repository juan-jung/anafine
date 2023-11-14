import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Header from "components/Organisms/Header";
import Pagination from "components/Organisms/Pagination";
import handlerSortByPriceInfo from "utils/hanlderSortByPriceInfo";
import HospitalDetail from "components/Organisms/HospitalDetail";

type SearchPageProps = {
  id: string;
  path: string;
  page: number;
  data?: any;
};

// 기본 위치를 멀티캠퍼스 역삼으로 설정
const myLatitude = 37.50130213612427;
const myLongitude = 127.03945482599437;

// CSR로 렌더링할 Map와 SearchCell 컴포넌트를 동적으로 불러오기
const DynamicMap = dynamic(() => import("components/Organisms/Map"));
const DynamicSearchCell = dynamic(
  () => import("components/Organisms/SearchCell")
);

const SearchPage: NextPage<SearchPageProps> = ({ id, path, page, data }) => {
  const [mapCenter, setMapCenter] = useState({
    latitude: myLatitude,
    longitude: myLongitude,
  });
  const router = useRouter();
  const pageNum = page;
  const [initialData, setInitialData] = useState<any>(data);
  const [detailVisible, setDetailVisible] = useState(false);
  const [hospitalId, setHospitalId] = useState("");

  useEffect(() => {
    setInitialData(data);
  }, [data]);

  const onPageChange = (page: number) => {
    if (0 < page && page < initialData.totalPages + 1) {
      router.push(`/search/?path=${path}&id=${id}&page=${page}`);
    }
  };

  const onClick = (id: string, latitude: number, longitude: number) => {
    setHospitalId(id);
    setMapCenter({ latitude, longitude });
    setDetailVisible(true);
  };

  const onCloseClick = () => {
    setDetailVisible(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="비급여 비용 검색 결과 페이지" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className="search-container">
          <div className="search-title">{path} 검색 결과</div>
          <div className="search-result-container">
            <div className="search-map">
              <DynamicMap
                latitude={mapCenter.latitude}
                longitude={mapCenter.longitude}
                data={initialData.content}
                onClick={onClick}
              />
            </div>
            {detailVisible ? (
              <HospitalDetail
                path={path}
                id={hospitalId}
                onCloseClick={onCloseClick}
              />
            ) : (
              <div className="search-result">
                <DynamicSearchCell
                  data={initialData.content}
                  onClick={onClick}
                />
                <Pagination
                  pageNum={pageNum}
                  totalPages={initialData.totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
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
  const { path, id, page } = context.query as {
    path: string;
    id: string;
    page: string;
  };

  try {
    const data = await handlerSortByPriceInfo(
      id,
      5000,
      myLatitude,
      myLongitude,
      Number(page) - 1,
      12
    );

    return {
      props: {
        path: path,
        id: id,
        page: Number(page),
        data: data,
      },
    };
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return {
      props: {
        path: path,
        id: id,
        page: Number(page),
        data: { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      },
    };
  }
};
