const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Contacts
let Song = new Schema({
  title: {
    type: String
  },
  artist: {
    type: String
  },
  album: {
    type: String
  },
  genre: {
    type: String
  },
  inplaylists: {
    type: String
  },
  position: {
    type: String
  },
  buffer: {
    type: Buffer
  }
},{
    collection: 'songs'
});

module.exports = mongoose.model('Song', Song);