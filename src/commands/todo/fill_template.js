const {ClickUpAPI} = require('../../core/clickupAPI.js');
const {MessageEmbed} = require('discord.js');
const {clickUpToken, spaceId} = require('../../../config.json');

module.exports = {
  name: 'fill-template',
  description:
    'Fill the list of task with a template',
  options: null,
  execute: async (client, interaction, args) => {
    const clickupApi = new ClickUpAPI(clickUpToken, spaceId);
    const tasks = [
      {
        name: 'Create Comm Plan',
        description: 'Communication department can'+
        ' start working on the communication plan',
      },
      {
        name: 'Prepare Visual Identity',
        description: 'Design team can start preparing the visual identity ',
      },
      {
        name: 'Teaser of the event',
        description: 'Multimedia team can start preparing the teaser',
      },
      {
        name: 'Content of the event ',
        description: 'We need to prepare a set of format for the event ',
      },
    ];
    const replyEmbed = new MessageEmbed().setThumbnail('https://clickup.com/landing/images/for-se-page/clickup.png');
    const listId = await clickupApi.getListId(interaction.channel.name);
    if (typeof listId === 'undefined') {
      replyEmbed.setColor('RED').setTitle('No List')
          .setDescription('list not created yet, call /create-list');
      await interaction.reply({embeds: [replyEmbed]});
    } else {
      tasks.forEach((task) => {
        clickupApi.createTask(
            interaction.channel.name, task.name, task.description);
      });
      replyEmbed.setColor('GREEN').setTitle('Template applied')
          .setDescription('template created successfuly');
      await interaction.reply({embeds: [replyEmbed]});
    }
  },
};
