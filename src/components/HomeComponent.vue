<head>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<template>
  <div id="homebox">
    <div id="homehead">Welcome to your music library!</div>

    <div id="homebody">
        Using this site, you can classify all your music by song title, artist, ablum, and genre, and sort and order them by playlist. You can click on the songs page to get started!
    </div>

  </div>
 </template>
 <script>

 export default {
 	data() {
      return {
        songs: []
      }
    },
    created() {
      let uri = 'http://localhost:4000/songs';
      this.axios.get(uri).then(response => {
        this.songs = response.data;
      });
    }
}


 </script>

