import Image, { ImageProps } from "next/image";
import styled from "styled-components";

type CellShape = "square" | "circle";
type ShapeCellProps = ImageProps & { shape?: CellShape };

const CategoryIconShape = styled(Image)<{ shape?: CellShape }>`
  border-radius: ${({ shape }) => (shape === "square" ? "0" : "50")};
`;

// CategoryIcon
const CategoryIcon = (props: ShapeCellProps) => {
  const { shape, ...ImageProps } = props;

  return <CategoryIconShape shape={shape} {...ImageProps} />;
};

export default CategoryIcon;
