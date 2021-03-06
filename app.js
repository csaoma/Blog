//jshint esversion:6
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let entries = [];


// home webpage
app.get('/', (req, res) => {
  res.render('home', {
    homeStartingContent: homeStartingContent,
    entries: entries
  });
});


// contact webpage
app.get('/contact', (req, res) => {
  res.render('contact', {
    contactContent: contactContent
  })
});

// about webpage
app.get('/about', (req, res) => {
  res.render('about', {
    aboutContent: aboutContent
  })
});

// compose webpage --> where you put blog entry/posts
app.get('/compose', (req, res) => {
  res.render('compose')
});

// creating dynamic url
app.get('/entries/:entryName', function(req, res) {

  entries.forEach(entry => {
    const specificEntry = _.lowerCase(req.params.entryName)

    if (_.lowerCase(entry.title) === specificEntry) {
      res.render('entry', {
        title: entry.title,
        content: entry.content
      })
    } else {
      console.log('Not a match')
    }
  })


});

// POST method route
app.post('/compose', function(req, res) {
  const entry = {
    title: req.body.entryTitle,
    content: req.body.entryBody
  };

  entries.push(entry);

  res.redirect('/');

})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
