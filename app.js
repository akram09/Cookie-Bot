const Discord = require("discord.js");
const token = require("./token.js");
const { Client, Intents } = require('discord.js');
// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});


const advicelist = [
    "Studying the night before a deadline will NOT work",
    "Remember: You still have a life",
    "View challenges as opportunities",
    "Make decisions based on data if you can",
    "Focus on making an impact",
    "Never fear failure",
    "Be transparent whenever possible",
    "Invest in a good mattress",
    "Don’t live someone else’s life",
    "Reduce the caffeine",
    "Remember people’s names",
    "Focus more on the present",
    "Learn something new every day",
    "Learn to forgive",
    "Learn to say no",
    "When in doubt, say, “Let me think about that.”",
    "Do the important task first",
    "Happiness is a state of mind, not a destination",
    "YOLOOOOOOOOOOOOOO!!!",
    "Time is the most valuable thing you can spend in this world ",
    "Everything matters, but nothing matters that much",
    "Don't know it till you try it",
    "Just because you can doesn't mean you should",
    "Don't dumb yourself down",
    "Never eat lunch at your desk if you can avoid it",
    "It's never too late for an apology",
    "You define your own life. Don’t let other people write your script",
    "You are never too old to set another goal or to dream a new dream",
    "Spread love everywhere you go.",
    "Do not allow people to dim your shine because they are blinded. Tell them to put some sunglasses on",
    "You don’t always need a plan. Sometimes you just need to breathe, trust, let go and see what happens"
];

const fetch = require("node-fetch")


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'advice') {
		await interaction.reply(advicelist[Math.floor(Math.random() * advicelist.length)]);
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
  if (advicelist.includes(reaction.message.content)) {
    if (reaction.emoji.name === "✅" || reaction.emoji.name === "👍" ) {
      reaction.message.channel.send(user.toString() + "You seem to approve my words");
    }
    if (reaction.emoji.name === "😂" || reaction.emoji.name === "😆" || reaction.emoji.name === "🤣" ) {
      reaction.message.channel.send(user.toString() + "Am I a joke to you")
    }
    if (reaction.emoji.name === "😭" || reaction.emoji.name === "😢" ) {
      reaction.message.channel.send(user.toString() + "Why are you crying")
    }
    if (reaction.emoji.name === "❤️" ||reaction.emoji.name === "♥️" || reaction.emoji.name === "💗"  ) {
      reaction.message.channel.send(user.toString() + "I'm glad you loved it")
    }
    if (reaction.emoji.name === "😡") {
      reaction.message.channel.send(user.toString() + "Sorry if i made you mad")
    }
    if (reaction.emoji.name === "😩") {
      reaction.message.channel.send(user.toString() + "Are you worried?")
    }
  }
});
    
client.login(token);