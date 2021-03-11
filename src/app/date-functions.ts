const DateTimeFunctions = {
  getTimestamp(date: Date): string{
    return date != null ? date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() : "N/A";
  },
  getDate(date: Date): string{
    return date != null ? (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear() : "N/A";
  },
  getDatetime(date: Date): string{
    return date != null ? DateTimeFunctions.getDate(date) + " " + DateTimeFunctions.getTimestamp(date) : "N/A";
  },
  addHours(date: Date, hours: number): Date{
    return new Date(date.getTime() + (hours * 60 * 60 * 1000));
  },
  subtractHours(date: Date, hours: number): Date{
    return new Date(date.getTime() - (hours * 60 * 60 * 1000));
  },
}

export default DateTimeFunctions;
