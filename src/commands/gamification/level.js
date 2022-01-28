const Levels = require('discord-xp');

module.exports ={
  // options
  name: 'level',
  description: 'check your level',
  category: 'Utility',
  options: [
    {
      name: 'user',
      description: 'ping user',
      type: 'USER',
    },
  ],
  // starting command
  execute: async ({client, interaction, args}) => {
    // section
    const target = interaction.options.getUser('user') || interaction.user;
    const user = await Levels.fetch(target.id, interaction.guild.id);

    if (!user) {
      return interaction.reply(
          'Seems like this user has not earned any xp so far.',
      );
    } else {
      interaction.reply(
          `> **${target.tag}** is currently level ${user.level}.`,
      );
    }
  },
};
