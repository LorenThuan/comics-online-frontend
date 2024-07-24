import React from "react";
import { ImageProps } from "../constants/types";

const ImageComponent = ({ contentType, data, filename }: ImageProps) => {
  // Construct the data URL for the image
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const imageDataUrl = `data:${contentType};base64,${data}`;

  React.useEffect(() => {
    const img = new Image();
    img.src = imageDataUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageDataUrl]);

  return (
    <div className="grid sm:grid-cols-1 place-items-center place-content-center">
      {!imageLoaded && <div className="text-blue-500 text-xl">Loading...</div>}
      <img
        src={imageDataUrl}
        alt={filename}
        className="object-contain max-w-[700px] my-4"
        style={{ display: imageLoaded ? "inline-block" : "none" }}
      />
    </div>
  );
};

export default ImageComponent;
