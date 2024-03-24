// @ts-check

const { GatewayIntentBits } = require('@discordjs/core');

module.exports = {
    'discord': {
        'token': 'TOKEN',
        'id': 'BotID',
        'client': {
            'intents': GatewayIntentBits.GuildMessages |
            GatewayIntentBits.MessageContent |
            GatewayIntentBits.Guilds |
            GatewayIntentBits.GuildMembers,
        },
    },
};