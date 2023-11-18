import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Header from "components/Organisms/Header";
import Pagination from "components/Organisms/Pagination";
import handlerSortByPriceInfo from "utils/hanlderSortByPriceInfo";
import handlerSortByDistInfo from "utils/handlerSortByDistInfo";
import HospitalDetail from "components/Organisms/HospitalDetail";
import handlerAddressConvert from "utils/handlerAddressConvert";

type SearchPageProps = {
  id: string;
  path: string;
  data?: any;
};

// 기본 위치를 서울 중심으로 설정
const myLatitude = 37.5642135;
const myLongitude = 127.0016985;

// CSR로 렌더링할 Map와 SearchCell 컴포넌트를 동적으로 불러오기
const DynamicMap = dynamic(() => import("components/Organisms/DynamicMap"));
const DynamicSearchCell = dynamic(
  () => import("components/Organisms/SearchCell")
);

const SearchPage: NextPage<SearchPageProps> = ({ id, path, data }) => {
  const [mapCenter, setMapCenter] = useState({
    latitude: myLatitude,
    longitude: myLongitude,
  });
  const [currentMapCenter, setCurrentMapCenter] = useState({
    latitude: myLatitude,
    longitude: myLongitude,
  });
  console.log("mapCenter", mapCenter);
  console.log("currentMapCenter", currentMapCenter);

  const [pageNum, setPageNum] = useState(1);
  const [initialData, setInitialData] = useState<any>(data);
  const [detailVisible, setDetailVisible] = useState(false);
  const [hospitalId, setHospitalId] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("now");
  const [selectedDist, setSelectedDist] = useState("5000");
  const [selectedSort, setSelectedSort] = useState("cost");
  const [address, setAddress] = useState("서울 중구 오장동 206-30");

  useEffect(() => {
    const findLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showYourLocation,
          showErrorMsg,
          options
        );
      }
    };

    // 콘솔에 위치 정보 표시(확인용)
    const showYourLocation = (position: GeolocationPosition) => {
      console.log(
        `현재 사용자는 위도 ${position.coords.latitude}, 경도 ${position.coords.longitude}에 위치하고 있습니다.`
      );
      setMapCenter({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      handlerSortByPriceInfo(
        id,
        Number(selectedDist),
        position.coords.latitude,
        position.coords.longitude,
        0,
        12
      )
        .then((data) => {
          setInitialData(data);
          return handlerAddressConvert(
            position.coords.latitude,
            position.coords.longitude
          );
        })
        .then((newAddress) => {
          setAddress(
            newAddress.road_address?.address_name ||
              newAddress.address.address_name
          );
          console.log(newAddress);
        })
        .catch((error) => {
          console.error("오류 발생:", error);
        });
    };

    // 에러 메시지
    const showErrorMsg = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("사용자가 위치정보 사용 권한을 거부했습니다.");
          if (!localStorage.getItem("permissionDenied")) {
            alert("위치정보 사용 권한을 허용해주세요.");
            localStorage.setItem("permissionDenied", "true");
          }
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("사용할 수 없는 위치정보입니다.");
          break;
        case error.TIMEOUT:
          console.log("위치 정보 요청이 허용 시간을 초과했습니다.");
          break;
        default:
          console.log("알 수 없는 오류가 발생했습니다.");
          break;
      }
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    findLocation();
  }, []);

  useEffect(() => {
    setInitialData(data);
  }, [data]);

  const onPageChange = (page: number) => {
    if (0 < page && page < initialData.totalPages + 1) {
      setPageNum(page);
      if (selectedSort === "cost") {
        handlerSortByPriceInfo(
          id,
          Number(selectedDist),
          mapCenter.latitude,
          mapCenter.longitude,
          page - 1,
          12
        ).then((data) => setInitialData(data));
      } else {
        handlerSortByDistInfo(
          id,
          Number(selectedDist),
          mapCenter.latitude,
          mapCenter.longitude,
          page - 1,
          12
        ).then((data) => setInitialData(data));
      }
    }
  };

  const onClick = (id: string, latitude: number, longitude: number) => {
    setHospitalId(id);
    setMapCenter({ latitude, longitude });
    setDetailVisible(true);
  };

  const onLocationChange = (latitude: number, longitude: number) => {
    setCurrentMapCenter({ latitude, longitude });
  };

  const onCloseClick = () => {
    setDetailVisible(false);
  };

  const onSelectPositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPosition(event.target.value);
    setPageNum(1);
    console.log(event.target.value);
    if (event.target.value === "now") {
      if (selectedSort === "cost") {
        handlerSortByPriceInfo(
          id,
          Number(selectedDist),
          mapCenter.latitude,
          mapCenter.longitude,
          0,
          12
        ).then((data) => setInitialData(data));
      } else {
        handlerSortByDistInfo(
          id,
          Number(selectedDist),
          mapCenter.latitude,
          mapCenter.longitude,
          0,
          12
        ).then((data) => setInitialData(data));
      }
    } else if (selectedSort === "cost") {
      handlerSortByPriceInfo(
        id,
        Number(selectedDist),
        currentMapCenter.latitude,
        currentMapCenter.longitude,
        0,
        12
      ).then((data) => setInitialData(data));
    } else {
      handlerSortByDistInfo(
        id,
        Number(selectedDist),
        currentMapCenter.latitude,
        currentMapCenter.longitude,
        0,
        12
      ).then((data) => setInitialData(data));
    }
  };

  const onSelectDistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDist(event.target.value);
    setPageNum(1);
    if (selectedSort === "cost") {
      handlerSortByPriceInfo(
        id,
        Number(event.target.value),
        mapCenter.latitude,
        mapCenter.longitude,
        0,
        12
      ).then((data) => setInitialData(data));
    } else {
      handlerSortByDistInfo(
        id,
        Number(event.target.value),
        mapCenter.latitude,
        mapCenter.longitude,
        0,
        12
      ).then((data) => setInitialData(data));
    }
  };

  const onSelectSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
    setPageNum(1);
    if (event.target.value === "cost") {
      handlerSortByPriceInfo(
        id,
        Number(selectedDist),
        mapCenter.latitude,
        mapCenter.longitude,
        0,
        12
      ).then((data) => setInitialData(data));
    } else {
      handlerSortByDistInfo(
        id,
        Number(selectedDist),
        mapCenter.latitude,
        mapCenter.longitude,
        0,
        12
      ).then((data) => setInitialData(data));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>A.Na.Fine 검색 결과</title>
        <meta name="search-desc" content="비급여 비용 검색 결과" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className="search-container">
          <div className="search-title">{path} 검색 결과</div>
          <div className="search-result-container">
            <div className="search-map">
              {selectedPosition === "now" ? (
                <DynamicMap
                  latitude={mapCenter.latitude}
                  longitude={mapCenter.longitude}
                  data={initialData.content}
                  onClick={onClick}
                  onLocationChange={onLocationChange}
                />
              ) : (
                <DynamicMap
                  latitude={currentMapCenter.latitude}
                  longitude={currentMapCenter.longitude}
                  data={initialData.content}
                  onClick={onClick}
                  onLocationChange={onLocationChange}
                />
              )}
            </div>
            {detailVisible ? (
              <HospitalDetail
                path={path}
                id={hospitalId}
                onCloseClick={onCloseClick}
              />
            ) : (
              <div>
                <div className="search-select">
                  <div className="search-select-left">기준 위치: {address}</div>
                  검색 장소&nbsp;&nbsp;
                  <select
                    id="selectPosition"
                    value={selectedPosition}
                    onChange={onSelectPositionChange}
                  >
                    <option value="now">내 위치</option>
                    <option value="map">지도</option>
                  </select>
                  &nbsp;&nbsp;&nbsp;반경 선택&nbsp;&nbsp;
                  <select
                    id="selectDist"
                    value={selectedDist}
                    onChange={onSelectDistChange}
                  >
                    <option value="1000">1km</option>
                    <option value="5000">5km</option>
                    <option value="10000">10km</option>
                    <option value="50000">50km</option>
                  </select>
                  &nbsp;&nbsp;&nbsp;정렬 기준&nbsp;&nbsp;
                  <select
                    id="selectSort"
                    value={selectedSort}
                    onChange={onSelectSortChange}
                  >
                    <option value="cost">가격 순</option>
                    <option value="distance">거리 순</option>
                  </select>
                </div>
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
  const { path, id } = context.query as {
    path: string;
    id: string;
  };

  try {
    const data = await handlerSortByPriceInfo(
      id,
      5000,
      myLatitude,
      myLongitude,
      0,
      12
    );

    return {
      props: {
        path: path,
        id: id,
        data: data,
      },
    };
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return {
      props: {
        path: path,
        id: id,
        data: { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      },
    };
  }
};
