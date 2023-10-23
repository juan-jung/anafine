import styled from "@emotion/styled/types/base";
import "./Icon.css";
import Image, { ImageProps } from "next/image";

type IconShape = "square" | "circle";
type ShapeCellProps = ImageProps & { shape?: IconShape };

const CategoryIconShape = styled(Image)<{ shape?: IconShape }>`
  border-radius: ${({ shape }) => (shape === "square" ? "0" : "50")};
`;

// 아이콘
const Icon = (props: ShapeCellProps) => {
  const { shape, ...ImageProps } = props;

  return <CategoryIconShape shape={shape} {...ImageProps} />;
};

export default Icon;
