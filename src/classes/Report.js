import JsPDF from 'jspdf';

function resizeImageToPage(size, img) {
  const newSizeObj = {};
  if (size === 'letter') {
    const w = 220;
    newSizeObj.w = w;
    newSizeObj.h = (w * img.height) / img.width;
  }
  return newSizeObj;
}

export default class Report {
  constructor(name, type) {
    this.type = type;
    this.docName = name;
    this.DOC = new JsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'letter',
    });
    this.cursorX = 0;
    this.cursorY = 0;

    this.canvas = document.createElement('CANVAS');
  }

  writeMonth(month) {
    this.DOC.setFontSize(10);
    if (this.type === 'IMER') {
      this.DOC.text(month.toUpperCase(), 160, 54);
    } else if (this.type === 'IPN') {
      this.DOC.text(month.toUpperCase(), 170, 60);
    }
  }

  writeHeadData(user) {
    this.DOC.setFontSize(10);
    if (this.type === 'IMER') {
      this.DOC.text(user.name.toUpperCase(), 45, 32);
      this.DOC.text(user.register, 165, 32);
      this.DOC.text(user.area.toUpperCase(), 65, 37.5);
      this.DOC.text(user.dateStart, 58, 43);
      this.DOC.text(user.dateEnd, 163, 43);
      this.DOC.text(user.school.toUpperCase(), 63, 48.5);
      this.DOC.text(user.initHour, 50, 54);
      this.DOC.text(user.finishHour, 90, 54);
    } else if (this.type === 'IPN') {
      this.DOC.text(user.name.toUpperCase(), 70, 60);
    }
  }

  getImageUrl(imgDomEl) {
    const ctx = this.canvas.getContext('2d');

    this.canvas.width = imgDomEl.width;
    this.canvas.height = imgDomEl.height;

    ctx.drawImage(imgDomEl, 0, 0);
    return this.canvas.toDataURL();
  }

  writeBackground(imgDomEl) {
    const imgStr = this.getImageUrl(imgDomEl);
    const newSize = resizeImageToPage('letter', imgDomEl);
    this.DOC.addImage(imgStr, 'JPG', this.cursorX, this.cursorY, newSize.w, newSize.h);
  }

  writeRow(data) {
    this.DOC.setFontSize(10);
    if (this.type === 'IMER') {
      if (this.cursorY < 75) { this.cursorY = 75; }
      this.cursorX = 21;

      this.DOC.text(data.date, this.cursorX, this.cursorY);
      this.cursorX += 32;
      this.DOC.text(data.initHour, this.cursorX, this.cursorY);
      this.cursorX += 29;
      this.DOC.text(data.finishHour, this.cursorX, this.cursorY);
      this.cursorX += 36;
      this.DOC.text(data.daysHour, this.cursorX, this.cursorY);
      this.cursorX += 34;
      this.DOC.text(data.currentHours, this.cursorX, this.cursorY);
      this.cursorY += 7.1;
    } else if (this.type === 'IPN') {
      if (this.cursorY < 85) { this.cursorY = 85; }
      this.cursorX = 44;

      this.DOC.text(data.date, this.cursorX, this.cursorY);
      this.cursorX += 32.5;
      this.DOC.text(data.initHour, this.cursorX, this.cursorY);
      this.cursorX += 33.5;
      this.DOC.text(data.finishHour, this.cursorX, this.cursorY);
      this.cursorX += 34;
      this.DOC.text(data.daysHour, this.cursorX, this.cursorY);
      this.cursorY += 6.15;
    }
  }

  static parsetoString(variable) {
    let str = '';
    if (typeof (variable) === 'number') {
      str = variable.toString();
    }
    return str;
  }

  writeEndIPN(hoursOfThisMonth, hoursCounter, boss) {
    this.DOC.setFontSize(10);
    this.DOC.text(Report.parsetoString(hoursOfThisMonth), 143, 227.3);
    this.DOC.text(Report.parsetoString(hoursCounter), 143, 233.45);
    this.DOC.setFontSize(9);
    this.DOC.text(boss.name.toUpperCase(), 28, 270.5);
    this.DOC.setFontSize(8);
    this.DOC.text(boss.position.toUpperCase(), 22, 276);
  }

  drawGrid() {
    this.DOC.line(10.5, this.cursorY + 2, 10.5, this.cursorY - 6);
    this.DOC.line(37.5, this.cursorY + 2, 37.5, this.cursorY - 6);
    this.DOC.line(68, this.cursorY + 2, 68, this.cursorY - 6);
    this.DOC.line(98.5, this.cursorY + 2, 98.5, this.cursorY - 6);
    this.DOC.line(138, this.cursorY + 2, 138, this.cursorY - 6);
    this.DOC.line(173, this.cursorY + 2, 173, this.cursorY - 6);
    this.DOC.line(210, this.cursorY + 2, 210, this.cursorY - 6);

    // base line
    this.DOC.line(10.5, this.cursorY + 2, 210, this.cursorY + 2);
  }

  show() {
    this.DOC.save(`Reporte ${this.docName}.pdf`);
  }
}