<template lang="pug">
  div
    .hero.is-warning
      .hero-body
        h1.title
          | Lista de actividades
        h2.subtitle
          | Ingresa las actividades realizadas para tu reporte
    .section
      .label Actividad
      .columns
        .column
          input.input(
            type="text"
            v-model="activity.name"
            @keyup.enter="addToList"
            )
        .column.is-2
          button.button(class="add is-warning" @click="addToList()") Agregar
      .label Lista de actividades
      .columns
        .column
          ul
            li(v-for="activity in activities")
              ActivityLine(:activity="activity" :onDelete="del")

      .columns
        .column
          button.button.is-primary(@click="generteReport") IMER
        .column
          button.button.is-danger(@click="generteReport") IPN
</template>

<script>
import ActivityLine from '@/components/ActivityLine';

export default {
  name: 'Actividades',
  data() {
    return {
      activity: {
        name: '',
        index: 0,
      },
      activities: {},
    };
  },
  methods: {
    addToList() {
      const newIndex = (this.activity.index + 1);
      if (this.activity === '') return;
      this.activities[this.activity.index] = this.activity;
      this.activity = {
        name: '',
        index: newIndex,
      };
    },
    del(index) {
      delete this.activities[index];
      this.$forceUpdate();
    },
    generteReport() {
    },
  },
  components: { ActivityLine },
};
</script>

<style lang="stylus">
.add
  width: 100%
</style>
