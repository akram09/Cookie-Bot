/**
 *
 * @param {*} message
 * @return {*}
 */
async function onMessageLevelUp(message) {
  if (!message.guild || message.author.bot ) return;

  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomAmountOfXp,
  );
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send({
      content: `${message.author}, congratulations! You have 
        leveled up to **${user.level}**. :tada:`,
    });
  }
}
module.exports ={
  onMessageLevelUp,
};
