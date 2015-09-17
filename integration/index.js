const trace = require('./lib/trace.js');

const gekoq = require('gekoq');
// Here our Geckoboard API Key is set as an environment variable
// E.g. in a terminal: $ export GECKOBOARD_API_KEY=abc123
// Or store this in a file like auth.env then 
// $ source auth.env
gekoq.key(process.env.GECKOBOARD_API_KEY);

// This loads all of the widgets in the widgets/ directory
const widgetRefs = require('./widgets');
const widgets = Object.keys(widgetRefs).map(widget => { 
  return widgetRefs[widget] 
});

// This loads our API sources to fetch the data
const sources = require('./sources.js')

/* This takes all of the accumulated data and passes
 * it through to all of the widgets .filter methods 
 * which process the data into the appropriate widget
 * formats
 */

function render(data) {
  Promise.all(widgets.map(widget => {
    widget.filter(data)
    .then(gekoq.push)
    .catch(trace);
  }));
}

// This accumulates the data from all the sources
// and passes it to the above `render`

function glob(sources) {
  Promise.all(sources.map(source => { 
    return source.accumulate(); 
  }))
  .then(render)
  .catch(trace);
}

// Export it all so we can run it in `index.js`
module.exports = function run() {
  glob(sources);
}
