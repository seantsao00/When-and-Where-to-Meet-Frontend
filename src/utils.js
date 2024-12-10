export function arrayToHashMap(array) {
  const hashMap = {};
  for (const item of array) {
    if (!(item in hashMap)) {
      hashMap[item] = 0;
    }
    hashMap[item] += 1;
  }
  return hashMap;
}
// hashMap2 must be subset of hashMap1
export function minusHashMap(hashMap1, hashMap2) {
  const hashMap = {};
  for (const key of Object.keys(hashMap1)) {
    hashMap[key] = hashMap1[key];
    if (key in hashMap2) {
      hashMap[key] -= hashMap2[key];
    }
  }
  return hashMap;
}
export function addHashMap(hashMap1, hashMap2) {
  const hashMap = {};
  for (const key of Object.keys(hashMap1)) {
    hashMap[key] = hashMap1[key];
  }
  for (const key of Object.keys(hashMap2)) {
    if (!(key in hashMap)) {
      hashMap[key] = 0;
    }
    hashMap[key] += hashMap2[key];
  }
  return hashMap;
}

export function inRectangle(i, j, p1, p2) {
  return (
    i >= Math.min(p1[0], p2[0]) &&
    i <= Math.max(p1[0], p2[0]) &&
    j >= Math.min(p1[1], p2[1]) &&
    j <= Math.max(p1[1], p2[1])
  );
}
const milliSecondsInAMinute = 60 * 1000;
const milliSecondsInAnHour = 60 * milliSecondsInAMinute;
const milliSecondsInADay = 24 * milliSecondsInAnHour;
export function unique(arr) {
  return [...new Set(arr)];
}
export function includes(superSet, subset) {
  return subset.every((val) => superSet.includes(val));
}
export function timeStampToDate(timeStamp) {
  return new Date(timeStamp.replace(" ", "T") + "Z");
}
export function dateToTimeStamp(date) {
  return date.toISOString().replace("T", " ").replace(".000Z", "");
}
export function pureTimeToDate(time) {
  return new Date("1970-01-01T" + time + "Z");
}
export function diffDays(date1, date2) {
  return Math.floor((date1.getTime() - date2.getTime()) / milliSecondsInADay);
}
// Does not count date
export function diffMinute(date1, date2) {
  return (
    date1.getUTCHours() * 60 +
    date1.getUTCMinutes() -
    (date2.getUTCHours() * 60 + date2.getUTCMinutes())
  );
}

export class InternalTimeTable {
  constructor(meet, availabilities) {
    this.startTime = pureTimeToDate(meet.startTime);
    this.endTime = pureTimeToDate(meet.endTime);
    this.startDate = new Date(meet.startDate);
    this.endDate = new Date(meet.endDate);
    this.days = diffDays(this.endDate, this.startDate) + 1;
    this.times = Math.floor(diffMinute(this.endTime, this.startTime) / 15);

    this.headers = [];
    for (let i = 0; i < this.days; i++) {
      const date = new Date(this.startDate.getTime() + i * milliSecondsInADay);
      this.headers.push(date.getUTCMonth() + 1 + "/" + date.getUTCDate());
    }

    this.timeCells = [];
    for (let i = 0; i < this.times; i++) {
      this.timeCells.push([]);
      for (let j = 0; j < this.days; j++) {
        this.timeCells[i].push(0);
      }
    }

    for (const timestamp of Object.keys(availabilities)) {
      const [i, j] = this.getIndex(timeStampToDate(timestamp));
      this.timeCells[i][j] = availabilities[timestamp];
    }
  }
  getHour(time) {
    return this.startTime.getUTCHours() + Math.floor(time / 4);
  }
  getAvailability(date) {
    const [time, day] = this.getIndex(date);
    return this.timeCells[time][day];
  }
  getIndex(date) {
    return [
      Math.floor(diffMinute(date, this.startTime) / 15),
      diffDays(date, this.startDate),
    ];
  }
  getDate(time, day) {
    return new Date(
      Date.UTC(
        this.startDate.getUTCFullYear(),
        this.startDate.getUTCMonth(),
        this.startDate.getUTCDate() + day,
        this.startTime.getUTCHours(),
        this.startTime.getUTCMinutes() + time * 15,
      ),
    );
  }
  getTimeStamp(time, day) {
    return dateToTimeStamp(this.getDate(time, day));
  }
}

export default function onTableUpdate() {}
