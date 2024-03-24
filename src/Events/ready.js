// @ts-check

const { Events } = require('../Helpers');
const { GatewayDispatchEvents } = require('@discordjs/core');

module.exports = new Events({
    name: GatewayDispatchEvents.Ready,

    run: ({ data: client }) => {
        return console.log(`[STARTING] ${client.user.username} is online`);
    },
});