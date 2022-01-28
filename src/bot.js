// Require the necessary discord.js classes
const {Client, Collection, Intents} = require('discord.js');
const {clientId, guildId, token} = require('../config.json');
const {loadCommands} = require('./core/loader/index');
const {onReactionAdvice} = require('./events/advice_reactions');
// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.commands = new Collection();

// load commands
loadCommands(client, token, clientId, guildId);


client.on('messageReactionAdd', onReactionAdvice);

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;


  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(token);
