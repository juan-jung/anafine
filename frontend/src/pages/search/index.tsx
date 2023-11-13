import { useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Header from "components/Organisms/Header";
import handlerSortByPriceInfo from "utils/hanlderSortByPriceInfo";
import Pagination from "components/Organisms/Pagination";

type SearchPageProps = {
  id: string;
  path: string;
  page: number;
  data?: any;
};

// 기본 위치를 멀티캠퍼스 역삼으로 설정
const myLatitude = 37.50130213612427;
const myLongitude = 127.03945482599437;

const SearchPage: NextPage<SearchPageProps> = ({ id, path, page, data }) => {
  const [mapCenter, setMapCenter] = useState({
    latitude: myLatitude,
    longitude: myLongitude,
  });
  const router = useRouter();
  const [pageNum, setPageNum] = useState(page);
  console.log("페이지넘버" + pageNum);
  const [initialData, setInitialData] = useState<any>(data);
  console.log(initialData);

  const handlePageChange = (page: number) => {
    if (0 < page && page < initialData.totalPages + 1) {
      router.push(`/search/?path=${path}&id=${id}&page=${page}`, undefined, {
        shallow: false,
      });
    }
  };

  // 함수를 사용하여 중심 좌표를 업데이트
  const updateMapCenter = (newLatitude: number, newLongitude: number) => {
    setMapCenter({ latitude: newLatitude, longitude: newLongitude });
  };

  // CSR로 렌더링할 Map와 SearchCell 컴포넌트를 동적으로 불러오기
  const DynamicMap = dynamic(() => import("components/Organisms/Map"));
  const DynamicSearchCell = dynamic(
    () => import("components/Organisms/SearchCell")
  );

  console.log("현재 페이지는" + pageNum + "입니다.");

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
              />
            </div>
            <div className="search-result">
              <DynamicSearchCell data={initialData.content} />
              <Pagination
                pageNum={pageNum}
                totalPages={initialData.totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
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
      150000,
      myLatitude,
      myLongitude,
      Number(page),
      9
    );

    return {
      props: {
        id: id,
        path: path,
        page: Number(page),
        data: data,
      },
    };
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return {
      props: {
        id: id,
        path: path,
        page: Number(page),
        data: { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      },
    };
  }
};
