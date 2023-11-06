import React from "react";
import ShapeImage from "components/atoms/ShapeImage/ShapeImage";

interface CategoryProps {
  category: { categoryId: string; name: string }[];
  onCategoryDetailClick: (categoryId: string) => void;
  selectedCategoryId: string;
  width: number;
  height: number;
}

// 카테고리 아이콘 박스
const CategoryIconBox: React.FC<CategoryProps> = ({
  category,
  onCategoryDetailClick,
  selectedCategoryId,
  width,
  height,
}) => {
  const middleIndex = Math.ceil(category.length / 3);
  const middleIndex1 = Math.ceil((category.length * 2) / 3);
  console.log(category);

  return (
    <div>
      <div className="main-row">
        {category.slice(0, middleIndex).map((icon, index) => (
          <div
            key={index}
            className={`category-item ${
              icon.categoryId === selectedCategoryId ? "selected" : ""
            }`}
            onClick={() => onCategoryDetailClick(icon.categoryId)}
          >
            <ShapeImage
              shape={"square"}
              src={`/category/${icon.categoryId}${
                icon.categoryId === selectedCategoryId ? "color" : ""
              }.png`}
              alt={`${icon.name}`}
              width={width}
              height={height}
            />
          </div>
        ))}
      </div>
      <div className="main-row">
        {category.slice(middleIndex, middleIndex1).map((icon, index) => (
          <div
            key={index + middleIndex}
            className={`category-item ${
              icon.categoryId === selectedCategoryId ? "selected" : ""
            }`}
            onClick={() => onCategoryDetailClick(icon.categoryId)}
          >
            <ShapeImage
              shape={"square"}
              src={`/category/${icon.categoryId}${
                icon.categoryId === selectedCategoryId ? "color" : ""
              }.png`}
              alt={`${icon.name}`}
              width={width}
              height={height}
            />
          </div>
        ))}
      </div>
      <div className="main-row">
        {category.slice(middleIndex1).map((icon, index) => (
          <div
            key={index + middleIndex1}
            className={`category-item ${
              icon.categoryId === selectedCategoryId ? "selected" : ""
            }`}
            onClick={() => onCategoryDetailClick(icon.categoryId)}
          >
            <ShapeImage
              shape={"square"}
              src={`/category/${icon.categoryId}${
                icon.categoryId === selectedCategoryId ? "color" : ""
              }.png`}
              alt={`${icon.name}`}
              width={width}
              height={height}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIconBox;
