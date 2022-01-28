const Levels = require('discord-xp');
module.exports ={
  // options
  name: 'level',
  description: 'check your level',
  options: [
    {
      name: 'user',
      description: 'User to check level',
      type: 6,
      required: true,
    },
  ],
  // starting command
  execute: async (client, interaction, args) => {
    // section
    const target = interaction.options.getUser('user') || interaction.user;
    const user = await Levels.fetch(target.id, interaction.guild.id);
    console.log(user);
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
