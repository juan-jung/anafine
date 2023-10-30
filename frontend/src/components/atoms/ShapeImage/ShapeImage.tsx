import styled from "@emotion/styled";
import Image, { ImageProps } from "next/image";

type ImageShape = "square" | "circle";
type ShapeImageProps = ImageProps & { shape?: ImageShape };

const ImageWithShape = styled(Image)<{ shape?: ImageShape }>`
  border-radius: ${({ shape }) => (shape === "circle" ? "50%" : "0")};
  margin: 10px;
`;

// 이미지 형태
const ShapeImage: React.FC<ShapeImageProps> = ({ shape, ...ImageProps }) => {
  return <ImageWithShape shape={shape} {...ImageProps} />;
};

export default ShapeImage;
