const Levels = require('discord-xp');
const {MessageEmbed} = require('discord.js');

module.exports = {
  // options
  name: 'leaderboard',
  description: 'check guild leaderboard',
  userPermissions: ['SEND_MESSAGES'],
  category: 'Utility',
  // starting command
  execute: async (client, interaction, args) => {
    const rawLeaderBoard = await Levels.fetchLeaderboad(
        interaction.guild.id,
        10,
    );
    if (rawLeaderBoard.length < 1) {
      return interaction.followUp('Nobody in Leaderboard');
    } else {
      const leaderboard = await Levels.computeLeaderboard(
          client,
          rawLeaderBoard,
          true,
      ); // We process the leaderboard.

      const lb = await leaderboard.map((e) => {
        return `\`${e.position}\` ** ${e.username}#${
          e.discriminator
        } ** \nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`;
      });

      interaction.followUp({
        embeds: [
          new MessageEmbed()
              .setColor('RANDOM')
              .setTitle(
                  `** LeaderBoard of ${interaction.guild.name} **`,
              )
              .setDescription(lb.join('\n\n'))
              .setThumbnail(
                  interaction.user.displayAvatarURL({
                    dynamic: true,
                  }),
              )
              .setFooter({
                text: `Request By ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({
                  dynamic: true,
                }),
              }),
        ],
      });
    }
  },
};
