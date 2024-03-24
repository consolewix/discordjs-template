const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, userMention } = require('@discordjs/builders');
const { MessageFlags, API } = require('@discordjs/core');
const { Commands } = require('../Helpers');

module.exports = new Commands({
    command: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('test'),

    async run(interactions, api, client) {

      let avatarURL = `https://cdn.discordapp.com/avatars/${interactions.member.user?.id}/${interactions.member.user?.avatar}?size=1024`

      api.interactions.reply(interactions.id, interactions.token, {
        content: `${avatarURL}`
      });


    }

    
    })