const express = require('express');
const playlistRoutes = express.Router();

// Require Song model in our routes module
let Playlist = require('./playlist.model');

// Defined store route
playlistRoutes.route('/add').post(function (req, res) {
  let playlist = new Playlist(req.body);
  console.log(playlist);
  playlist.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
playlistRoutes.route('/').get(function (req, res) {
    Playlist.find(function(err, playlists){
    if(err){
      res.json(err);
    }
    else {
      res.json(playlists);
    }
  });
});

// Defined edit route
playlistRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Playlist.findById(id, function (err, playlist){
      if(err) {
        res.json(err);
      }
      res.json(playlist);
      //song.save(callback);
  });
});

//  Defined update route
playlistRoutes.route('/update/:id').post(function (req, res) {
    Playlist.findById(req.params.id, function(err, playlist) {
    if (!playlist)
      res.status(404).send("data is not found");
    else {
        playlist.title = req.body.title;
        playlist.description = req.body.description;
        playlist.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
playlistRoutes.route('/delete/:id').delete(function (req, res) {
    Playlist.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = playlistRoutes;