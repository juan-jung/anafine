import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Footer from "components/Organisms/Footer/Footer";
import SearchBar from "components/Organisms/SearchBar/SearchBar";
import Header from "components/Organisms/Header/Header";
import CategoryIconBox from "components/Organisms/CategoryIconBox/CategoryIconBox";
import CategoryTextBox from "components/Organisms/CategoryTextBox/CategoryTextBox";
import { useState } from "react";
import hanlderCategoryLarge from "utils/handlerCategoryLarge";
import hanlderCategoryDetail from "utils/handlerCategoryDetail";

type MainPageProps = {
  category: any;
};

const MainPage: NextPage<MainPageProps> = ({ category }) => {
  const [isBoxVisible1, setIsBoxVisible1] = useState(false);
  const [isBoxVisible2, setIsBoxVisible2] = useState(false);
  const [isBoxVisible3, setIsBoxVisible3] = useState(false);
  const [categoryDetail1, setCategoryDetail1] = useState([]);
  const [categoryDetail2, setCategoryDetail2] = useState([]);
  const [categoryDetail3, setCategoryDetail3] = useState([]);

  const onCategoryDetailClick1 = async (categoryId: string) => {
    try {
      const categoryDetailData = await hanlderCategoryDetail(categoryId);
      setCategoryDetail1(categoryDetailData);
      setIsBoxVisible1(true);
      setIsBoxVisible2(false);
      setIsBoxVisible3(false);
    } catch (error) {
      console.error(
        "카테고리 상세 정보를 불러오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const onCategoryDetailClick2 = async (categoryId: string) => {
    try {
      const categoryDetailData = await hanlderCategoryDetail(categoryId);
      setCategoryDetail2(categoryDetailData);
      setIsBoxVisible2(true);
      setIsBoxVisible3(false);
    } catch (error) {
      console.error(
        "카테고리 상세 정보를 불러오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const onCategoryDetailClick3 = async (categoryId: string) => {
    try {
      const categoryDetailData = await hanlderCategoryDetail(categoryId);
      setCategoryDetail3(categoryDetailData);
      setIsBoxVisible3(true);
    } catch (error) {
      console.error(
        "카테고리 상세 정보를 불러오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta name="description" content="SSAFY A403 자율프로젝트" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        <SearchBar />
        <div className="main-category">
          <CategoryIconBox
            category={category}
            onCategoryDetailClick={onCategoryDetailClick1}
          />
        </div>
        <div className="category-container">
          <div className="category-list">
            {isBoxVisible1 && (
              <CategoryTextBox
                category={categoryDetail1}
                onCategoryDetailClick={onCategoryDetailClick2}
              />
            )}
          </div>
          <div className="category-list">
            {isBoxVisible2 && (
              <CategoryTextBox
                category={categoryDetail2}
                onCategoryDetailClick={onCategoryDetailClick3}
              />
            )}
          </div>
          <div className="category-list">
            {isBoxVisible3 && <CategoryTextBox category={categoryDetail3} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  MainPageProps
> = async () => {
  try {
    const categoryResponse = await hanlderCategoryLarge();

    return {
      props: {
        category: categoryResponse,
      },
    };
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return {
      props: {
        category: { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      },
    };
  }
};

export default MainPage;
