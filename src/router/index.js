import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Asistencia from '@/components/Asistencia';
import Actividades from '@/components/Actividades';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/asistencia',
      name: 'Asistencia',
      component: Asistencia,
    },
    {
      path: '/actividades',
      name: 'Actividades',
      component: Actividades,
    },
  ],
});
