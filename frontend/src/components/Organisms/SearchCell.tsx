import React from "react";

type initialData = {
  hospitalId: string;
  hospitalName: string;
  address: string;
  maxPrice: number;
  minPrice: number;
  treatmentName: string;
  latitude: number;
  longitude: number;
  distance: number;
  priceId: string;
};

type SearchCellProps = {
  data: initialData[];
  onClick: (id: string, latitude: number, longitude: number) => void;
};

function makeNewAddress(address: string) {
  const addressParts = address.split(" ");
  const extractedAddress = addressParts.slice(0, 2).join(" ");
  return extractedAddress;
}

// 돈 표기법으로 표기
function formatMoney(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 거리 표기 방식 변경(km 단위)
function formatDistance(number: number) {
  const dist = Math.floor(number) / 1000;
  return dist.toFixed(1);
}

const SearchCell: React.FC<SearchCellProps> = ({ data, onClick }) => {
  if (!data) {
    data = [];
  }

  return (
    <div className="search-result">
      <table>
        <thead>
          <tr>
            <th className="detail-subtitle">의료기관 명</th>
            <th className="detail-subtitle">소재지</th>
            <th className="detail-subtitle">최저금액</th>
            <th className="detail-subtitle">최고금액</th>
            <th className="detail-subtitle">거리</th>
            <th className="detail-subtitle">상세</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="no-result" colSpan={4}>
                범위 내 검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((hospital, index) => (
              <tr key={index}>
                <td>{hospital.hospitalName}</td>
                <td>{makeNewAddress(hospital.address)}</td>
                <td>{formatMoney(hospital.minPrice)}원</td>
                <td>{formatMoney(hospital.maxPrice)}원</td>
                <td>{formatDistance(hospital.distance)}km</td>
                <td
                  className="detail-cell"
                  onClick={() =>
                    onClick(
                      hospital.priceId,
                      hospital.latitude,
                      hospital.longitude
                    )
                  }
                >
                  상세
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchCell;
