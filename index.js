const gekoq  = require('gekoq'),
      fetch  = require('./fetch'),
      filter = require('./filter');

const push = gekoq.push,
      key  = gekoq.key;

function kawekaweau (widget) {
  fetch(widget)
  .then(filter)
  .then(push)
  .catch(function(reason) { 
    console.log(reason); 
  });
}

function setae (widgets) {
  Promise.all(widgets.map(function(widget) {
    kawekaweau(widget);
  }));
}

module.exports.key = key;
module.exports.setae  = setae;
