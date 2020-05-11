const express = require('express');
const songRoutes = express.Router();

// Require Song model in our routes module
let Song = require('./song.model');

// Defined store route
songRoutes.route('/add').post(function (req, res) {
  let song = new Song(req.body);
  console.log(song);
  song.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
songRoutes.route('/').get(function (req, res) {
    Song.find(function(err, songs){
    if(err){
      res.json(err);
    }
    else {
      res.json(songs);
    }
  });
});

// Defined get data(index or listing) route for a single song
songRoutes.route('/:id').get(function (req, res) {
    Song.findById(req.params.id, function(err, song) {
    if(err){
      res.json(err);
    }
    else {
      res.json(song);
    }
  });
});

// Defined edit route
songRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Song.findById(id, function (err, song){
      if(err) {
        res.json(err);
      }
      res.json(song);
      //song.save(callback);
  });
});

//  Defined update route
songRoutes.route('/update/:id').post(function (req, res) {
    Song.findById(req.params.id, function(err, song) {
    if (!song)
      res.status(404).send("data is not found");
    else {
      song.title = req.body.title;
      song.artist = req.body.artist;
      song.album = req.body.album;
      song.genre = req.body.genre;
      song.inplaylists = req.body.inplaylists;
      song.buffer = req.body.buffer;
      console.log(song);
      song.save().then(() => {
        res.json('Update complete');
      })
      .catch(() => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
songRoutes.route('/delete/:id').delete(function (req, res) {
    Song.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = songRoutes;