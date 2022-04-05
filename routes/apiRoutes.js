const router = require('express').Router();
const uuid = require('uuid');
const dataPlan = require('../db/db');
const path = require('path');
const fs = require('fs');
let databaseFile = path.join(__dirname, '../db/db.json');

router.get('/notes', (req, res) => {
  let data = fs.readFileSync(databaseFile);
  JSON.parse(data);
  res.json(dataPlan);
});

router.post('/notes', (req, res) => {
  const userTitle = req.body.title;
  const userText = req.body.text;
  const userJSON =
    {
      id: uuid.v4(),
      title: userTitle,
      text: userText
    };
  dataPlan.push(userJSON);
  fs.writeFile(databaseFile, JSON.stringify(dataPlan), function(err){
    if(err) {
        return console.log(err);
    }
});
  res.json(userJSON);
});

router.delete('/notes/:id', (req, res) => {
  var userId = req.params.id;

  req.dataPlan.get('notes').remove({'id': userId}, function(error, document) {
   if (error) res.send(error);
   return res.send("deleted");
  });
});



module.exports = router;