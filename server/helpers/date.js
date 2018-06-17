export const millisecond = 1;
export const second = 1000 * millisecond;
export const minute = 60 * second;
export const hour = 60 * minute;
export const day = 24 * hour;

/* 20:00:00 => works
   24:00:00 => fails
   23:59:0  => fails
   23:61:00 => fails */
export const timeStringRegex = /^(?:(?:([01]\d|2[0-3]):)([0-5]\d):)([0-5]\d)$/;
