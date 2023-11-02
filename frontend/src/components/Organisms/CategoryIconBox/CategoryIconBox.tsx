import React from "react";
import ShapeImage from "components/atoms/ShapeImage/ShapeImage";

interface CategoryProps {
  category: { categoryId: string; name: string }[];
  onCategoryDetailClick: (categoryId: string) => void;
  selectedCategoryId: string;
}

// 카테고리 아이콘 박스
const CategoryIconBox: React.FC<CategoryProps> = ({
  category,
  onCategoryDetailClick,
  selectedCategoryId,
}) => {
  const middleIndex = Math.ceil(category.length / 2);
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
              src={`/category/${icon.categoryId}.png`}
              alt={`${icon.name}`}
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
      <div className="main-row">
        {category.slice(middleIndex).map((icon, index) => (
          <div
            key={index + middleIndex}
            className={`category-item ${
              icon.categoryId === selectedCategoryId ? "selected" : ""
            }`}
            onClick={() => onCategoryDetailClick(icon.categoryId)}
          >
            <ShapeImage
              shape={"square"}
              src={`/category/${icon.categoryId}.png`}
              alt={`${icon.name}`}
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIconBox;
