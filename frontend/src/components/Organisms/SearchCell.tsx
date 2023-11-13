import { NextRouter } from "next/router";
import React from "react";

type initialData = {
  hospitalId: string;
  hospitalName: string;
  address: string;
  maxPrice: number;
  minPrice: number;
  treatmentName: string;
};

type SearchCellProps = {
  data: initialData[];
  router: NextRouter;
};

function makeNewAddress(address: string) {
  const addressParts = address.split(" ");
  const extractedAddress = addressParts.slice(0, 2).join(" ");
  return extractedAddress;
}

function formatMoney(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SearchCell: React.FC<SearchCellProps> = ({ data, router }) => {
  if (!data) {
    data = [];
  }

  const onClick = (hospitalName: string, hospitalId: string) => {
    router.push(`/detail/${hospitalName}?id=${hospitalId}`);
  };

  return (
    <table className="hospital-table">
      <thead>
        <tr>
          <th>의료기관 명</th>
          <th>소재지</th>
          <th>최저금액</th>
          <th>최고금액</th>
          <th>상세</th>
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
              <td>{formatMoney(hospital.maxPrice)}원</td>
              <td>{formatMoney(hospital.minPrice)}원</td>
              <td
                className="detail-cell"
                onClick={() =>
                  onClick(hospital.hospitalName, hospital.hospitalId)
                }
              >
                상세
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default SearchCell;
