<template lang="pug">
.modal(:class="{'is-active': captcha.show}")
  .modal-background
  .modal-content
    .head
      h2 Solo un paso más!
    .content
      p Porfavor haz click en el captcha, eso nos ayuda a seguir con el proyecto.
      p Al terminar, se descargará tu reporte listo para imprimir.
      div(v-if="!captcha.hashed")
        coinhiveCaptcha(:onFinish="closeModal")
</template>

<script>
import coinhiveCaptcha from '@/components/coinhive';
import { mapState } from 'vuex';

export default {
  name: 'popup',
  props: ['onFinish'],
  computed: {
    ...mapState(['captcha']),
  },
  methods: {
    closeModal() {
      this.$store.commit('setCaptchaHashed', true);
      this.$store.commit('setCaptchaShow', false);
      this.onFinish();
    },
  },
  beforeUpdate() {
    if (this.captcha.hashed) {
      this.$store.commit('setCaptchaHashed', false);
    }
  },
  components: { coinhiveCaptcha },
};
</script>

<style lang="stylus">
.modal-content
  background: white
  text-align: center
  border-radius: 10px
  padding: 1em
  .head
    font-size: 1.2em
    text-transform: uppercase
    margin: 1em 0
  .content
    margin-top: 1em
    p
      line-height: 8px
</style>
