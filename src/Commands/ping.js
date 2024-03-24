// @ts-check

const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageFlags } = require('discord-api-types/v10');
const { Commands } = require('../Helpers');

module.exports = new Commands({
    command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping, Pong!'),
 
    
    async run(interaction, api) {


        const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setAuthor({name: "Bir dakika?"})
        .setDescription("🥰 Dur bu bir mucize komudu kullandığına göre çalışıyorum")

        api.interactions.reply(interaction.id, interaction.token, {embeds: [embed.data] })

    }
});