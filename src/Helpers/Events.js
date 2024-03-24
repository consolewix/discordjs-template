// @ts-check

/**
 * @template {keyof import("@discordjs/core").MappedEvents} EventCategory
 * @typedef {{ name: EventCategory, run: (...data: import("@discordjs/core").MappedEvents[EventCategory]) => any }} EventData
 */

/**
 * @template {keyof import("@discordjs/core").MappedEvents} EventCategory
 */
module.exports = class Events {
    /**
     * @type {EventData<EventCategory>}
     */
    data;
    /**
     * @param {EventData<EventCategory>} data
     */
    constructor(data) {
      if (!data) console.error("Event data can not be undefined.");
  
      if (!("name" in data) || typeof data.name !== "string") {
        console.error("Event category name must be given.");
      }
  
      if (!("run" in data) || typeof data.run !== "function") {
        console.error("Event runner must be given.");
      }
  
      this.data = data;
    }
  
    get name() {
      return this.data.name;
    }
  
    get run() {
      return this.data.run;
    }
  }