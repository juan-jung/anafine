import styled from "@emotion/styled";
import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

// Map 컴포넌트의 props 정의
interface MapProps {
  latitude: number; // 위도
  longitude: number; // 경도
  data: any[];
}

function Map({ latitude, longitude, data }: MapProps) {
  console.log(data);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 4,
          mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 확대 축소 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 마커 이미지 설정
        var markerImageUrl =
          "https://t1.daumcdn.net/localimg/localimages/07/2012/img/marker_p.png";
        var markerImageSize = new window.kakao.maps.Size(30, 30);
        var markerImageOptions = {
          offset: new window.kakao.maps.Point(20, 42),
        };
        var markerImage = new window.kakao.maps.MarkerImage(
          markerImageUrl,
          markerImageSize,
          markerImageOptions
        );

        // 커스텀 오버레이를 생성하고 지도에 표시한다
        var customOverlay = new window.kakao.maps.CustomOverlay({
          map: map,
          content: `
            <div class="wrap">
              <div class="info">
                <div class="title">
                  카카오 스페이스닷원
                  <div class="close" onclick="closeOverlay()" title="닫기"></div>
                </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                  <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>
                </div>
              </div>
            </div>
          </div>
          `,
          position: new window.kakao.maps.LatLng(latitude, longitude),
          xAnchor: 0, // 컨텐츠의 x 위치
          yAnchor: 0, // 컨텐츠의 y 위치
        });

        if (!data) {
          data = [];
        }
        data.forEach((item) => {
          const markerPosition = new window.kakao.maps.LatLng(
            item.latitude,
            item.longitude
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
            map: map,
          });

          // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          window.kakao.maps.event.addListener(marker, "click", function () {
            customOverlay.setMap(map);
          });
        });

        // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
        function closeOverlay() {
          customOverlay.setMap(null);
        }
      });
    };

    document.head.appendChild(script);
  }, [latitude, longitude]);

  return <MapContainer id="map" />;
}
const MapContainer = styled.div`
  width: 35vw;
  height: 60vh;
`;

export default Map;
