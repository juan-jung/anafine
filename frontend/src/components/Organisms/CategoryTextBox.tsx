// CategoryTextBox.tsx

import React, { useState } from "react";
import TextArea from "components/atoms/TextArea";
import { Icon } from "@iconify/react";
import { Button } from "components/atoms/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";

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

// 툴팁 커스터마이징
const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    border: "1px solid #dadde9",
    fontSize: 12,
    padding: "10px 10px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
}));

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
                      <div
                        className="main-search-text"
                        onClick={() => {
                          window.location.href = `/search/?path=${text.path}&id=${text.treatmentId}&page=1`;
                        }}
                      >
                        검색
                      </div>
                    )}
                    &nbsp;
                    {text.info && (
                      <div className="icon-wrapper">
                        <CustomTooltip
                          className="tooltip"
                          title={text.info}
                          placement="bottom"
                          arrow
                        >
                          <Icon
                            icon="fluent:info-20-regular"
                            color="#888888"
                            width="15"
                            height="15"
                          />
                        </CustomTooltip>
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
