const express = require("express");
const app = express();
const mysql = require("mysql");
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "85.10.205.173",
    port: 3306,
    user: "dadaxxx15",
    password: "dadaxxx15",
    database: "churchmgmt",
    debug: false
});

pool.getConnection((err) => !err ? console.log("SUCCESS") : console.log("NOT CONNECTED"))

app.use(express.static(__dirname + "/public"));

app.post("/api/signin", (req, res) => {
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query(
                `select * from users where username="${req.body.username}" and password="${
                req.body.password
                }"`,
                (err, results) => {
                    if (!err) {
                        console.log(results)
                        // results.length == 0
                        //     ? res.send("INVALID USER NAME OR PASSWORD")
                        //     : res.send("SUCCESSFULLY LOGIN")
                    } else {
                        console.log(err)
                    }
                }
            );
            connection.release();
        } else {
            console.log(err)
            res.json("Error connecting to db. " + err);
            connection.release();
        }
    });
});

app.get("*", (req, res) => res.send("./public/index.html"));
app.listen(8080, () => console.log(`App listening on port 8080`));