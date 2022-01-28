const {MessageEmbed} = require('discord.js');
const {ClickUpAPI} = require('../../core/clickupAPI.js');
const {clickUpToken} = require('../../../config.json');

module.exports = {
  name: 'get-task',
  description:
    'Fill the list of task with a template',
  options: null,
  execute: async (client, interaction, args) => {
    const clickupApi = new ClickUpAPI(clickUpToken, 55413139);
    const tasks = await clickupApi.getTasks(interaction.channel.name);
    if (tasks.length == 0) {
      interaction.reply('there is no tasks in this channel');
    } else {
      const taskEmbeds = tasks.map((task) => {
        return new MessageEmbed()
            .setColor('RED')
            .setTitle(task.name)
            .setThumbnail('https://www.gdgalgiers.com/static/phonelogo-db9c725b1463afd46d9b886076124bb2.png')
            .setDescription(task.description);
      });
      interaction.reply({embeds: taskEmbeds});
    }
  },
};
