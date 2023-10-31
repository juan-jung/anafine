const hospitalData = [
  {
    hospitalId: 1,
    hospitalName: "가톨릭대학교인천성모병원",
    latitude: 37.4848309,
    longitude: 126.7248987,
    hospitalTreatmentId: 1,
    maxPrice: 50000,
    minPrice: 30000,
    distance: 24420.285104385523,
    treatmentName: "1인실",
  },
  {
    hospitalId: 2,
    hospitalName: "서울시청",
    latitude: 37.566381,
    longitude: 126.977717,
    hospitalTreatmentId: 2,
    maxPrice: 70000,
    minPrice: 50000,
    distance: 1075.1872155916478,
    treatmentName: "1인실",
  },
];

const SearchCell: React.FC = () => {
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
        {hospitalData.map((hospital) => (
          <tr key={hospital.hospitalId}>
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
