<template>
  <div>
    <p class="head" id="title">Your Songs</p><br><br>
    <router-link id='removefilter' :to="{ name: 'songs', params: { sortType: 'title' }}">
      <button class="postbuttonshow" id="topbuttonleft">
        <label for='removefilter'>Remove Filter</label>
      </button>
    </router-link>

    <router-link id='addsong' :to="{ name: 'songs/create', params: { filter: this.$route.params.filter }}">
      <button class="postbuttonshow" id="topbutton">
        <label for='addsong'>Add a Song</label>
      </button>
    </router-link>
    

    <table class="showtable">
      <thead>
      <tr class="toprow">
          <th class="songtitle"><router-link :to="{name: 'songs', params: { sortType: 'title', filter: this.$route.params.filter }}" class="inlink">Song Title</router-link></th>
          <th class="songartist"><router-link :to="{name: 'songs', params: { sortType: 'artist', filter: this.$route.params.filter }}" class="inlink">Artist</router-link></th>
          <th class="songalbum"><router-link :to="{name: 'songs', params: { sortType: 'album', filter: this.$route.params.filter }}" class="inlink">Album</router-link></th>
          <th class="songgenre"><router-link :to="{name: 'songs', params: { sortType: 'genre', filter: this.$route.params.filter }}" class="inlink">Genre</router-link></th>
          <th colspan=2 class="songactions">Actions</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="song in sort(songs)" :key="song._id" v-bind:class="song.position">
          <td>{{ song.title }}</td>
          <td><router-link :to="{name: 'songs', params: { sortType: $route.params.sortType, filter: `artist_${song.artist}` }}" class="insongs">{{ song.artist }}</router-link></td>
          <td><router-link :to="{name: 'songs', params: { sortType: $route.params.sortType, filter: `album_${song.album}` }}" class="insongs">{{ song.album }}</router-link></td>
          <td><router-link :to="{name: 'songs', params: { sortType: $route.params.sortType, filter: `genre_${song.genre}` }}" class="insongs">{{ song.genre }}</router-link></td>
          <td>
            <router-link v-bind:id='song._id+1' :to="{name: 'songs/edit', params: { id: song._id }}"><button class="postbuttonshowtable"><label v-bind:for='song._id+1'>Edit</label></button>
            </router-link>
          </td>
          <td class="red">
            <button class="postbuttonshowtable" @click.prevent="deleteSong(song._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  function checkForFilter() {
    var filterBox = document.getElementById('removefilter');
    var loc = location.href;
    var defaultLoc = "/songs/title";
    if(loc.indexOf(defaultLoc) > 0 && loc.substring(loc.indexOf(defaultLoc)+defaultLoc.length).length == 0) {
      //No filter box required
      filterBox.style.display = "none";
    } else {
      //Filter box required
      filterBox.style.display = "block";
    }
  }

  function setTitle(filterType, filterDetails) {
    let title = document.getElementById('title');
    if(filterType == "artist") title.innerHTML = `Songs by ${filterDetails}`;
    else if(filterType == "album") title.innerHTML = `Songs from ${filterDetails}`;
    else title.innerHTML = `${filterDetails} Songs`;
  }
  
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
        setTimeout(checkForFilter,100);
      });
    },
    updated() {
      //Reset the filter box whenever the parameters change
      setTimeout(checkForFilter,100);
    },
    methods: {
      sort: function(arr) {
        // Set slice() to avoid to generate an infinite loop!

        //Get the type of sort
        var type = this.$route.params.sortType;
        if(type != "title" && type != "artist" && type != "album" && type != "genre") type = "title";

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
            this.$router.push({name:'songs', params: { sortType: this.$route.params.sortType }});
          }
          if(filterType !== "" && filterDetails == "") {
            //No filter details
            this.$router.push({name:'songs', params: { sortType: this.$route.params.sortType }});
          }
        } else {
          //No filter
        }


        //Create a new songs playlist with only the filtered songs
        if(filterType !== "" && filterDetails !== "") {
          var temp = [];
          for(var i = 0; i < arr.length; i++) {
            var varToCheck;
            if(filterType == "artist") varToCheck = arr[i].artist;
            else if(filterType == "album") varToCheck = arr[i].album;
            else varToCheck = arr[i].genre;

            if(varToCheck.toLowerCase() == filterDetails.toLowerCase()) temp[temp.length] = arr[i];
          }
          arr = temp;

          //Set title
          setTimeout(setTitle, 100, filterType, filterDetails);
        } 





        arr = arr.slice().sort(function (a, b) {
          if (a[type] > b[type]) {
              return 1;
          }
          if (b[type] > a[type]) {
              return -1;
          }
          return 0;
        });

        for(var i = 0; i < arr.length; i++) {
          arr[i].position = "row"+(i%2);
        }

        return arr;
      },
      deleteSong(id)
      {
        let uri = `http://localhost:4000/songs/delete/${id}`;
        this.axios.delete(uri).then(response => {
          for (var i = 0; i<this.songs.length;i++){
            if(this.songs[i]._id === id){
              this.songs.splice(i,1);
              break;
            }
          }
        });
      }
    }
  }
</script>