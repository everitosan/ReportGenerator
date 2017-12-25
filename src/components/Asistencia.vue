<template lang="pug">
  div
    img(id="asisIMER" class="hide" src="../assets/ASISTENCIAIMER_min.jpg")
    img(id="asisIPN" class="hide" src="../assets/ASISTENCIAIPN_min.jpg")

    .hero.is-primary
      .hero-body
        .container
          h1.title Reporte Asistencias
          h2.subtitle Llena la siguiente información para generar el reporte.
    .container
      .columns
        .column
          .column
            .label Inicio de mes
            .control
              input.input(type="text" v-model="monthInit")
          .column
            .label Fin de mes
            .control
              input.input(type="text" v-model="reportDetails.monthFinish")
        .column
          .column
            .label Horas acumuladas
            .control
              input.input(type="text" v-model="hoursCounter")
          .column
            .label Días Festivos
            .control
              input.input(type="text" v-model="notValid" placeholder="20,24,31")
        .column
          .column
            .label Mes
            .select
              select(v-model="reportDetails.month" @change="updateMonthFinish()")
                option(v-for="(month, index) in months" :value="index") {{month}}
          .column
            .label Año
            .control
              input.input(type="text" v-model="reportDetails.year")
      .columns.center
        .column
          button(class="button is-primary" @click="generateReport('IMER')") IMER
        .column
          button(class="button is-danger" @click="generateReport('IPN')") IPN
</template>

<script>
import Report from '@/classes/Report';
import DaysCalculator from 'dayscalculator';
import { mapState } from 'vuex';

export default {
  name: 'Asistencia',
  computed: {
    ...mapState(['user', 'institution']),
    reportDetails: function reportDetails() {
      const myDate = new Date();
      return {
        month: myDate.getMonth(),
        year: myDate.getFullYear(),
        monthFinish: DaysCalculator.getMonthDays(myDate.getMonth(), myDate.getFullYear()),
      };
    },
  },
  data() {
    return {
      months: DaysCalculator.months,
      notValid: '',
      hoursCounter: 0,
      monthInit: 1,
    };
  },
  methods: {
    updateMonthFinish() {
      const days = DaysCalculator.getMonthDays(
        this.reportDetails.month,
        this.reportDetails.year);
      this.reportDetails.monthFinish = days;
      this.$forceUpdate();
    },
    generateReport(type) {
      const nameReport = `Asistencia ${type} ${this.months[this.reportDetails.month]}-${this.reportDetails.year}`;
      const report = new Report(nameReport, type);
      const currentMonth = this.months[this.reportDetails.month];
      let hoursOfThisMonth = 0;
      const firstDayDate = new Date(
        this.reportDetails.year,
        this.reportDetails.month,
        this.monthInit,
        0, 0, 0, 0);
      const notValidDays = this.notValid.split(',');

      if (type === 'IMER') {
        report.writeBackground(document.querySelector('#asisIMER'));
      } else if (type === 'IPN') {
        report.writeBackground(document.querySelector('#asisIPN'));
      }
      report.writeHeadData(this.user);
      report.writeMonth(currentMonth);

      const ableDays = DaysCalculator.getAbleDays(
        firstDayDate,
        this.monthInit,
        this.reportDetails.monthFinish,
        notValidDays);

      ableDays.forEach((day) => {
        const dateText = `${day}/${this.reportDetails.month + 1}/${this.reportDetails.year}`;
        hoursOfThisMonth += 4;
        const currentHours = parseInt(this.hoursCounter, 10) + hoursOfThisMonth;
        report.writeRow({
          date: dateText,
          initHour: this.user.initHour,
          finishHour: this.user.finishHour,
          daysHour: '4',
          currentHours: currentHours.toString(),
        });
      });

      if (type === 'IPN') {
        report.writeEndIPN(
          hoursOfThisMonth,
          parseInt(this.hoursCounter, 10) + hoursOfThisMonth,
          this.institution.boss);
      }

      report.show();
    },
  },
};
</script>

<style lang="stylus">
.center
  text-align: center
</style>
