<template>
  <form @submit.prevent="updatePlaylist">
    <div>
      <p class="head">Edit a Playlist</p>
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
    <button class="postbutton">Update</button>
  </form>
</template>

<script>
    export default {

      data() {
        return {
          playlist: {}
        }
      },
      created() {
        let uri = `http://localhost:4000/playlists/edit/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.playlist = response.data;
        });
      },
      methods: {
        updatePlaylist() {
          let uri = `http://localhost:4000/playlists/update/${this.$route.params.id}`;
          this.axios.post(uri, this.playlist).then(() => {
            this.$router.push({name:'playlists'});
          });
        }
      }
    }
</script>