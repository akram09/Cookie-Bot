// Require the necessary discord.js classes
const {Client, Collection, Intents} = require('discord.js');
const {clientId, guildId, token} = require('../config.json');
const {loadCommands} = require('./core/loader/index');
// events
const {onReactionAdvice} = require('./events/advice_reactions');
const {onVoicePVUpdate} = require('./events/pv_voice_update');
const {onMessagePV} = require('./events/message_pv');

// Create a new client instance
const client = new Client({intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_VOICE_STATES],
partials: ['USER', 'REACTION', 'CHANNEL', 'MESSAGE'],
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
/* Listener for presence in Voice Channels */
client.on('voiceStateUpdate', onVoicePVUpdate);

/* Listener for Important Message Reaction */

client.on('message', onMessagePV );

// Login to Discord with your client's token
client.login(token);
