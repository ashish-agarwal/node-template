
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URL || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
};
