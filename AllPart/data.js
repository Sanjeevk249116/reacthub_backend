var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const csv = require("csv-parser");
const { SignUpModel } = require("../models/signup");
const { chessModel } = require("../models/chessplayer");

exports.signupPost = async (req, res) => {
  const { name, email, password, dob, phone } = req.body;
  const data = await SignUpModel.find();
  const dt1 = data.filter((el) => {
    return el.email == email || el.phone == phone;
  });
  if (dt1.length > 0) {
    return res.status(410).send({ msg: 410 });
  }
  await bcrypt.hash(password, 4, async function (err, hash) {
    if (err) {
      return res.status(500).send({ msg: "Error hashing password" });
    }
    const dt = new SignUpModel({
      name,
      email,
      dob,
      password: hash,
      phone,
    });

    try {
      await dt.save();
      res.status(200).send({ msg: 200 });
    } catch {
      res.status(401).send({ msg: 401 });
    }
  });
};

exports.logInPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SignUpModel.findOne({ email });

    if (!user) {
      return res.status(405).send({ msg: "Details are not exists" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send({ msg: "Internal Server Error" });
      }

      if (result) {
        res.status(200).send({ msg: "Login successful" });
      } else {
        res.status(401).send({ msg: "Incorrect password" });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

exports.chessPlayerTop = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  try {
    const count = await chessModel.countDocuments();
    const data = await chessModel
      .find()
      .sort({ "perfs.classical.rating": -1 })
      .skip(skip)
      .limit(limit);

    res.send({ users: data, length: count });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving data" });
  }
};
exports.ratingHistory = async (req, res) => {
  const { username } = req.params;
  try {
    const data = await chessModel.findOne({ username });
    const array = [];
    var length = data.rating_history.length;
    if (length < 30) {
      for (let i = length - 1; i >= 0; i--) {
        array.push(data.rating_history[i][3]);
      }
    } else {
      for (let i = 29; i >= 0; i--) {
        array.push(data.rating_history[i][3]);
      }
    }
    res.send({ rating: array });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving data" });
  }
};

exports.postData = async (req, res) => {
  const dt = await chessModel(req.body);
  try {
    await dt.save();
    res.send({ msg: "done" });
  } catch (err) {
    console.log("error in post");
  }
};

exports.CsvData = async (req, res) => {
  const fetchHistory = async (username) => {
    const data = await chessModel.findOne({ username });
    const array = [];
    var length = data?.rating_history.length;
    if (length < 30) {
      for (let i = length - 1; i >= 0; i--) {
        array.push(data.rating_history[i][3]);
      }
    } else {
      for (let i = 29; i >= 0; i--) {
        array.push(data.rating_history[i][3]);
      }
    }
    return array;
  };
  try {
    const dataVal = await chessModel.find();
    const csvData = [];
    await Promise.all(
      dataVal.map(async (player, idx) => {
        const history = await fetchHistory(player.username);
        const rowData = [player.username, ...history];

        csvData.push(rowData.join(","));
      })
    );
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=rating_history.csv"
    );
    res.send(csvData.join("\n"));
  } catch (err) {
    console.log("error found");
  }
};
