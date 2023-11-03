import React, { useState } from "react";
import TextArea from "components/atoms/TextArea/TextArea";

interface CategoryProps {
  category: { name: string; categoryId: string }[];
  onCategoryDetailClick?: (categoryId: string, name: string) => void;
}

// 카테고리 아이콘 박스
const CategoryTextBox: React.FC<CategoryProps> = ({
  category,
  onCategoryDetailClick,
}) => {
  const [selectedTextArea, setSelectedTextArea] = useState<number | null>(null);

  const handleTextAreaClick = (
    index: number,
    categoryId: string,
    name: string
  ) => {
    if (onCategoryDetailClick !== undefined) {
      onCategoryDetailClick(categoryId, name);
    }
    setSelectedTextArea(index);
  };
  console.log(category);

  return (
    <div>
      <div className="category-text-box">
        {category.map((text, index) => (
          <TextArea
            key={index}
            children={<span>{text.name}</span>}
            selected={selectedTextArea === index}
            onClick={() =>
              handleTextAreaClick(index, text.categoryId, text.name)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTextBox;
