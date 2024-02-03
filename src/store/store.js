import { defineStore } from "pinia";

export const useUserStore = defineStore("myStore", {
  state: () => ({
    calendar: {},
  }),
  actions: {
    
    async getCalendar() {
      try {
        const resp = await fetch("https://dpg.gg/test/calendar.json");
        const data = await resp.json();
        this.calendar = data
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    
  },
});
