const fs = require('fs');

module.exports = {
  read: file => JSON.parse(fs.readFileSync(file)),
  write: (file, json) => (
    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  ),
};
