const fs = require('fs');

const images = {
  bird: fs.readFileSync(`${__dirname}/../client/pics/bird.png`),
  car: fs.readFileSync(`${__dirname}/../client/pics/car.png`),
  rabbit: fs.readFileSync(`${__dirname}/../client/pics/rabbit.png`),
  television: fs.readFileSync(`${__dirname}/../client/pics/television.png`),
  watch: fs.readFileSync(`${__dirname}/../client/pics/watch.png`),
};

const getImgByName = (request, response, name) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  // I've been having issues calling the image by key name, so
  // ive temporarily pointed it exclusively to the bird picture
  response.write(images[name]);
  response.end();
};

const addImage = (name, url) => {
  images[name] = url;
};

module.exports = {
  getImgByName,
  addImage,
};
