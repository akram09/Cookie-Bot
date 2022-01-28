const discord = require('discord.js');
const {discordlist} = require('../../core/advices')
module.exports = {
  name: 'advice',
  description: 'Replies with advice!',
  options: null,
  execute: async (client, interaction, args) => {
    await interaction.reply(advicelist[Math.floor(Math.random() * advicelist.length)]);
  },
};
