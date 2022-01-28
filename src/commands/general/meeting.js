const {MessageEmbed} = require('discord.js');

const fs = require('fs');


module.exports = {

  name: 'meeting',
  description: 'Creates a meeting using as title the provided input',
  options: [{
    name: 'title',
    type: 3,
    description: 'The Title you want for the meeting',
    required: true},
  {
    name: 'object',
    type: 3,
    description: 'The reason why you are doing a meeting',
    required: true,
  },
  ],
  execute: async (client, interaction, args) => {
    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() +
     1) + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();
    const nom = interaction.options.getString('title');
    const object = interaction.options.getString('object');
    const creator = interaction.user.tag;
    const first = `This Thread was created by ${creator} for`+
     ` the Meeting: "${nom}" for "${object}" . Enjoy !`;
    const th = await interaction.channel.threads.create({
      name: nom,
      autoArchiveDuration: 60,
      reason: object,

    });
    th.join();
    th.send(first);
    const datepv = `${date} ${time}`;
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Meet Thread Creation')
        .setThumbnail('https://www.freeiconspng.com/uploads/meeting-icon-png-0.png')
        .addFields(
            {name: 'Title', value: nom},
            {name: 'Object', value: object},
            {name: 'Date and Time', value: datepv},
        );

    console.log(`Created thread: ${nom} on ${date} `);
    const pv = {
      'Title': nom,
      'Object': object,
      'Date': datepv,
      'Presents': [],
      'Points': [],
      'Thread': th.id,
      'Next': [],

    };
    const data = JSON.stringify(pv);
    try {
      fs.writeFileSync('pv.json', data);
      console.log('JSON data is saved.');
    } catch (error) {
      console.error(err);
    }
    await interaction.reply({embeds: [embed]});
  },
};
