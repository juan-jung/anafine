import React from "react";
import ShapeImage from "components/atoms/ShapeImage/ShapeImage";

interface CategoryProps {
  category: { categoryId: string }[];
  onCategoryDetailClick: (categoryId: string) => void;
}

// 카테고리 아이콘 박스
const CategoryIconBox: React.FC<CategoryProps> = ({
  category,
  onCategoryDetailClick,
}) => {
  const middleIndex = Math.ceil(category.length / 2);
  console.log(category);

  return (
    <div>
      <div className="main-row">
        {category.slice(0, middleIndex).map((icon, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => onCategoryDetailClick(icon.categoryId)}
          >
            <ShapeImage
              shape={"square"}
              src={"/favicon.png"}
              alt={"카테고리 아이콘"}
              width={70}
              height={70}
            />
          </div>
        ))}
      </div>
      <div className="main-row">
        {category.slice(middleIndex).map((icon, index) => (
          <div
            key={index + middleIndex}
            className="category-item"
            onClick={() => onCategoryDetailClick(icon.categoryId)}
          >
            <ShapeImage
              shape={"square"}
              src={"/favicon.png"}
              alt={"카테고리 아이콘"}
              width={70}
              height={70}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIconBox;
