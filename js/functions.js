const isWorkingDay = (startWork, endWork, startMeeting, durationMeeting) => {
  // Разделяем часы и минуты и переведем в массив
  const timeStartWork = startWork.split(':');
  const timeEndWork = endWork.split(':');
  const timeStartMeeting = startMeeting.split(':');
  // Считаем сколько минут осталось с начала встречи до конца рабочего дня (если встреча началась в течение рабочего дня)
  const minutesEndWork = (Number(timeEndWork[0]) * 60 + Number(timeEndWork[1])) - (Number(timeStartMeeting[0]) * 60 + Number(timeStartMeeting[1]));
  // Считаем сколько минут от начала рабочего дня до встречи (если встреча началась до начала рабочего дня)
  const minutesStartWork = (Number(timeStartMeeting[0]) * 60 + Number(timeStartMeeting[1])) - (Number(timeStartWork[0] * 60) + Number(timeStartWork[1]));
  // Проверяем выходит ли встреча за рамки рабочего дня
  // Если количество минут до конца рабочего дня >= количеству минут встречи и количество минут от начала рабочего дня до начала встречи >=0
  // то встрче началась в рабочий день => true
  if (minutesEndWork >= durationMeeting && minutesStartWork >= 0) {
    return true;
  }
  return false;
};
isWorkingDay('7:00', '18:00', '17:15', 46);
// Проверка
// console.log(isWorkingDay('7:00', '18:00', '17:15', 45));
