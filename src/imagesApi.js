// https://www.reddit.com/r/dogswithjobs/.json?limit=1

export const getImages = async (l = 10) => {
  const limit = l * 2;
  const url = `https://www.reddit.com/r/dogswithjobs/.json?limit=${limit}`;

  const response = await fetch(url);
  const JSONResponse = await response.json();
  const data = JSONResponse.data.children;

  const result = [];

  data.forEach((element) => {
    const image = element.data.preview?.images[0].resolutions[2]?.url;
    if (image) {
      result.push({
        title: element.data.title,
        image: image.replaceAll("&amp;", "&")
      });
    }
  });

  return result.splice(0, l);
};
