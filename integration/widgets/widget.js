/*
 * Each widget should have an exported .filter method that receives
 * the array from the `sources` method and resolves with the data 
 * that the widget needs. 
 *
 * Here you can see there is a widget function which returns an object
 * with the properties `id`, which is the widget's Push ID and, `data`,
 * which holds the widget's payload formatted according to the type here:
 * https://developer.geckoboard.com/#custom-widget-types 
 *
 * The widget below is a Number Stat widget:
 * https://developer.geckoboard.com/#number-and-secondary-stat 
 */

function widget(value) {
  return {
    id: '154274-a64beadf-ea2d-4125-84e6-76656c281c3a',
    data: { item: [ { value: value, text: 'Description' } ] }
  }
}

module.exports.filter = function filter(arrayOfData) {
  return new Promise((resolve, reject) => {
    let value = arrayOfData[0].theValueThatWeWant;
    // Resolve with the return value of the `widget` function,
    // where the `value` is passed in.
    resolve(widget(value));
  });
}

