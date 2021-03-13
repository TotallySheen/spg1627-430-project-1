const fs = require('fs');

const images = {
  bird: fs.readFileSync(`${__dirname}/../client/pics/bird.png`),
  car: fs.readFileSync(`${__dirname}/../client/pics/car.png`),
  rabbit: fs.readFileSync(`${__dirname}/../client/pics/rabbit.png`),
  television: fs.readFileSync(`${__dirname}/../client/pics/television.png`),
  watch: fs.readFileSync(`${__dirname}/../client/pics/watch.png`),
};

const imageReqs = [
  { url: '/pics/bird', name: 'bird' },
  { url: '/pics/car', name: 'car' },
  { url: '/pics/rabbit', name: 'rabbit' },
  { url: '/pics/television', name: 'television' },
  { url: '/pics/watch', name: 'watch' },
];

const addImage = (params) => {
  images[params.name] = params.url;
  const adjustedUrl = params.url.replace('client', '').replace('.png', '');
  imageReqs.push({ url: adjustedUrl, name: params.name });
};

const getImageUrls = () => imageReqs;

const getImages = () => images;

const getImageCount = () => Object.keys(images).length;

const getImage = (num) => imageReqs[num];

const getImageUrl = (name) => {
  console.log(name);
  return images[name];
};

const keyExists = (name) => name in images;

// didnt end up finishing renames
/*
const renameImage = (oldName, newName) => {
  for (const i of imageReqs) {
    if (i.name === oldName) {
      i.name = newName;
      return;
    }
  }
}; */

module.exports = {
  addImage,
  getImages,
  getImageUrls,
  getImageCount,
  getImage,
  getImageUrl,
  keyExists,
  images,
};
