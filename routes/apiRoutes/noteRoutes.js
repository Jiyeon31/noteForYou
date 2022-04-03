const router = require('express').Router();
const dataBase  = require('../../db/db.json');
const uuid = require('uuid');

router.get('/notes', (req, res) => 
  res.json(dataBase));

router.post("/notes", (req, res) => {
  const userTitle = req.body.title;
  const userText = req.body.text;
  if (!userTitle || !userText) {
    res.status(400).json({msg: 'title and text are required'})
  } else {
    const userJSON = {
      id: uuid.v4(),
      title: userTitle,
      text: userText
    };
    dataBase.push(userJSON);
    res.json(dataBase);
  }
});

router.delete("/notes/:id", (req, res) => {
    const idData = dataBase.some(obj => obj.id === req.params.id);
    if (idData) {
      data = dataBase.filter(obj => obj.id === req.params.id);
      handleNoteDelete();
    } else {
        res.status(400).text(data);
    };
});



module.exports = router;