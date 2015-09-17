// This is a helper function to aid debugging promises. It simply exposes the .stack property of an error
const trace = require('./lib/trace.js');

// fetch takes the arguments of an endpoint and an object with the properties `username` and `password`
// to authenticate with the remote API
const fetch = require('./lib/fetch.js');


// The authentication to the remote API stored as environment variables.
// E.g. in a file `auth.env` and then in the terminal $ source auth.env
// SERVICE_USERNAME=username
// SERVICE_PASSWORD=password

const auth = {
  username: process.env.SERVICE_USERNAME,
  password: process.env.SERVICE_PASSWORD
}

/*
  Below, the `module.exports` is an array of all the data sources 
  needed for the widgets. 
  The returned result will be an array of the data in the order 
  that they are defined here.

  For example, if the first element of this array fetches from 
  an endpoint of `sales.json`, and the second fetches from `reports.json`,
  the returned array will be [ dataResponse, dataResponse ] 
  where the first element is what is returned from `sales.json` and 
  the second element is what is returned from `reports.json`. 

  E.g. perhaps `sales.json` returns an object:
  
  {
    January: 1200,
    February: 1400,
    March: 1100
  } 

  and e.g. `reports.json` returns:

  {
    Global: [12, 14, 8, 9, 10],
    Local: [134, 23, 98, 20]
  }

  your accumulate method could simply `resolve();` this into the mapped array:

 [ { January: 1200, February: 1400, March: 1100 }, { Global: [12, 14, 8, 9, 10], Local: [134, 23, 98, 20] } ]

  for however you'd like to use it in the widgets.

*/

module.exports = [
  {
    accumulate: function accumulateSource() {
      return new Promise((resolve, reject) => {
        /*
           Send a request to the remote API using fetch()
           then chain .then() to process/filter the data in a way
           that your widgets need. This may be unnecessary if e.g.
           you only need to get one page of data or you can simply 
           filter request's response in the widget.filter() function.

           Finally, resolve() the data to be passed to the widgets.
        */

        const APIEndpoint = 'https://awesome-service.com/api/v2/resource.json?page=';
        let data = [], pg = 1;

        function paginate(page) {
          fetch(APIEndpoint + page, auth).then(response => {
            data = data.concat(response.values);
            if (response.next_page === null) {
              resolve(data);
            } else {
              pg++;
              paginate(pg);
            }
          })
          .catch(trace);
        }

        paginate(pg);

        /* 
           In the above code we set an endpoint, initialize an array to store the retrieved data and the first page to be fetched.
           Next we define a function that calls itself recursively until the property `next_page` from the response is equal to `null`,
           each time storing the value of the `values` property and adding it to the `data` array.
        */

      });
    }
  }
];
