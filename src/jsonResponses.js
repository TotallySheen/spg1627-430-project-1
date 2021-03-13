const underscore = require('underscore');
const imgLib = require('./imageLib.js');

// gets one image and prepares a JSON
const getImage = () => {
  const num = Math.floor(Math.random() * imgLib.getImageCount());
  console.log(imgLib.getImage(num));
  return JSON.stringify(imgLib.getImage(num));
};
// gets multiple images
const getImages = (limit) => {
  let num;
  if (!limit) num = 1;
  else num = limit;
  num = Math.floor(num);
  num = num < 1 ? 1 : num;
  const max = imgLib.getImageCount();
  num = num > max ? max : num;

  const shufImages = underscore.shuffle(imgLib.getImageUrls());

  const output = [];

  for (let i = 0; i < num; i += 1) {
    output.push(shufImages[i]);
  }

  return JSON.stringify(output);
};
// gets all images
const getAllImages = () => JSON.stringify(imgLib.getImageUrls());
// xml versions
const getImageXML = () => {
  const num = Math.floor(Math.random() * imgLib.getImageCount());
  const responseXML = `
      <image>
        <url>${imgLib.getImage(num).url}</url>
        <name>${imgLib.getImage(num).name}</name>
      </image>
    `;
  return responseXML;
};

const getImagesXML = (limit) => {
  console.log(limit);
  let num;
  if (!limit) num = 1;
  else num = limit;
  num = Math.floor(num);
  num = num < 1 ? 1 : num;
  const max = imgLib.getImageCount();
  num = num > max ? max : num;

  const shufImages = underscore.shuffle(imgLib.getImageUrls());
  let responseXML = '<images>';
  for (let i = 0; i < num; i += 1) {
    responseXML += `
    <image>
        <url>${shufImages[i].url}</url>
        <name>${shufImages[i].name}</name>
    </image>
  `;
  }
  responseXML += '</images>';
  return responseXML;
};

const getAllImagesXML = () => {
  let responseXML = '<images>';
  for (let i = 0; i < imgLib.getImageCount(); i += 1) {
    responseXML += `
    <image>
        <url>${imgLib.getImage(i).url}</url>
        <name>${imgLib.getImage(i).name}</name>
    </image>
  `;
  }
  responseXML += '</images>';
  return responseXML;
};

const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomImageResponse = (request, response, params, acceptedTypes, httpMethod) => {
  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getImageXML());
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getImageXML());
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': size });
    }
    response.end();
  } else {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(getImage());
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getImage());
      response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': size });
    }
    response.end();
  }
};

const getRandomImagesResponse = (request, response, params, acceptedTypes, httpMethod) => {
  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getImagesXML(params.limit));
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getImagesXML(params.limit));
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': size });
    }
    response.end();
  } else {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(getImages(params.limit));
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getImages(params.limit));
      response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': size });
    }
    response.end();
  }
};

const getAllImagesResponse = (request, response, params, acceptedTypes, httpMethod) => {
  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getAllImagesXML());
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getAllImagesXML());
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': size });
    }
    response.end();
  } else {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(getAllImages());
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getAllImages());
      response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': size });
    }
    response.end();
  }
};
// response handling for POST requests
const addImageResponse = (request, response, validParams,
  params = { name: null, url: null }, newImage = true) => {
  const responseJSON = {
    message: 'missing parameters',
  };
  let statusCode;
  if (!validParams) {
    statusCode = 400;
  } else if (!newImage) {
    statusCode = 204;
    responseJSON.message = `Updated ${params.name}`;
  } else {
    statusCode = 201;
    responseJSON.message = `Created ${params.name}`;
  }
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(responseJSON));
  response.end();
};

module.exports = {
  getRandomImageResponse,
  getRandomImagesResponse,
  getAllImagesResponse,
  addImageResponse,
};
