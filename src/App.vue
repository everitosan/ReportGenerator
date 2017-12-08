<template lang="pug">
  #app
    navbar
    router-view
</template>

<script>
import navbar from '@/components/navbar';

export default {
  name: 'app',
  components: { navbar },
};
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
