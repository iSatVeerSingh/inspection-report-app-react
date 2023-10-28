export const getResizedBase64Images = async (images: File[]) => {
  const resizedImages = [];
  for (let i = 0; i < images.length; i++) {
    const imagefile = images[i];
    const bitmap = await createImageBitmap(imagefile);
    const resize = getResizedImage(bitmap);
    resizedImages.push(resize);
  }

  return resizedImages;
};

const getResizedImage = (bitmap: ImageBitmap) => {
  const { width, height } = bitmap;

  const maxwidth = 300;
  const scaleSize = maxwidth / width;
  const maxheight = height * scaleSize;

  const canvas = document.createElement("canvas");
  canvas.width = maxwidth;
  canvas.height = maxheight;

  const ctx = canvas.getContext("2d");
  ctx!.imageSmoothingEnabled = true;
  ctx!.imageSmoothingQuality = "high";
  ctx!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const imgStr = ctx?.canvas.toDataURL("image/jpeg", 0.9);

  return imgStr;
};
