import Head from "next/head";
import Header from "components/Organisms/Header";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image1 from "../../../public/infoPic/infoImage1.png";
import Image2 from "../../../public/infoPic/infoImage2.png";
import Image3 from "../../../public/infoPic/infoImage3.png";

const images = [Image1, Image2, Image3];

const InfoPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex justify-center items-center py-5 px-3">
      <Head>
        <title>A.Na.Fine 비급여 소개</title>
        <meta name="info-desc" content="비급여란 무엇인지 소개하는 페이지" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Carousel
        showArrows={true} // 화살표 표시 여부
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        selectedItem={currentIndex}
        onChange={handleChange}
        className="w-[400px] lg:hidden"
        renderArrowPrev={(clickHandler, hasPrev, label) =>
          hasPrev && (
            <div
              className="arrow"
              onClick={clickHandler}
              title={label}
              style={{ position: "absolute", top: "50%", left: 15 }}
            >
              &lt;
            </div>
          )
        }
        renderArrowNext={(clickHandler, hasNext, label) =>
          hasNext && (
            <div
              className="arrow"
              onClick={clickHandler}
              title={label}
              style={{ position: "absolute", top: "50%", right: 15 }}
            >
              &gt;
            </div>
          )
        }
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default InfoPage;

//SSR랜더링을 위한 빈 데이터 객체 반환
export async function getServerSideProps() {
  return {
    props: {},
  };
}
