const DateTimeFunctions = {
  getTimestamp(date: Date): string {
    return date != null
      ? (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) +
          ':' +
          (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      : 'N/A';
  },
  getDate(date: Date): string {
    return date != null
      ? date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear()
      : 'N/A';
  },
  getDatetime(date: Date): string {
    return date != null
      ? DateTimeFunctions.getDate(date) +
          ' ' +
          DateTimeFunctions.getTimestamp(date)
      : 'N/A';
  },
  getDifferenceInHours(date1: Date, date2: Date): number{
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
