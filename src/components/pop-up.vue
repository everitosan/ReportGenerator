<template lang="pug">
.modal(:class="{'is-active': captcha.show}")
  .modal-background
  .modal-content
    .head
      h3 Verifica!
    .content
      p Porfavor haz click en el captcha, eso nos ayuda a seguir con el proyecto.
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
</style>
