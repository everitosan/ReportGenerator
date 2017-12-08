<template lang="pug">
  div
    div.vineta.is-warning
    span {{activity.name}}
    span.icon(@click="del")
      i.fa.fa-home x
</template>

<script>
export default {
  name: 'ActivityLine',
  props: ['activity', 'onDelete'],
  data() {
    return {
    };
  },
  methods: {
    del() {
      this.onDelete(this.activity.index);
    },
  },
};
</script>

<style lang="stylus">
.vineta
  background-color: #ffdd57
  display: inline-block
  margin-right: 1em
  height: 5px
  vertical-align: middle
  width: 5px
.icon
  i
    cursor: pointer
</style>
