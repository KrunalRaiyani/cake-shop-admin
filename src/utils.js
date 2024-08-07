// src/utils.js

export const getCroppedImg = (imageSrc, pixelCrop) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = imageSrc;
  const { width, height } = pixelCrop;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        width,
        height,
        0,
        0,
        width,
        height
      );
      resolve(canvas.toDataURL("image/jpeg"));
    };
    image.onerror = reject;
  });
};
