const {ClickUpAPI} = require('../../core/clickupAPI.js');
const {clickUpToken} = require('../../../config.json');

module.exports = {
  name: 'create-list',
  description:
    'Create a list of tasks for this channel on clickup, if it doesn\'t exist',
  options: null,
  execute: async (client, interaction, args) => {
    const clickupApi = new ClickUpAPI(clickUpToken, 55413139);
    let listId = await clickupApi.getListId(interaction.channel.name);
    if (typeof listId === 'undefined') {
      listId = await clickupApi.createList(interaction.channel.name);
      interaction.reply('list created');
    } else {
      interaction.reply('list already exist');
    }
  },
};
