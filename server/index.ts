import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";

// TODO: move the hard-coded values to appsettings.json file

const app = express();
const PORT = 8000;

// cors setting
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ======================================
// DB Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'murmur_schema',
  port: 3306,
  insecureAuth: true,
});

connection.connect();


// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();         // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/users', (req, res) => {

  connection.query('SELECT * FROM Users', (err, rows, fields) => {
    if (err) {
      // console.log('See Err ', err);
      // throw err;
    }

    // res.status(500).send({
    //   error: `Internal Server Error`
    // });

    res.status(200).json(rows);

    // console.log('The solution is: ', rows[0].solution);
  });


  // res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// TODO: move this to a middle ware file toCamel
app.use((req, res, next) => {
  // res = toCamel(res);
  // console.log('See :', res.status(200).json);

  const oldSend = res.json;
  res.json = (data) => {
    // console.log('See :', data); // do something with the data
    const convertData = toCamel(data);
    // console.log('See Converted :', convertData); // do something with the data
    res.json = oldSend; // set function back to avoid the 'double-send' loop
    return res.json(convertData); // just call as normal with data
  };

  next();
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(PORT);


// tslint:disable-next-line: no-console
console.log('Magic happens on port ' + PORT);

// TODO: move to another file
function toCamel(o: any) {
  let newO: any;
  let origKey;
  let newKey;
  let value;
  if (o instanceof Array) {
    return o.map((innerValue) => {
        if (typeof innerValue === "object") {
          innerValue = toCamel(innerValue)
        }
        return innerValue
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}
