// Require the necessary discord.js classes
const {Client, Collection, Intents} = require('discord.js');
const {clientId, guildId, token} = require('../config.json');
const {loadCommands} = require('./core/loader/index');

// Create a new client instance
const client = new Client({intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_VOICE_STATES],
partials: ['USER', 'REACTION', 'MESSAGE'],
});
client.commands = new Collection();

// load commands
loadCommands(client, token, clientId, guildId);

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
client.on('voiceStateUpdate', (oldMember, newMember) => {
  const newUserChannel = newMember.channelId;

  if (newUserChannel === '933099887799705624') {
    try {
      if (fs.existsSync('pv.json')) {
        fs.readFile('pv.json', 'utf-8', (err, data) => {
          if (err) {
            throw err;
          }

          // parse JSON object
          const pv = JSON.parse(data.toString());
          pv.Presents.push(newMember.member.user.tag);
          console.log(pv);
          fs.writeFileSync('pv.json', JSON.stringify(pv));
        });
      }
    } catch (err) {
      console.log('Meeting not already initialized!');
    }
  }
});

/* Listener for Important Message Reaction */

client.on('message', (message) => {
  if (fs.existsSync('pv.json')) {
    const data = fs.readFileSync('pv.json', 'utf-8');
    const pv = JSON.parse(data.toString());
    if (message.channelId === pv.Thread) {
      client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channelId === pv.Thread) {
          if (reaction.emoji.name === '✍️') {
            pv.Points.push(reaction.message.content);
            fs.writeFileSync('pv.json', JSON.stringify(pv));
            console.log(pv);
          }
        }
      });
    }
  }
});

// Login to Discord with your client's token
client.login(token);
