const fs = require('fs');
const imgLib = require('./imageLib.js');

const pictionary = fs.readFileSync(`${__dirname}/../client/pictionary.jpg`);

const getImgByName = (request, response, name) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(imgLib.getImageUrl(name));
  response.end();
};

const getPictionary = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpg' });
  response.write(pictionary);
  response.end();
};

module.exports = {
  getImgByName,
  getPictionary,
};
