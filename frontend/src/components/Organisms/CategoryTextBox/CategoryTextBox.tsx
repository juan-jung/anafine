import React, { useState } from "react";
import TextArea from "components/atoms/TextArea/TextArea";

interface CategoryProps {
  category: React.ReactNode[];
}

// 카테고리 아이콘 박스
const CategoryTextBox: React.FC<CategoryProps> = ({ category }) => {
  const [selectedTextArea, setSelectedTextArea] = useState<number | null>(null);

  const handleTextAreaClick = (index: number) => {
    setSelectedTextArea(index);
  };

  return (
    <div>
      <div className="category-text-box">
        {category.map((text, index) => (
          <TextArea
            key={index}
            children={text}
            selected={selectedTextArea === index}
            onClick={() => handleTextAreaClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTextBox;
