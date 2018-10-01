/* @flow */

export type DayRange = {
  +startsAt: number,
  +lasts: number,
};

const truncateHours = hour => (hour > 12 ? hour - 12 : hour);
const getMeridiem = hour => (hour >= 12 ? 'pm' : 'am');
const toTwelveHourSystem = hour => `${truncateHours(hour)}${getMeridiem(hour)}`;

export const createHoursFromRange = (range: DayRange): Array<string> => {
  const { startsAt, lasts } = range;

  const hours: Array<string> = Array
    .from(new Array(lasts), (_: number, hour) => hour + startsAt)
    .map(toTwelveHourSystem);

  return hours;
};
