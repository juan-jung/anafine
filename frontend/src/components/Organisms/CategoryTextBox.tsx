// CategoryTextBox.tsx

import React, { useState } from "react";
import TextArea from "components/atoms/TextArea";
import { Icon } from "@iconify/react";
import { Button } from "components/atoms/Button";

interface CategoryProps {
  category: {
    name: string;
    categoryId: string;
    isLeaf: boolean;
    treatmentId?: string;
    path?: string;
    info: string;
  }[];
  onCategoryDetailClick?: (categoryId: string, name: string) => void;
}

// 카테고리 아이콘 박스
const CategoryTextBox: React.FC<CategoryProps> = ({
  category,
  onCategoryDetailClick,
}) => {
  const [selectedTextArea, setSelectedTextArea] = useState<number | null>(null);

  const onTextAreaClick = (index: number, categoryId: string, name: string) => {
    if (onCategoryDetailClick) {
      onCategoryDetailClick(categoryId, name);
    }
    setSelectedTextArea(index);
  };

  return (
    <div className="category-text-box">
      {category.map((text, index) => (
        <div key={index} className="text-container">
          <TextArea
            children={
              <span>
                <div className="icon-text-container">
                  {text.name}
                  <div className="icon-container">
                    {text.isLeaf && (
                      <div className="main-search-button">
                        <Button
                          children={<span>검색</span>}
                          ver={"small"}
                          onClick={() => {
                            window.location.href = `/search/?id=${text.treatmentId}`;
                          }}
                        />
                      </div>
                    )}
                    &nbsp;
                    {text.info && (
                      <div className="icon-wrapper">
                        <Icon
                          icon="fluent:info-20-regular"
                          color="#888888"
                          width="15"
                          height="15"
                        >
                          <span className="tooltip-text">{text.info}</span>
                        </Icon>
                      </div>
                    )}
                  </div>
                </div>
              </span>
            }
            onClick={() => onTextAreaClick(index, text.categoryId, text.name)}
            className={selectedTextArea === index ? "selected-text" : ""}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryTextBox;
