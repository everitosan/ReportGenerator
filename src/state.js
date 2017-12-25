import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      name: 'Sánchez Hernández Everardo',
      register: '',
      school: 'Instituto Politécnico Nacional',
      id: '2011350637',
      carreer: 'ICE',
      area: 'Dirección de Ingeniería-Mantenimiento e Instalaciones de audio.',
      initHour: '12:00',
      finishHour: '16:00',
      dateStart: '03/11/2017',
      dateEnd: '03/05/2018',
      schoolId: '2011350637',
      telephone: '58490378',
      email: 'everardo.ipn@gmail.com',
    },
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
  },
  mutations: {
    setUserData(state, data) {
      this.state.user = data.user;
    },
    setCaptchaShow(state, data) {
      this.state.captcha.show = data;
    },
    setCaptchaHashed(state, data) {
      this.state.captcha.hashed = data;
    },
  },
});

export default store;
