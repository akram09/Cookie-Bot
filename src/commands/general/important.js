const {MessageEmbed} = require('discord.js');

const fs = require('fs');

module.exports = {
  name: 'important',
  description: 'Saves your message as an important point in the PV',
  options: [{
    name: 'message',
    type: 3,
    description: 'The important point you want to add in the PV',
    required: true},
  ],
  execute: async (client, interaction, args) => {
    const m = interaction.options.getString('message');

    if (fs.existsSync('pv.json')) {
      const data = fs.readFileSync('pv.json', 'utf-8');


      // parse JSON object
      const pv = JSON.parse(data.toString());
      if (interaction.channelId === pv.Thread) {
        pv.Points.push(m);
        console.log(pv);
        fs.writeFileSync('pv.json', JSON.stringify(pv));
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Important Message Saving')
            .setDescription('The following message will be'+
            ' saved in the PV of the Meeting:')
            .setThumbnail('https://www.freeiconspng.com/uploads/megaphone-message-news-promotion-speaker-icon--17.png')
            .addFields(
                {name: 'Message', value: m},

            );

        interaction.reply({embeds: [embed]});
      } else {
        interaction.reply('It seems that you used this'+
         ' command outside a Meeting Thread !');
      }
    } else {
      await interaction.reply('You\'re not inside a Meeting Thread!');
    }
  },
};
