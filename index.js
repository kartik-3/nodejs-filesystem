const fs = require("fs");
const express = require("express");
const dayjs = require("dayjs");
const path = require("path");

const app = express();

app
  .get("/", (req, res) => {     //Home Page
    const host = req.get("host");
    res.send(
      `
      <h1>NodeJS File System</h1>
      <h3>Use URL ${host}/create to create a new file.</h3>
      <h3>Use URL ${host}/get to retrieve all created files.</h3>
       `
    );
  })
  .get("/create", (req, res) => {   //Creating New Files
    const curr_time = dayjs().format("DD-MM-YYYY--HH_mm_ss");
    const file_name = curr_time + ".txt";
    fs.writeFile(
      path.join(__dirname, "file_storage", file_name),
      curr_time,
      (err) => {
        if (err) res.status(500).send("Some error occurred.");
        res.send(
          `<h4>Created a new file with name ${file_name} successfully! </h4>`
        );
      }
    );
  })
  .get("/get", (req, res) => {      //Retrieving All Created Files
    fs.readdir(path.join(__dirname, "file_storage"), (err, files) => {
      let resp = "<h3>The following files exist in the database.</h3>";
      files.forEach((file) => {
        resp += `<h4>${file}</h4>`;
      });
      res.send(resp);
    });
  })
  .listen(process.env.PORT);
