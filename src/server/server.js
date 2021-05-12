import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App";

mongoose.connect("mongodb://localhost:27017/loginTestDB");
var Schema = mongoose.Schema;

var userDataSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { collection: "users" }
);

var UserData = mongoose.model("UserData", userDataSchema);

const server = express();
server.use(express.static("dist"));
server.use(express.json());

server.get("/", (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
    <html>
      <head>
        <title>Sample React App</title>
      </head>
      <body>
        <div id="mountNode">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `);
});

server.post("/login", (req, res) => {
  let query = { username: req.body.username };
  UserData.find(query).then(function (docs) {
    if (docs.length == 0) {
      res.json({ success: false });
    } else {
      bcrypt.compare(
        req.body.password,
        docs[0].password,
        function (err, resultCrypt) {
          res.json({ success: resultCrypt, role: docs[0].role });
        }
      );
    }
  });
});

server.post("/validate", function (req, res) {
  let query = { username: req.body.username };
  UserData.find(query).then(function (docs) {
    if (docs.length == 0) {
      res.send("Not found");
    }
    res.json(docs[0]);
  });
});

server.post("/validateAdmin", function (req, res) {
  let query = { username: req.body.username, role: "admin" };
  UserData.find(query).then(function (docs) {
    if (docs.length == 0) {
      res.send("Not found");
    }
    res.json(docs[0]);
  });
});

server.post("/editUser", function (req, res) {
  bcrypt.hash(req.body.password, 5, function (err, hash) {
    let query = { username: req.body.username };
    UserData.find(query).then(function (docs) {
      if (docs.length == 0) {
        res.send("Not found");
      }
      docs[0].password = hash;
      docs[0].save();
      res.send("OK");
    });
  });
});

server.post("/newUser", function (req, res) {
  bcrypt.hash(req.body.password, 5, function (err, hash) {
    let query = {
      username: req.body.username,
      password: hash,
      role: req.body.role,
    };
    var data = UserData(query);
    data.save();
    res.send("OK");
  });
});

server.listen(4242, () => console.log("Server is running..."));
