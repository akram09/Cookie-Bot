/**
 * When a user react on a message
 * @param {*} reaction
 * @param {*} user
 * @return {*}
 */
async function onReactionAdvice(reaction, user) {
  // When a reaction is received, check if the structure is partial
  if (reaction.partial) {
    // If the message this reaction belongs to was removed,
    // the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  if (advicelist.includes(reaction.message.content)) {
    if (reaction.emoji.name === '✅' || reaction.emoji.name === '👍' ) {
      reaction.message.channel.send(user.toString() +
       'You seem to approve my words');
    }
    if (reaction.emoji.name === '😂' || reaction.emoji.name === '😆' ||
     reaction.emoji.name === '🤣' ) {
      reaction.message.channel.send(user.toString() + 'Am I a joke to you');
    }
    if (reaction.emoji.name === '😭' || reaction.emoji.name === '😢' ) {
      reaction.message.channel.send(user.toString() + 'Why are you crying');
    }
    if (reaction.emoji.name === '❤️' ||reaction.emoji.name === '♥️' ||
     reaction.emoji.name === '💗' ) {
      reaction.message.channel.send(user.toString() + 'I\'m glad you loved it');
    }
    if (reaction.emoji.name === '😡') {
      reaction.message.channel.send(user.toString() +
       'Sorry if i made you mad');
    }
    if (reaction.emoji.name === '😩') {
      reaction.message.channel.send(user.toString() + 'Are you worried?');
    }
  }
}

module.exports = {
  onReactionAdvice,
};
