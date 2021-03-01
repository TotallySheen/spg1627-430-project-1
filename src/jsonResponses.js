// const underscore = require('underscore');

const images = [
  { url: '/pics/bird', name: 'bird' },
  { url: '/pics/car', name: 'car' },
  { url: '/pics/rabbit', name: 'rabbit' },
  { url: '/pics/television', name: 'television' },
  { url: '/pics/watch', name: 'watch' },
];

const getImage = () => {
  const num = Math.floor(Math.random() * 5);
  return JSON.stringify(images[num]);
};

const getImages = (limit) => {
  console.log(limit);
  /*
  let num;
  if (!limit) num = 1;
  else num = limit;
  num = Math.floor(num);
  num = num < 1 ? 1 : num;
  num = num > jokes.length ? jokes.length : num;

  const shufJokes = underscore.shuffle(jokes);

  const output = [];

  for (let i = 0; i < num; i += 1) {
    output.push(shufJokes[i]);
  }

  return JSON.stringify(output);
  */
};

const getImageXML = () => {
  /*
  const num = Math.floor(Math.random() * 16);
  const responseXML = `
      <joke>
        <q>${jokes[num].q}</q>
        <a>${jokes[num].a}</a>
      </joke>
    `;
  return responseXML;
  */
};

const getImagesXML = (limit) => {
  console.log(limit);
  /*
  let num;
  if (!limit) num = 1;
  else num = limit;
  num = Math.floor(num);
  num = num < 1 ? 1 : num;
  num = num > jokes.length ? jokes.length : num;

  const shufJokes = underscore.shuffle(jokes);
  let responseXML = '<jokes>';
  for (let i = 0; i < num; i += 1) {
    responseXML += `
    <joke>
      <q>${shufJokes[i].q}</q>
      <a>${shufJokes[i].a}</a>
    </joke>
  `;
  }
  responseXML += '</jokes>';
  return responseXML;
  */
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

module.exports = {
  getRandomImageResponse,
  getRandomImagesResponse,
};
