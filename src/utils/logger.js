const tag = '[jobs]';

exports.log = function(...message) {
  console.log(`${tag} ${JSON.stringify(message)}`);
};
