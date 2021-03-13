// 5 - here's our 404 page
const fs = require('fs');

const mainClient = fs.readFileSync(`${__dirname}/../client/main-client.html`);
const makeClient = fs.readFileSync(`${__dirname}/../client/make-client.html`);
const error = fs.readFileSync(`${__dirname}/../client/error.html`);
const style = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const getMainClientResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(mainClient);
  response.end();
};

const getMakeClientResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(makeClient);
  response.end();
};

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(error);
  response.end();
};

const getStyles = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

module.exports = {
  getMainClientResponse,
  getMakeClientResponse,
  get404Response,
  getStyles,
};
