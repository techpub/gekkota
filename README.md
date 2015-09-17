# gekkota

Boilerplate for a custom integration for Geckoboard's custom **Push** method widgets. 

*Disclaimer*: This comes without guarentee or warranty. I've done my best to create something sensible, but still use with caution and exercise your judgement.

###### (The name? It's the [infraorder of reptiles in the suborder Scleroglossa, comprising all geckos](https://en.wikipedia.org/wiki/Gekkota))

### Install

```
git clone https://github.com/jasonmendes/gekkota.git && cd gekkota && npm install
```

### Run

```
$ npm start
```

### Set up

If you'd like any help setting this up for your own data, just send me a message or create an issue here on the repo.

Below is a brief outline of how everything fits together. As well, all of the source files are well commented explaining how things work. 

* Define your remote data sources and fetches in `integration/sources.js`
* Build your widgets in `integration/widgets/`. A good way is to name them as they are named on your dashboard, e.g. `widgets/revenue-metric.js` or `widgets/sales-last-week.js`
* Define your Geckoboard API in your PATH as an environment variable: `$ export GECKOBOARD_API_KEY=abc123` (or store this in a file like `auth.env` and then `$ source auth.env`).

The entry point is in `index.js` where a loop is defined that runs every `TIME` minutes. That is, if `TIME` is set to `5`, it will run every five minutes. 

This does:

* Request all data from remote APIs (using `Promise.all` mapped over the array of sources), defined in `integration/sources.js`. 
* Pass the request data to the widgets to be filtered and build a payload (again using `Promisea.all` mapped over the array of widgets)
* Push the widgets payloads to Geckoboard

`integration/sources.js` exports an array of Objects, each expecting an `accumulate` property whose value is a function that returns data (via `resolve()`) from the remote API. (That file has a detailed example of how to structure that)

`integration/widgets/index.js` maps all of the files in `widgets/` to an Object that `integration/index.js` references. Each `widget.js` should have:

* A `widget` function that accepts the filtered data from a `filter` method which returns an Object (as a `resolve()`d Promise) with the widget's payload and Push method ID:

```
function widget(value) {
  // Return a Number Stat widget with `value` passed in
  // https://developer.geckoboard.com/#number-and-secondary-stat 
  return {
    id: '154274-a64beadf-ea2d-4125-84e6-76656c281c3a',
    data: { item: [ { value: value, text: 'Description' } ] }
  }
}

// Filter the data from the remote APIs
// If there is more than one source of data defined in `integration/sources.js`, 
// then what's passed in here, `arrayOfData` will hold the returned data in
// the order that it is defined in `sources.js`. So for example, if for this widget,
// we would ike data from the first source, we'll use the `0` index of `arrayOfData`.
// Finally, in this example, the mock data contains a property `theValueThatWeWant`,
// which we pass in to our `widget` function to build the payload.

module.exports.filter = function filter(arrayOfData) {
  return new Promise((resolve, reject) => {
    let value = arrayOfData[0].theValueThatWeWant;
    // Resolve with the return value of the `widget` function,
    // where the `value` is passed in.
    resolve(widget(value));
  });
}
```

* Finally, after all the widgets have returned their payloads (with their Push IDs), the `gekoq.push` method is called, which pushes the data to your dashboard. 

