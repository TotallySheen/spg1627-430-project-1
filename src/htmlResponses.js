// 5 - here's our 404 page
const fs = require('fs');

const jokeClient = fs.readFileSync(`${__dirname}/../client/joke-client.html`);
const error = fs.readFileSync(`${__dirname}/../client/error.html`);
const style = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const getJokeClientResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(jokeClient);
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
  getJokeClientResponse,
  get404Response,
  getStyles,
};
