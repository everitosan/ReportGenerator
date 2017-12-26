<template lang="pug">
  .navbar.is-black
    .navbar-brand
      router-link.navbar-item(to="/") ∫ Inicio
      .navbar-burger.burger(data-target="mainMenu" @click="toggleMenu()" :class="{ 'is-active': showMenu }")
        span
        span
        span
    #mainMenu.navbar-menu(:class="{ 'is-active': showMenu }")
      .navbar-end
        router-link.navbar-item(to="/asistencia") Asistencia
        router-link.navbar-item(to="/actividades") Actividades
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'navbar',
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="stylus">
</style>
