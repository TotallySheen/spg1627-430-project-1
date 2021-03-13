const http = require('http');
const url = require('url');
const query = require('querystring');
const fs = require('fs');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const imgHandler = require('./imgResponses.js');
const imgLib = require('./imageLib.js');

const urlStruct = {
  '/': htmlHandler.getMainClientResponse,
  '/guess': htmlHandler.getGuessClientResponse,
  '/make': htmlHandler.getMakeClientResponse,
  '/admin': htmlHandler.getAdminClientResponse,
  '/random-image': jsonHandler.getRandomImageResponse,
  '/random-images': jsonHandler.getRandomImagesResponse,
  '/all-images': jsonHandler.getAllImagesResponse,
  '/default-styles.css': htmlHandler.getStyles,
  '/pictionary.jpg': imgHandler.getPictionary,
  notFound: htmlHandler.get404Response,
};

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// handles POST requests
// Inspired by body parse example
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/add-pic') {
    const body = [];
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString); // turn into an object with .name & .age
      // https://stackoverflow.com/questions/10037563/node-js-base64-image-decoding-and-writing-to-file
      if (bodyParams.image && bodyParams.name) {
        const imageData = bodyParams.image.replace('data:image/png;base64,', '');
        fs.writeFileSync(`client/pics/${bodyParams.name}.png`, imageData, { encoding: 'base64' }, () => {});
        const params = { name: bodyParams.name, url: `client/pics/${bodyParams.name}.png` };
        const newImage = imgLib.keyExists(params.name);
        imgLib.addImage(params);
        jsonHandler.addImageResponse(request, response, true, params, newImage);
      } else {
        jsonHandler.addImageResponse(request, response, false);
      }
    });
  }
};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);

  if (request.method === 'POST') {
    // handle POST
    handlePost(request, response, parsedUrl);
    return; // bail out of function
  }
  if (pathname.includes('/pics/')) {
    imgHandler.getImgByName(request, response, pathname.split('/pics/')[1]);
  } else if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes, request.method);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
