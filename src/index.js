const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const imgHandler = require('./imgResponses.js');

const urlStruct = {
  '/': htmlHandler.getMainClientResponse,
  '/make': htmlHandler.getMakeClientResponse,
  '/random-image': jsonHandler.getRandomImageResponse,
  '/random-images': jsonHandler.getRandomImagesResponse,
  '/default-styles.css': htmlHandler.getStyles,
  notFound: htmlHandler.get404Response,
};

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  console.log(`${request},${response},${parsedUrl}`);
  /* if (parsedUrl.pathname === '/add-pic') {
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
      jsonHandler.addUser(request, response, bodyParams);
    });
  } */
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
