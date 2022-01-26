const {ClickUpAPI} = require('../../core/clickupAPI.js');
const {clickUpToken} = require('../../../config.json');

module.exports = {
  name: 'fill-template',
  description:
    'Fill the list of task with a template',
  options: null,
  execute: async (client, interaction, args) => {
    const clickupApi = new ClickUpAPI(clickUpToken, 55413139);
    const tasks = [
      {
        name: 'taskName1',
        description: 'taskDescription',
      },
      {
        name: 'taskName2',
        description: 'taskDescription',
      },
      {
        name: 'taskName3',
        description: 'taskDescription',
      },
      {
        name: 'taskName4',
        description: 'taskDescription',
      },
    ];
    const listId = await clickupApi.getListId(interaction.channel.name);
    if (typeof listId === 'undefined') {
      interaction.reply('list not created yet, call /create-list');
    } else {
      tasks.forEach((task) => {
        clickupApi.createTask(
            interaction.channel.name, task.name, task.description);
      });
      interaction.reply('template created successfuly');
    }
  },
};
