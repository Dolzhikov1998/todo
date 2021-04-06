const order = 'asc';
const page = 1;
const filter = '';
const querystring = require('querystring');

const queryParams = {order, filter, page};

console.log(querystring.stringify(queryParams));

const qs = Object.keys(queryParams)
    .map(el => queryParams[el] && el + '=' + queryParams[el])
    .filter(el => el)
    .join('&')

console.log(qs)