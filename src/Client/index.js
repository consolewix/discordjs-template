// @ts-check

const { Client, GatewayDispatchEvents } = require('@discordjs/core');
const { WebSocketManager } = require('@discordjs/ws');
const { REST } = require('@discordjs/rest');
const { Routes, InteractionType } = require('discord-api-types/v10');

const config = require('../config');

const fs = require('node:fs');

module.exports = class Bot extends Client {
    constructor() {
        const rest = new REST({ version: '10' }).setToken(config.discord.token);
        const ws = new WebSocketManager({
            token: config.discord.token,
            rest: rest,
            intents: config.discord.client.intents,
        });

		super({
            rest,
            ws,
        });

        this.config = config;
        this.commands = [];
    }

    async init() {

        this.pushCommands();
        this.registerCommands();
        this.registerEvents();

        this.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
            if (interaction.type === InteractionType.ApplicationCommand) {
                let command = this.commands.find((cmd) => cmd.command.name === interaction.data.name);

                if(command) {
                    command.run(interaction, api)
                }
            }
        });

        this.ws.connect().then(() => console.log('[CONNECT] I\'ve connected to the Discord API!'));
    }

    async pushCommands() {
        fs.readdirSync('src/Commands').filter((file) => file.endsWith('.js')).forEach(async (file) => {
            const Command = require('../Commands/'+ file);

            this.commands.push(Command)
        });
    }

    async registerCommands() {
        this.on(GatewayDispatchEvents.Ready, () => {
            this.rest.put(Routes.applicationCommands(this.config.discord.id), {
                body: this.commands.map((cmd) => cmd.command),
            }).then(() => {
                console.log('[COMMANDS] The commands have been sent to the discord API!');
            });
        });
    }

    async registerEvents() {
        fs.readdirSync('src/Events').filter((file) => file.endsWith('.js')).forEach(async (file) => {
            const Event = require('../Events/'+ file);

            this.on(Event.name, (...args) => Event.run(...args))
        });
    }
};