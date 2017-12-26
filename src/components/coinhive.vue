<template lang="pug">
form(action="?" method="post")
  div.coinhive-captcha(
    data-hashes="1024"
    data-key="6cNg5YJlj3Z4eLJOheDgWK8yaNdyDEwA"
    data-callback="finish")
    em
      | Loading captcha ...
      br
      | If it doesn't load, please DISABLE Adblock!
    input(type="submit" value="Submit")
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'coin-hive-captcha',
  props: ['onFinish'],
  computed: {
    ...mapState(['captcha']),
  },
  created() {
    const self = this;
    const script = document.createElement('script');
    script.setAttribute('src', 'https://authedmine.com/lib/captcha.min.js');
    window.document.head.appendChild(script);

    window.finish = function finish() {
      self.onFinish();
    };
  },
};
</script>

<style lang="stylus">
</style>
