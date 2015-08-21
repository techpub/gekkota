const request = require('request');

module.exports = function fetch (widget) {
  return new Promise(
    function(resolve, reject) {
      request(widget.endpoint, function (error, response, body) {
        if (error) {
          reject(new Error(error));
        } else {
          resolve({ 
            id: widget.id, 
            filter: widget.filter, 
            response: JSON.parse(body) 
          });
        }
      });
    }
  );
}
