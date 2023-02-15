const express = require("express");
const mysql = require("mysql2");
var cors = require("cors");
const { query } = require("express");

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

// Create a connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Data@11",
  database: "housing",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected");
});

// Routes
app.get("/", (req, res) => {
  defaultQuery = {
    max_no_rooms: 10 ** 4,
    min_no_rooms: 10 ** 4,
    max_no_bath: 10 ** 4,
    min_no_bath: 10 ** 4,
    max_rent: 10 ** 4,
    min_rent: 10 ** 4,
    max_distance: 10 ** 4,
    min_distance: 10 ** 4,
    term: 10 ** 4,
    sort: 1,
  };
  let sql =
    "Select * from all_listings al, availibility a where a.list_id = al.id";

  for (let q in req.query) {
    if (req.query[q] != null) {
      if (req.query[q] === "") {
        defaultQuery[q] = 10 ** 4;
      }
      defaultQuery[q] = req.query[q];
    }
  }
  if (defaultQuery.max_no_rooms && defaultQuery.max_no_rooms != 10 ** 4) {
    sql = sql + ` and no_of_rooms <= ${defaultQuery.max_no_rooms}`;
  }

  if (defaultQuery.min_no_rooms && defaultQuery.min_no_rooms != 10 ** 4) {
    sql = sql + ` and no_of_rooms >= ${defaultQuery.min_no_rooms}`;
  }

  if (defaultQuery.max_no_bath && defaultQuery.max_no_bath != 10 ** 4) {
    sql = sql + ` and no_of_bathrooms <= ${defaultQuery.max_no_bath}`;
  }

  if (defaultQuery.min_no_bath && defaultQuery.min_no_bath != 10 ** 4) {
    sql = sql + ` and no_of_bathrooms >= ${defaultQuery.min_no_bath}`;
  }

  if (defaultQuery.max_rent && defaultQuery.max_rent != 10 ** 4) {
    sql = sql + ` and monthly_rent <= ${defaultQuery.max_rent}`;
  }

  if (defaultQuery.min_rent && defaultQuery.min_rent != 10 ** 4) {
    sql = sql + ` and monthly_rent >= ${defaultQuery.min_rent}`;
  }

  if (defaultQuery.max_distance && defaultQuery.max_distance != 10 ** 4) {
    sql = sql + ` and dist_from_campus >= ${defaultQuery.max_distance}`;
  }

  if (defaultQuery.min_distance && defaultQuery.min_distance != 10 ** 4) {
    sql = sql + ` and dist_from_campus <= ${defaultQuery.min_distance}`;
  }
  if (defaultQuery.term && defaultQuery.term != 10 ** 4) {
    sql = sql + ` and Academic_Year_Index = ${defaultQuery.term}`;
  }

  if (defaultQuery.sort !== 1) {
    sql = sql + ` order by ${defaultQuery.sort}`;
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error found");
      throw err;
    }
    res.send(result);
  });
  //   res.json("It is working ");
});

app.get("/listing/", (req, res) => {
  console.log(req.query);
  let id = req.query.id;
  sql = `select * from all_listings al, landlords l, listings_images li where al.landlord_id = l.landlord_Id and li.listing_id = al.id and id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error found");
      throw err;
    }
    res.send(result);
  });
});

app.get("/auth", (req, res) => {
  console.log(req.query);
  let username = req.query.username;
  let password = req.query.password;
  let sql = `select * from land_user_pass where username = "${username}"`;
  db.query(sql, (err, result) => {
    if (err) {
      // throw err;
      res.send({ message: "Something went wrong. Please try again" });
    }
    if (result.length != 0) {
      console.log(result.length != 0);
      res.send({
        message: "success",
        id: result[0]["landlord_Id"],
        email: username,
      });
    } else {
      res.send({ message: "Invalid username or password" });
    }
  });
});

app.post("/auth", (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  let newId = Math.floor(100000 + Math.random() * 900000);

  sql = `INSERT INTO land_user_pass(landlord_Id,username,password)`;
  sql += `VALUES (${newId},'${username}','${password}');`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("done");
    res.send({ message: "success", id: newId, email: username });
  });
});

// Invoking server

app.listen(PORT, () => console.log("Server Started"));
