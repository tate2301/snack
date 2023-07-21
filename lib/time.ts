/**
 * @param {Date} baseDate
 * @param {Date} refDate
 * @description This function takes two dates and returns the difference between them written as  30 minutes, 1 hour, 1 day etc.
 */

export function timeDifference(baseDate: Date, refDate: Date): string {
  const diff = refDate.getTime() - baseDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (hours < 24) {
    return `${hours} hours`;
  } else {
    return `${days} days`;
  }
}
