<template>
  <div class="contribution-graph">
    <div class="grid">
      <div class="day-name" v-for="dayName in dayNames" :key="dayName">
        {{ dayName }}
      </div>
      <div
        class="month"
        v-for="(monthData, monthLabel) in calendar"
        :key="monthLabel"
      >
        <div
          class="day-cell"
          v-for="(count, colIndex) in monthData"
          @click="toggleClass(colIndex)"
          :key="colIndex"
        >
          <div :class="[getColorClass(count), 'cell']">
            <div
              class="info"
              ref="infoElements" 
            >
              <p class="count" v-if="count > 0">{{ count }} contributions</p>
              <p class="count" v-else>No contributions</p>
              <p class="date">
                {{ formatDateToDisplay(monthLabel, colIndex + 1) }}
              </p>
            </div>
          </div>
          <div class="month-label" v-if="colIndex === 0">
            {{ getMonthName(monthLabel) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../store/store.js";

const infoElements = ref([]); // Создаем реактивное состояние для хранения элементов info

const toggleClass = (colIndex) => {
  const infoElement = infoElements.value[colIndex]; // Получаем элемент info
  infoElement.classList.toggle("active");
};
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatDateToDisplay = (monthLabel, day) => {
  const [year, month] = monthLabel.split("-");
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  const jsDate = new Date(year, parseInt(month) - 1, day);
  const dayOfWeek = capitalizeFirstLetter(
    new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(jsDate)
  );
  const monthName = capitalizeFirstLetter(months[parseInt(month) - 1]);

  return `${dayOfWeek}, ${monthName} ${day}, ${year}`;
};

const store = useUserStore();
const calendar = ref([]);
const monthNames = [
  "Янв.",
  "Февр.",
  "Март",
  "Апр.",
  "Май",
  "Июнь",
  "Июль",
  "Авг.",
  "Сент.",
  "Окт.",
  "Нояб.",
  "Дек.",
];
const dayNames = ["Пн", " ", "Ср", " ", "Пт", " ", ""];
const getMonthName = (dateStr) => {
  const [year, month] = dateStr.split("-");
  const monthIndex = parseInt(month) - 1;
  return `${monthNames[monthIndex]}`;
};

onMounted(async () => {
  await store.getCalendar();
  calendar.value = buildCalendar(store.calendar);
});

const getColorClass = (count) => {
  if (count === null) return "white";
  if (count > 0 && count < 10) return "lightGray";
  if (count > 9 && count < 20) return "lightBlue";
  if (count > 19 && count < 30) return "blue";
  if (count > 29) return "darkBlue";
  return "filled-low";
};

const buildCalendar = (data) => {
  const currentDate = new Date();
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 50 * 7); // Начальная дата - 50 недель назад

  const calendarData = {};
  let isFirstMonthProcessed = false;
  let isFirstMonthSkipped = false;

  // Создаем календарь на 50 недель вперед от начальной даты
  for (
    let d = new Date(startDate);
    d <= currentDate;
    d.setDate(d.getDate() + 1)
  ) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const monthKey = `${year}-${String(month).padStart(2, "0")}`;

    if (!calendarData[monthKey]) {
      calendarData[monthKey] = new Array(
        new Date(year, month, 0).getDate()
      ).fill(null);
    }
  }

  const uniqueMonths = Object.keys(calendarData);
  if (uniqueMonths.length > 2) {
    delete calendarData[uniqueMonths[0]]; // Удалить первый месяц
    isFirstMonthSkipped = true;
  }

  // Заполняем календарь данными
  Object.entries(data).forEach(([dateStr, count]) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const monthKey = `${year}-${String(month).padStart(2, "0")}`;

    // Если мы пропускаем первый месяц и текущий месяц является пропущенным то не обрабатываем его
    if (isFirstMonthSkipped && uniqueMonths[0] === monthKey) {
      return;
    }

    if (calendarData[monthKey] && day <= calendarData[monthKey].length) {
      calendarData[monthKey][day - 1] = count; // Устанавливаем количество действий для каждой даты
    }
  });

  return calendarData;
};
</script>


