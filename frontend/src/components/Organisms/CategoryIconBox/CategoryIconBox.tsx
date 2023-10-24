import React from "react";

import ShapeImage from "components/atoms/ShapeImage/ShapeImage";

interface CategoryProps {
  category: React.ReactNode[];
  categoryWidth: number;
}

// 카테고리 아이콘 박스
const CategoryIconBox: React.FC<CategoryProps> = ({
  category,
  categoryWidth,
}) => {
  const middleIndex = Math.ceil(category.length / 2);

  return (
    <div>
      <div className="top-row">
        {category.slice(0, middleIndex).map((icon, index) => (
          <ShapeImage
            key={index}
            shape={"square"}
            src={"/favicon.png"}
            alt={"카테고리 아이콘"}
            width={categoryWidth / middleIndex}
            height={categoryWidth / middleIndex}
          />
        ))}
      </div>
      <div className="bottom-row">
        {category.slice(middleIndex).map((icon, index) => (
          <ShapeImage
            key={index + middleIndex}
            shape={"square"}
            src={"/favicon.png"}
            alt={"카테고리 아이콘"}
            width={categoryWidth / middleIndex}
            height={categoryWidth / middleIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryIconBox;
