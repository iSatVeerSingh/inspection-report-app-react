export const getResizedBase64Images = async (images: File[]) => {
  const resizedImages = [];
  const imagesPromises = [];
  for (let i = 0; i < images.length; i++) {
    const imagefile = images[i];
    const bitmap = await createImageBitmap(imagefile);
    if (bitmap.width > 300 || bitmap.height > 300) {
      const resize = getResizedImage(bitmap);
      resizedImages.push(resize);
    } else {
      const imagePromise = getBase64(imagefile);
      imagesPromises.push(imagePromise);
    }
  }

  return [...resizedImages, ...(await Promise.all(imagesPromises))];
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

const getBase64 = async (imgBlob: Blob | File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgBlob);
    reader.addEventListener("load", (e) => {
      resolve(e.target?.result);
    });
  });
};
