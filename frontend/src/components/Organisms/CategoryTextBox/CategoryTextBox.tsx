import React, { useState } from "react";
import TextArea from "components/atoms/TextArea/TextArea";
import { Icon } from "@iconify/react";

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
          <div key={index} className="text-container">
            <TextArea
              key={index}
              children={
                <span>
                  <div className="icon-text-container">
                    {text.name}
                    <div className="icon-container">
                      <Icon
                        icon="fluent:info-20-regular"
                        color="#888888"
                        width="15"
                        height="15"
                      />
                    </div>
                  </div>
                </span>
              }
              selected={selectedTextArea === index}
              onClick={() =>
                handleTextAreaClick(index, text.categoryId, text.name)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTextBox;
