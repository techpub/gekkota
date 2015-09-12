const request = require('request');

module.exports = function fetch (widget) {
  return new Promise((resolve, reject) => {
      request(widget.endpoint, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve({ 
            id: widget.id, 
            filter: widget.filter, 
            response: JSON.parse(body) 
          });
        }
      });
  });
}
