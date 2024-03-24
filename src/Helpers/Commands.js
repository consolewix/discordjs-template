// @ts-check

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = class Commands {

    constructor(data) {
        if (!data) console.error("Slash command data can not be undefifned.");

        if (!("command" in data)) {
            console.error("Slash command data must be given.");
        }

        if (
        !(data.command instanceof SlashCommandBuilder) &&
        typeof data.command !== "function"
        ) {
            console.error("Slash command data must be a SlashCommandBuilder instance or a function.");
        }

        if (!("run" in data) || typeof data.run !== "function") {
            console.error("Slash command runner must be a function.");
        }

        this.data = data;
    }

    convertCommandData() {
        const commandData = this.data.command;

        if (typeof commandData === "function") {
        const commandBuilder = commandData(new SlashCommandBuilder());

        if (!(commandBuilder instanceof SlashCommandBuilder)) {
            console.error("Converted slash command data is invalid.");
        }

        return commandBuilder;
        }

        return commandData;
    }

    get command() {
        return this.data.command;
    }

    get run() {
        return this.data.run;
    }
}