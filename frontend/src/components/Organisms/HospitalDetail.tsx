import { useState, useEffect } from "react";
import handlerHospitalDetail from "utils/handlerHospitalDetail";

type HospitalDetailProps = {
  id: string;
  onCloseClick: () => void;
};

interface HospitalData {
  hospitalName: string;
  address: string;
  hompageUrl: string;
  hopitalType: string;
  tel: string;
  hospitalDetailDtos: any;
}

const HospitalDetail: React.FC<HospitalDetailProps> = ({
  id,
  onCloseClick,
}) => {
  const [hospitalDetail, setHospitalDetail] = useState<HospitalData>({
    hospitalName: "",
    address: "",
    hompageUrl: "",
    hopitalType: "",
    tel: "",
    hospitalDetailDtos: [],
  });

  useEffect(() => {
    const detail = async () => {
      try {
        const data = await handlerHospitalDetail(Number(id));
        setHospitalDetail(data);
      } catch (error) {
        console.error("Error fetching hospital detail:", error);
      }
    };

    detail();
  }, [id]);

  function formatMoney(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log(hospitalDetail);

  return (
    <div className="hospital-detail">
      <div className="detail-title-wrap">
        <div className="detail-title">{hospitalDetail.hospitalName}</div>
        <div className="detail-button" onClick={() => onCloseClick()}>
          X
        </div>
      </div>
      <div className="detail-content">
        <div>병원 유형: {hospitalDetail.hopitalType}</div>
        <div>주소: {hospitalDetail.address}</div>
        <div>전화: {hospitalDetail.tel}</div>
        {hospitalDetail.hompageUrl && (
          <div>홈페이지 : {hospitalDetail.hompageUrl}</div>
        )}
      </div>
      <br />
      <br />
      <div className="detail-title2">상세항목</div>
      <div className="detail-content2">
        <table>
          <thead>
            <tr>
              <th className="detail-subtitle">의료기관 사용명칭</th>
              <th className="detail-subtitle">금액</th>
              <th className="detail-subtitle">특이사항</th>
            </tr>
          </thead>
          <tbody>
            {hospitalDetail.hospitalDetailDtos.map(
              (detail: any, index: number) => (
                <tr key={index}>
                  <td>{detail.significant}</td>
                  <td>{formatMoney(detail.cost)}원</td>
                  <td>{detail.info}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalDetail;
