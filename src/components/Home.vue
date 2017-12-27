<template lang="pug">
  div
    .hero.is-info
      .hero-body
        h1.title
          | Datos generales
        h2.subtitle
          | Ingresa los datos que serán usados para los reportes.
    .section

      .columns
        .column
          .label Nombre completo
          input.input(
            type="text"
            v-model="user.name"
            placeholder="Everardo Sánchez Hernández")
        .column
          .label Registro
          input.input(
            type="text"
            placeholder="973198798"
            v-model="user.register")
      .columns
        .column.is-9
          .label Institución Educativa
          input.input(
            type="text"
            v-model="user.school")
        .column
          .label Boleta
          input.input(
            type="text"
            placeholder="2088350634"
            v-model="user.schoolId")

      .columns
        .column
          .label Carrera
          input.input(
            type="text"
            v-model="user.carreer")
        .column
          .label Teléfono
          input.input(
            type="text"
            v-model="user.telephone")
        .column
          .label Email
          input.input(
            type="text"
            v-model="user.email")

      .columns
        .column
          .label Nombre de la institución
          input.input(
            type="text"
            v-model="institution.name")

      .columns
        .column
          .label Area de adscripción
          input.input(
            type="text"
            v-model="user.area"
            placeholder="Area")
        .column
          .label Nombre del proyecto
          input.input(
            type="text"
            v-model="institution.program"
            placeholder="Area")
      .columns
        .column
          .label Fecha de Inicio
          input.input(
            type="text"
            v-model="user.dateStart")
        .column
          .label Fecha de Término
          input.input(
            type="text"
            v-model="user.dateEnd")
        .column
          .label Hora de entrada
          input.input(
            type="text"
            v-model="user.initHour")
        .column
          .label Hora de Salida
          input.input(
            type="text"
            v-model="user.finishHour")

      .columns
        .column
          .label Responsable del área
          input.input(
            type="text"
            v-model="institution.internBoss.name")
        .column.is-6
          .label Puesto
          input.input(
            type="text"
            v-model="institution.internBoss.position")

      .columns
        .column
          .label Responsable del área
          input.input(
            type="text"
            v-model="institution.boss.name")
        .column.is-6
          .label Puesto
          input.input(
            type="text"
            v-model="institution.boss.position")

      .columns
        .column
          button.button.is-info(@click="updateInfo()") Guardar
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['user', 'institution']),
  },
  methods: {
    updateInfo() {
      this.$store.commit('setUserData', this.user);
    },
  },
};
</script>

<style lang="stylus">
.label
  text-transform: uppercase
  font-size: 14px
</style>
