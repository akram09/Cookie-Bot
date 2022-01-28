const fs = require('fs');
/**
 *
 * @param {*} message
 */
function onMessagePV(message) {
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
}
module.exports={
  onMessagePV,
};
