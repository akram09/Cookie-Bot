const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

// Place your client and guild ids here
const clientId = '934954135932010516';
const guildId = '906638232517767180';
const token = require("./token.js");

const commands = [
	new SlashCommandBuilder().setName('advice').setDescription('Replies with advice!'),
]
	.map(command => command.toJSON());

  const rest = new REST({ version: '9' }).setToken(token);

  rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);