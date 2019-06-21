const { negativeColor, deleteTimeThreshold } = require('../config');
const getDescription = require('../util/getDescription');
const getElapsedTime = require('../util/getElapsedTime');
const getFooter = require('../util/getFooter');
const getImage = require('../util/getImage');
const humanizeTime = require('../util/humanizeTime');
const sendLog = require('../util/sendLog');

module.exports = message => {
  if (message.author.bot) return;

  const elapsedTime = getElapsedTime(message.createdTimestamp);
  if (elapsedTime < deleteTimeThreshold) return;

  const humanizedElapsedTime = humanizeTime(elapsedTime);

  sendLog(message.guild, negativeColor, {
    ...getImage(message),
    ...getDescription(
      `${message.author} | ${message.channel}`,
      message.content
    ),
    ...getFooter(
      message.author,
      `Deleted message after ${humanizedElapsedTime}`
    )
  });
};
