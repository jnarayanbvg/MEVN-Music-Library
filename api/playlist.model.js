const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Contacts
let Playlist = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  hassongs: {
  	type: Array
  }
},{
    collection: 'playlists'
});

module.exports = mongoose.model('Playlist', Playlist);