const express = require ('express');
const hbs = require('hbs');
const fs = require ('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append ro server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  //response.send('<h1>Hello Express!</h1>');
  response.render('home.hbs',{
    welcomeText: 'Welcome to the HBS website',
    pageTitle: 'Home Page',
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
    pageTitle: 'Projects Page',
  });
})

// /bad send back json with errormessage property
app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to fulfill request'
  });
});


app.listen(port, () => {
  console.log(`Server is now runnning on port ${port}`);
});
