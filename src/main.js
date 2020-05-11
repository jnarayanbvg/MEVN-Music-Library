import Vue from 'vue'
require('@/style.css')
import App from './App.vue'
import 'buefy/dist/buefy.css'


import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import HomeComponent from './components/HomeComponent.vue';

import CreateSong from './components/CreateSong.vue';
import Songs from './components/Songs.vue';
import EditSong from './components/EditSong.vue';

import CreatePlaylist from './components/CreatePlaylist.vue';
import Playlists from './components/Playlists.vue';
import EditPlaylist from './components/EditPlaylist.vue';

const routes = [
  {
      name: 'home',
      path: '',
      component: HomeComponent
  },
  {
      name: 'songs',
      path: '/songs/:sortType/:filter?',
      component: Songs
  },
  {
      name: 'songs/create',
      path: '/songs/create/:filter?',
      component: CreateSong
  },
  {
      name: 'songs/edit',
      path: '/songs/edit/:id',
      component: EditSong
  },
  {
      name: 'playlists',
      path: '/playlists',
      component: Playlists
  },
  {
      name: 'playlists/create',
      path: '/playlists/create',
      component: CreatePlaylist
  },
  {
      name: 'playlists/edit',
      path: '/playlists/edit/:id',
      component: EditPlaylist
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');