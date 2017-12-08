const DateCalculator = {};

DateCalculator.months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

DateCalculator.getMonthDays = function getMonthDays(year, month) {
  return new Date(year, month + 1, 0).getDate();
};

DateCalculator.getAbleDays = function getAbleDays(
  firstDayDate, monthInit, monthFinish, notValidDays) {
  let auxcount = null;
  const ableDays = [];
  for (let i = monthInit - 1; i < monthFinish; i += 1) {
    if (auxcount === null) {
      auxcount = 5 - firstDayDate.getDay();
    } else {
      auxcount -= 1;
    }
    if (auxcount === -3) { auxcount = 4; }
    if (auxcount >= 0 && auxcount !== 5 && !notValidDays.includes(`${i + 1}`)) {
      ableDays.push(i + 1);
    }
  }

  return ableDays;
};

export default DateCalculator;
