import React from "react";
import "./Input.css";
import Image, { ImageProps } from "next/image";
import styled from "@emotion/styled";

type IconShape = "square" | "circle";
type ShapeCellProps = ImageProps & { shape?: IconShape };

const CategoryIconShape = styled(Image)<{ shape?: IconShape }>`
  border-radius: ${({ shape }) => (shape === "square" ? "0" : "50")};
`;

// Icon
const Input = (props: ShapeCellProps) => {
  const { shape, ...ImageProps } = props;

  return <CategoryIconShape shape={shape} {...ImageProps} />;
};

export default Input;
