import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Footer from "components/Organisms/Footer/Footer";
import Header from "components/Organisms/Header";
import CategoryIconBox from "components/Organisms/CategoryIconBox";
import CategoryTextBox from "components/Organisms/CategoryTextBox";
import { useState } from "react";
import hanlderCategoryLarge from "utils/handlerCategoryLarge";
import hanlderCategoryDetail from "utils/handlerCategoryDetail";
import { Button } from "components/atoms/Button";

type MainPageProps = {
  category: any;
};

const MainPage: NextPage<MainPageProps> = ({ category }) => {
  const [state, setState] = useState({
    isBoxVisible1: false,
    isBoxVisible2: false,
    isBoxVisible3: false,
    isSearchVisible: false,
    categoryDetail1: [],
    categoryDetail2: [],
    categoryDetail3: [],
    selectedCategoryId: "",
    searchName: "",
  });

  const {
    isBoxVisible1,
    isBoxVisible2,
    isBoxVisible3,
    isSearchVisible,
    categoryDetail1,
    categoryDetail2,
    categoryDetail3,
    selectedCategoryId,
    searchName,
  } = state;

  const onCategoryDetailClick1 = async (categoryId: string) => {
    try {
      setState({ ...state, isBoxVisible1: false });
      const categoryDetailData = await hanlderCategoryDetail(categoryId);
      setState({
        ...state,
        selectedCategoryId: categoryId,
        categoryDetail1: categoryDetailData,
        isBoxVisible1: true,
        isBoxVisible2: false,
        isBoxVisible3: false,
        isSearchVisible: false,
      });
    } catch (error) {
      console.error(
        "카테고리 상세 정보를 불러오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const onCategoryDetailClick2 = async (categoryId: string, name: string) => {
    try {
      setState({ ...state, isBoxVisible2: false });
      const categoryDetailData = await hanlderCategoryDetail(categoryId);
      if (categoryDetailData.length === 0) {
        setState({
          ...state,
          categoryDetail2: categoryDetailData,
          searchName: name,
          isSearchVisible: true,
        });
        console.error("카테고리 상세 정보가 없습니다.");
      } else {
        setState({
          ...state,
          categoryDetail2: categoryDetailData,
          isBoxVisible2: true,
          isBoxVisible3: false,
          isSearchVisible: false,
        });
      }
    } catch (error) {
      console.error(
        "카테고리 상세 정보를 불러오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const onCategoryDetailClick3 = async (categoryId: string, name: string) => {
    try {
      setState({ ...state, isBoxVisible3: false });
      const categoryDetailData = await hanlderCategoryDetail(categoryId);
      if (categoryDetailData.length === 0) {
        setState({
          ...state,
          categoryDetail3: categoryDetailData,
          searchName: name,
          isSearchVisible: true,
        });
        console.error("카테고리 상세 정보가 없습니다.");
      } else {
        setState({
          ...state,
          categoryDetail3: categoryDetailData,
          isBoxVisible3: true,
          isSearchVisible: false,
        });
      }
    } catch (error) {
      console.error(
        "카테고리 상세 정보를 불러오는 중 오류가 발생했습니다.",
        error
      );
    }
  };

  const onCategoryDetailClick4 = async (categoryId: string, name: string) => {
    setState({ ...state, searchName: name, isSearchVisible: true });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SSAFY A403 자율프로젝트</title>
        <meta
          name="description"
          content="비급여 항목 검색을 위한 검색 페이지"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className="main-wrapper">
          <div className="main-first">
            <CategoryIconBox
              category={category}
              onCategoryDetailClick={onCategoryDetailClick1}
              selectedCategoryId={selectedCategoryId}
              width={100}
              height={100}
            />
          </div>
          <div className="main-second">
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
                {isBoxVisible3 && (
                  <CategoryTextBox
                    category={categoryDetail3}
                    onCategoryDetailClick={onCategoryDetailClick4}
                  />
                )}
              </div>
            </div>
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
