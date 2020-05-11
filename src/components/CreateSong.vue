<template>
  <form @submit.prevent="addSong">
    <div>
      <p class="head">Add a Song</p>
      <div class="posttable">
        <div class="posttablerow">
          <div class="posttablecell" id="holdleft">
            <p class="subhead">Input Information</p>
            <label>Song Title:</label>
            <input type="text" v-model="song.title" id="argumenttitle"><br>
            <label>Artist:</label>
            <input type="text" v-model="song.artist" id="argumentartist"><br>
            <label>Album:</label>
            <input type="text" v-model="song.album" id="argumentalbum"><br>
            <label>Genre:</label>
            <select v-model="song.genre" id="argumentgenre">
              <option>Pop</option>
              <option>Rock</option>
              <option>Alternative</option>
              <option>Hip hop</option>
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
  <button class="postbutton">Add</button>
</form>
</template>

<script>
  function setArgument(filterType, filterDetails) {
    var elem = document.getElementById(`argument${filterType}`);
    elem.value = filterDetails;
  }

  export default {
    data(){
      return {
        song:{},
        playlists:[]
      }
    },
    created() {
      let uri = 'http://localhost:4000/playlists';
      this.axios.get(uri).then(response => {
        this.playlists = response.data;
        this.checkFilter();
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
      addSong(){
        var temp = "";
        var checks = document.getElementsByClassName('playlistchecks');
        for(var i = 0; i < checks.length; i++) {
          var box = checks[i];
          if(box.checked) {
            temp += box.id + "/";
          }
        }
        this.song.inplaylists = temp;

        let uri = 'http://localhost:4000/songs/add';
        this.axios.post(uri, this.song).then(() => {
          this.$router.push({name: 'songs', params: { sortType: 'title' }});
        });
      },
      checkFilter(){
        //Get the filter
        var filter = this.$route.params.filter;
        var artistFilterText = "artist_";
        var albumFilterText = "album_";
        var genreFilterText = "genre_";
        var filterType = "";
        var filterDetails = "";
        if(filter !== undefined && filter.length > 0){
          if(filter.substring(0,artistFilterText.length) == artistFilterText) {
            filterType = "artist";
            filterDetails = filter.substring(artistFilterText.length);
          } else if(filter.substring(0,albumFilterText.length) == albumFilterText) {
            filterType = "album";
            filterDetails = filter.substring(albumFilterText.length);
          } else if(filter.substring(0,genreFilterText.length) == genreFilterText) {
            filterType = "genre";
            filterDetails = filter.substring(genreFilterText.length);
          } else {
            //Incorrect filter type
            this.$router.push({name:'songs/create'});
          }
          if(filterType !== "" && filterDetails == "") {
            //No filter details
            this.$router.push({name:'songs/create'});
          }
        } else {
          //No filter
        }

        //Set title
        setTimeout(setArgument, 100, filterType, filterDetails);
      } 
    }
  }
</script>
