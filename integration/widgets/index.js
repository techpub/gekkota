// This dynamically loads all of the widgets in the directory
const reqDir = require('require-directory');
module.exports = reqDir(module);
