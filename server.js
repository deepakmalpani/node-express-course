const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + "/assets"));

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " " + req.ip);
  next();
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({
      time: req.time,
    });
  }
);

const mockUserData = [{ name: "Deepak" }, { name: "James" }];

app.get("/users", function (req, res) {
  res.json({
    success: true,
    message: "successfully got users. Nice!",
    users: mockUserData,
  });
});

app.get("/users/:id", function (req, res) {
  console.log(req.params.id);
  res.json({
    success: true,
    message: "successfully got users. Nice!",
    users: req.params.id,
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const mockUserName = "Billy";
  const mockPassword = "secret";
  if (username == mockUserName && password == mockPassword) {
    res.json({
      success: true,
      message: "password and username match!",
      token: "encrypted token goes here",
    });
  } else {
    res.json({
      success: false,
      message: "password and username does not match",
    });
  }
});

app.listen(8000, function () {
  console.log("server is running");
});
