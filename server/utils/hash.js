const crypto = require('crypto');

module.exports = (data) => {
    const hash = crypto.createHash('md5').update(data).digest("hex");
    console.log(data, hash);
    return hash;
};