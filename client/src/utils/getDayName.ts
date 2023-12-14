export function getDayName(date: Date | string): string {
    const currentDate = date instanceof Date ? date : new Date(date);
    const dayOfWeekNumber = currentDate.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[dayOfWeekNumber];
  }
  
  export function getNextDayName(date: Date, next: number): string {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + next);
    return getDayName(nextDay);
  }