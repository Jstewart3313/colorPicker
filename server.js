const express = require('express');
const app = express();

app.locals.title = 'Painters Palette';

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('This is Painters Palette');
});

app.get('/api/v1/colors', (request, response) => {
  const colors = app.locals.colors;

  return response.status(200).json(colors);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});