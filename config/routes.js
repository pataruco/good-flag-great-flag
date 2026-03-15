var express = require('express'),
    router  = express.Router(),
    Principle = require('../models/principle'),
    Flag = require('../models/flag');


// Root
router.get('/', function(request, response) {
  console.log("Root");
  Principle.Principle.find()
    .then(function(principles) {
      response.render('root', {principles});
    })
    .catch(function(error) {
      response.json({message: 'Could not find any principle'});
    });
});

// Quiz
router.get('/quiz', function(request, response){
  console.log("Quiz");
  response.render('quiz');
});

// Flags AJAX request
router.get('/flags', function(request, response){
  console.log("Quiz");
  Flag.Flag.find()
    .then(function(flags) {
      response.json(flags);
    })
    .catch(function(error) {
      response.json({message: 'Could not find any flag'});
    });
});

// Watch
router.get('/watch', function(request, response){
  console.log('watch');
  response.render('watch');
});

// About
router.get('/about', function(request, response){
  console.log('Admin');
  response.render('about');
});

// Making available for all
module.exports = router;
