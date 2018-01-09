<template lang="pug">
  div
    Popup(:onFinish="saveReport")
    img(id="ACT_IPN" class="hide" src="../assets/ACTIVIDADESIPN_min.jpg")
    img(id="ACT_IMER" class="hide" src="../assets/ACTIVIDADESIMER_min.jpg")
    .hero.is-warning
      .hero-body
        h1.title
          | Lista de actividades
        h2.subtitle
          | Ingresa las actividades realizadas para tu reporte
    .section
      .columns
        .column
          .label No Reporte
          input.input(
            type="number",
            min="1",
            v-model="computedReportNumber"
            )
        .column
          .label Inicio
          input.input(
            type="date",
            v-model="computedStartDate"
            )
        .column
          .label Fin
          input.input(
            type="date",
            v-model="computedEndDate"
            )
        .column
          .label Fecha de entrega
          input.input(
            type="date",
            v-model="computedDeliverDate"
            )
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

      .columns.center
        .column
          button.button.is-primary(@click="generteReport('IMER')") IMER
        .column
          button.button.is-danger(@click="generteReport('IPN')") IPN
</template>

<script>
import ActivityLine from '@/components/ActivityLine';
import Popup from '@/components/pop-up';
import Report from '@/classes/Report';
import { mapState } from 'vuex';
import DaysCalculator from 'dayscalculator';

function fixMonthDayString(current) {
  if (current <= 9) {
    return `0${current}`;
  }
  return current;
}

export default {
  name: 'Actividades',
  computed: {
    ...mapState(['user', 'institution', 'captcha']),
    computedDeliverDate: {
      get: function getDeliverDate() {
        const nD = new Date();
        const today = `${nD.getFullYear()}-${nD.getMonth().toString() + 1}-${fixMonthDayString(nD.getDate())}`;
        this.deliverDate = today;
        return today;
      },
      set: function setDeliverDate(newVal) {
        this.deliverDate = newVal;
      },
    },
    computedReportNumber: {
      get: function getReportNumber() {
        const initMonth = parseInt(this.user.dateStart.split('/')[1], 10);
        const today = new Date();
        let currentMonth = today.getMonth() + 1;

        if (currentMonth < initMonth) {
          currentMonth += 12;
        }

        let reportN = currentMonth - initMonth;
        reportN += 1;
        this.reportNumber = reportN;
        return reportN;
      },
      set: function setReportNumber(newVal) {
        this.reportNumber = newVal;
      },
    },
    computedStartDate: {
      set: function setStartDate(newVal) {
        this.startDate = newVal;
      },
      get: function getStartDate() {
        const today = new Date();
        const start = `${today.getFullYear()}-${today.getMonth().toString() + 1}-01`;
        this.startDate = start;
        return start;
      },
    },
    computedEndDate: {
      get: function getStartDate() {
        const today = new Date();
        const finalDay = DaysCalculator.getMonthDays(today.getMonth(), today.getFullYear());
        const end = `${today.getFullYear()}-${today.getMonth().toString() + 1}-${finalDay}`;
        this.endDate = end;
        return end;
      },
      set: function setStartDate(newVal) {
        this.endDate = newVal;
      },
    },
  },
  data() {
    return {
      activity: {
        name: '',
        index: 0,
      },
      type: '',
      activities: {},
      reportNumber: '',
      startDate: '',
      endDate: '',
      deliverDate: '',
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
    saveReport() {
      const nameReport = `Reporte Activdades ${this.type}`;
      this.report = new Report(nameReport, this.type);

      const monthNumber = parseInt(this.startDate.split('-')[1], 10) - 1;
      const year = this.startDate.split('-')[0];
      const month = this.startDate.split('-')[1];
      const startDate = this.startDate.split('-')[2];
      const endDate = this.endDate.split('-')[2];
      const monthName = DaysCalculator.months[monthNumber];

      if (this.type === 'IMER') {
        this.report.writeBackground(document.querySelector('#ACT_IMER'));
      } else if (this.type === 'IPN') {
        this.report.writeBackground(document.querySelector('#ACT_IPN'));
      }
      this.report.writeActivityHead({
        user: this.user,
        institution: this.institution,
        report: {
          number: this.reportNumber,
          deliverDate: {
            day: this.deliverDate.split('-')[2],
            month: DaysCalculator.months[parseInt(this.deliverDate.split('-')[1], 10) - 1],
            year: this.deliverDate.split('-')[0],
          },
          monthName,
          year,
          month,
          startDate,
          endDate,
        },
      });

      this.report.writeActivitiesList(this.activities);
      this.report.show();
    },
    generteReport(type) {
      this.type = type;
      this.$store.commit('setCaptchaShow', true);
    },
  },
  components: { ActivityLine, Popup },
};
</script>

<style lang="stylus">
.add
  width: 100%
</style>
