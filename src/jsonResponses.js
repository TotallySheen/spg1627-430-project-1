const underscore = require('underscore');

const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire.' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
];

const getJoke = () => {
  const num = Math.floor(Math.random() * 16);
  return JSON.stringify(jokes[num]);
};

const getJokes = (limit) => {
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
};

const getJokeXML = () => {
  const num = Math.floor(Math.random() * 16);
  const responseXML = `
      <joke>
        <q>${jokes[num].q}</q>
        <a>${jokes[num].a}</a>
      </joke>
    `;
  return responseXML;
};

const getJokesXML = (limit) => {
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
};

const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomJokeResponse = (request, response, params, acceptedTypes, httpMethod) => {
  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getJokeXML());
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getJokeXML());
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': size });
    }
    response.end();
  } else {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(getJoke());
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getJoke());
      response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': size });
    }
    response.end();
  }
};

const getRandomJokesResponse = (request, response, params, acceptedTypes, httpMethod) => {
  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getJokesXML(params.limit));
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getJokesXML(params.limit));
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': size });
    }
    response.end();
  } else {
    if (httpMethod === 'GET') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(getJokes(params.limit));
    } else if (httpMethod === 'HEAD') {
      const size = getBinarySize(getJokes(params.limit));
      response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': size });
    }
    response.end();
  }
};

module.exports = {
  getRandomJokeResponse,
  getRandomJokesResponse,
};
