const {
  isWeekend,
  startOfDay,
  addDays,
  set,
  differenceInMinutes,
  addMinutes,
  format,
} = require('date-fns');
const { LANGUAGE_CONFIG } = require('../config/constants');

function validateInput(language, startDateTime) {
  if (!LANGUAGE_CONFIG[language]) {
    throw new Error('Unsupported language. Please use "uk" or "en".');
  }

  const start = new Date(startDateTime);

  if (isNaN(start.getTime())) {
    throw new Error('Invalid start date.');
  }
}

function isWorkingTime(date) {
  const hours = date.getHours();

  return !isWeekend(date) && hours >= 10 && hours < 19;
}

function moveToNextWorkingTime(date) {
  let nextTime = new Date(date);
  const SATURDAY = 6;

  if (isWeekend(nextTime)) {
    const daysToAdd = nextTime.getDay() === SATURDAY ? 2 : 1;

    nextTime = set(startOfDay(addDays(nextTime, daysToAdd)), { hours: 10 });
  } else if (nextTime.getHours() >= 19) {
    nextTime = set(startOfDay(addDays(nextTime, 1)), { hours: 10 });
  } else if (nextTime.getHours() < 10) {
    nextTime = set(nextTime, { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 });
  }

  return nextTime;
}

function calculateDeadline(startDateTime, totalMinutes) {
  let currentTime = new Date(startDateTime);
  let remainingMinutes = totalMinutes;

  while (remainingMinutes > 0) {
    if (isWorkingTime(currentTime)) {
      const endOfDay = set(currentTime, { hours: 19, minutes: 0, seconds: 0, milliseconds: 0 });
      const minutesToEndOfDay = differenceInMinutes(endOfDay, currentTime);

      const minutesProcessed = Math.min(remainingMinutes, minutesToEndOfDay);
      currentTime = addMinutes(currentTime, minutesProcessed);
      remainingMinutes -= minutesProcessed;
    } else {
      currentTime = moveToNextWorkingTime(currentTime);
    }
  }

  return format(currentTime, 'dd.MM.yy HH:mm');
}

module.exports = {
  validateInput,
  isWorkingTime,
  moveToNextWorkingTime,
  calculateDeadline,
};
