<template>
  <form @submit.prevent="updateSong">
    <div>
      <p class="head">Edit a Song</p>
      <div class="posttable">
        <div class="posttablerow">
          <div class="posttablecell" id="holdleft">
            <p class="subhead">Input Information</p>
            <label>Song Title:</label>
            <input type="text" v-model="song.title"><br>
            <label>Artist:</label>
            <input type="text" v-model="song.artist"><br>
            <label>Album:</label>
            <input type="text" v-model="song.album"><br>
            <label>Genre:</label>
            <select v-model="song.genre">
              <option>Pop</option>
              <option>Rock</option>
              <option>Alternative</option>
              <option>Hip Hop</option>
              <option>R&B</option>
              <option>Country</option>
              <option>Jazz</option>
              <option>Classical</option>
              <option>Metal</option>
              <option>Electronic</option>
            </select>
          </div>
          <div class="posttablecell" id="holdright">
            <p class="subhead">Select Playlists</p>

            <div v-for="playlist in sort(playlists)" :key="playlist._id" class="playlists">
              <input type="checkbox" v-bind:id=playlist._id class="playlistchecks">
              <div class="playlistblock">
                <label v-bind:for=playlist._id>{{ playlist.title }}</label>
                <p v-bind:for=playlist._id>{{ playlist.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="postbutton">Update</button>
  </form>
</template>

<script>

  function setChecks(text) {
    var checks = document.getElementsByClassName('playlistchecks');
    for(var i = 0; i < checks.length; i++) {
      var box = checks[i];
      if(text.includes(box.id)) box.checked = true;
    }
  }
  export default {
    data() {
      return {
        song: {},
        playlists: []
      }
    },   
    created() {
      //this.fetchData().then(() => console.log(this.song));

      let uri = `http://localhost:4000/songs/edit/${this.$route.params.id}`;
      this.axios.get(uri).then(response => {
        this.song = response.data;
        setTimeout(setChecks,100,this.song.inplaylists);
        console.log(this.song);
      });
      uri = 'http://localhost:4000/playlists';
      this.axios.get(uri).then(response => {
        this.playlists = response.data;
      });
    }, 
    methods: {
      sort: function(arr) {
        // Set slice() to avoid to generate an infinite loop!
        return arr.slice().sort(function (a, b) {
          if (a.title > b.title) {
              return 1;
          }
          if (b.title > a.title) {
              return -1;
          }
          return 0;
        });
      },
      updateSong() {
        var temp = "";
        var checks = document.getElementsByClassName('playlistchecks');
        for(var i = 0; i < checks.length; i++) {
          var box = checks[i];
          if(box.checked) {
            temp += box.id + "/";
          }
        }
        this.song.inplaylists = temp;
        let uri = `http://localhost:4000/songs/update/${this.$route.params.id}`;
        this.axios.post(uri, this.song).then(() => {
          this.$router.push({name:'songs', params: { sortType: 'title' }});
        });
      }
    }
  }
</script>