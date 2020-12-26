import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";

// TODO: move the hard-coded values to appsettings.json file

const app = express();
const PORT = 8000;

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
router.get('/user', (req, res) => {

  connection.query('SELECT * FROM Users', (err, rows, fields) => {
    if (err) {
      // console.log('See Err ', err);
      // throw err;
    }

    res.status(500).send({
      error: `Internal Server Error`
    });

    // res.status(200).json({
    //   message: "hooray! welcome to our api!",
    //   rows,
    //   fields
    // });

    // console.log('The solution is: ', rows[0].solution);
  });


  // res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(PORT);


// tslint:disable-next-line: no-console
console.log('Magic happens on port ' + PORT);
