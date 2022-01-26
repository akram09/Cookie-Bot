const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const fs = require('fs');
// Load the templated docx file
const templateFile = fs.readFileSync(path.resolve(__dirname, 'PV_template.docx'), 'binary');

const zip = new PizZip(templateFile);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Close the meeting and sends the PV'),
	async execute(interaction) {
		const fs = require('fs');
		if(fs.existsSync('pv.json')){
		const data = fs.readFileSync('pv.json','utf-8');
		const pv = JSON.parse(data.toString());
        if (interaction.channelId === pv.Thread){
            const tchannel = interaction.guild.channels.cache.get("934132332376498218")

            const today = new Date();
            const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()+' at '+ today.getHours()+':' + today.getMinutes();

            const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Meeting Closure and Generating PV')
			.setThumbnail('https://www.freeiconspng.com/uploads/document-note-paper-text-icon-13.jpg')
			.addFields(
				{name: 'Meeting Title', value: pv.Title },
				{name:'Closure Time', value:date},
			)
            tchannel.send({
                embeds:[embed]

            });

            


try {
	// Attempt to read all the templated tags
	let outputDocument = new Docxtemplater(zip);

	// Set the data we wish to add to the document
	outputDocument.setData(pv);

	try {
		// Attempt to render the document (Add data to the template)
		outputDocument.render()

		// Create a buffer to store the output data
		let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });

		// Save the buffer to a file
		
		fs.writeFileSync(path.resolve(__dirname, 'PV_'+pv.Title+'.docx'), outputDocumentBuffer);
        tchannel.send({
            files:['./commands/PV_'+pv.Title+'.docx']
        })
	}
	catch (error) {
		console.error(`ERROR Filling out Template:`);
		console.error(error)
	}
} catch(error) {
	console.error(`ERROR Loading Template:`);
	console.error(error);
}





            fs.unlinkSync('pv.json');
            
            interaction.channel.delete();
        }
        else{
        await interaction.reply('It seems that you\'re executing this outside a Meeting Thread! Next time I will ban you!')
        }
	 }
	 else{
		 interaction.reply('You have not initialized a meeting yet: use /meeting command for that');
	 }
	},
};