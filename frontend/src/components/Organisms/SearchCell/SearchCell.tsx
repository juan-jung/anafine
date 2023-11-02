import React from "react";

type initialData = {
  hospitalId: string;
  hospitalName: string;
  maxPrice: number;
  minPrice: number;
  treatmentName: string;
};

type SearchCellProps = {
  data: initialData[];
};

const SearchCell: React.FC<SearchCellProps> = ({ data }) => {
  return (
    <table className="hospital-table">
      <thead>
        <tr>
          <th>의료기관 명</th>
          <th>최저금액</th>
          <th>최고금액</th>
          <th>비급여 항목</th>
        </tr>
      </thead>
      <tbody>
        {data.map((hospital, index) => (
          <tr key={index}>
            <td>{hospital.hospitalName}</td>
            <td>{hospital.maxPrice}</td>
            <td>{hospital.minPrice}</td>
            <td>{hospital.treatmentName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchCell;
