<template>
  <form @submit.prevent="addPlaylist">
    <div>
      <p class="head">Add a Playlist</p>
      <div class="posttable">
        <div class="posttablerow">
          <div class="posttablecell" id="holdleft">
            <p class="subhead">Input Information</p>
            <label>Playlist Title:</label>
            <input type="text" v-model="playlist.title" id="longinput"><br>
            <label>Description:</label>
            <textarea v-model="playlist.description"></textarea>
          </div>
        </div>
      </div>
    </div>
    <button class="postbutton">Create</button>
  </form>
</template>

<script>
  export default {
    data(){
      return {
        playlist:{}
      }
    },
    methods: {
      addPlaylist(){
        let uri = 'http://localhost:4000/playlists/add';
        this.axios.post(uri, this.playlist).then(() => {
          this.$router.push({name: 'playlists'});
        });
      }
    }
  }
</script>
