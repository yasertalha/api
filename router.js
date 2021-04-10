const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
router.post("/create", (req, res) => {
  console.log(req.body);
  let dataValue = JSON.stringify(req.body);
  let newID = uuidv4();
  const user = new User({
    _id: newID,
    data: dataValue,
  });
  user
    .save()
    .then((user) =>
      res.json({
        message: "saved",
        secretID: `${newID}`,
      })
    )
    .catch((err) => console.log(err));
});

router.get(`/read/:id`, (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((savedUser) => {
      if (savedUser) res.send(JSON.parse(savedUser.data));
    })
    .catch((err) => res.json(err));
});

router.put(`/update/:id`, (req, res) => {
  console.log(req.body);

  let dataValue = JSON.stringify(req.body);
  console.log(dataValue);
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { data: dataValue } }, // $set for string , $push for array
    { new: true }
  ).exec((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
