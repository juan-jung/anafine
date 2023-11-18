import styled from "@emotion/styled";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
  data: any[];
  onClick: (id: string, latitude: number, longitude: number) => void;
  onLocationChange: (latitude: number, longitude: number) => void;
}

//반경에 따라 map level 설정함수
const find_scale  = (scale) => {
  if(scale == 1000) return 5;
  else if(scale == 5000) return 6;
  else if(scale == 10000) return 7;
  else if(scale == 50000) return 10;
}

const DynamicMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  data,
  onClick,
  onLocationChange,
}) => {
  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            // level: find_scale(scale),
            level : 4,
            mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
          };
          const map = new window.kakao.maps.Map(container, options);

          const zoomControl = new window.kakao.maps.ZoomControl();

          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
          const markerImageUrl =
              "https://t1.daumcdn.net/localimg/localimages/07/2012/img/marker_p.png",
            markerImageSize = new window.kakao.maps.Size(40, 42),
            markerImageOptions = {
              offset: new window.kakao.maps.Point(13, 41),
            };

          const markerImage = new window.kakao.maps.MarkerImage(
            markerImageUrl,
            markerImageSize,
            markerImageOptions
          );
          
          //페이지 내 데이터 기준으로 bounds 설정
          var bounds = new window.kakao.maps.LatLngBounds();

          data.forEach((item) => {
              const markerPosition = new window.kakao.maps.LatLng(
              item.latitude,
              item.longitude
            );

            bounds.extend(markerPosition)

            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
              map: map,
            });

            const customOverlay = new window.kakao.maps.CustomOverlay({
              map: map,
              clickable: true,
              content: `
              <div class="overlay-wrap">
                <div class="overlay-info">
                  <div class="overlay-title">
                    ${item.hospitalName}
                  </div>
                  <div class="overlay-body">${item.address}</div>
                  <div class="overlay-desc">▼ 마커 클릭시 병원 상세 페이지로 이동</div>
                </div>
              </div>
            `,
              position: markerPosition,
              xAnchor: 0,
              yAnchor: 0,
            });

            customOverlay.setMap(null);

            window.kakao.maps.event.addListener(marker, "click", function () {
              console.log(item);
              onClick(item.priceId, item.latitude, item.longitude);
            });

            window.kakao.maps.event.addListener(
              map,
              "center_changed",
              function () {
                onLocationChange(
                  map.getCenter().getLat(),
                  map.getCenter().getLng()
                );
              }
            );

            window.kakao.maps.event.addListener(
              marker,
              "mouseover",
              function () {
                customOverlay.setMap(map);
              }
            );
            window.kakao.maps.event.addListener(
              marker,
              "mouseout",
              function () {
                customOverlay.setMap(null);
              }
            );
          });

          map.setBounds(bounds);
        });
      };

      document.head.appendChild(script);
    };

    loadKakaoMap();
  }, [latitude, longitude, data]);

  return <MapContainer id="map" />;
};

const MapContainer = styled.div`
  width: 35vw;
  height: 75vh;
`;

export default DynamicMap;
