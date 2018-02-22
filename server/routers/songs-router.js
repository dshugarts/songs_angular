const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
  const sqlText = 'SELECT * FROM songs ORDER BY rank DESC';
  pool.query(sqlText)
    .then(function(result) {
      console.log('Get result:', result);
      res.send(result.rows);
    })
    .catch(function(error){
      console.log('Error on Get:', error);
      res.sendStatus(500);
    })
});


router.post('/', (req, res) => {
  const song = req.body.song;

  console.log(song);
  
  let sqlText = `INSERT INTO songs 
  (artist, track, published, rank)
  VALUES ($1, $2, $3, $4)`;
  pool.query(sqlText, [song.artist, song.track, song.published, song.rank])
  .then((result) => {
    console.log('Added song:', result);
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('Error adding song:', error);
    res.sendStatus(500);
  })
});


module.exports = router;