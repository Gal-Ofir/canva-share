/** /utils/hash.js
 *  Small utility function that does an md5 hash on the given data
 */


const crypto = require('crypto');

module.exports = (data) => {
    return crypto.createHash('md5').update(data).digest("hex");
};