const {MessageEmbed} = require('discord.js');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const fs = require('fs');
// Load the templated docx file
const templateFile = fs.readFileSync(path.resolve(__dirname,
    'PV_template.docx'), 'binary');

const zip = new PizZip(templateFile);

module.exports = {
  name: 'close',
  description: 'Closes the meeting thread and send the PV to the main channel',
  execute: async (client, interaction, args) => {
    const fs = require('fs');
    if (fs.existsSync('pv.json')) {
      const data = fs.readFileSync('pv.json', 'utf-8');
      const pv = JSON.parse(data.toString());
      if (interaction.channelId === pv.Thread) {
        const tchannel = interaction.channel.parent;

        const today = new Date();
        const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' +
        today.getFullYear()+' at '+ today.getHours()+':' + today.getMinutes();

        try {
          // Attempt to read all the templated tags
          const outputDocument = new Docxtemplater(zip);

          // Set the data we wish to add to the document
          outputDocument.setData(pv);

          try {
            // Attempt to render the document (Add data to the template)
            outputDocument.render();

            // Create a buffer to store the output data
            const outputDocumentBuffer = outputDocument.getZip().
                generate({type: 'nodebuffer'});

            // Save the buffer to a file

            fs.writeFileSync(path.resolve(__dirname, 'PV_'+pv.Title+'.docx'),
                outputDocumentBuffer);
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Meeting Closure and Generating PV')
                .setThumbnail('https://www.freeiconspng.com/uploads/document-note-paper-text-icon-13.jpg')
                .addFields(
                    {name: 'Meeting Title', value: pv.Title},
                    {name: 'Closure Time', value: date},
                );
            await tchannel.send({
              embeds: [embed],

            }).then(() => { // Wait until the first message is sent
              setTimeout(() => {
                tchannel.send({
                  files: [path.resolve(__dirname, 'PV_'+pv.Title+'.docx')],
                });
              }, 7000);
            });
          } catch (error) {
            console.error(`ERROR Filling out Template:`);
            console.error(error);
          }
        } catch (error) {
          console.error(`ERROR Loading Template:`);
          console.error(error);
        }


        fs.unlinkSync('pv.json');

        interaction.channel.delete();
      } else {
        await interaction.reply('It seems that you\'re executing'+
         ' this outside a Meeting Thread! Next time I will ban you!');
      }
    } else {
      interaction.reply('You have not initialized a meeting yet: use'+
          ' /meeting command for that');
    }
  },
};
