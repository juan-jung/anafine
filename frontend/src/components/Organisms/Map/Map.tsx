import styled from "@emotion/styled";
import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapProps {
  latitude: number;
  longitude: number;
}

function Map({ latitude, longitude }: MapProps) {
  useEffect(() => {
    // 동적으로 Kakao Map 스크립트 로드 및 초기화
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        // 지도 초기화 및 표시 로직
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };

    document.head.appendChild(script);
  }, [latitude, longitude]);

  return <MapContainer id="map" style={{ width: "35vw", height: "50vh" }} />;
}

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
`;

export default Map;
