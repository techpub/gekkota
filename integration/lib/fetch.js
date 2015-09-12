/* The exported function takes as arguments:
 * fetch(endpoint, auth) where auth is an object
 * with `username` and password properties. 
 *
 * See `sources.js` for how the username and 
 * password are set.
 *
 * This may need to be adjusted if the API you
 * are querying uses a different method.
 */

const request = require('request');

module.exports = function fetch(endpoint, auth) {
  return new Promise(function(resolve, reject) {
    request(endpoint, function (error, response, body) {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(JSON.parse(body));
      }
    }).auth(auth.username, auth.password, true);
  });
}
