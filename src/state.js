import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'report-vuex',
  storage: window.localStorage,
  reducer: state => ({
    user: state.user,
    institution: state.institution,
  }),
});

const store = new Vuex.Store({
  state: {
    institution: {
      name: 'Instituto Mexicano de la Radio',
      program: 'Proyecto servicio social para el IMER 2010',
      boss: {
        name: 'Juan Carlos Casique Gonzalez',
        position: 'Jefe de departamento de recursos humanos',
      },
      internBoss: {
        name: 'ING Francisco Domínguez Ávila',
        position: '',
      },
    },
    captcha: {
      show: false,
      hashed: false,
    },
    user: {
      name: 'Sánchez Hernández Everardo',
      register: '',
      school: 'Instituto Politécnico Nacional',
      carreer: 'ICE',
      area: 'Dirección de Ingeniería-Mantenimiento e Instalaciones de audio.',
      initHour: '12:00',
      finishHour: '16:00',
      dateStart: '03/11/2017',
      dateEnd: '03/05/2018',
      schoolId: '2098350634',
      telephone: '94857609',
      email: 'everardo.ipn@gmail.com',
    },
  },
  mutations: {
    setUserData(state, user) {
      this.state.user = user;
    },
    setCaptchaShow(state, data) {
      this.state.captcha.show = data;
    },
    setCaptchaHashed(state, data) {
      this.state.captcha.hashed = data;
    },
  },
  plugins: [vuexLocalStorage.plugin],
});

export default store;
