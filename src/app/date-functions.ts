const DateTimeFunctions = {
  getTimestamp(date: Date): string {
    let hours: number = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    return date != null
      ? (hours < 10 ? '0' + hours : hours) +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          ':' +
          (date.getSeconds() < 10
            ? '0' + date.getSeconds()
            : date.getSeconds()) +
          (date.getHours() > 12 ? ' PM' : ' AM')
      : 'N/A';
  },
  getDate(date: Date): string {
    let month: string = '';
    switch (date.getMonth()) {
      case 0:
        month = 'Jan';
        break;
      case 1:
        month = 'Feb';
        break;
      case 2:
        month = 'Mar';
        break;
      case 3:
        month = 'Apr';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'Jun';
        break;
      case 6:
        month = 'Jul';
        break;
      case 7:
        month = 'Aug';
        break;
      case 8:
        month = 'Sep';
        break;
      case 9:
        month = 'Oct';
        break;
      case 10:
        month = 'Nov';
        break;
      case 11:
        month = 'Dec';
        break;
    }
    return date != null
      ? month + ' ' + date.getDate() + ', ' + date.getFullYear()
      : 'N/A';
  },
  getDatetime(date: Date): string {
    return date != null
      ? DateTimeFunctions.getDate(date) +
          ' ' +
          DateTimeFunctions.getTimestamp(date)
      : 'N/A';
  },
  getDifferenceInHours(date1: Date, date2: Date): number {
    return Math.floor((date2.getTime() - date1.getTime()) / (60 * 60 * 1000));
  },
  addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  },
  subtractHours(date: Date, hours: number): Date {
    return new Date(date.getTime() - hours * 60 * 60 * 1000);
  },
};

export default DateTimeFunctions;
