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
      area: 'Dirección de Ingeniería-Mantenimiento e Instalaciones de audio.',
      initHour: '12:00',
      finishHour: '16:00',
      dateStart: '03/11/2017',
      dateEnd: '03/05/2018',
      schoolId: '2011350637',
    },
    boss: {
      name: 'Juan Carlos Casique Gonzalez',
      position: 'Jefe de departament de recursos humanos',
    },
    internBoss: {
      name: 'ING Francisco Domínguez Ávila',
      position: '',
    },
  },
  mutations: {
    setUserData(data) {
      this.state.user = data.user;
    },
  },
});

export default store;
