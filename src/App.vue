<template>
  <div id="container">
    <ul id="navbar">
      <router-link :to="{name: 'songs', params: { sortType: 'title'}}"><li class="navbaritem" id="navbarhome">Songs</li></router-link>
      <router-link :to="{name: 'home'}"><li class="navbaritem">Home</li></router-link>
      <router-link :to="{name: 'playlists'}"><li class="navbaritem">Playlists</li></router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
@import 'style.css';
</style>