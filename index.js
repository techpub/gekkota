// First, require the custom integration
const integration = require('./integration');

/* This is an infinite loop which runs our integration,
 * including fetching the remote API data, filtering it 
 * for our widgets, and finally posting it to Geckoboard,
 * every five minutes
 *
 * See here for the naming: https://en.wikipedia.org/wiki/M%C3%B6bius_strip 
 */

const TIME = 5; // Minutes

function moebiusStrip() {
  integration();
  setTimeout(moebiusStrip, 1000*60*TIME); 
} 

// Initiaize the loop
moebiusStrip();
