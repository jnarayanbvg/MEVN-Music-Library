<template>
  <div>
    <p class="head">Your Playlists</p><br><br>
    <router-link id='addplaylist' :to="{ name: 'playlists/create' }"><button class="postbuttonshow" id="topbutton"><label for='addplaylist'>Add a Playlist</label></button></router-link>

    <table v-for="playlist in sort(playlists)" :key="playlist._id" class="showtable">
      <tr class="toprow">
        <th class="playlisttitle">{{ playlist.title }}</th>
        <th colspan=3 class="playlistdesc">{{ playlist.description }}</th>
        <th class="playlistedit">
          <router-link v-bind:id='playlist._id+1' :to="{name: 'playlists/edit', params: { id: playlist._id }}"><button class="postbuttonshowtable"><label v-bind:for='playlist._id+1'>Edit</label></button>
          </router-link>
        </th>
        <th class="playlistdelete">
          <button class="postbuttonshowtable" @click.prevent="deletePlaylist(playlist._id)">Delete</button>
        </th>
      </tr>
      <tr v-for="song in checkIfIn(songs, playlist._id)" :key="song._id" id="songs" v-bind:class="song.position">
        <td class="songtitle">{{ song.title }}</td>
        <td class="songartist">{{ song.artist }}</td>
        <td class="songalbum">{{ song.album }}</td>
        <td class="songgenre">{{ song.genre }}</td>
        <td>
        </td>
        <td class="red">
          <button class="postbuttonshowtable" @click.prevent="removeFromPlaylist(song, playlist._id)">Remove</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

  export default {
    data() {
        return {
          playlists: [],
          songs: []
        }
      },
      created() {
      let uri = 'http://localhost:4000/playlists';
      this.axios.get(uri).then(response => {
        this.playlists = response.data;
      });
      uri = 'http://localhost:4000/songs';
      this.axios.get(uri).then(response => {
        this.songs = response.data;
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
      checkIfIn: function(arr, id) {
        var newArr = [];
        for(var i = 0; i < arr.length; i++) {
          if(arr[i].inplaylists.includes(id)) newArr[newArr.length] = arr[i];
        }

        arr = newArr.slice().sort(function (a, b) {
          if (a.title > b.title) {
              return 1;
          }
          if (b.title > a.title) {
              return -1;
          }
          return 0;
        });

        for(var i = 0; i < arr.length; i++) {
          arr[i].position = "row"+(i%2);
        }

        return arr;
      },
      deletePlaylist(id)
      {
        let uri = `http://localhost:4000/playlists/delete/${id}`;
        this.axios.delete(uri).then(response => {
          for (var i = 0; i<this.playlists.length;i++){
            if(this.playlists[i]._id === id){
              this.playlists.splice(i,1);
              break;
            }
          }
        });
      },
      removeFromPlaylist(song, playlistId) {
        var list = song.inplaylists;
        var start = list.indexOf(playlistId);
        var end = start + playlistId.length;
        if(end+1<list.length) {
          //Accoutn for the comma
          end++;
        }
        var updatedList = list.substring(0,start)+list.substring(end);

        song.inplaylists = updatedList;
        var updateId = song._id;
        let uri = `http://localhost:4000/songs/update/${song._id}`;
        this.axios.post(uri, song).then(() => {
          console.log("Successfully removed song.");
        });
      }
    }
  }
</script>