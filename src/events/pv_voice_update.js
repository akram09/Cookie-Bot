const fs= require('fs');
/**
 *
 * @param {*} oldMember
 * @param {*} newMember
 */
function onVoicePVUpdate(oldMember, newMember) {
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
}
module.exports = {
  onVoicePVUpdate,
};
