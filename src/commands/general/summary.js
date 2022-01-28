/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const discord = require('discord.js');

module.exports = {
  name: 'summary',
  description: 'The bot Summarizes Everything important occured ',
  options: null,
  execute: async (client, interaction, args) => {
    interaction.channel.messages.fetch().then((messages) => {
      const m = [];
      for (const [messageID, message] of messages) {
        for (const [reactionID, reaction] of message.reactions.cache) {
          if (reaction.emoji.name === '💯' && reaction.count > 5 ) {
            m.push([message.member.user.tag, message.content]);
          }
        }
      }
      console.log(m);

      if (m.length != 0) {
        const embed = new discord.MessageEmbed()
            .setTitle('Summary')
            .setColor('RANDOM');
        m.forEach((entry) => {
          embed.addField('Message:', `${entry[0]} said: ${entry[1]}`);
        });
        interaction
            .reply({embeds: [embed]});
      } else {
        interaction.reply('It looks like nothing really important happened');
      }
    });
  },
};
