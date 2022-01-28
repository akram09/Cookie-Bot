const {ClickUpAPI} = require('../../core/clickupAPI.js');
const {MessageEmbed} = require('discord.js');
const {clickUpToken, spaceId} = require('../../../config.json');

module.exports = {
  name: 'create-list',
  description:
    'Create a list of tasks for this channel on clickup, if it doesn\'t exist',
  options: null,
  execute: async (client, interaction, args) => {
    const replyEmbed = new MessageEmbed().setThumbnail('https://clickup.com/landing/images/for-se-page/clickup.png');
    const clickupApi = new ClickUpAPI(clickUpToken, spaceId);
    const channelName = interaction.channel.name;
    const listId = await clickupApi.getListId(channelName);
    if (typeof listId === 'undefined') {
      await clickupApi.createList(channelName);
      replyEmbed.setColor('GREEN').setTitle('List Created')
          .setDescription(`List named: **${channelName}**`+
          ` created successufully`);
      console.log(interaction);
      await interaction.reply({embeds: [replyEmbed]});
    } else {
      replyEmbed.setColor('RED').setTitle('List Exist')
          .setDescription('list already exist');
      await interaction.reply({embeds: [replyEmbed]});
    }
  },
};
