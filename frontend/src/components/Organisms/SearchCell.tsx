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
};

function makeNewAddress(address: string) {
  const addressParts = address.split(" ");
  const extractedAddress = addressParts.slice(0, 2).join(" ");
  return extractedAddress;
}

function formatMoney(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SearchCell: React.FC<SearchCellProps> = ({ data }) => {
  if (!data) {
    data = [];
  }
  return (
    <table className="hospital-table">
      <thead>
        <tr>
          <th>의료기관 명</th>
          <th>소재지</th>
          <th>최저금액</th>
          <th>최고금액</th>
        </tr>
      </thead>
      <tbody>
        {data.map((hospital, index) => (
          <tr key={index}>
            <td>{hospital.hospitalName}</td>
            <td>{makeNewAddress(hospital.address)}</td>
            <td>{formatMoney(hospital.maxPrice)}원</td>
            <td>{formatMoney(hospital.minPrice)}원</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchCell;
