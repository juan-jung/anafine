import styled from "@emotion/styled";
import Image, { ImageProps } from "next/image";

type ImageShape = "square" | "circle";
type ShapeImageProps = ImageProps & {
  shape?: ImageShape;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const ImageWithShape = styled(Image)<{ shape?: ImageShape }>`
  border-radius: ${({ shape }) => (shape === "circle" ? "50%" : "0")};
  margin: 10px;
`;

// 이미지 형태
const ShapeImage: React.FC<ShapeImageProps> = ({
  shape,
  src,
  alt,
  width,
  height,
  ...ImageProps
}) => {
  return (
    <ImageWithShape
      shape={shape}
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...ImageProps}
    />
  );
};

export default ShapeImage;
