var express = require('express');
var router = express.Router();

var taskData = [
    {id : 1, name : "Learn jQuery", isCompleted : false, category : "Official"},
    {id : 1, name : "Pay phone bill", isCompleted : true, category : "Personal"},
    {id : 1, name : "Watch a movie", isCompleted : false, category : "Recreational"},
    {id : 1, name : "Submit appraisal form", isCompleted : true, category : "Official"},
    {id : 1, name : "Plan for shopping", isCompleted : false, category : "Personal"},
];

/* GET tasks listing. */
router.get('/', function(req, res) {
  //res.send('task data will be returned');
    res.write(JSON.stringify(taskData));
    res.end();
});

module.exports = router;